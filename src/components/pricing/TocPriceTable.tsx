import { Card } from '../ui/Card';
import { tocPriceTableData } from '../../config/pricing';

export function TocPriceTable() {
  return (
    <Card
      title="목차 작성 가격표"
      icon={
        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-yellow-50 dark:bg-yellow-900/30">
              <th className="p-3 text-left font-semibold">목차 개수</th>
              <th className="p-3 text-center font-semibold">가격</th>
            </tr>
          </thead>
          <tbody>
            {tocPriceTableData.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-medium">{row.range}</td>
                <td className="p-3 text-center text-green-600 dark:text-green-400 font-semibold">
                  {row.regularPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
