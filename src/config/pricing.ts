import type { PricingConfig } from '../types/pricing';
import { generateScanPriceTableData, generateTocPriceTableData } from '../utils/priceCalculator';

export const pricingConfig: PricingConfig = {
  version: "2026.01.17",
  scanPricing: {
    basePrices: [
      { maxPages: 299, price: 5000 },
      { maxPages: 399, price: 6000 },
      { maxPages: 499, price: 7000 },
      { maxPages: 599, price: 8000 },
      { maxPages: null, basePrice: 9000, extraPer100: 1000 }
    ],
    options: {
      ocr: 2000,
      highResolution: 2000
    }
  },
  tocPricing: {
    tiers: [
      { maxCount: 10, basePrice: 3000, perItem: 0 },
      { maxCount: 30, basePrice: 3000, perItem: 250, threshold: 10 },
      { maxCount: 60, basePrice: 5000, perItem: 80, threshold: 30 },
      { maxCount: 100, basePrice: 8000, perItem: 60, threshold: 60 },
      { maxCount: null, basePrice: 10400, perItem: 50, threshold: 100 }
    ],
    bundleDiscount: 0.3
  },
  serviceInfo: {
    maxWidthMm: 240,
    minPages: 1,
    defaultPages: 100,
    defaultTocCount: 0
  }
};

/**
 * 가격표 표시용 데이터 (자동 생성)
 * pricingConfig를 기반으로 동적으로 생성되므로 단일 진실 공급원(Single Source of Truth) 유지
 */
export const scanPriceTableData = generateScanPriceTableData(pricingConfig);

/**
 * 목차 가격표 표시용 데이터 (자동 생성)
 * pricingConfig를 기반으로 동적으로 생성되므로 단일 진실 공급원(Single Source of Truth) 유지
 */
export const tocPriceTableData = generateTocPriceTableData(pricingConfig);
