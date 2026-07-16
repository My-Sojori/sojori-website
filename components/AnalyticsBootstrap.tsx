"use client";

import { useEffect } from 'react';
import { installDemoCtaClickTracking } from '@/lib/analytics';

/** Monté une fois dans le layout racine — installe les listeners globaux de tracking. */
export function AnalyticsBootstrap() {
  useEffect(() => {
    installDemoCtaClickTracking();
  }, []);
  return null;
}
