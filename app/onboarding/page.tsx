'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PerfumeInput from '@/app/components/PerfumeInput'

// ── 향조 데이터 ─────────────────────────────────────────────────
const FAMILIES = [
  {
    id: 'floral',
    label: '플로럴',
    emoji: '🌸',
    desc: '꽃다발을 안은 듯 화사하고 로맨틱한',
    notes: '장미 · 자스민 · 피오니',
  },
  {
    id: 'woody',
    label: '우디',
    emoji: '🌲',
    desc: '숲속 나무의 깊고 따뜻한 온기',
    notes: '샌달우드 · 시더 · 베티버',
  },
  {
    id: 'citrus',
    label: '시트러스',
    emoji: '🍋',
    desc: '과일 껍질 같은 상쾌하고 청량한',
    notes: '베르가못 · 유자 · 레몬',
  },
  {
    id: 'musky',
    label: '머스키',
    emoji: '🫧',
    desc: '피부에 밀착되는 부드럽고 관능적인',
    notes: '화이트 머스크 · 앰브레트',
  },
  {
    id: 'oriental',
    label: '오리엔탈',
    emoji: '🏺',
    desc: '달콤하고 풍성한 이국적 깊이',
    notes: '바닐라 · 앰버 · 우드',
  },
  {
    id: 'green',
    label: '그린/아쿠아틱',
    emoji: '🌿',
    desc: '풀잎과 바다 바람처럼 싱그러운',
    notes: '씨솔트 · 바이올렛 리프 · 이끼',
  },
  {
    id: 'fruity',
    label: '프루티/구르망',
    emoji: '🍑',
    desc: '달콤한 과일과 디저트의 생기',
    notes: '피치 · 체리 · 캐러멜',
  },
] as const

type FamilyId = (typeof FAMILIES)[number]['id']
type FamilyPref = 'liked' | 'disliked' | null

