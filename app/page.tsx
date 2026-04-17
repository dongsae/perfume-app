'use client'

import { useState } from 'react'

interface Recommendation {
  name: string
  brand: string
  notes: string[]
  reason: string
}

interface RecommendResult {
  taste_summary: string
  recommendations: Recommendation[]
}

export default function Home() {
  const [input, setInput] = useState('')
  const [perfumes, setPerfumes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<RecommendResult | null>(null)
  const [error, setError] = useState('')

  const addPerfume = () => {
    const val = input.trim()
    if (!val || perfumes.includes(val) || perfumes.length >= 10) return
    setPerfumes([...perfumes, val])
    setInput('')
  }

  const removePerfume = (i: number) => {
    setPerfumes(perfumes.filter((_, idx) => idx !== i))
  }

  const handleRecommend = async () => {
    if (perfumes.length === 0) return
    setLoading(true)
    setResult(null)
    setError('')

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ perfumes }),
      })
      if (!res.ok) throw new Error('API 오류')
      const data = await res.json()
      setResult(data)
    } catch {
      setError('추천을 불러오는 중 오류가 발생했어요. 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <header style={{ padding: '4rem 0 3rem', textAlign: 'center', animation: 'fadeUp 0.8s ease both' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 48, height: 48, border: '1px solid var(--gold)', borderRadius: '50%', marginBottom: '1.5rem'
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2 C10 2 6 6 6 10 C6 13 7.5 15.5 10 17 C12.5 15.5 14 13 14 10 C14 6 10 2 10 2Z"
                stroke="#B8975A" strokeWidth="1" fill="none" />
              <circle cx="10" cy="10" r="2" fill="#B8975A" opacity="0.5" />
            </svg>
          </div>
          <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            Sillage
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 6vw, 3.2rem)',
            fontWeight: 300, lineHeight: 1.15, color: 'var(--ink)', marginBottom: '1rem'
          }}>
            당신의 향수 취향을<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>분석</em>해 드립니다
          </h1>
          <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--ink-muted)', lineHeight: 1.7, maxWidth: 420, margin: '0 auto' }}>
            좋아하는 향수를 입력하면 AI가 취향을 분석하고 아직 써보지 않은 향수를 추천해 드려요.
          </p>
        </header>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0 0 2.5rem', animation: 'fadeUp 0.8s 0.1s ease both' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ color: 'var(--gold)', fontSize: 16, opacity: 0.7 }}>✦</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {/* Input */}
        <div style={{ animation: 'fadeUp 0.8s 0.2s ease both' }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '1rem' }}>
            향수 입력
          </p>

          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addPerfume()}
              placeholder="예: Chanel No.5, 딥디크 올로즈, Jo Malone Peony..."
              style={{
                flex: 1, height: 48, padding: '0 16px',
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300,
                background: 'var(--card-bg)', border: '1px solid var(--border)',
                borderRadius: 4, color: 'var(--ink)', outline: 'none',
              }}
            />
            <button
              onClick={addPerfume}
              style={{
                height: 48, padding: '0 20px', fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, fontWeight: 500, background: 'var(--ink)', color: 'var(--cream)',
                border: 'none', borderRadius: 4, cursor: 'pointer', whiteSpace: 'nowrap',
              }}
            >
              추가
            </button>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, minHeight: 32, marginBottom: '0.75rem' }}>
            {perfumes.map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 14px', background: 'var(--card-bg)',
                border: '1px solid var(--border)', borderRadius: 99,
                fontSize: 13, color: 'var(--ink)', animation: 'tagIn 0.2s ease both',
              }}>
                <span>{p}</span>
                <span onClick={() => removePerfume(i)} style={{ cursor: 'pointer', color: 'var(--ink-light)', fontSize: 18, lineHeight: 1 }}>×</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 12, color: 'var(--ink-light)', fontWeight: 300, marginBottom: '2rem' }}>
            {perfumes.length === 0
              ? '최소 1개, 최대 10개까지 입력할 수 있어요.'
              : `${perfumes.length}개 입력됨 · 최대 ${10 - perfumes.length}개 더 추가 가능`}
          </p>

          <button
            onClick={handleRecommend}
            disabled={perfumes.length === 0 || loading}
            style={{
              width: '100%', height: 54,
              fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 400,
              letterSpacing: '0.05em',
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--gold) 100%)',
              color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer',
              opacity: perfumes.length === 0 || loading ? 0.4 : 1,
            }}
          >
            {loading ? '분석 중...' : '취향 분석하고 추천받기 →'}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '2rem 0', color: 'var(--ink-muted)', fontSize: 13, fontStyle: 'italic' }}>
            <div style={{
              width: 20, height: 20, border: '1.5px solid var(--border)',
              borderTopColor: 'var(--gold)', borderRadius: '50%',
              animation: 'spin 0.9s linear infinite', flexShrink: 0,
            }} />
            취향을 분석하고 있어요...
          </div>
        )}

        {/* Error */}
        {error && (
          <p style={{ fontSize: 13, color: '#9B3A3A', background: '#FDF0F0', border: '1px solid #F0C8C8', borderRadius: 4, padding: '12px 16px', marginTop: '1.5rem' }}>
            {error}
          </p>
        )}

        {/* Results */}
        {result && (
          <div style={{ marginTop: '3rem', animation: 'fadeUp 0.6s ease both' }}>
            {/* Taste summary */}
            <div style={{
              background: 'var(--ink)', color: 'var(--cream)', borderRadius: 8,
              padding: '1.75rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden',
            }}>
              <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                당신의 취향 프로필
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, fontStyle: 'italic', lineHeight: 1.75 }}>
                {result.taste_summary}
              </p>
            </div>

            {/* Recommendations */}
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '1.25rem' }}>
              추천 향수
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: '4rem' }}>
              {result.recommendations.map((r, i) => (
                <div key={i} style={{
                  background: 'var(--card-bg)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: '1.25rem 1.5rem',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 400, color: 'var(--ink)' }}>
                      {r.name}
                    </div>
                    <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginLeft: '1rem', flexShrink: 0 }}>
                      {r.brand}
                    </div>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: 12 }}>
                    {r.reason}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {r.notes.map((n, j) => (
                      <span key={j} style={{
                        fontSize: 11, padding: '3px 10px', borderRadius: 99,
                        background: 'var(--cream-dark)', color: 'var(--accent)',
                        border: '1px solid rgba(139,111,94,0.2)',
                      }}>
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
