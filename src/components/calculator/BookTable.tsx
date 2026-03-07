import type { Book } from '../../types/pricing';
import { BookRow } from './BookRow';
import { BookCard } from './BookCard';

interface BookTableProps {
  books: Book[];
  onUpdate: (id: string, updates: Partial<Book>) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
}

const TH = ({ children = null, title }: { children?: React.ReactNode; title?: string }) => (
  <th
    className="px-3 py-2.5 text-center text-xs font-semibold tracking-wider uppercase"
    style={{ color: 'var(--text-muted)' }}
  >
    <span className="flex items-center justify-center gap-1">
      {children}
      {title && (
        <span
          className="cursor-help opacity-60 text-xs normal-case tracking-normal font-normal"
          title={title}
          style={{ color: 'var(--text-faint)' }}
        >
          ⓘ
        </span>
      )}
    </span>
  </th>
);

export function BookTable({ books, onUpdate, onRemove, onAdd }: BookTableProps) {
  return (
    <div>
      {/* ── 모바일: 카드 레이아웃 ─────────────────── */}
      <div className="flex flex-col gap-3 md:hidden">
        {books.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            index={index}
            onUpdate={onUpdate}
            onRemove={onRemove}
            canRemove={books.length > 1}
          />
        ))}

        {/* 모바일 책 추가 버튼 — 굵고 명확하게 */}
        <button
          onClick={onAdd}
          className="w-full py-4 flex items-center justify-center gap-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all active:scale-95"
          style={{
            backgroundColor: 'var(--accent)',
            color: '#fff',
            boxShadow: '0 4px 14px color-mix(in srgb, var(--accent) 35%, transparent)',
            border: 'none',
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          책 추가하기
        </button>
      </div>

      {/* ── 데스크톱: 테이블 레이아웃 ────────────── */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', backgroundColor: 'var(--bg-subtle)' }}>
                <TH>쪽수</TH>
                <TH title="텍스트 검색 가능한 PDF">OCR</TH>
                <TH title="400dpi 고화질 스캔">고해상도</TH>
                <TH title="목차 작성 개수">목차</TH>
                <TH>제본</TH>
                <TH>가격</TH>
                <TH></TH>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <BookRow
                  key={book.id}
                  book={book}
                  onUpdate={onUpdate}
                  onRemove={onRemove}
                  canRemove={books.length > 1}
                  onEnterPress={onAdd}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* 데스크톱 책 추가 버튼 */}
        <button
          onClick={onAdd}
          className="w-full mt-4 py-2.5 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all"
          style={{
            border: '1.5px dashed var(--border-strong)',
            color: 'var(--text-muted)',
            backgroundColor: 'transparent',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
            (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
            (e.currentTarget as HTMLElement).style.backgroundColor = 'color-mix(in srgb, var(--accent) 5%, transparent)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
            (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          책 추가
        </button>
      </div>
    </div>
  );
}
