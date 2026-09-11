import type { ReactNode } from 'react';
import { SITE_URL } from '@/lib/siteUrl';

export type Crumb = { name: string; path: string };

/**
 * Données structurées de page : fil d'Ariane + service décrit.
 *
 * 2026-09-11 : relevé sur welcomax.com/solutions/pms-hotel-marrakech, le
 * concurrent direct sur la requête « PMS + ville ». Il porte BreadcrumbList,
 * FAQPage, Service, Organization, LocalBusiness, SoftwareApplication et
 * WebSite. Sojori n'avait que FAQPage. Ce composant comble l'écart sur les
 * deux types liés à la page elle-même — le reste (Organization, WebSite)
 * étant déjà porté par le layout.
 *
 * BreadcrumbList donne à Google le chemin affiché sous le titre dans la SERP,
 * à la place de l'URL brute. Service décrit la prestation et sa zone
 * géographique, ce qui compte pour une requête localisée.
 */
export function PageSchema({
  crumbs,
  serviceName,
  serviceDescription,
  areaServed,
}: {
  crumbs: Crumb[];
  serviceName: string;
  serviceDescription: string;
  areaServed: string;
}): ReactNode {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    serviceType: "Logiciel d'orchestration hôtelière",
    areaServed: { '@type': 'City', name: areaServed },
    provider: {
      '@type': 'Organization',
      name: 'Sojori',
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
    </>
  );
}
