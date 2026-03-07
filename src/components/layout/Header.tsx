import { useTheme } from '../../hooks/useTheme';

export function Header() {
  const { isDark, toggle } = useTheme();

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-page) 85%, transparent)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Top rule */}
        <div className="h-px w-full" style={{ backgroundColor: 'var(--accent)', opacity: 0.6 }} />

        <div className="flex items-center justify-between py-3">
          {/* Logotype */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              B
            </div>
            <div>
              <span
                className="font-display text-lg leading-none"
                style={{ color: 'var(--text-ink)' }}
              >
                북스캔
              </span>
              <span
                className="ml-1.5 text-xs tracking-widest uppercase"
                style={{ color: 'var(--text-muted)' }}
              >
                Studio
              </span>
            </div>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
            style={{
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-muted)',
              color: 'var(--text-muted)',
            }}
            aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
          >
            {isDark ? (
              <>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
                Light
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                Dark
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
