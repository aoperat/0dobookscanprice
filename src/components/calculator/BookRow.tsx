import { useState } from 'react';
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
  const [tocEnabled, setTocEnabled] = useState(book.tocCount > 0);
  const [tocInput, setTocInput] = useState(String(book.tocCount || 1));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onEnterPress();
  };

  const handleTocToggle = (checked: boolean) => {
    setTocEnabled(checked);
    if (checked) {
      const val = parseInt(tocInput) || 1;
      setTocInput(String(val));
      onUpdate(book.id, { tocCount: val });
    } else {
      onUpdate(book.id, { tocCount: 0 });
    }
  };

  const handleTocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setTocInput(raw);
    const parsed = parseInt(raw);
    if (!isNaN(parsed) && parsed >= 1) {
      onUpdate(book.id, { tocCount: parsed });
    }
  };

  const handleTocBlur = () => {
    const parsed = parseInt(tocInput);
    const val = (!isNaN(parsed) && parsed >= 1) ? parsed : 1;
    setTocInput(String(val));
    onUpdate(book.id, { tocCount: val });
  };

  return (
    <tr className="ruled-row">
      {/* 쪽수 */}
      <td className="px-3 py-2.5">
        <input
          type="number"
          min="1"
          value={book.pages}
          onChange={(e) => onUpdate(book.id, { pages: parseInt(e.target.value) || 0 })}
          onFocus={(e) => e.target.select()}
          onKeyDown={handleKeyDown}
          className="input-base w-20 text-center"
        />
      </td>

      {/* OCR */}
      <td className="px-3 py-2.5 text-center">
        <input
          type="checkbox"
          checked={book.ocr}
          onChange={(e) => onUpdate(book.id, { ocr: e.target.checked })}
          className="checkbox-custom"
        />
      </td>

      {/* 고해상도 */}
      <td className="px-3 py-2.5 text-center">
        <input
          type="checkbox"
          checked={book.highRes}
          onChange={(e) => onUpdate(book.id, { highRes: e.target.checked })}
          className="checkbox-custom"
        />
      </td>

      {/* 목차 */}
      <td className="px-3 py-2.5">
        <div className="flex items-center justify-center gap-2">
          <input
            type="checkbox"
            checked={tocEnabled}
            onChange={(e) => handleTocToggle(e.target.checked)}
            className="checkbox-custom"
          />
          {tocEnabled && (
            <input
              type="number"
              min="1"
              value={tocInput}
              onChange={handleTocChange}
              onBlur={handleTocBlur}
              onFocus={(e) => e.target.select()}
              onKeyDown={handleKeyDown}
              className="input-base w-14 text-center animate-fade-slide"
            />
          )}
        </div>
      </td>

      {/* 제본 */}
      <td className="px-3 py-2.5 text-center">
        <input
          type="checkbox"
          checked={book.binding}
          onChange={(e) => onUpdate(book.id, { binding: e.target.checked })}
          className="checkbox-custom"
        />
      </td>

      {/* 가격 */}
      <td className="px-3 py-2.5 text-center">
        <span
          className="font-semibold tabular-nums text-sm"
          style={{ color: 'var(--green)' }}
        >
          {formatPrice(price)}
        </span>
      </td>

      {/* 삭제 */}
      <td className="px-3 py-2.5 text-center">
        <button
          onClick={() => onRemove(book.id)}
          disabled={!canRemove}
          className="w-7 h-7 flex items-center justify-center rounded-full mx-auto transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            backgroundColor: canRemove ? 'color-mix(in srgb, #DC2626 12%, var(--bg-surface))' : 'var(--bg-muted)',
            color: canRemove ? '#DC2626' : 'var(--text-faint)',
            border: '1px solid',
            borderColor: canRemove ? 'color-mix(in srgb, #DC2626 30%, transparent)' : 'var(--border)',
          }}
          aria-label="삭제"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </td>
    </tr>
  );
}
