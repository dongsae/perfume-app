'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import PerfumeInput from './components/PerfumeInput'

interface Recommendation {
  name: string
  brand: string
  top_notes: string[]
  middle_notes: string[]
  base_notes: string[]
  reason: string
}

interface RecommendResult {
  taste_summary: string
  recommendations: Recommendation[]
}

const SITUATIONS = [
  { label: '일상', emoji: '☀️' },
  { label: '소개팅', emoji: '💕' },
  { label: '비즈니스', emoji: '💼' },
  { label: '특별한 날', emoji: '✨' },
  { label: '운동', emoji: '🏃' },
  { label: '여행', emoji: '✈️' },
]

const NOTE_LAYERS = [
  { key: 'top_notes' as const,    label: 'Top',    sublabel: '탑노트',    color: '#F9A8D4', bg: '#FFF1F8' },
  { key: 'middle_notes' as const, label: 'Middle', sublabel: '미들노트',  color: '#A78BFA', bg: '#F5F3FF' },
  { key: 'base_notes' as const,   label: 'Base',   sublabel: '베이스노트', color: '#6B7280', bg: '#F3F4F6' },
]

export default function Home() {
  const router = useRouter()
  const [perfumes, setPerfumes] = useState<string[]>([])
  const [dislikedPerfumes, setDislikedPerfumes] = useState<string[]>([])
  const [situation, setSituation] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<RecommendResult | null>(null)
  const [error, setError] = useState('')
  const isFirstRender = useRef(true)
  const isFirstRenderDisliked = useRef(true)

  // 온보딩 체크: 최초 방문이면 /onboarding으로 이동
  useEffect(() => {
    try {
      const done = localStorage.getItem('onboarding_complete')
      const saved = JSON.parse(localStorage.getItem('my_perfumes') ?? '[]')
      if (!done && saved.length === 0) {
        router.replace('/onboarding')
      }
    } catch {}
  }, [router])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('my_perfumes') ?? '[]')
      if (saved.length > 0) setPerfumes(saved)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('disliked_perfumes') ?? '[]')
      if (saved.length > 0) setDislikedPerfumes(saved)
    } catch {}
  }, [])

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return }
    localStorage.setItem('my_perfumes', JSON.stringify(perfumes))
  }, [perfumes])

  useEffect(() => {
    if (isFirstRenderDisliked.current) { isFirstRenderDisliked.current = false; return }
    localStorage.setItem('disliked_perfumes', JSON.stringify(dislikedPerfumes))
  }, [dislikedPerfumes])

  const removePerfume = (i: number) =>
    setPerfumes(perfumes.filter((_, idx) => idx !== i))

  const removeDisliked = (i: number) =>
    setDislikedPerfumes(dislikedPerfumes.filter((_, idx) => idx !== i))

  const handleRecommend = async () => {
    if (perfumes.length === 0) return
    setLoading(true); setResult(null); setError('')
    try {
      const likedFamilies   = JSON.parse(localStorage.getItem('liked_families')    ?? '[]')
      const dislikedFamilies = JSON.parse(localStorage.getItem('disliked_families') ?? '[]')
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          perfumes,
          dislikedPerfumes:  dislikedPerfumes.length  > 0 ? dislikedPerfumes  : undefined,
          likedFamilies:     likedFamilies.length     > 0 ? likedFamilies     : undefined,
          dislikedFamilies:  dislikedFamilies.length  > 0 ? dislikedFamilies  : undefined,
          situation,
        }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setResult(data)
      try {
        const prev = JSON.parse(localStorage.getItem('recommend_logs') ?? '[]')
        const log = {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          inputPerfumes: perfumes,
          situation,
          tasteSummary: data.taste_summary,
          recommendations: data.recommendations,
        }
        localStorage.setItem('recommend_logs', JSON.stringify([log, ...prev].slice(0, 20)))
      } catch {}
    } catch {
      setError('추천을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 20px' }}>

        {/* ── 헤더 ── */}
        <header style={{ padding: '28px 0 24px', animation: 'fadeUp 0.45s ease both' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)',
            letterSpacing: '-0.5px', marginBottom: 6 }}>취향 분석</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            좋아하는 향수를 입력하면 AI가 취향을 파악하고<br />딱 맞는 향수를 추천해 드려요.
          </p>
        </header>

        {/* ── 향수 입력 카드 ── */}
        <div style={{
          background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
          padding: '20px', marginBottom: 12, boxShadow: 'var(--shadow-sm)',
          animation: 'fadeUp 0.45s 0.06s ease both',
        }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)',
            marginBottom: 12 }}>내가 좋아하는 향수</p>

          <div style={{ marginBottom: 14 }}>
            <PerfumeInput
              onAdd={p => { if (!perfumes.includes(p)) setPerfumes(prev => [...prev, p]) }}
              placeholder="향수명 또는 브랜드 검색..."
              variant="liked"
              excludes={perfumes}
              maxReached={perfumes.length >= 10}
            />
          </div>

          {perfumes.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 12 }}>
              {perfumes.map((p, i) => (
                <div key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '5px 12px', background: 'var(--primary-subtle)',
                  border: '1px solid rgba(160,82,122,0.2)', borderRadius: 99,
                  fontSize: 13, fontWeight: 500, color: 'var(--primary)',
                  animation: 'tagIn 0.18s ease both',
                }}>
                  <span>{p}</span>
                  <span onClick={() => removePerfume(i)}
                    style={{ fontSize: 15, cursor: 'pointer', lineHeight: 1, opacity: 1, transition: 'opacity 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.5'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >×</span>
                </div>
              ))}
            </div>
          )}

          <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
            {perfumes.length === 0
              ? '최소 1개, 최대 10개까지 추가할 수 있어요'
              : `${perfumes.length}개 추가됨 · ${10 - perfumes.length}개 더 추가 가능`}
          </p>
        </div>

        {/* ── 싫어하는 향수 카드 ── */}
        <div style={{
          background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
          padding: '20px', marginBottom: 12, boxShadow: 'var(--shadow-sm)',
          animation: 'fadeUp 0.45s 0.08s ease both',
        }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)',
            marginBottom: 4 }}>내가 싫어하는 향수 <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)' }}>선택</span></p>
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12, lineHeight: 1.5 }}>
            비슷한 계열을 추천에서 제외할게요
          </p>

          <div style={{ marginBottom: 14 }}>
            <PerfumeInput
              onAdd={p => { if (!dislikedPerfumes.includes(p)) setDislikedPerfumes(prev => [...prev, p]) }}
              placeholder="향수명 또는 브랜드 검색..."
              variant="disliked"
              excludes={dislikedPerfumes}
              maxReached={dislikedPerfumes.length >= 10}
            />
          </div>

          {dislikedPerfumes.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 12 }}>
              {dislikedPerfumes.map((p, i) => (
                <div key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '5px 12px', background: 'var(--red-subtle)',
                  border: '1px solid rgba(224,69,74,0.2)', borderRadius: 99,
                  fontSize: 13, fontWeight: 500, color: 'var(--red)',
                  animation: 'tagIn 0.18s ease both',
                }}>
                  <span>{p}</span>
                  <span onClick={() => removeDisliked(i)}
                    style={{ fontSize: 15, cursor: 'pointer', lineHeight: 1, opacity: 1, transition: 'opacity 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.5'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >×</span>
                </div>
              ))}
            </div>
          )}

          <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
            {dislikedPerfumes.length === 0
              ? '입력하지 않아도 돼요'
              : `${dislikedPerfumes.length}개 제외됨`}
          </p>
        </div>

        {/* ── 상황 선택 카드 ── */}
        <div style={{
          background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
          padding: '20px', marginBottom: 12, boxShadow: 'var(--shadow-sm)',
          animation: 'fadeUp 0.45s 0.1s ease both',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}>
              오늘 어떤 자리예요?
            </p>
            {situation && (
              <button
                onClick={() => setSituation(null)}
                style={{ fontSize: 12, color: 'var(--text-tertiary)', background: 'none',
                  border: 'none', cursor: 'pointer', padding: 0 }}>
                초기화
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SITUATIONS.map(s => {
              const active = situation === s.label
              return (
                <button
                  key={s.label}
                  onClick={() => setSituation(active ? null : s.label)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '7px 14px', borderRadius: 99, fontSize: 13, fontWeight: 600,
                    fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.15s',
                    background: active ? 'var(--primary)' : 'var(--bg)',
                    color: active ? '#fff' : 'var(--text-secondary)',
                    border: active ? '1.5px solid var(--primary)' : '1.5px solid var(--border)',
                  }}
                >
                  <span>{s.emoji}</span>
                  <span>{s.label}</span>
                </button>
              )
            })}
          </div>

          <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 10 }}>
            {situation ? `${situation} 자리에 어울리는 향수를 추천해드려요` : '선택하지 않으면 전반적인 취향으로 추천해드려요'}
          </p>
        </div>

        {/* ── 에러 ── */}
        {error && (
          <div style={{
            background: 'var(--red-subtle)', border: '1px solid #FFC9CD',
            borderRadius: 'var(--radius-sm)', padding: '12px 14px',
            fontSize: 14, color: 'var(--red)', marginBottom: 12,
            animation: 'fadeUp 0.3s ease both',
          }}>{error}</div>
        )}

        {/* ── CTA ── */}
        <button
          onClick={handleRecommend}
          disabled={perfumes.length === 0 || loading}
          style={{
            width: '100%', height: 54, fontSize: 16, fontWeight: 700,
            fontFamily: 'inherit', letterSpacing: '-0.2px',
            background: loading
              ? 'linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 50%, var(--primary) 100%)'
              : 'var(--primary)',
            backgroundSize: loading ? '200% auto' : '100%',
            animation: loading ? 'shimmer 1.6s linear infinite' : 'none',
            color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
            cursor: perfumes.length === 0 || loading ? 'default' : 'pointer',
            opacity: perfumes.length === 0 ? 0.38 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {loading
            ? '취향 분석 중···'
            : situation
              ? `${situation} 향수 추천받기`
              : '취향 분석하고 추천받기'}
        </button>

        {/* ── 결과 ── */}
        {result && (
          <div style={{ marginTop: 32, animation: 'fadeUp 0.4s ease both' }}>

            {/* 취향 프로필 */}
            <div style={{
              background: 'var(--surface)',
              border: '1.5px solid rgba(160,82,122,0.18)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px', marginBottom: 12, boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)',
                  letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  나의 취향 프로필{situation ? ` · ${situation}` : ''}
                </span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-primary)' }}>
                {result.taste_summary}
              </p>
            </div>

            {/* 추천 향수 */}
            <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)',
              marginBottom: 10, letterSpacing: '-0.3px' }}>추천 향수</p>

            {result.recommendations.map((r, i) => (
              <div
                key={i}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                  e.currentTarget.style.transform = 'none'
                }}
                style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)', padding: '18px 20px',
                  marginBottom: 10, boxShadow: 'var(--shadow-sm)',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                  animation: 'fadeUp 0.4s ease both',
                  animationDelay: `${i * 0.07}s`,
                }}
              >
                {/* 인덱스 + 브랜드 */}
                <div style={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)',
                    letterSpacing: '0.08em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)' }}>
                    {r.brand}
                  </span>
                </div>

                <div style={{ height: 1, background: 'var(--border)', marginBottom: 12 }} />

                {/* 향수명 */}
                <p style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)',
                  marginBottom: 8, letterSpacing: '-0.4px', lineHeight: 1.25 }}>
                  {r.name}
                </p>

                {/* 추천 이유 */}
                <p style={{ fontSize: 14, color: 'var(--text-secondary)',
                  lineHeight: 1.7, marginBottom: 16 }}>
                  {r.reason}
                </p>

                {/* ── 노트 피라미드 ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {NOTE_LAYERS.map(layer => {
                    const notes = r[layer.key]
                    if (!notes || notes.length === 0) return null
                    return (
                      <div key={layer.key} style={{
                        background: layer.bg, borderRadius: 8, padding: '10px 12px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center',
                          gap: 6, marginBottom: 7 }}>
                          <span style={{
                            fontSize: 10, fontWeight: 700, color: layer.color,
                            letterSpacing: '0.06em', textTransform: 'uppercase',
                          }}>{layer.label}</span>
                          <span style={{ fontSize: 10, color: 'var(--text-tertiary)',
                            fontWeight: 500 }}>{layer.sublabel}</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                          {notes.map((n, j) => (
                            <span key={j} style={{
                              fontSize: 12, fontWeight: 500,
                              padding: '3px 9px', borderRadius: 99,
                              background: 'rgba(255,255,255,0.7)',
                              color: 'var(--text-primary)',
                              border: `1px solid ${layer.color}40`,
                            }}>{n}</span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
