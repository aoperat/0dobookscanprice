import { useState, useMemo } from 'react';
import { useBooks } from '../../hooks/useBooks';
import { calculateTotalPrice, calculateBookPrice, formatPrice, generateEstimateText } from '../../utils/priceCalculator';
import { pricingConfig } from '../../config/pricing';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { BookTable } from './BookTable';

export function Calculator() {
  const { books, addBook, removeBook, updateBook } = useBooks();
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);

  const totalPrice = useMemo(
    () => calculateTotalPrice(books, pricingConfig),
    [books]
  );

  const estimateText = useMemo(
    () => generateEstimateText(books, pricingConfig),
    [books]
  );

  const handleCopyEstimate = async () => {
    try {
      await navigator.clipboard.writeText(estimateText);
      alert('견적서가 클립보드에 복사되었습니다.');
    } catch {
      alert('복사에 실패했습니다.');
    }
  };

  return (
    <>
      <Card
        title="가격 계산기"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        }
      >
        {/* 가격 요약 */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5 pb-5"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div>
            <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: 'var(--text-faint)' }}>
              합계 금액
            </p>
            <div
              className="font-display text-3xl sm:text-4xl font-semibold tabular-nums animate-price"
              key={totalPrice}
              style={{ color: 'var(--accent)' }}
            >
              {formatPrice(totalPrice)}
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => setIsEstimateOpen(true)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            견적서 보기
          </Button>
        </div>

        {/* 책 테이블 */}
        <BookTable
          books={books}
          onUpdate={updateBook}
          onRemove={removeBook}
          onAdd={addBook}
        />
      </Card>

      {/* 견적서 모달 */}
      <Modal
        isOpen={isEstimateOpen}
        onClose={() => setIsEstimateOpen(false)}
        title="견적서"
        size="lg"
        footer={
          <>
            <Button variant="primary" onClick={handleCopyEstimate}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              클립보드에 복사
            </Button>
            <Button variant="outline" onClick={() => setIsEstimateOpen(false)}>
              닫기
            </Button>
          </>
        }
      >
        {/* 헤더 */}
        <div
          className="rounded-lg px-4 py-3 mb-4 flex items-center justify-between"
          style={{ backgroundColor: 'var(--bg-muted)', border: '1px solid var(--border)' }}
        >
          <div>
            <p className="font-display text-base font-semibold" style={{ color: 'var(--text-ink)' }}>
              북스캔 서비스
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>
              총 {books.length}권
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs" style={{ color: 'var(--text-faint)' }}>합계</p>
            <p className="font-display text-xl font-semibold tabular-nums" style={{ color: 'var(--accent)' }}>
              {formatPrice(totalPrice)}
            </p>
          </div>
        </div>

        {/* 책별 항목 */}
        <div className="space-y-3">
          {books.map((book, idx) => {
            const bookPrice = calculateBookPrice(book, pricingConfig);
            const options: string[] = [];
            if (book.ocr) options.push('OCR');
            if (book.highRes) options.push('고해상도');
            if (book.tocCount > 0) options.push(`목차 ${book.tocCount}개`);
            if (book.binding) options.push('제본');

            return (
              <div
                key={book.id}
                className="rounded-lg overflow-hidden"
                style={{ border: '1px solid var(--border)' }}
              >
                {/* 책 헤더 */}
                <div
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: options.length > 0 ? '1px solid var(--border)' : 'none' }}
                >
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-ink)' }}>
                    책 {idx + 1}
                  </span>
                  <span className="font-semibold tabular-nums text-sm" style={{ color: 'var(--green)' }}>
                    {formatPrice(bookPrice)}
                  </span>
                </div>

                {/* 책 상세 */}
                <div className="px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                  <div style={{ color: 'var(--text-muted)' }}>쪽수</div>
                  <div className="text-right font-medium tabular-nums" style={{ color: 'var(--text-body)' }}>
                    {book.pages.toLocaleString()}쪽
                  </div>

                  {options.length > 0 && (
                    <>
                      <div style={{ color: 'var(--text-muted)' }}>옵션</div>
                      <div className="text-right" style={{ color: 'var(--text-body)' }}>
                        {options.join(' · ')}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 합계 행 */}
        <div
          className="mt-4 flex items-center justify-between px-4 py-3 rounded-lg"
          style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 8%, var(--bg-surface))', border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)' }}
        >
          <span className="font-semibold" style={{ color: 'var(--text-ink)' }}>총 합계</span>
          <span className="font-display text-2xl font-semibold tabular-nums" style={{ color: 'var(--accent)' }}>
            {formatPrice(totalPrice)}
          </span>
        </div>
      </Modal>
    </>
  );
}
