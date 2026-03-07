import { Header } from './components/layout/Header';
import { FloatingButtons } from './components/layout/FloatingButtons';
import { Calculator } from './components/calculator/Calculator';
import { PriceTable } from './components/pricing/PriceTable';
import { TocPriceTable } from './components/pricing/TocPriceTable';
import { ServiceInfo } from './components/info/ServiceInfo';
import { SampleDownload } from './components/info/SampleDownload';

function App() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'var(--bg-page)' }}>
      <Header />

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl space-y-6 pb-28">
        {/* Hero tagline */}
        <div className="animate-fade-slide stagger-1 text-center pt-2 pb-1">
          <p className="text-sm tracking-widest uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.18em' }}>
            Book Scanning Service
          </p>
          <h2 className="font-display text-3xl sm:text-4xl mt-1" style={{ color: 'var(--text-ink)' }}>
            가격 계산기
          </h2>
          <div className="mx-auto mt-3 w-16 h-px" style={{ backgroundColor: 'var(--accent)' }} />
        </div>

        {/* 계산기 */}
        <div className="animate-fade-slide stagger-2">
          <Calculator />
        </div>

        {/* 가격표 */}
        <div className="animate-fade-slide stagger-3">
          <PriceTable />
        </div>
        <div className="animate-fade-slide stagger-4">
          <TocPriceTable />
        </div>

        {/* 서비스 안내 */}
        <div className="animate-fade-slide stagger-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ServiceInfo />
          <SampleDownload />
        </div>
      </main>

      <FloatingButtons />
    </div>
  );
}

export default App;
