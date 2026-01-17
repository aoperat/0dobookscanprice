import { Card } from '../ui/Card';

export function ServiceInfo() {
  return (
    <Card
      title="북스캔 서비스"
      icon={
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      }
    >
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        책을 PDF로 만들어 공간을 절약하고, 언제든 편하게 보관하세요!
      </p>

      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <span className="text-blue-500">📄</span>
          <span>OCR (검색 가능한 PDF 제공)</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-green-500">🔍</span>
          <span>고해상도(400dpi) 옵션</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-purple-500">☁️</span>
          <span>이메일 · 클라우드 전달</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-orange-500">🕐</span>
          <span>영도 지역 저녁 수령 가능</span>
        </li>
      </ul>

      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
        <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
          ⚠️ 주의: 가로폭 240mm 이상 스캔 불가
        </p>
      </div>
    </Card>
  );
}
