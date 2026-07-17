#!/usr/bin/env python3
"""
Croise les chiffres GA4 (sessions reelles, engagement, leads) avec les chiffres
Meta Ads (clics factures, depense) pour le reporting quotidien de la campagne
« Sojori — Conciergeries Maroc ».

Raison d'etre : Meta ne mesure que ce qu'il facture. GA4 mesure ce qui arrive
vraiment sur le site. L'ecart entre les deux est le diagnostic — voir le champ
"ecart_clics_vs_sessions" de la sortie.

Prerequis :
  - Cle SA : ~/.config/sojori/ga4-reader.json (creee via gcloud, chmod 600)
  - Le SA doit etre Lecteur sur la propriete GA4 (etape manuelle dans l'UI GA4)
  - GA4_PROPERTY_ID : id numerique de la propriete (PAS le G-XXXX de mesure)
  - FB_ADS_TOKEN : depuis ~/sojori-website/.env

Usage :
  export GA4_PROPERTY_ID=123456789
  python3 scripts/ga4-meta-report.py [--days 1]
"""

import argparse
import json
import os
import sys
import urllib.error
import urllib.request

KEY_PATH = os.path.expanduser("~/.config/sojori/ga4-reader.json")
META_ACCOUNT = "act_1340992357388311"
META_CAMPAIGN = "120247994410210724"
GA4_SCOPE = "https://www.googleapis.com/auth/analytics.readonly"

# Meta renvoie les montants monetaires en unites mineures selon le compte.
# Le budget de l'adset est stocke en centimes (1000 = 10 EUR) : on n'applique
# donc aucune conversion ici et on affiche la valeur brute, en signalant l'unite.
# Toute lecture de "spend" doit etre confirmee dans le Gestionnaire de pubs.
META_SPEND_UNIT_NOTE = "valeur brute API — confirmer l'unite dans le Gestionnaire"


def ga4_token():
    try:
        from google.auth.transport.requests import Request
        from google.oauth2 import service_account
    except ImportError:
        sys.exit(
            "google-auth manquant. Installer dans un venv :\n"
            "  python3 -m venv ~/.config/sojori/venv\n"
            "  ~/.config/sojori/venv/bin/pip install google-auth requests\n"
            "  puis lancer ce script avec ~/.config/sojori/venv/bin/python"
        )
    if not os.path.exists(KEY_PATH):
        sys.exit(f"Cle SA introuvable : {KEY_PATH}")
    creds = service_account.Credentials.from_service_account_file(
        KEY_PATH, scopes=[GA4_SCOPE]
    )
    creds.refresh(Request())
    return creds.token


def post_json(url, payload, token):
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode(),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
    )
    try:
        return json.loads(urllib.request.urlopen(req).read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:300]
        if e.code == 403:
            sys.exit(
                f"GA4 403 : le SA n'a pas acces a la propriete.\n"
                f"Ajouter sojori-ga4-reader@seraphic-vertex-474520-b8.iam.gserviceaccount.com\n"
                f"comme Lecteur dans GA4 Admin -> Gestion des acces.\n{body}"
            )
        sys.exit(f"GA4 HTTP {e.code} : {body}")


def ga4_traffic(prop, token, days):
    """Sessions + engagement du trafic Meta paid, par jour."""
    data = post_json(
        f"https://analyticsdata.googleapis.com/v1beta/properties/{prop}:runReport",
        {
            "dateRanges": [{"startDate": f"{days}daysAgo", "endDate": "yesterday"}],
            "dimensions": [{"name": "date"}, {"name": "sessionSource"}, {"name": "sessionMedium"}],
            "metrics": [
                {"name": "sessions"},
                {"name": "engagedSessions"},
                {"name": "averageSessionDuration"},
                {"name": "bounceRate"},
            ],
            "dimensionFilter": {
                "andGroup": {
                    "expressions": [
                        {"filter": {"fieldName": "sessionSource", "stringFilter": {"value": "meta"}}},
                        {"filter": {"fieldName": "sessionMedium", "stringFilter": {"value": "paid"}}},
                    ]
                }
            },
        },
        token,
    )
    out = []
    for row in data.get("rows", []):
        d = [x["value"] for x in row["dimensionValues"]]
        m = [x["value"] for x in row["metricValues"]]
        out.append(
            {
                "date": d[0],
                "sessions": int(m[0]),
                "engaged_sessions": int(m[1]),
                "avg_duration_s": round(float(m[2]), 1),
                "bounce_rate_pct": round(float(m[3]) * 100, 1),
            }
        )
    return out


