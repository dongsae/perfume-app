'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  {
    href: '/',
    label: '홈',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L4 9.5V21h5.5v-5.5h5V21H20V9.5L12 3Z"
          stroke={active ? 'var(--primary)' : 'var(--text-tertiary)'}
          strokeWidth="1.8" strokeLinejoin="round"
          fill={active ? 'var(--primary-subtle)' : 'none'} />
      </svg>
    ),
  },
  {
    href: '/explore',
    label: '탐색',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7"
          stroke={active ? 'var(--primary)' : 'var(--text-tertiary)'}
          strokeWidth="1.8" />
        <path d="M20 20L17 17"
          stroke={active ? 'var(--primary)' : 'var(--text-tertiary)'}
          strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/my-scent',
    label: '내 향',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 4C12 4 8 8 8 12c0 3 1.5 5.5 4 7 2.5-1.5 4-4 4-7 0-4-4-8-4-8Z"
          stroke={active ? 'var(--primary)' : 'var(--text-tertiary)'}
          strokeWidth="1.8" strokeLinejoin="round"
          fill={active ? 'var(--primary-subtle)' : 'none'} />
        <circle cx="12" cy="12" r="2"
          fill={active ? 'var(--primary)' : 'var(--text-tertiary)'} opacity="0.7" />
      </svg>
    ),
  },
  {
    href: '/more',
    label: '더보기',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        {[6, 12, 18].map(cx => (
          <circle key={cx} cx={cx} cy="12" r="1.6"
            fill={active ? 'var(--primary)' : 'var(--text-tertiary)'} />
        ))}
      </svg>
    ),
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <>
      {/* 하단 공간 확보 */}
      <div style={{ height: 72 }} />

      {/* 탭바 */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        padding: '0 0 env(safe-area-inset-bottom)',
      }}>
        {tabs.map(tab => {
          const active = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                padding: '10px 0 8px',
                textDecoration: 'none',
                transition: 'opacity 0.15s',
              }}
            >
              {tab.icon(active)}
              <span style={{
                fontSize: 10,
                fontWeight: active ? 700 : 500,
                color: active ? 'var(--primary)' : 'var(--text-tertiary)',
                letterSpacing: '-0.1px',
                transition: 'color 0.15s',
              }}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
