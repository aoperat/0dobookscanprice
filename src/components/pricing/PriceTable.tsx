import { Card } from '../ui/Card';
import { scanPriceTableData } from '../../config/pricing';

export function PriceTable() {
  return (
    <Card
      title="기본 스캔 가격표"
      icon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)', backgroundColor: 'var(--bg-subtle)' }}>
              <th className="px-4 py-2.5 text-left text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
                페이지 범위
              </th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
                기본 가격
              </th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
                OCR
              </th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
                고해상도
              </th>
            </tr>
          </thead>
          <tbody>
            {scanPriceTableData.map((row, index) => (
              <tr key={index} className="ruled-row">
                <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-ink)' }}>
                  {row.range}
                </td>
                <td className="px-4 py-3 text-center font-semibold tabular-nums" style={{ color: 'var(--green)' }}>
                  {row.basePrice}
                </td>
                <td className="px-4 py-3 text-center tabular-nums" style={{ color: 'var(--blue)' }}>
                  {row.ocrPrice}
                </td>
                <td className="px-4 py-3 text-center tabular-nums" style={{ color: 'var(--blue)' }}>
                  {row.highResPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div
        className="mt-4 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: 'var(--blue)' }}
          />
          <span style={{ color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text-body)' }}>OCR</strong> — 텍스트 검색 가능한 PDF
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: 'var(--green)' }}
          />
          <span style={{ color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text-body)' }}>고해상도</strong> — 400dpi 고화질 스캔
          </span>
        </div>
      </div>
    </Card>
  );
}
