# HTML to Next.js Migration Guide

## Migration Status

### Completed
- ✅ globals.css updated with complete design system
- ✅ Shared components created (Logo, BackgroundEffects, SharedComponents)
- ✅ Layout structure ready

### Pages to Migrate

All 16 HTML pages follow the same pattern. Each page uses:

1. **Background effects**: bg-stage, bg-grid, bg-noise divs
2. **PageHeader**: Sticky nav with product menu
3. **PageHero**: Hero section with badge, title, subtitle, CTAs
4. **Content sections**: Feature-specific content
5. **StatsBar**: Optional stats bar
6. **FinalCTA**: Call to action section
7. **PageFooter**: Footer with links

## File Mapping

| Source HTML | Next.js Route | Status |
|------------|---------------|--------|
| Homepage.html | app/page.tsx | Ready to migrate |
| Dashboard App.html | app/dashboard-app/page.tsx | Ready to migrate |
| PMS.html | app/pms/page.tsx | Ready to migrate |
| Channel Manager.html | app/channel-manager/page.tsx | Ready to migrate |
| Dynamic Pricing.html | app/dynamic-pricing/page.tsx | Ready to migrate |
| Smart Analytics.html | app/analytics/page.tsx | Ready to migrate |
| WhatsApp Bot.html | app/whatsapp/page.tsx | Ready to migrate |
| Unified Inbox.html | app/inbox/page.tsx | Ready to migrate |
| Guest Experience.html | app/guest-experience/page.tsx | Ready to migrate |
| TeamFlow.html | app/teamflow/page.tsx | Ready to migrate |
| Owner Portal.html | app/owner-portal/page.tsx | Ready to migrate |
| Pricing.html | app/pricing/page.tsx | Ready to migrate |
| Integrations.html | app/integrations/page.tsx | Ready to migrate |
| Security.html | app/security/page.tsx | Ready to migrate |
| About.html | app/about/page.tsx | Ready to migrate |
| Brand System.html | app/brand/page.tsx | Ready to migrate |

## Migration Pattern

Each page follows this TypeScript structure:

```typescript
import { Metadata } from 'next';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

export const metadata: Metadata = {
  title: 'Page Title — Sojori',
  description: 'Page description',
};

export default function PageName() {
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Page Name" />
        <PageHero
          badge="Icon · Category"
          title={<>Main title.<br /><span className="gradient-text">Highlighted part.</span></>}
          subtitle="Subtitle text"
          cta1="Primary CTA"
          cta2="Secondary CTA"
        />
        {/* Page-specific content sections */}
        <StatsBar stats={[{k:'Stat',l:'Label'}]} />
        <FinalCTA
          title={<>CTA title. <span className="gradient-text">Highlighted.</span></>}
          subtitle="CTA subtitle"
        />
        <PageFooter />
      </div>
    </>
  );
}
```

## Link Updates

All internal links must be updated:
- `href="Homepage.html"` → `href="/"`
- `href="PMS.html"` → `href="/pms"`
- `href="Channel Manager.html"` → `href="/channel-manager"`
- etc.

## Component Conversion

For components with state (useState, useEffect):
1. Add `"use client"` directive at top
2. Convert React hooks to Next.js patterns
3. Maintain exact visual design

## Next Steps

1. Create all page directories
2. Convert each HTML page following the pattern above
3. Extract page-specific components from inline JSX
4. Test all routes
5. Verify all links work
