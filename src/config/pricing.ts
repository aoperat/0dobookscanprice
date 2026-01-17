import type { PricingConfig } from '../types/pricing';

export const pricingConfig: PricingConfig = {
  version: "2025.09.03",
  scanPricing: {
    basePrices: [
      { maxPages: 299, price: 4000 },
      { maxPages: 399, price: 5000 },
      { maxPages: 499, price: 6000 },
      { maxPages: 599, price: 7000 },
      { maxPages: null, basePrice: 8000, extraPer100: 1000 }
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

// 가격표 표시용 데이터
export const scanPriceTableData = [
  { range: '1 ~ 299쪽', basePrice: '4,000원', ocrPrice: '+2,000원', highResPrice: '+2,000원' },
  { range: '300 ~ 399쪽', basePrice: '5,000원', ocrPrice: '+2,000원', highResPrice: '+2,000원' },
  { range: '400 ~ 499쪽', basePrice: '6,000원', ocrPrice: '+2,000원', highResPrice: '+2,000원' },
  { range: '500 ~ 599쪽', basePrice: '7,000원', ocrPrice: '+2,000원', highResPrice: '+2,000원' },
  { range: '600쪽 이상', basePrice: '8,000원 + 100쪽당 1,000원', ocrPrice: '+2,000원', highResPrice: '+2,000원' },
];

export const tocPriceTableData = [
  { range: '1 ~ 10개', regularPrice: '3,000원', discountPrice: '2,100원' },
  { range: '11 ~ 30개', regularPrice: '3,250원 ~ 5,000원', discountPrice: '2,275원 ~ 3,500원' },
  { range: '31 ~ 60개', regularPrice: '5,080원 ~ 8,000원', discountPrice: '3,556원 ~ 5,600원' },
  { range: '61 ~ 100개', regularPrice: '8,060원 ~ 10,400원', discountPrice: '5,642원 ~ 7,280원' },
  { range: '101개 이상', regularPrice: '10,450원~', discountPrice: '7,315원~' },
];
