import type { Book } from '../../types/pricing';
import { calculateBookPrice, formatPrice } from '../../utils/priceCalculator';
import { pricingConfig } from '../../config/pricing';

interface BookCardProps {
  book: Book;
  index: number;
  onUpdate: (id: string, updates: Partial<Book>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

interface StepperProps {
  value: number;
  min: number;
  onChange: (v: number) => void;
  label?: string;
}

function Stepper({ value, min, onChange, label }: StepperProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="stepper-btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label={`${label} 감소`}
        type="button"
      >
        −
      </button>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Math.max(min, parseInt(e.target.value) || 0))}
        className="input-base text-center tabular-nums"
        style={{ width: '60px', fontWeight: 500, fontSize: '15px' }}
        aria-label={label}
      />
      <button
        className="stepper-btn"
        onClick={() => onChange(value + 1)}
        aria-label={`${label} 증가`}
        type="button"
      >
        +
      </button>
    </div>
  );
}

interface ToggleRowProps {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

function ToggleRow({ label, desc, checked, onChange }: ToggleRowProps) {
  return (
    <label
      className="flex items-center justify-between py-2.5 cursor-pointer"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div>
        <span className="text-sm font-medium block" style={{ color: 'var(--text-ink)' }}>
          {label}
        </span>
        <span className="text-xs" style={{ color: 'var(--text-faint)' }}>
          {desc}
        </span>
      </div>
      <input
        type="checkbox"
        className="toggle ml-4"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

export function BookCard({ book, index, onUpdate, onRemove, canRemove }: BookCardProps) {
  const price = calculateBookPrice(book, pricingConfig);

  return (
    <div
      className="rounded-xl overflow-hidden animate-fade-slide"
      style={{
        border: '1px solid var(--border)',
        backgroundColor: 'var(--bg-surface)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* 카드 헤더 */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          backgroundColor: 'var(--bg-subtle)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          책 {index + 1}
        </span>
        <span
          className="font-display text-lg font-semibold tabular-nums animate-price"
          key={price}
          style={{ color: 'var(--accent)' }}
        >
          {formatPrice(price)}
        </span>
      </div>

      {/* 카드 본문 */}
      <div className="px-4 pt-3 pb-4">
        {/* 쪽수 스테퍼 */}
        <div className="mb-4">
          <p
            className="text-xs font-semibold tracking-wider uppercase mb-2"
            style={{ color: 'var(--text-muted)' }}
          >
            쪽수
          </p>
          <Stepper
            value={book.pages}
            min={1}
            onChange={(v) => onUpdate(book.id, { pages: v })}
            label="쪽수"
          />
        </div>

        {/* 옵션 토글 */}
        <div
          className="rounded-lg overflow-hidden mb-4"
          style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-subtle)' }}
        >
          <div className="px-3">
            <ToggleRow
              label="OCR"
              desc="텍스트 검색 가능한 PDF"
              checked={book.ocr}
              onChange={(v) => onUpdate(book.id, { ocr: v })}
            />
            <ToggleRow
              label="고해상도"
              desc="400dpi 고화질 스캔"
              checked={book.highRes}
              onChange={(v) => onUpdate(book.id, { highRes: v })}
            />
            <div
              className="flex items-center justify-between py-2.5 cursor-pointer"
              style={{ borderBottom: 'none' }}
            >
              <label
                className="flex items-center justify-between w-full cursor-pointer"
                htmlFor={`binding-${book.id}`}
              >
                <div>
                  <span className="text-sm font-medium block" style={{ color: 'var(--text-ink)' }}>
                    제본
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-faint)' }}>
                    책등 제본 처리
                  </span>
                </div>
                <input
                  id={`binding-${book.id}`}
                  type="checkbox"
                  className="toggle ml-4"
                  checked={book.binding}
                  onChange={(e) => onUpdate(book.id, { binding: e.target.checked })}
                />
              </label>
            </div>
          </div>
        </div>

        {/* 목차 스테퍼 */}
        <div className="mb-4">
          <p
            className="text-xs font-semibold tracking-wider uppercase mb-2"
            style={{ color: 'var(--text-muted)' }}
          >
            목차 수량
          </p>
          <Stepper
            value={book.tocCount}
            min={0}
            onChange={(v) => onUpdate(book.id, { tocCount: v })}
            label="목차 수량"
          />
        </div>

        {/* 삭제 버튼 */}
        {canRemove && (
          <button
            onClick={() => onRemove(book.id)}
            className="w-full py-2 rounded-lg text-xs font-medium transition-colors"
            style={{
              border: '1px solid color-mix(in srgb, #DC2626 30%, transparent)',
              color: '#DC2626',
              backgroundColor: 'color-mix(in srgb, #DC2626 6%, var(--bg-surface))',
            }}
          >
            이 책 삭제
          </button>
        )}
      </div>
    </div>
  );
}
