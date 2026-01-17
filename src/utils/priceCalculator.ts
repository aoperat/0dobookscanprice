import type { Book, PricingConfig } from '../types/pricing';

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
