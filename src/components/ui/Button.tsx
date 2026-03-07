import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  style,
  ...props
}: ButtonProps) {
  const base: React.CSSProperties = {
    borderRadius: '8px',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    transition: 'all 0.18s',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    border: '1px solid transparent',
    letterSpacing: '0.01em',
  };

  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: '5px 12px', fontSize: '13px' },
    md: { padding: '8px 18px', fontSize: '14px' },
    lg: { padding: '11px 24px', fontSize: '15px' },
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--accent)',
      color: '#FFFFFF',
      borderColor: 'var(--accent-dim)',
    },
    secondary: {
      backgroundColor: 'var(--bg-muted)',
      color: 'var(--text-body)',
      borderColor: 'var(--border)',
    },
    success: {
      backgroundColor: 'var(--green)',
      color: '#FFFFFF',
      borderColor: 'var(--green)',
    },
    danger: {
      backgroundColor: '#DC2626',
      color: '#FFFFFF',
      borderColor: '#B91C1C',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--text-body)',
      borderColor: 'var(--border-strong)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-muted)',
      borderColor: 'transparent',
    },
  };

  return (
    <button
      className={`disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
