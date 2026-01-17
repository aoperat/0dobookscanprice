export interface Book {
  id: string;
  pages: number;
  ocr: boolean;
  highRes: boolean;
  tocCount: number;
  binding: boolean;
}

export interface ScanPriceTier {
  maxPages: number | null;
  price?: number;
  basePrice?: number;
  extraPer100?: number;
}

export interface TocPriceTier {
  maxCount: number | null;
  basePrice: number;
  perItem: number;
  threshold?: number;
}

export interface PricingConfig {
  version: string;
  scanPricing: {
    basePrices: ScanPriceTier[];
    options: {
      ocr: number;
      highResolution: number;
    };
  };
  tocPricing: {
    tiers: TocPriceTier[];
    bundleDiscount: number;
  };
  serviceInfo: {
    maxWidthMm: number;
    minPages: number;
    defaultPages: number;
    defaultTocCount: number;
  };
}

export interface BookWithPrice extends Book {
  price: number;
}