def ga4_leads(prop, token, days):
    """Evenements generate_lead issus du trafic Meta paid."""
    data = post_json(
        f"https://analyticsdata.googleapis.com/v1beta/properties/{prop}:runReport",
        {
            "dateRanges": [{"startDate": f"{days}daysAgo", "endDate": "yesterday"}],
            "dimensions": [{"name": "date"}, {"name": "eventName"}],
            "metrics": [{"name": "eventCount"}],
            "dimensionFilter": {
                "andGroup": {
                    "expressions": [
                        {"filter": {"fieldName": "sessionSource", "stringFilter": {"value": "meta"}}},
                        {
                            "filter": {
                                "fieldName": "eventName",
                                "inListFilter": {"values": ["generate_lead", "select_content", "page_view"]},
                            }
                        },
                    ]
                }
            },
        },
        token,
    )
    out = {}
    for row in data.get("rows", []):
        d = [x["value"] for x in row["dimensionValues"]]
        out.setdefault(d[0], {})[d[1]] = int(row["metricValues"][0]["value"])
    return out


def meta_insights(token, days):
    params = urllib.parse.urlencode(
        {
            "level": "ad",
            "fields": "ad_name,spend,impressions,clicks,ctr,actions",
            "date_preset": f"last_{days}d" if days > 1 else "yesterday",
            "time_increment": "1",
            "access_token": token,
        }
    )
    url = f"https://graph.facebook.com/v25.0/{META_CAMPAIGN}/insights?{params}"
    try:
        return json.loads(urllib.request.urlopen(url).read()).get("data", [])
    except urllib.error.HTTPError as e:
        sys.exit(f"Meta HTTP {e.code} : {e.read().decode()[:200]}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=1)
    args = ap.parse_args()

    prop = os.environ.get("GA4_PROPERTY_ID")
    if not prop:
        sys.exit(
            "GA4_PROPERTY_ID manquant.\n"
            "Le trouver dans GA4 : Admin -> Parametres de la propriete -> ID (numerique).\n"
            "Ce n'est PAS le G-KCVTT735EZ (qui est l'id de mesure)."
        )
    fb = os.environ.get("FB_ADS_TOKEN")
    if not fb:
        sys.exit("FB_ADS_TOKEN manquant : cd ~/sojori-website && set -a && source .env && set +a")

    token = ga4_token()
    traffic = ga4_traffic(prop, token, args.days)
    leads = ga4_leads(prop, token, args.days)
    ads = meta_insights(fb, args.days)

    meta_clicks = sum(
        int(a["value"])
        for ad in ads
        for a in ad.get("actions", [])
        if a["action_type"] == "link_click"
    )
    meta_lpv = sum(
        int(a["value"])
        for ad in ads
        for a in ad.get("actions", [])
        if a["action_type"] == "landing_page_view"
    )
    ga_sessions = sum(r["sessions"] for r in traffic)

    # Le diagnostic central : Meta facture des clics, GA4 compte des sessions.
    # Un ecart massif signifie soit une landing trop lente, soit un sous-comptage
    # du pixel. GA4 est l'arbitre car il mesure independamment de Meta.
    verdict = "indetermine (pas assez de donnees)"
    if meta_clicks and ga_sessions:
        ratio = ga_sessions / meta_clicks
        if ratio >= 0.7:
            verdict = "le trafic ARRIVE bien -> le pixel Meta sous-compte les landing_page_view"
        elif ratio <= 0.4:
            verdict = "le trafic N'ARRIVE PAS -> landing trop lente / abandon avant chargement"
        else:
            verdict = "perte partielle -> a surveiller"

    print(
        json.dumps(
            {
                "periode_jours": args.days,
                "ga4": {"trafic_meta_paid": traffic, "evenements": leads},
                "meta": {
                    "clics_lien": meta_clicks,
                    "landing_page_views": meta_lpv,
                    "spend_brut": sum(float(ad.get("spend", 0)) for ad in ads),
                    "spend_note": META_SPEND_UNIT_NOTE,
                },
                "diagnostic": {
                    "sessions_ga4": ga_sessions,
                    "clics_meta": meta_clicks,
                    "ratio_sessions_sur_clics": round(ga_sessions / meta_clicks, 3)
                    if meta_clicks
                    else None,
                    "verdict": verdict,
                },
            },
            indent=2,
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    import urllib.parse

    main()
