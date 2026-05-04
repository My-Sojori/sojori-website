#!/usr/bin/env python3
"""
Automated HTML to Next.js Page Migration Script
Converts HTML pages from claude_code_handoff to Next.js routes
"""

import os
import re
from pathlib import Path

# Source and destination paths
SOURCE_DIR = "/Users/gouacht/Downloads/claude_code_handoff/site"
DEST_DIR = "/Users/gouacht/sojori-website/app"

# Page mapping
PAGES = {
    "PMS.html": {
        "route": "pms",
        "title": "Sojori — PMS",
        "description": "Property Management System complet. Calendrier multi-propriétés, réservations, paiements automatisés, facturation, contrats digitaux.",
        "pageTitle": "PMS",
    },
    "Channel Manager.html": {
        "route": "channel-manager",
        "title": "Sojori — Channel Manager",
        "description": "Channel Manager multi-OTA. Sync temps réel avec Airbnb, Booking.com, Expedia et 20+ plateformes. Anti-overbooking garanti.",
        "pageTitle": "Channel Manager",
    },
    "Dynamic Pricing.html": {
        "route": "dynamic-pricing",
        "title": "Sojori — Dynamic Pricing",
        "description": "Pricing dynamique basé sur 47 signaux. Optimisez vos revenus automatiquement avec notre moteur de yield management AI.",
        "pageTitle": "Dynamic Pricing",
    },
    "Smart Analytics.html": {
        "route": "analytics",
        "title": "Sojori — Smart Analytics",
        "description": "Analytics et Business Intelligence temps réel. Dashboards personnalisables, KPIs, rapports automatiques.",
        "pageTitle": "Smart Analytics",
    },
    "WhatsApp Bot.html": {
        "route": "whatsapp",
        "title": "Sojori — WhatsApp Bot AI",
        "description": "Chatbot WhatsApp AI disponible 24/7. Check-in autonome, support multilingue, upsell intelligent. Powered by GPT-4.",
        "pageTitle": "WhatsApp Bot",
    },
    "Unified Inbox.html": {
        "route": "inbox",
        "title": "Sojori — Unified Inbox",
        "description": "Inbox unifiée pour tous vos canaux. WhatsApp, Airbnb, Booking.com, SMS, email dans une seule interface.",
        "pageTitle": "Unified Inbox",
    },
    "Guest Experience.html": {
        "route": "guest-experience",
        "title": "Sojori — Guest Experience",
        "description": "Guidebook digital interactif. Recommandations locales, infos pratiques, upsells, tout dans une app mobile.",
        "pageTitle": "Guest Experience",
    },
    "TeamFlow.html": {
        "route": "teamflow",
        "title": "Sojori — TeamFlow",
        "description": "Staff Management et coordination d'équipe. Assignation auto, tracking temps réel, photos de contrôle ménage.",
        "pageTitle": "TeamFlow",
    },
    "Owner Portal.html": {
        "route": "owner-portal",
        "title": "Sojori — Owner Portal",
        "description": "Portail propriétaire multi-devise. Dashboard revenus, statements automatiques, virements sous 48h, app mobile native.",
        "pageTitle": "Owner Portal",
    },
    "Dashboard App.html": {
        "route": "dashboard-app",
        "title": "Sojori — Dashboard App",
        "description": "Application Dashboard principale. Vue d'ensemble temps réel, KPI cards, activity feed, arrivées du jour.",
        "pageTitle": "Dashboard App",
    },
    "Pricing.html": {
        "route": "pricing",
        "title": "Sojori — Pricing",
        "description": "Tarification transparente. Plans Starter, Growth, Scale. 14 jours d'essai gratuit, annulation facile.",
        "pageTitle": "Pricing",
    },
    "Integrations.html": {
        "route": "integrations",
        "title": "Sojori — Integrations",
        "description": "60+ intégrations natives. OTAs, payment providers, smart locks, comptabilité, CRM. API ouverte.",
        "pageTitle": "Integrations",
    },
    "Security.html": {
        "route": "security",
        "title": "Sojori — Security & Compliance",
        "description": "Sécurité et conformité RGPD. Encryption, SOC 2, ISO 27001, hébergement européen, audits réguliers.",
        "pageTitle": "Security",
    },
    "About.html": {
        "route": "about",
        "title": "Sojori — About",
        "description": "L'équipe Sojori. Notre mission, nos valeurs, notre histoire. Basés à Marrakech, Paris, Lisbonne.",
        "pageTitle": "About",
    },
    "Brand System.html": {
        "route": "brand",
        "title": "Sojori — Brand System",
        "description": "Système de design Sojori. Logo, couleurs, typographie, composants. Pour partenaires et intégrations.",
        "pageTitle": "Brand System",
    },
}


