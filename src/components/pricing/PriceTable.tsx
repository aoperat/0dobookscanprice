import { Card } from '../ui/Card';
import { scanPriceTableData } from '../../config/pricing';

export function PriceTable() {
  return (
    <Card
      title="기본 가격표"
      icon={
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-3 text-left font-semibold">페이지 범위</th>
              <th className="p-3 text-center font-semibold">기본 가격</th>
              <th className="p-3 text-center font-semibold">OCR</th>
              <th className="p-3 text-center font-semibold">고해상도</th>
            </tr>
          </thead>
          <tbody>
            {scanPriceTableData.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-medium">{row.range}</td>
                <td className="p-3 text-center text-green-600 dark:text-green-400 font-semibold">
                  {row.basePrice}
                </td>
                <td className="p-3 text-center text-blue-600 dark:text-blue-400">
                  {row.ocrPrice}
                </td>
                <td className="p-3 text-center text-blue-600 dark:text-blue-400">
                  {row.highResPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <span className="font-medium">📄 OCR:</span>
          <span className="text-gray-600 dark:text-gray-400">텍스트 검색 가능한 PDF</span>
        </div>
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <span className="font-medium">🔍 고해상도:</span>
          <span className="text-gray-600 dark:text-gray-400">400dpi 고화질 스캔</span>
        </div>
      </div>
    </Card>
  );
}
