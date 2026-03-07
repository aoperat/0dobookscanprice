export function FloatingButtons() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-5 flex flex-col gap-3 z-50">
      {/* 카카오톡 채팅 버튼 */}
      <a
        href="http://pf.kakao.com/_KGxevn/chat"
        target="_blank"
        rel="noopener noreferrer"
        className="group w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{
          backgroundColor: '#FFEB00',
          boxShadow: '0 4px 14px rgba(255,235,0,0.35)',
        }}
        aria-label="카카오톡 문의"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#3C1E1E">
          <path d="M12 3C6.48 3 2 6.58 2 11c0 2.8 1.8 5.27 4.5 6.67-.15.54-.8 2.93-.84 3.13 0 0-.02.11.04.16.07.05.15.02.15.02.2-.03 2.36-1.55 3.33-2.18.9.13 1.83.2 2.82.2 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
        </svg>
      </a>

      {/* 맨 위로 버튼 */}
      <button
        onClick={scrollToTop}
        className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        style={{
          backgroundColor: 'var(--accent)',
          boxShadow: '0 4px 14px color-mix(in srgb, var(--accent) 40%, transparent)',
        }}
        aria-label="맨 위로"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