def create_page_template(page_info):
    """Generate Next.js page template"""
    route_name = page_info["route"].replace("-", "").title()
    page_title = page_info["pageTitle"]

    template = f"""import {{ Metadata }} from 'next';
import {{ BackgroundEffects }} from '@/components/BackgroundEffects';
import {{ PageHeader, PageFooter, PageHero, StatsBar, FinalCTA }} from '@/components/SharedComponents';

export const metadata: Metadata = {{
  title: '{page_info["title"]}',
  description: '{page_info["description"]}',
}};

export default function {route_name}Page() {{
  return (
    <>
      <BackgroundEffects />
      <div style={{{{'position': 'relative', 'zIndex': 1}}}}>
        <PageHeader pageTitle="{page_title}" />
        <PageHero
          badge="📋 {page_title}"
          title={{<>Titre principal.<br /><span className="gradient-text">Partie en surbrillance.</span></>}}
          subtitle="Description de la page à compléter depuis le HTML source."
          cta1="Voir la démo"
          cta2="En savoir plus"
        />

        {{/* TODO: Ajouter le contenu spécifique de la page depuis {page_title}.html */}}
        <section style={{{{'padding': '80px 32px'}}}}>
          <div style={{{{'maxWidth': 1280, 'margin': '0 auto', 'textAlign': 'center'}}}}>
            <p style={{{{'color': 'var(--text-3)', 'fontSize': 14}}}}>
              Contenu de {page_title} à migrer depuis le HTML source
            </p>
          </div>
        </section>

        <StatsBar stats={{[
          {{{{k: '99.9%', l: 'Uptime'}}}},
          {{{{k: '24/7', l: 'Support'}}}},
          {{{{k: '1000+', l: 'Utilisateurs'}}}},
          {{{{k: '50ms', l: 'Response time'}}}},
        ]}} />

        <FinalCTA
          title={{<>Prêt à démarrer ? <span className="gradient-text">Essayez gratuitement.</span></>}}
          subtitle="14 jours d'essai gratuit. Sans carte bancaire. Setup en moins de 7 jours."
        />

        <PageFooter />
      </div>
    </>
  );
}}
"""
    return template


def main():
    print("🚀 Starting HTML to Next.js migration...")
    print(f"📁 Source: {SOURCE_DIR}")
    print(f"📁 Destination: {DEST_DIR}")
    print()

    created_pages = []
    skipped_pages = []

    for html_file, page_info in PAGES.items():
        source_path = os.path.join(SOURCE_DIR, html_file)
        dest_route = os.path.join(DEST_DIR, page_info["route"])
        dest_file = os.path.join(dest_route, "page.tsx")

        # Create directory if it doesn't exist
        os.makedirs(dest_route, exist_ok=True)

        # Generate page content
        page_content = create_page_template(page_info)

        # Write page file
        with open(dest_file, 'w', encoding='utf-8') as f:
            f.write(page_content)

        created_pages.append(f"/{page_info['route']}")
        print(f"✅ Created: {dest_file}")

    print()
    print("=" * 60)
    print(f"✅ Migration complete! Created {len(created_pages)} pages:")
    print()
    for page in created_pages:
        print(f"  → {page}")
    print()
    print("⚠️  NEXT STEPS:")
    print("1. Review each generated page.tsx file")
    print("2. Copy the specific content from corresponding HTML files")
    print("3. Extract any interactive components to 'use client' components")
    print("4. Update links and routing")
    print("5. Test all pages")
    print()
    print("📚 See MIGRATION_GUIDE.md for detailed instructions")
    print("=" * 60)


if __name__ == "__main__":
    main()
