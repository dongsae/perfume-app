'use client'

import { useState } from 'react'
import PerfumeInput from './PerfumeInput'
import type { CompatibilityResult, CompatibilityDetail } from '@/app/api/compatibility/route'

interface Props {
  myPerfumes: string[]
  dislikedPerfumes: string[]
}

const VERDICT_CONFIG = {
  great:   { label: '컬렉션과 잘 어울려요',    color: 'var(--primary)',   bg: 'var(--primary-subtle)' },
  good:    { label: '무난하게 어울려요',        color: '#B8860B',          bg: '#FFF8E1' },
  neutral: { label: '취향이 갈릴 수 있어요',    color: 'var(--text-secondary)', bg: 'var(--bg)' },
  overlap: { label: '이미 비슷한 향이 있어요',  color: 'var(--red)',       bg: 'var(--red-subtle)' },
}

const RELATION_CONFIG = {
  complement: { label: '보완 관계', color: 'var(--primary)', bg: 'var(--primary-subtle)' },
  similar:    { label: '유사 계열', color: '#B8860B',        bg: '#FFF8E1' },
  contrast:   { label: '대조 계열', color: '#6B7280',        bg: '#F3F4F6' },
}

export default function CompatibilityAnalyzer({ myPerfumes, dislikedPerfumes }: Props) {
  const [target, setTarget] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CompatibilityResult | null>(null)
  const [error, setError] = useState('')

  const isInDisliked = dislikedPerfumes.includes(target)

  const analyze = async () => {
    if (!target.trim() || loading) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetPerfume: target,
          myPerfumes,
          dislikedPerfumes: dislikedPerfumes.length > 0 ? dislikedPerfumes : undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? '오류가 발생했어요.')
      setResult(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '분석 중 오류가 발생했어요.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setTarget('')
    setResult(null)
    setError('')
  }

  // 빈 컬렉션
  if (myPerfumes.length === 0) {
    return (
      <section style={{
        background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
        padding: '20px', marginBottom: 12, boxShadow: 'var(--shadow-sm)',
      }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)',
          marginBottom: 14, letterSpacing: '-0.2px' }}>궁합 분석</p>
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <p style={{ fontSize: 14, color: 'var(--text-tertiary)', lineHeight: 1.65 }}>
            컬렉션에 향수를 먼저 추가하면<br />
            구매 예정 향수와의 궁합을 확인할 수 있어요.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section style={{
      background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
      padding: '20px', marginBottom: 12, boxShadow: 'var(--shadow-sm)',
      animation: 'fadeUp 0.45s 0.12s ease both',
    }}>
      <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)',
        marginBottom: 4, letterSpacing: '-0.2px' }}>궁합 분석</p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 14, lineHeight: 1.5 }}>
        사고 싶은 향수가 내 컬렉션과 잘 어울리는지 확인해봐요.
      </p>

      {/* 입력 영역 */}
      {!result && (
        <>
          {isInDisliked && target && (
            <div style={{
              marginBottom: 10, padding: '8px 12px',
              background: 'var(--red-subtle)', borderRadius: 'var(--radius-sm)',
              fontSize: 12, color: 'var(--red)', fontWeight: 500,
            }}>
              싫어하는 향수로 등록된 향수예요. 그래도 분석할 수 있어요.
            </div>
          )}
          <PerfumeInput
            onAdd={name => setTarget(name)}
            placeholder="향수 이름을 입력해보세요"
            variant="liked"
            excludes={myPerfumes}
            maxReached={!!target}
          />
          {target && (
            <div style={{
              marginTop: 10, display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px', background: 'var(--bg)',
              border: '1.5px solid var(--primary-subtle)',
              borderRadius: 'var(--radius-sm)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: 'var(--primary)', opacity: 0.7,
                }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {target}
                </span>
              </div>
              <span
                onClick={reset}
                style={{ fontSize: 18, color: 'var(--text-tertiary)', cursor: 'pointer',
                  lineHeight: 1, padding: '0 2px', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
              >×</span>
            </div>
          )}
          <button
            onClick={analyze}
            disabled={!target || loading}
            style={{
              width: '100%', marginTop: 10, height: 46,
              fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
              background: !target || loading ? 'var(--border)' : 'var(--primary)',
              color: !target || loading ? 'var(--text-tertiary)' : '#fff',
              border: 'none', borderRadius: 'var(--radius-sm)',
              cursor: !target || loading ? 'default' : 'pointer',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { if (target && !loading) e.currentTarget.style.background = 'var(--primary-hover)' }}
            onMouseLeave={e => { if (target && !loading) e.currentTarget.style.background = 'var(--primary)' }}
          >
            {loading ? '분석 중···' : '궁합 분석하기'}
          </button>
        </>
      )}

      {/* 에러 */}
      {error && (
        <div style={{
          marginTop: 10, padding: '12px 14px',
          background: 'var(--red-subtle)', borderRadius: 'var(--radius-sm)',
          fontSize: 13, color: 'var(--red)',
        }}>
          {error}
        </div>
      )}

      {/* 결과 카드 */}
      {result && (
        <div style={{ animation: 'fadeUp 0.4s ease both' }}>
          {/* 분석 대상 + 다시 분석 */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 16,
          }}>
            <div>
              <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500 }}>
                분석한 향수
              </span>
              <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)',
                marginTop: 2, letterSpacing: '-0.3px' }}>
                {target}
              </p>
            </div>
            <button
              onClick={reset}
              style={{
                fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
                color: 'var(--primary)', background: 'var(--primary-subtle)',
                border: 'none', borderRadius: 99,
                padding: '5px 12px', cursor: 'pointer',
              }}
            >
              다시 분석
            </button>
          </div>

          {/* 점수 게이지 */}
          <ScoreGauge score={result.score} verdict={result.verdict} />

          {/* 취향 요약 */}
          <p style={{
            fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7,
            margin: '14px 0', padding: '12px 14px',
            background: 'var(--primary-subtle)', borderRadius: 'var(--radius-sm)',
          }}>
            {result.summary}
          </p>

          {/* 공통 노트 */}
          {result.common_notes.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600,
                letterSpacing: '0.05em', textTransform: 'uppercase' }}>공통 노트</span>
              {result.common_notes.map((n, i) => (
                <span key={i} style={{
                  fontSize: 12, fontWeight: 500, padding: '3px 10px',
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  borderRadius: 99, color: 'var(--text-primary)',
                }}>
                  {n}
                </span>
              ))}
            </div>
          )}

          {/* 컬렉션별 관계 */}
          {result.details.length > 0 && (
            <>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)',
                letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>
                컬렉션과의 관계
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {result.details.map((d, i) => (
                  <DetailItem key={i} detail={d} index={i} />
                ))}
              </div>
            </>
          )}

          {/* 구매 조언 */}
          <div style={{
            marginTop: 14, padding: '12px 14px',
            background: 'var(--bg)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {result.purchase_advice}
            </p>
          </div>

          {/* 컬렉션 적을 때 안내 */}
          {myPerfumes.length < 3 && (
            <p style={{
              marginTop: 10, fontSize: 12, color: 'var(--text-tertiary)',
              lineHeight: 1.5, textAlign: 'center',
            }}>
              컬렉션이 풍성해질수록 더 정확한 분석이 가능해요.
            </p>
          )}
        </div>
      )}
    </section>
  )
}

