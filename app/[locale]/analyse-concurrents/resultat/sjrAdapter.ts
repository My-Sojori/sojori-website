/* Adapte le résultat API (AnalysisResult) au format attendu par les vues (SjrData). */
import type { AnalysisResult } from './AnalyseResultatClient';
import type { SjrData, SjrListing } from './sjrShared';

type AnyListing = {
  airbnbListingId?: string | null;
  name?: string | null;
  photoUrl?: string | null;
  bedrooms?: number | null;
  baths?: number | null;
  guests?: number | null;
  rating?: number | null;
  reviewsCount?: number | null;
  superhost?: boolean | null;
  adrMad?: number | null;
  occupancy?: number | null;
  revenueTtmMad?: number | null;
  distanceMeters?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  amenities?: string[];
};

function mapListing(l: AnyListing | null | undefined): SjrListing {
  const s = (l ?? {}) as AnyListing;
  return {
    id: s.airbnbListingId ?? null,
    name: s.name ?? null,
    photoUrl: s.photoUrl ?? null,
    bedrooms: s.bedrooms ?? null,
    baths: s.baths ?? null,
    guests: s.guests ?? null,
    rating: s.rating ?? null,
    reviewsCount: s.reviewsCount ?? null,
    superhost: s.superhost ?? null,
    adrMad: s.adrMad ?? null,
    occupancy: s.occupancy ?? null,
    revenueTtmMad: s.revenueTtmMad ?? null,
    distanceMeters: s.distanceMeters ?? null,
    lat: s.latitude ?? null,
    lng: s.longitude ?? null,
    amenities: Array.isArray(s.amenities) ? s.amenities : [],
  };
}

export function toSjrData(r: AnalysisResult): SjrData {
  const competitors = (r.competitors ?? []).map((c) => mapListing(c as AnyListing));
  return {
    yourListing: mapListing(r.yourListing as AnyListing),
    estimatedMarketPriceMad: r.estimatedMarketPriceMad ?? null,
    estimatedMarketRevenueTtmMad: r.estimatedMarketRevenueTtmMad ?? null,
    competitorsCount: r.competitorsCount ?? competitors.length,
    bestCompetitor: r.bestCompetitor ? mapListing(r.bestCompetitor as AnyListing) : null,
    competitors,
    amenitiesDiff: r.amenitiesDiff ?? null,
    bilan: r.bilan
      ? {
          headline: r.bilan.headline,
          strengths: r.bilan.strengths ?? [],
          gaps: r.bilan.gaps ?? [],
          actions: r.bilan.actions ?? [],
          bestCompetitorWhy: r.bilan.bestCompetitorWhy,
        }
      : null,
  };
}
