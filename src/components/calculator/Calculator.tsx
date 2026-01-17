import { useState, useMemo } from 'react';
import { useBooks } from '../../hooks/useBooks';
import { calculateTotalPrice, formatPrice, generateEstimateText } from '../../utils/priceCalculator';
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
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        }
      >
        {/* 결과 영역 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
            총 가격: {formatPrice(totalPrice)}
          </div>
          <Button
            variant="secondary"
            onClick={() => setIsEstimateOpen(true)}
          >
            📋 견적서 보기
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
        title="📋 견적서"
        footer={
          <>
            <Button variant="primary" onClick={handleCopyEstimate}>
              클립보드에 복사
            </Button>
            <Button variant="outline" onClick={() => setIsEstimateOpen(false)}>
              닫기
            </Button>
          </>
        }
      >
        <pre className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm font-mono">
          {estimateText}
        </pre>
      </Modal>
    </>
  );
}
