import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const MOCK_MODE = !process.env.ANTHROPIC_API_KEY

const anthropic = MOCK_MODE ? null : new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export interface CompatibilityDetail {
  collection_perfume: string
  relation: 'complement' | 'similar' | 'contrast'
  description: string
  shared_notes: string[]
}

export interface CompatibilityResult {
  score: number
  verdict: 'great' | 'good' | 'neutral' | 'overlap'
  summary: string
  details: CompatibilityDetail[]
  common_notes: string[]
  purchase_advice: string
}

export async function POST(req: NextRequest) {
  try {
    const { targetPerfume, myPerfumes, dislikedPerfumes } = await req.json() as {
      targetPerfume: string
      myPerfumes: string[]
      dislikedPerfumes?: string[]
    }

    if (!targetPerfume?.trim()) {
      return NextResponse.json({ error: '분석할 향수를 입력해주세요.' }, { status: 400 })
    }
    if (!myPerfumes || myPerfumes.length === 0) {
      return NextResponse.json({ error: '컬렉션에 향수가 없어요.' }, { status: 400 })
    }

    if (MOCK_MODE) {
      await new Promise(r => setTimeout(r, 1400))
      return NextResponse.json(getMockResult(targetPerfume, myPerfumes))
    }

    const msg = await anthropic!.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{ role: 'user', content: buildPrompt(targetPerfume, myPerfumes, dislikedPerfumes) }],
    })

    const raw = msg.content.map(b => ('text' in b ? b.text : '')).join('')
    const clean = raw.replace(/```json|```/g, '').trim()
    const result: CompatibilityResult = JSON.parse(clean)

    // score 범위 보정
    result.score = Math.min(100, Math.max(0, Math.round(result.score)))

    return NextResponse.json(result)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: '분석 중 오류가 발생했어요.' }, { status: 500 })
  }
}

function buildPrompt(
  targetPerfume: string,
  myPerfumes: string[],
  dislikedPerfumes?: string[],
): string {
  const dislikedLine = dislikedPerfumes && dislikedPerfumes.length > 0
    ? `\n싫어하는 향 계열 (참고): ${dislikedPerfumes.join(', ')}`
    : ''

  return `사용자의 향수 컬렉션: ${myPerfumes.join(', ')}
구매를 고려 중인 향수: ${targetPerfume}${dislikedLine}

"${targetPerfume}"이 사용자의 컬렉션과 얼마나 잘 어울리는지 분석해줘.

분석 기준:
1. 향 계열 다양성 — 컬렉션에 없는 계열이면 높은 점수
2. 노트 조화 — 공통 노트가 있어도 포지션이 다르면 긍정 평가
3. 중복 회피 — 기존 향수와 너무 유사하면 낮은 점수
4. 취향 일관성 — 컬렉션 전반의 무드와 어울리면 높은 점수

verdict 기준:
- "great" (80–100): 컬렉션을 잘 보완하며 새로운 계열을 추가함
- "good" (60–79): 전반적으로 잘 어울리며 무난하게 추가 가능
- "neutral" (40–59): 일부 겹치지만 보유할 만한 차별점이 있음
- "overlap" (0–39): 이미 가진 향수와 너무 유사하거나 취향과 맞지 않음

반드시 아래 JSON 형식으로만 응답해. 다른 텍스트 없이 순수 JSON만:
{
  "score": 0~100 사이 정수,
  "verdict": "great" | "good" | "neutral" | "overlap",
  "summary": "2~3문장 종합 궁합 평 (감성적이고 시적인 한국어 문체)",
  "details": [
    {
      "collection_perfume": "컬렉션 향수명",
      "relation": "complement" | "similar" | "contrast",
      "description": "한줄 관계 설명 (한국어)",
      "shared_notes": ["공통노트1", "공통노트2"]
    }
  ],
  "common_notes": ["두 향수 군 전체에서 공유되는 대표 노트 (없으면 빈 배열)"],
  "purchase_advice": "구매 여부에 대한 한 문장 조언 (한국어)"
}`
}

function getMockResult(targetPerfume: string, myPerfumes: string[]): CompatibilityResult {
  const score = 72
  return {
    score,
    verdict: 'good',
    summary: `${targetPerfume}은 당신의 컬렉션이 가진 따뜻하고 감각적인 결과 자연스럽게 어우러져요. 플로럴의 화사함 위에 부드러운 우디 잔향이 더해지며, 기존 향들과 조화를 이루면서도 새로운 레이어를 선물합니다.`,
    details: myPerfumes.slice(0, 3).map((p, i) => {
      const relations: CompatibilityDetail['relation'][] = ['complement', 'similar', 'contrast']
      const descs = [
        '미들 노트의 플로럴 계열이 서로를 부드럽게 보완해줘요.',
        '베이스의 머스크 계열이 유사해 레이어링하면 잘 어울려요.',
        '상반된 시트러스와 우디 계열이 서로의 매력을 돋보이게 해요.',
      ]
      return {
        collection_perfume: p,
        relation: relations[i % 3],
        description: descs[i % 3],
        shared_notes: i === 0 ? ['재스민', '머스크'] : i === 1 ? ['샌달우드', '앰버'] : [],
      }
    }),
    common_notes: ['머스크', '앰버'],
    purchase_advice: `컬렉션에 잘 어울리는 향이에요. 샘플로 먼저 테스트해보고 구매를 결정해도 좋겠어요.`,
  }
}
