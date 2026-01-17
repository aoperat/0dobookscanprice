import type { Book } from '../../types/pricing';
import { BookRow } from './BookRow';

interface BookTableProps {
  books: Book[];
  onUpdate: (id: string, updates: Partial<Book>) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
}

export function BookTable({ books, onUpdate, onRemove, onAdd }: BookTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-sm">
            <th className="p-3 text-center font-semibold">쪽수</th>
            <th className="p-3 text-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                OCR
                <span className="text-gray-400 cursor-help" title="텍스트 검색 가능한 PDF">ⓘ</span>
              </div>
            </th>
            <th className="p-3 text-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                고해상도
                <span className="text-gray-400 cursor-help" title="400dpi 고화질 스캔">ⓘ</span>
              </div>
            </th>
            <th className="p-3 text-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                목차
                <span className="text-gray-400 cursor-help" title="목차 작성 개수">ⓘ</span>
              </div>
            </th>
            <th className="p-3 text-center font-semibold">제본</th>
            <th className="p-3 text-center font-semibold">가격</th>
            <th className="p-3 text-center font-semibold">삭제</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <BookRow
              key={book.id}
              book={book}
              index={index}
              onUpdate={onUpdate}
              onRemove={onRemove}
              canRemove={books.length > 1}
              onEnterPress={onAdd}
            />
          ))}
        </tbody>
      </table>

      <button
        onClick={onAdd}
        className="w-full mt-3 py-3 bg-green-600 hover:bg-green-700 text-white font-medium
                   rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        책 추가
      </button>
    </div>
  );
}
