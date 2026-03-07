import { Card } from '../ui/Card';

const samples = [
  {
    name: '300dpi 샘플',
    file: '/sample/300dpi_sample.pdf',
    desc: '표준 해상도',
    color: 'var(--blue)',
  },
  {
    name: '400dpi 샘플',
    file: '/sample/400dpi_sample.pdf',
    desc: '고해상도',
    color: 'var(--green)',
  },
  {
    name: 'OCR 샘플',
    file: '/sample/ocr_sample.pdf',
    desc: '텍스트 검색 가능',
    color: 'var(--accent)',
  },
];

export function SampleDownload() {
  return (
    <Card
      title="샘플 파일"
      icon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      }
    >
      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
        다양한 해상도와 OCR 샘플을 확인해보세요.
      </p>

      <div className="flex flex-col gap-2">
        {samples.map((sample) => (
          <a
            key={sample.file}
            href={sample.file}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
            style={{
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-body)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = sample.color;
              (e.currentTarget as HTMLElement).style.backgroundColor = `color-mix(in srgb, ${sample.color} 6%, var(--bg-surface))`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-subtle)';
            }}
          >
            <span
              className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `color-mix(in srgb, ${sample.color} 15%, var(--bg-muted))`, color: sample.color }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium" style={{ color: 'var(--text-ink)' }}>{sample.name}</p>
              <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{sample.desc}</p>
            </div>
            <svg className="w-4 h-4 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-faint)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ))}
      </div>
    </Card>
  );
}
