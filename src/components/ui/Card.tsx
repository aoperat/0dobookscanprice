import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  accent?: boolean;
}

export function Card({ title, icon, children, className = '', accent = false }: CardProps) {
  return (
    <div
      className={`surface overflow-hidden ${className}`}
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      {title && (
        <div
          className="px-5 py-4 flex items-center gap-2.5"
          style={{
            borderBottom: '1px solid var(--border)',
            backgroundColor: accent ? 'color-mix(in srgb, var(--accent-light) 40%, var(--bg-surface))' : 'var(--bg-subtle)',
          }}
        >
          {icon && (
            <span className="flex-shrink-0" style={{ color: 'var(--accent)' }}>
              {icon}
            </span>
          )}
          <h3
            className="font-display text-base font-semibold"
            style={{ color: 'var(--text-ink)' }}
          >
            {title}
          </h3>
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
