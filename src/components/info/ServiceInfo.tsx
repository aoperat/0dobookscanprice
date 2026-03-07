import { Card } from '../ui/Card';

const features = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    label: 'OCR',
    desc: '검색 가능한 PDF 제공',
    color: 'var(--blue)',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
      </svg>
    ),
    label: '고해상도',
    desc: '400dpi 고화질 스캔',
    color: 'var(--green)',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    label: '전달 방식',
    desc: '이메일 · 클라우드 전달',
    color: 'var(--accent)',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: '수령',
    desc: '영도 지역 저녁 수령 가능',
    color: 'var(--text-muted)',
  },
];

export function ServiceInfo() {
  return (
    <Card
      title="북스캔 서비스"
      icon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      }
    >
      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
        책을 PDF로 만들어 공간을 절약하고, 언제든 편하게 보관하세요.
      </p>

      <ul className="space-y-2.5">
        {features.map((f) => (
          <li key={f.label} className="flex items-center gap-3">
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: `color-mix(in srgb, ${f.color} 12%, var(--bg-subtle))`,
                color: f.color,
                border: `1px solid color-mix(in srgb, ${f.color} 20%, transparent)`,
              }}
            >
              {f.icon}
            </span>
            <div>
              <span className="text-xs font-semibold" style={{ color: 'var(--text-ink)' }}>
                {f.label}
              </span>
              <span className="text-xs ml-1.5" style={{ color: 'var(--text-muted)' }}>
                {f.desc}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div
        className="mt-4 p-3 rounded-lg flex items-start gap-2"
        style={{
          backgroundColor: 'color-mix(in srgb, #EAB308 8%, var(--bg-subtle))',
          border: '1px solid color-mix(in srgb, #EAB308 25%, transparent)',
        }}
      >
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#CA8A04' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-xs font-medium" style={{ color: '#CA8A04' }}>
          가로폭 240mm 이상 스캔 불가
        </p>
      </div>
    </Card>
  );
}