const TOTAL_STEPS = 3

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  // step 1: 향조 선호
  const [familyPrefs, setFamilyPrefs] = useState<Record<FamilyId, FamilyPref>>(
    Object.fromEntries(FAMILIES.map(f => [f.id, null])) as Record<FamilyId, FamilyPref>
  )

  // step 2: 향수
  const [likedPerfumes, setLikedPerfumes] = useState<string[]>([])
  const [dislikedPerfumes, setDislikedPerfumes] = useState<string[]>([])

  const likedFamilies  = FAMILIES.filter(f => familyPrefs[f.id] === 'liked').map(f => f.id)
  const hasLikedFamily = likedFamilies.length > 0

  const toggleFamily = (id: FamilyId, type: 'liked' | 'disliked') => {
    setFamilyPrefs(prev => ({
      ...prev,
      [id]: prev[id] === type ? null : type,
    }))
  }

  const handleComplete = () => {
    const dislikedFamilies = FAMILIES.filter(f => familyPrefs[f.id] === 'disliked').map(f => f.id)
    localStorage.setItem('my_perfumes',         JSON.stringify(likedPerfumes))
    localStorage.setItem('disliked_perfumes',    JSON.stringify(dislikedPerfumes))
    localStorage.setItem('liked_families',       JSON.stringify(likedFamilies))
    localStorage.setItem('disliked_families',    JSON.stringify(dislikedFamilies))
    localStorage.setItem('onboarding_complete',  'true')
    router.replace('/')
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ maxWidth: 480, width: '100%', margin: '0 auto', padding: '0 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* 상단 진행 바 */}
        <div style={{ padding: '24px 0 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>
              {step} / {TOTAL_STEPS}
            </span>
            <button
              onClick={handleComplete}
              style={{
                fontSize: 12, color: 'var(--text-tertiary)', background: 'none',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '4px 0',
              }}
            >
              건너뛰기
            </button>
          </div>
          <div style={{ height: 3, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 99,
              background: 'var(--primary)',
              width: `${(step / TOTAL_STEPS) * 100}%`,
              transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }} />
          </div>
        </div>

        {/* 스텝 컨텐츠 */}
        <div style={{ flex: 1, paddingTop: 32, paddingBottom: 32 }}>
          {step === 1 && (
            <Step1
              familyPrefs={familyPrefs}
              onToggle={toggleFamily}
            />
          )}
          {step === 2 && (
            <Step2
              likedPerfumes={likedPerfumes}
              dislikedPerfumes={dislikedPerfumes}
              onAddLiked={name => setLikedPerfumes(p => [...p, name])}
              onRemoveLiked={i => setLikedPerfumes(p => p.filter((_, idx) => idx !== i))}
              onAddDisliked={name => setDislikedPerfumes(p => [...p, name])}
              onRemoveDisliked={i => setDislikedPerfumes(p => p.filter((_, idx) => idx !== i))}
            />
          )}
          {step === 3 && (
            <Step3
              likedFamilies={likedFamilies}
              likedPerfumes={likedPerfumes}
            />
          )}
        </div>

        {/* 하단 버튼 */}
        <div style={{ paddingBottom: 40, display: 'flex', gap: 10 }}>
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              style={{
                height: 52, padding: '0 20px',
                fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
                background: 'none', border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              이전
            </button>
          )}
          <button
            onClick={() => {
              if (step < TOTAL_STEPS) setStep(s => s + 1)
              else handleComplete()
            }}
            disabled={step === 1 && !hasLikedFamily}
            style={{
              flex: 1, height: 52,
              fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
              background: step === 1 && !hasLikedFamily ? 'var(--border)' : 'var(--primary)',
              color: step === 1 && !hasLikedFamily ? 'var(--text-tertiary)' : '#fff',
              border: 'none', borderRadius: 'var(--radius-sm)',
              cursor: step === 1 && !hasLikedFamily ? 'default' : 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => {
              if (!(step === 1 && !hasLikedFamily))
                e.currentTarget.style.background = 'var(--primary-hover)'
            }}
            onMouseLeave={e => {
              if (!(step === 1 && !hasLikedFamily))
                e.currentTarget.style.background = 'var(--primary)'
            }}
          >
            {step === TOTAL_STEPS ? '향수 취향 저장하기' : '다음'}
          </button>
        </div>

      </div>
    </div>
  )
}

// ── Step 1: 향조 선호 ────────────────────────────────────────────

function Step1({
  familyPrefs,
  onToggle,
}: {
  familyPrefs: Record<FamilyId, FamilyPref>
  onToggle: (id: FamilyId, type: 'liked' | 'disliked') => void
}) {
  return (
    <div style={{ animation: 'fadeUp 0.4s ease both' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.08em',
        textTransform: 'uppercase', marginBottom: 10 }}>Step 1</p>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)',
        letterSpacing: '-0.5px', lineHeight: 1.3, marginBottom: 8 }}>
        어떤 향이 좋으세요?
      </h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
        좋아하는 향조에 💜, 별로인 향조에 ✕를 눌러주세요.<br />
        좋아하는 향조는 최소 1개 이상 선택해야 해요.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FAMILIES.map(f => {
          const pref = familyPrefs[f.id]
          return (
            <div key={f.id} style={{
              background: pref === 'liked' ? 'var(--primary-subtle)'
                : pref === 'disliked' ? 'var(--red-subtle)' : 'var(--surface)',
              border: `1.5px solid ${
                pref === 'liked' ? 'rgba(160,82,122,0.3)'
                : pref === 'disliked' ? 'rgba(224,69,74,0.25)' : 'var(--border)'
              }`,
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              transition: 'background 0.15s, border-color 0.15s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* 향조 정보 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{f.emoji}</span>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700,
                      color: pref === 'liked' ? 'var(--primary)'
                        : pref === 'disliked' ? 'var(--red)' : 'var(--text-primary)',
                      marginBottom: 2 }}>
                      {f.label}
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
                      {f.notes}
                    </p>
                  </div>
                </div>

                {/* 좋아요 / 싫어요 버튼 */}
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <button
                    onClick={() => onToggle(f.id, 'liked')}
                    style={{
                      width: 36, height: 36, borderRadius: '50%',
                      border: `1.5px solid ${pref === 'liked' ? 'var(--primary)' : 'var(--border)'}`,
                      background: pref === 'liked' ? 'var(--primary)' : 'var(--bg)',
                      fontSize: 16, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}
                  >
                    💜
                  </button>
                  <button
                    onClick={() => onToggle(f.id, 'disliked')}
                    style={{
                      width: 36, height: 36, borderRadius: '50%',
                      border: `1.5px solid ${pref === 'disliked' ? 'var(--red)' : 'var(--border)'}`,
                      background: pref === 'disliked' ? 'var(--red-subtle)' : 'var(--bg)',
                      fontSize: 14, cursor: 'pointer', fontWeight: 700,
                      color: pref === 'disliked' ? 'var(--red)' : 'var(--text-tertiary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* 설명 (선택된 경우만) */}
              {pref && (
                <p style={{
                  fontSize: 12, color: pref === 'liked' ? 'var(--primary)' : 'var(--red)',
                  marginTop: 8, paddingLeft: 38, lineHeight: 1.5,
                }}>
                  {f.desc}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Step 2: 향수 직접 입력 ───────────────────────────────────────

function Step2({
  likedPerfumes,
  dislikedPerfumes,
  onAddLiked,
  onRemoveLiked,
  onAddDisliked,
  onRemoveDisliked,
}: {
  likedPerfumes: string[]
  dislikedPerfumes: string[]
  onAddLiked: (name: string) => void
  onRemoveLiked: (i: number) => void
  onAddDisliked: (name: string) => void
  onRemoveDisliked: (i: number) => void
}) {
  return (
    <div style={{ animation: 'fadeUp 0.4s ease both' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.08em',
        textTransform: 'uppercase', marginBottom: 10 }}>Step 2</p>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)',
        letterSpacing: '-0.5px', lineHeight: 1.3, marginBottom: 8 }}>
        알고 있는 향수가 있나요?
      </h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 28 }}>
        써본 향수를 입력하면 더 정확한 추천을 받을 수 있어요.<br />
        없어도 괜찮아요, 건너뛰어도 돼요.
      </p>

      {/* 좋아하는 향수 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)',
          marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>💜</span> 좋아하는 향수
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 400 }}>
            (최대 5개)
          </span>
        </p>
        <PerfumeInput
          onAdd={onAddLiked}
          placeholder="향수 이름을 검색해보세요"
          variant="liked"
          excludes={[...likedPerfumes, ...dislikedPerfumes]}
          maxReached={likedPerfumes.length >= 5}
        />
        {likedPerfumes.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 10 }}>
            {likedPerfumes.map((p, i) => (
              <PerfumeTag key={i} name={p} variant="liked" onRemove={() => onRemoveLiked(i)} />
            ))}
          </div>
        )}
      </div>

      {/* 싫어하는 향수 */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)',
          marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12 }}>✕</span> 별로인 향수
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 400 }}>
            (최대 5개, 선택 안 해도 돼요)
          </span>
        </p>
        <PerfumeInput
          onAdd={onAddDisliked}
          placeholder="피하고 싶은 향수를 검색해보세요"
          variant="disliked"
          excludes={[...likedPerfumes, ...dislikedPerfumes]}
          maxReached={dislikedPerfumes.length >= 5}
        />
        {dislikedPerfumes.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 10 }}>
            {dislikedPerfumes.map((p, i) => (
              <PerfumeTag key={i} name={p} variant="disliked" onRemove={() => onRemoveDisliked(i)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Step 3: 완료 요약 ────────────────────────────────────────────

function Step3({
  likedFamilies,
  likedPerfumes,
}: {
  likedFamilies: string[]
  likedPerfumes: string[]
}) {
  const familyLabels = FAMILIES.filter(f => likedFamilies.includes(f.id))

  return (
    <div style={{ animation: 'fadeUp 0.4s ease both', textAlign: 'center' }}>
      <div style={{ fontSize: 56, marginBottom: 20 }}>🌸</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)',
        letterSpacing: '-0.5px', lineHeight: 1.3, marginBottom: 12 }}>
        취향 설정 완료!
      </h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32 }}>
        입력하신 정보를 바탕으로<br />딱 맞는 향수를 추천해드릴게요.
      </p>

      {/* 선택한 향조 */}
      {familyLabels.length > 0 && (
        <div style={{
          background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
          padding: '16px 20px', marginBottom: 12, textAlign: 'left',
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)',
            letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>
            좋아하는 향조
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {familyLabels.map(f => (
              <span key={f.id} style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 12px',
                background: 'var(--primary-subtle)',
                border: '1px solid rgba(160,82,122,0.2)',
                borderRadius: 99, fontSize: 13, fontWeight: 600,
                color: 'var(--primary)',
              }}>
                {f.emoji} {f.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 입력한 향수 */}
      {likedPerfumes.length > 0 && (
        <div style={{
          background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
          padding: '16px 20px', textAlign: 'left',
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)',
            letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>
            좋아하는 향수
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {likedPerfumes.map((p, i) => (
              <span key={i} style={{
                padding: '5px 12px', background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 99, fontSize: 13, fontWeight: 500,
                color: 'var(--text-primary)',
              }}>{p}</span>
            ))}
          </div>
        </div>
      )}

      {familyLabels.length === 0 && likedPerfumes.length === 0 && (
        <p style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
          홈에서 향수를 추가하면 바로 시작할 수 있어요.
        </p>
      )}
    </div>
  )
}

// ── 향수 태그 ────────────────────────────────────────────────────

function PerfumeTag({
  name,
  variant,
  onRemove,
}: {
  name: string
  variant: 'liked' | 'disliked'
  onRemove: () => void
}) {
  const isLiked = variant === 'liked'
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '5px 10px 5px 12px',
      background: isLiked ? 'var(--primary-subtle)' : 'var(--red-subtle)',
      border: `1px solid ${isLiked ? 'rgba(160,82,122,0.2)' : 'rgba(224,69,74,0.2)'}`,
      borderRadius: 99, fontSize: 13, fontWeight: 500,
      color: isLiked ? 'var(--primary)' : 'var(--red)',
    }}>
      <span>{name}</span>
      <span
        onClick={onRemove}
        style={{ fontSize: 14, cursor: 'pointer', lineHeight: 1, opacity: 0.7,
          transition: 'opacity 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
      >×</span>
    </div>
  )
}
