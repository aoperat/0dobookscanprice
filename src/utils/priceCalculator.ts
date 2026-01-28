import type { Book, PricingConfig, ScanPriceTableRow, TocPriceTableRow } from '../types/pricing';

export function calculateScanPrice(pages: number, config: PricingConfig): number {
  const basePrices = config.scanPricing.basePrices;

  for (const tier of basePrices) {
    if (tier.maxPages === null) {
      // 600쪽 이상 구간
      const extraBlocks = Math.floor((pages - 600) / 100);
      return (tier.basePrice ?? 8000) + extraBlocks * (tier.extraPer100 ?? 1000);
    } else if (pages <= tier.maxPages) {
      return tier.price ?? 4000;
    }
  }

  return 4000; // 폴백
}

export function calculateTocPrice(tocCount: number, config: PricingConfig): number {
  if (tocCount <= 0) return 0;

  const tiers = config.tocPricing.tiers;

  for (const tier of tiers) {
    if (tier.maxCount === null) {
      // 101개 이상
      return tier.basePrice + (tocCount - (tier.threshold ?? 100)) * tier.perItem;
    } else if (tocCount <= tier.maxCount) {
      if (tier.threshold && tocCount > tier.threshold) {
        return tier.basePrice + (tocCount - tier.threshold) * tier.perItem;
      }
      return tier.basePrice;
    }
  }

  return 3000; // 폴백
}

export function calculateBindingPrice(pages: number): number {
  return pages <= 500 ? 4000 : 5000;
}

export function calculateBookPrice(book: Book, config: PricingConfig): number {
  let price = calculateScanPrice(book.pages, config);

  // 옵션 추가
  if (book.ocr) {
    price += config.scanPricing.options.ocr;
  }
  if (book.highRes) {
    price += config.scanPricing.options.highResolution;
  }

  // 목차 가격
  if (book.tocCount > 0) {
    const tocPrice = calculateTocPrice(book.tocCount, config);
    price += tocPrice;
  }

  // 제본 가격
  if (book.binding) {
    price += calculateBindingPrice(book.pages);
  }

  return price;
}

export function calculateTotalPrice(books: Book[], config: PricingConfig): number {
  return books.reduce((total, book) => total + calculateBookPrice(book, config), 0);
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR') + '원';
}

export function generateEstimateText(books: Book[], config: PricingConfig): string {
  let text = "[북스캔 서비스 견적서]\n";

  books.forEach((book, idx) => {
    const options: string[] = [];
    if (book.ocr) options.push('OCR');
    if (book.highRes) options.push('고해상도');
    if (book.tocCount > 0) {
      options.push(`목차${book.tocCount}개`);
    }
    if (book.binding) {
      const bindingPrice = calculateBindingPrice(book.pages);
      options.push(`제본: ${formatPrice(bindingPrice)}`);
    }

    const price = calculateBookPrice(book, config);
    const optionText = options.length > 0 ? options.join(', ') : '없음';
    text += `책 ${idx + 1}: ${book.pages}쪽, 옵션: ${optionText}, 가격: ${formatPrice(price)}\n`;
  });

  const total = calculateTotalPrice(books, config);
  text += `\n총액: ${formatPrice(total)}\n`;

  return text;
}

/**
 * 스캔 가격표 데이터를 자동 생성
 */
export function generateScanPriceTableData(config: PricingConfig): ScanPriceTableRow[] {
  const { basePrices, options } = config.scanPricing;
  const rows: ScanPriceTableRow[] = [];

  let prevMaxPages = 0;

  basePrices.forEach((tier) => {
    if (tier.maxPages === null) {
      // 600쪽 이상 구간
      const basePrice = tier.basePrice ?? 9000;
      const extraPer100 = tier.extraPer100 ?? 1000;
      rows.push({
        range: `${prevMaxPages + 1}쪽 이상`,
        basePrice: `${formatPrice(basePrice)} + 100쪽당 ${formatPrice(extraPer100)}`,
        ocrPrice: `+${formatPrice(options.ocr)}`,
        highResPrice: `+${formatPrice(options.highResolution)}`
      });
    } else {
      rows.push({
        range: `${prevMaxPages + 1} ~ ${tier.maxPages}쪽`,
        basePrice: formatPrice(tier.price ?? 0),
        ocrPrice: `+${formatPrice(options.ocr)}`,
        highResPrice: `+${formatPrice(options.highResolution)}`
      });
      prevMaxPages = tier.maxPages;
    }
  });

  return rows;
}

/**
 * 목차 가격표 데이터를 자동 생성
 */
export function generateTocPriceTableData(config: PricingConfig): TocPriceTableRow[] {
  const { tiers, bundleDiscount } = config.tocPricing;
  const rows: TocPriceTableRow[] = [];

  let prevMaxCount = 0;

  tiers.forEach((tier) => {
    const startCount = prevMaxCount + 1;

    if (tier.maxCount === null) {
      // 101개 이상 구간
      const minPrice = tier.basePrice + tier.perItem; // 101개 기준
      rows.push({
        range: `${startCount}개 이상`,
        regularPrice: `${formatPrice(minPrice)}~`,
        discountPrice: `${formatPrice(Math.floor(minPrice * (1 - bundleDiscount)))}~`
      });
    } else {
      // 최소/최대 가격 계산
      const minPrice = tier.threshold && startCount > tier.threshold
        ? tier.basePrice + (startCount - tier.threshold) * tier.perItem
        : tier.basePrice;

      const maxPrice = tier.threshold && tier.maxCount > tier.threshold
        ? tier.basePrice + (tier.maxCount - tier.threshold) * tier.perItem
        : tier.basePrice;

      const regularPriceStr = minPrice === maxPrice
        ? formatPrice(minPrice)
        : `${formatPrice(minPrice)} ~ ${formatPrice(maxPrice)}`;

      const discountedMinPrice = Math.floor(minPrice * (1 - bundleDiscount));
      const discountedMaxPrice = Math.floor(maxPrice * (1 - bundleDiscount));

      const discountPriceStr = minPrice === maxPrice
        ? formatPrice(discountedMinPrice)
        : `${formatPrice(discountedMinPrice)} ~ ${formatPrice(discountedMaxPrice)}`;

      rows.push({
        range: `${startCount} ~ ${tier.maxCount}개`,
        regularPrice: regularPriceStr,
        discountPrice: discountPriceStr
      });

      prevMaxCount = tier.maxCount;
    }
  });

  return rows;
}
