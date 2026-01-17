import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function SampleDownload() {
  const samples = [
    { name: '300dpi 샘플', file: '/sample/300dpi_sample.pdf', color: 'primary' as const },
    { name: '400dpi 샘플', file: '/sample/400dpi_sample.pdf', color: 'success' as const },
    { name: 'OCR 샘플', file: '/sample/ocr_sample.pdf', color: 'secondary' as const },
  ];

  return (
    <Card
      title="샘플 파일"
      icon={
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      }
    >
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        다양한 해상도와 OCR 샘플을 확인해보세요.
      </p>

      <div className="flex flex-col gap-2">
        {samples.map((sample) => (
          <a
            key={sample.file}
            href={sample.file}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant={sample.color} className="w-full">
              📥 {sample.name}
            </Button>
          </a>
        ))}
      </div>
    </Card>
  );
}
