export function FloatingButtons() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* 카카오톡 채팅 버튼 */}
      <a
        href="http://pf.kakao.com/_KGxevn/chat"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-kakao rounded-full flex items-center justify-center shadow-lg
                   hover:scale-110 transition-transform"
        aria-label="카카오톡 문의"
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#3C1E1E">
          <path d="M12 3C6.48 3 2 6.58 2 11c0 2.8 1.8 5.27 4.5 6.67-.15.54-.8 2.93-.84 3.13 0 0-.02.11.04.16.07.05.15.02.15.02.2-.03 2.36-1.55 3.33-2.18.9.13 1.83.2 2.82.2 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
        </svg>
      </a>

      {/* 맨 위로 버튼 */}
      <button
        onClick={scrollToTop}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center
                   shadow-lg text-white transition-colors"
        aria-label="맨 위로"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
