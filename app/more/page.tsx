'use client'

export default function MorePage() {
  const items = [
    {
      group: 'Sillage',
      rows: [
        { label: 'Sillage 소개', desc: '향수 취향 분석 앱', href: null },
        { label: '준비 중인 기능', desc: '로드맵 미리보기', href: '/explore' },
      ],
    },
    {
      group: '피드백',
      rows: [
        { label: '의견 보내기', desc: '개선 아이디어를 알려주세요', href: 'mailto:feedback@sillage.app' },
      ],
    },
    {
      group: '앱 정보',
      rows: [
        { label: '버전', desc: 'v0.1.0', href: null },
        { label: '만든 사람', desc: 'Sillage Team', href: null },
      ],
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 20px' }}>

        <header style={{ padding: '28px 0 24px', animation: 'fadeUp 0.45s ease both' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)',
            letterSpacing: '-0.5px', marginBottom: 6 }}>더보기</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            앱 정보 및 피드백을 확인해요.
          </p>
        </header>

        {items.map((group, gi) => (
          <section key={gi} style={{
            background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
            overflow: 'hidden', marginBottom: 12, boxShadow: 'var(--shadow-sm)',
            animation: 'fadeUp 0.45s ease both',
            animationDelay: `${gi * 0.07}s`,
          }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)',
              padding: '14px 20px 8px', letterSpacing: '0.05em',
              textTransform: 'uppercase' }}>
              {group.group}
            </p>

            {group.rows.map((row, ri) => {
              const Tag = row.href ? 'a' : 'div'
              return (
                <Tag
                  key={ri}
                  {...(row.href ? { href: row.href } : {})}
                  style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 20px',
                    borderTop: ri > 0 ? '1px solid var(--border)' : 'none',
                    textDecoration: 'none',
                    cursor: row.href ? 'pointer' : 'default',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                    if (row.href) e.currentTarget.style.background = 'var(--bg)'
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 500,
                    color: 'var(--text-primary)' }}>
                    {row.label}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
                      {row.desc}
                    </span>
                    {row.href && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4l4 4-4 4" stroke="var(--text-tertiary)"
                          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </Tag>
              )
            })}
          </section>
        ))}

        {/* 브랜드 워드마크 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 7, padding: '24px 0', opacity: 0.45 }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C10 2 6 6 6 10c0 3 1.5 5.5 4 7 2.5-1.5 4-4 4-7 0-4-4-8-4-8Z"
              stroke="var(--primary)" strokeWidth="1.6" fill="none"/>
          </svg>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
            Sillage
          </span>
        </div>

      </div>
    </div>
  )
}
