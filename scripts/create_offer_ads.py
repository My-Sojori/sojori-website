#!/usr/bin/env python3
"""Crée les 2 pubs 'lien' de la campagne « Sojori — Conciergeries Maroc » (Sojori ADS).
Prérequis : app Meta « Sojori Manager » en mode Live, variables FB_ADS_TOKEN / FB_PAGE_ID dans .env.
Les pubs sont créées en PAUSE — activation manuelle après validation."""
import json, urllib.request, urllib.parse, os, base64

TOKEN = os.environ['FB_ADS_TOKEN']
ACT = 'act_1340992357388311'
API = 'https://graph.facebook.com/v25.0'
ADSET_ID = '120247994437100724'
PAGE_ID = os.environ['FB_PAGE_ID']
LINK = 'https://business.sojori.com/fr/offre-conciergeries?utm_source=meta&utm_medium=paid&utm_campaign=conciergeries-maroc'

def post(path, params):
    params['access_token'] = TOKEN
    data = urllib.parse.urlencode(params).encode()
    try:
        return json.load(urllib.request.urlopen(f'{API}/{path}', data))
    except urllib.error.HTTPError as e:
        return {'error': json.load(e)}

# Images déjà uploadées le 16/07 (act adimages)
HASHES = {
    'briques': '53dca95ab86557d2a40a0681ddee4559',
    'hero': '368aca97c3b4c038de0f7010590bea9f',
}

COPY = {
    'briques': {
        'message': ("Vous gérez des Airbnb au Maroc ? PMS, Channel Manager, prix dynamiques, WhatsApp, "
                    "réservation directe, upsell, ménage, analytics : tout dans un seul logiciel. "
                    "Offre de lancement pour les 15 premières conciergeries : 2 mois gratuits + "
                    "migration complète offerte."),
        'name': '2 mois gratuits. Migration offerte.',
        'description': 'Le logiciel des conciergeries Airbnb.',
    },
    'hero': {
        'message': ("Le logiciel des conciergeries Airbnb au Maroc. Gérez plus de biens, gagnez plus par bien — "
                    "sans agrandir l'équipe. Prix dynamiques, WhatsApp automatisé, réservation directe, upsell. "
                    "Offre de lancement : 2 mois gratuits + migration offerte, sans engagement. 15 places."),
        'name': 'Un seul outil. Tout orchestré.',
        'description': '2 mois gratuits — 15 places seulement.',
    },
}

for label in ['briques', 'hero']:
    spec = {
        'page_id': PAGE_ID,
        'link_data': {
            'link': LINK,
            'message': COPY[label]['message'],
            'name': COPY[label]['name'],
            'description': COPY[label]['description'],
            'image_hash': HASHES[label],
            'call_to_action': {'type': 'LEARN_MORE', 'value': {'link': LINK}},
        },
    }
    crea = post(f'{ACT}/adcreatives', {
        'name': f'Sojori offre — {label}',
        'object_story_spec': json.dumps(spec),
        'degrees_of_freedom_spec': json.dumps({'creative_features_spec': {'standard_enhancements': {'enroll_status': 'OPT_OUT'}}}),
    })
    print(f'créa {label}:', crea)
    if 'error' in crea:
        continue
    ad = post(f'{ACT}/ads', {
        'name': f'Sojori offre — {label}',
        'adset_id': ADSET_ID,
        'creative': json.dumps({'creative_id': crea['id']}),
        'status': 'PAUSED',
    })
    print(f'pub {label}:', ad)