// ── 점수 게이지 ──────────────────────────────────────────────────

function ScoreGauge({ score, verdict }: { score: number; verdict: CompatibilityResult['verdict'] }) {
  const cfg = VERDICT_CONFIG[verdict]
  return (
    <div>
      {/* 숫자 + 판정 뱃지 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 36, fontWeight: 800, color: cfg.color, letterSpacing: '-1px', lineHeight: 1 }}>
          {score}
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', alignSelf: 'flex-end', marginBottom: 4 }}>
          / 100
        </span>
        <span style={{
          marginLeft: 4, fontSize: 12, fontWeight: 700,
          color: cfg.color, background: cfg.bg,
          padding: '4px 10px', borderRadius: 99,
        }}>
          {cfg.label}
        </span>
      </div>

      {/* 게이지 바 */}
      <div style={{
        height: 6, background: 'var(--border)', borderRadius: 99, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${score}%`,
          background: cfg.color,
          borderRadius: 99,
          transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />
      </div>
    </div>
  )
}

// ── 컬렉션 관계 항목 ─────────────────────────────────────────────

function DetailItem({ detail, index }: { detail: CompatibilityDetail; index: number }) {
  const cfg = RELATION_CONFIG[detail.relation]
  return (
    <div style={{
      padding: '12px 14px',
      background: 'var(--bg)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      animation: `fadeUp 0.35s ${index * 0.07}s ease both`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
          {detail.collection_perfume}
        </span>
        <span style={{
          fontSize: 11, fontWeight: 700, color: cfg.color, background: cfg.bg,
          padding: '2px 8px', borderRadius: 99, flexShrink: 0, marginLeft: 8,
        }}>
          {cfg.label}
        </span>
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 6px' }}>
        {detail.description}
      </p>
      {detail.shared_notes.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {detail.shared_notes.map((n, i) => (
            <span key={i} style={{
              fontSize: 11, padding: '2px 8px',
              background: cfg.bg, color: cfg.color,
              border: `1px solid ${cfg.color}30`,
              borderRadius: 99, fontWeight: 500,
            }}>
              {n}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
