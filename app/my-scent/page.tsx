'use client'

import { useState, useEffect } from 'react'
import CompatibilityAnalyzer from '@/app/components/CompatibilityAnalyzer'

interface PerfumeNotes {
  name: string
  brand: string
  top_notes: string[]
  middle_notes: string[]
  base_notes: string[]
}

interface Recommendation {
  name: string
  brand: string
  top_notes: string[]
  middle_notes: string[]
  base_notes: string[]
  reason: string
}

interface RecommendLog {
  id: string
  date: string
  situation?: string | null
  inputPerfumes: string[]
  tasteSummary: string
  recommendations: Recommendation[]
}

const NOTE_LAYERS = [
  { key: 'top_notes' as const,    label: 'Top',    color: '#F9A8D4', bg: '#FFF1F8' },
  { key: 'middle_notes' as const, label: 'Middle', color: '#A78BFA', bg: '#F5F3FF' },
  { key: 'base_notes' as const,   label: 'Base',   color: '#6B7280', bg: '#F3F4F6' },
]

export default function MyScentPage() {
  const [myPerfumes, setMyPerfumes] = useState<string[]>([])
  const [dislikedPerfumes, setDislikedPerfumes] = useState<string[]>([])
  const [logs, setLogs] = useState<RecommendLog[]>([])
  const [notesMap, setNotesMap] = useState<Record<string, PerfumeNotes>>({})
  const [loadingNotes, setLoadingNotes] = useState(false)
  const [expandedPerfume, setExpandedPerfume] = useState<string | null>(null)

  useEffect(() => {
    try {
      setMyPerfumes(JSON.parse(localStorage.getItem('my_perfumes') ?? '[]'))
      setDislikedPerfumes(JSON.parse(localStorage.getItem('disliked_perfumes') ?? '[]'))
      setLogs(JSON.parse(localStorage.getItem('recommend_logs') ?? '[]'))
      // 캐시된 노트 불러오기
      const cached = JSON.parse(localStorage.getItem('perfume_notes_cache') ?? '{}')
      setNotesMap(cached)
    } catch {}
  }, [])

  const fetchNotes = async (perfumes: string[]) => {
    const uncached = perfumes.filter(p => !notesMap[p])
    if (uncached.length === 0) return

    setLoadingNotes(true)
    try {
      const res = await fetch('/api/perfume-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ perfumes: uncached }),
      })
      if (!res.ok) throw new Error()
      const { notes } = await res.json() as { notes: PerfumeNotes[] }

      const newMap = { ...notesMap }
      notes.forEach(n => { newMap[n.name] = n })
      setNotesMap(newMap)
      localStorage.setItem('perfume_notes_cache', JSON.stringify(newMap))
    } catch {
      // 노트 조회 실패는 조용히 처리
    } finally {
      setLoadingNotes(false)
    }
  }

  const removePerfume = (i: number) => {
    const next = myPerfumes.filter((_, idx) => idx !== i)
    setMyPerfumes(next)
    localStorage.setItem('my_perfumes', JSON.stringify(next))
  }

  const removeDisliked = (i: number) => {
    const next = dislikedPerfumes.filter((_, idx) => idx !== i)
    setDislikedPerfumes(next)
    localStorage.setItem('disliked_perfumes', JSON.stringify(next))
  }

  const removeLog = (id: string) => {
    const next = logs.filter(l => l.id !== id)
    setLogs(next)
    localStorage.setItem('recommend_logs', JSON.stringify(next))
  }

  const togglePerfume = (name: string) => {
    if (expandedPerfume === name) {
      setExpandedPerfume(null)
      return
    }
    setExpandedPerfume(name)
    fetchNotes([name])
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 20px' }}>

        <header style={{ padding: '28px 0 24px', animation: 'fadeUp 0.45s ease both' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)',
            letterSpacing: '-0.5px', marginBottom: 6 }}>내 향</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            저장된 향수 목록과 추천 기록을 확인해요.
          </p>
        </header>

        {/* ── 내 향수 컬렉션 ── */}
        <section style={{
          background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
          padding: '20px', marginBottom: 12, boxShadow: 'var(--shadow-sm)',
          animation: 'fadeUp 0.45s 0.06s ease both',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 14 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)',
              letterSpacing: '-0.2px' }}>내 향수 컬렉션</p>
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500 }}>
              {myPerfumes.length}개
            </span>
          </div>

          {myPerfumes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <p style={{ fontSize: 14, color: 'var(--text-tertiary)', lineHeight: 1.65 }}>
                아직 향수가 없어요.<br />홈에서 좋아하는 향수를 추가해보세요.
              </p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {myPerfumes.map((p, i) => {
                  const notes = notesMap[p]
                  const expanded = expandedPerfume === p
                  const isLoading = loadingNotes && expanded && !notes

                  return (
                    <div key={i} style={{
                      background: 'var(--bg)', borderRadius: 'var(--radius-sm)',
                      border: expanded ? '1.5px solid rgba(160,82,122,0.25)' : '1px solid var(--border)',
                      overflow: 'hidden', transition: 'border-color 0.2s',
                    }}>
                      {/* 향수 행 */}
                      <div style={{
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px', cursor: 'pointer',
                      }} onClick={() => togglePerfume(p)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: 'var(--primary)', opacity: 0.6, flexShrink: 0,
                          }} />
                          <span style={{ fontSize: 14, fontWeight: 600,
                            color: 'var(--text-primary)' }}>{p}</span>
                          {notes?.brand && (
                            <span style={{ fontSize: 12, color: 'var(--text-tertiary)',
                              fontWeight: 400 }}>{notes.brand}</span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{
                            fontSize: 11, color: expanded ? 'var(--primary)' : 'var(--text-tertiary)',
                            fontWeight: 600, transition: 'color 0.15s',
                          }}>
                            {isLoading ? '조회 중···' : expanded ? '접기' : '노트 보기'}
                          </span>
                          <span
                            onClick={e => { e.stopPropagation(); removePerfume(i) }}
                            style={{ fontSize: 18, color: 'var(--text-tertiary)',
                              cursor: 'pointer', lineHeight: 1, padding: '0 2px',
                              transition: 'color 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
                          >×</span>
                        </div>
                      </div>

                      {/* 노트 피라미드 (펼쳐진 경우) */}
                      {expanded && notes && (
                        <div style={{ padding: '0 14px 14px', display: 'flex',
                          flexDirection: 'column', gap: 6 }}>
                          {NOTE_LAYERS.map(layer => {
                            const layerNotes = notes[layer.key]
                            if (!layerNotes || layerNotes.length === 0) return null
                            return (
                              <div key={layer.key} style={{
                                background: layer.bg, borderRadius: 8,
                                padding: '9px 12px',
                              }}>
                                <span style={{
                                  fontSize: 10, fontWeight: 700, color: layer.color,
                                  letterSpacing: '0.06em', textTransform: 'uppercase',
                                  display: 'block', marginBottom: 6,
                                }}>{layer.label}</span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                  {layerNotes.map((n, j) => (
                                    <span key={j} style={{
                                      fontSize: 12, fontWeight: 500,
                                      padding: '3px 9px', borderRadius: 99,
                                      background: 'rgba(255,255,255,0.75)',
                                      color: 'var(--text-primary)',
                                      border: `1px solid ${layer.color}40`,
                                    }}>{n}</span>
                                  ))}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* 전체 노트 한번에 조회 버튼 */}
              {myPerfumes.some(p => !notesMap[p]) && (
                <button
                  onClick={() => fetchNotes(myPerfumes)}
                  disabled={loadingNotes}
                  style={{
                    width: '100%', marginTop: 12, padding: '10px 0',
                    fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                    background: 'none', border: '1.5px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', color: 'var(--primary)',
                    cursor: loadingNotes ? 'default' : 'pointer',
                    opacity: loadingNotes ? 0.5 : 1, transition: 'opacity 0.15s',
                  }}
                >
                  {loadingNotes ? '노트 조회 중···' : '전체 노트 한번에 조회하기'}
                </button>
              )}
            </>
          )}
        </section>

        {/* ── 싫어하는 향수 ── */}
        {dislikedPerfumes.length > 0 && (
          <section style={{
            background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
            padding: '20px', marginBottom: 12, boxShadow: 'var(--shadow-sm)',
            animation: 'fadeUp 0.45s 0.08s ease both',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: 14 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)',
                letterSpacing: '-0.2px' }}>싫어하는 향수</p>
              <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500 }}>
                {dislikedPerfumes.length}개 제외 중
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {dislikedPerfumes.map((p, i) => (
                <div key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '5px 12px', background: 'var(--red-subtle)',
                  border: '1px solid rgba(224,69,74,0.2)', borderRadius: 99,
                  fontSize: 13, fontWeight: 500, color: 'var(--red)',
                }}>
                  <span>{p}</span>
                  <span
                    onClick={() => removeDisliked(i)}
                    style={{ fontSize: 15, cursor: 'pointer', lineHeight: 1,
                      opacity: 1, transition: 'opacity 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.5'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >×</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 10, lineHeight: 1.5 }}>
              추천 시 이 향수와 비슷한 계열은 제외돼요
            </p>
          </section>
        )}

        {/* ── 궁합 분석 ── */}
        <CompatibilityAnalyzer
          myPerfumes={myPerfumes}
          dislikedPerfumes={dislikedPerfumes}
        />

        {/* ── 추천 기록 ── */}
        <section style={{ animation: 'fadeUp 0.45s 0.1s ease both' }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)',
            marginBottom: 10, letterSpacing: '-0.2px' }}>추천 기록</p>

          {logs.length === 0 ? (
            <div style={{
              background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
              padding: '32px 20px', textAlign: 'center', boxShadow: 'var(--shadow-sm)',
            }}>
              <p style={{ fontSize: 14, color: 'var(--text-tertiary)', lineHeight: 1.65 }}>
                아직 추천 기록이 없어요.<br />홈에서 취향을 분석해보세요.
              </p>
            </div>
          ) : (
            logs.map(log => (
              <div key={log.id} style={{
                background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
                padding: '18px 20px', marginBottom: 10, boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <span style={{ fontSize: 12, color: 'var(--text-tertiary)',
                      fontWeight: 500 }}>{log.date}</span>
                    {log.situation && (
                      <span style={{
                        marginLeft: 8, fontSize: 11, fontWeight: 700,
                        color: 'var(--primary)', background: 'var(--primary-subtle)',
                        padding: '2px 7px', borderRadius: 99,
                      }}>{log.situation}</span>
                    )}
                  </div>
                  <span onClick={() => removeLog(log.id)}
                    style={{ fontSize: 13, color: 'var(--text-tertiary)',
                      cursor: 'pointer', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
                  >삭제</span>
                </div>

                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65,
                  marginBottom: 12, padding: '10px 12px',
                  background: 'var(--primary-subtle)', borderRadius: 'var(--radius-sm)' }}>
                  {log.tasteSummary}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {log.recommendations.map((r, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center' }}>
                      <span style={{ fontSize: 14, fontWeight: 600,
                        color: 'var(--text-primary)' }}>{r.name}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                        {r.brand}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>

      </div>
    </div>
  )
}
