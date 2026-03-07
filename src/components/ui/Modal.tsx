import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // createPortal: transform이 걸린 조상 요소의 containing block을 탈출
  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* 백드롭 */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(28,25,23,0.65)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      />

      {/* 모달 패널 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: size === 'lg' ? '48rem' : '32rem',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100svh - 32px)',
          minHeight: size === 'lg' ? 'min(520px, 75svh)' : 'min(240px, 50svh)',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border)',
            flexShrink: 0,
          }}
        >
          <h2
            className="font-display text-lg font-semibold"
            style={{ color: 'var(--text-ink)', margin: 0 }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--bg-muted)',
              color: 'var(--text-muted)',
              flexShrink: 0,
            }}
            aria-label="닫기"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 본문 — 여기만 스크롤 */}
        <div
          style={{
            padding: '20px',
            overflowY: 'auto',
            flex: '1 1 0',
            minHeight: 0,
          }}
        >
          {children}
        </div>

        {/* 푸터 */}
        {footer && (
          <div
            style={{
              padding: '12px 20px',
              borderTop: '1px solid var(--border)',
              backgroundColor: 'var(--bg-subtle)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px',
              flexShrink: 0,
              borderRadius: '0 0 14px 14px',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
