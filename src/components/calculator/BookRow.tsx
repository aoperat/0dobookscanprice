import type { Book } from '../../types/pricing';
import { calculateBookPrice, formatPrice } from '../../utils/priceCalculator';
import { pricingConfig } from '../../config/pricing';

interface BookRowProps {
  book: Book;
  onUpdate: (id: string, updates: Partial<Book>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  onEnterPress: () => void;
}

export function BookRow({ book, onUpdate, onRemove, canRemove, onEnterPress }: BookRowProps) {
  const price = calculateBookPrice(book, pricingConfig);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onEnterPress();
    }
  };

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      {/* 쪽수 */}
      <td className="p-2">
        <input
          type="number"
          min="1"
          value={book.pages}
          onChange={(e) => onUpdate(book.id, { pages: parseInt(e.target.value) || 0 })}
          onKeyDown={handleKeyDown}
          className="w-20 px-2 py-1.5 text-center border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </td>

      {/* OCR */}
      <td className="p-2 text-center">
        <input
          type="checkbox"
          checked={book.ocr}
          onChange={(e) => onUpdate(book.id, { ocr: e.target.checked })}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
        />
      </td>

      {/* 고해상도 */}
      <td className="p-2 text-center">
        <input
          type="checkbox"
          checked={book.highRes}
          onChange={(e) => onUpdate(book.id, { highRes: e.target.checked })}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
        />
      </td>

      {/* 목차 */}
      <td className="p-2">
        <input
          type="number"
          min="0"
          value={book.tocCount}
          onChange={(e) => onUpdate(book.id, { tocCount: parseInt(e.target.value) || 0 })}
          className="w-16 px-2 py-1.5 text-center border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </td>

      {/* 제본 */}
      <td className="p-2 text-center">
        <input
          type="checkbox"
          checked={book.binding}
          onChange={(e) => onUpdate(book.id, { binding: e.target.checked })}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
        />
      </td>

      {/* 가격 */}
      <td className="p-2 text-center font-semibold text-green-600 dark:text-green-400">
        {formatPrice(price)}
      </td>

      {/* 삭제 */}
      <td className="p-2 text-center">
        <button
          onClick={() => onRemove(book.id)}
          disabled={!canRemove}
          className="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 disabled:bg-gray-400
                     text-white rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          삭제
        </button>
      </td>
    </tr>
  );
}
