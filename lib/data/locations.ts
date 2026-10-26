export interface CityFaq {
  question: string;
  answer: string;
  tag?: string;
}

export interface LocationCityData {
  name: string;
  slug: string; // e.g. "seo-in-new-york-city"
  description?: string;
  headline?: string;
  popularServices?: string[];
  seoTitle?: string;
  seoDescription?: string;
  faqs?: CityFaq[];
  sections?: any[];
}

export interface LocationCountryData {
  name: string;
  slug: string; // e.g. "usa"
  flag: string; // "🇺🇸"
  description: string;
  cities: LocationCityData[];
}

export const LOCATION_DATA: LocationCountryData[] = [];

