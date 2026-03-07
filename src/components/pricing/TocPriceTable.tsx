import { Card } from '../ui/Card';
import { tocPriceTableData } from '../../config/pricing';

export function TocPriceTable() {
  return (
    <Card
      title="목차 작성 가격표"
      icon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h8M4 18h8" />
        </svg>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)', backgroundColor: 'var(--bg-subtle)' }}>
              <th className="px-4 py-2.5 text-left text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
                목차 개수
              </th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
                가격
              </th>
            </tr>
          </thead>
          <tbody>
            {tocPriceTableData.map((row, index) => (
              <tr key={index} className="ruled-row">
                <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-ink)' }}>
                  {row.range}
                </td>
                <td className="px-4 py-3 text-center font-semibold tabular-nums" style={{ color: 'var(--green)' }}>
                  {row.regularPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs" style={{ color: 'var(--text-faint)' }}>
        * 목차 개수에 따라 구간별 단가가 적용됩니다.
      </p>
    </Card>
  );
}
