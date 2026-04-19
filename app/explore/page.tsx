export default function ExplorePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 20px' }}>

        <header style={{ padding: '28px 0 24px', animation: 'fadeUp 0.45s ease both' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)',
            letterSpacing: '-0.5px', marginBottom: 6 }}>탐색</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            더 다양한 방식으로 향수를 발견해요.
          </p>
        </header>

        {/* Coming Soon 카드들 */}
        {[
          {
            icon: '🌤️',
            title: '상황별 추천',
            desc: '오늘의 날씨, 장소, 기분에 딱 맞는 향수를 추천해드려요.',
            tag: '곧 출시',
          },
          {
            icon: '🔍',
            title: '스마트 검색',
            desc: '"비 온 뒤 숲속", "살냄새" 같은 말로도 향수를 찾을 수 있어요.',
            tag: '곧 출시',
          },
          {
            icon: '💸',
            title: 'Dupe 찾기',
            desc: '고가의 니치 향수와 비슷한 합리적인 향수를 찾아드려요.',
            tag: '곧 출시',
          },
          {
            icon: '🧴',
            title: '레이어링 가이드',
            desc: '두 향수를 섞으면 어떤 향이 될지 AI가 예측해드려요.',
            tag: '곧 출시',
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              marginBottom: 10,
              boxShadow: 'var(--shadow-sm)',
              opacity: 0.72,
              animation: 'fadeUp 0.45s ease both',
              animationDelay: `${i * 0.06}s`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)',
                  letterSpacing: '-0.3px' }}>{item.title}</p>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 700, color: 'var(--primary)',
                background: 'var(--primary-subtle)', padding: '3px 8px',
                borderRadius: 99, letterSpacing: '0.02em', whiteSpace: 'nowrap',
              }}>
                {item.tag}
              </span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65,
              paddingLeft: 32 }}>
              {item.desc}
            </p>
          </div>
        ))}

        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', textAlign: 'center',
          marginTop: 20, lineHeight: 1.7 }}>
          순서대로 업데이트될 예정이에요.
        </p>

      </div>
    </div>
  )
}
