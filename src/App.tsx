import { Header } from './components/layout/Header';
import { FloatingButtons } from './components/layout/FloatingButtons';
import { Calculator } from './components/calculator/Calculator';
import { PriceTable } from './components/pricing/PriceTable';
import { TocPriceTable } from './components/pricing/TocPriceTable';
import { ServiceInfo } from './components/info/ServiceInfo';
import { SampleDownload } from './components/info/SampleDownload';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6 pb-24">
        {/* 계산기 - 모바일에서 가장 먼저 보임 */}
        <Calculator />

        {/* 가격표 */}
        <PriceTable />
        <TocPriceTable />

        {/* 서비스 안내 - 데스크톱에서 2열 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ServiceInfo />
          <SampleDownload />
        </div>
      </main>

      <FloatingButtons />
    </div>
  );
}

export default App;
