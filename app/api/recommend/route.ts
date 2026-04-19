import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

const MOCK_MODE = !process.env.ANTHROPIC_API_KEY

const anthropic = MOCK_MODE ? null : new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const supabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    : null

export interface Recommendation {
  name: string
  brand: string
  top_notes: string[]
  middle_notes: string[]
  base_notes: string[]
  reason: string
}

export interface RecommendResult {
  taste_summary: string
  recommendations: Recommendation[]
}

export async function POST(req: NextRequest) {
  try {
    const { perfumes, dislikedPerfumes, situation } = await req.json()

    if (!perfumes || perfumes.length === 0) {
      return NextResponse.json({ error: '향수를 입력해주세요.' }, { status: 400 })
    }

    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1200))
      return NextResponse.json(getMockResult(perfumes, situation))
    }

    const msg = await anthropic!.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      messages: [{ role: 'user', content: buildPrompt(perfumes, situation, dislikedPerfumes) }],
    })

    const raw = msg.content.map(b => ('text' in b ? b.text : '')).join('')
    const clean = raw.replace(/```json|```/g, '').trim()
    const result: RecommendResult = JSON.parse(clean)

    saveToSupabase(perfumes, result).catch(e => console.error('Supabase 저장 오류:', e))

    return NextResponse.json(result)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: '서버 오류가 발생했어요.' }, { status: 500 })
  }
}

async function saveToSupabase(inputPerfumes: string[], result: RecommendResult) {
  if (!supabase) return
  await supabase.from('recommendation_logs').insert({
    input_perfumes: inputPerfumes,
    taste_summary: result.taste_summary,
    recommendations: result.recommendations,
  })
  const perfumeRows = result.recommendations.map(r => ({
    name: r.name,
    brand: r.brand,
    top_notes: r.top_notes,
    middle_notes: r.middle_notes,
    base_notes: r.base_notes,
  }))
  await supabase.from('perfumes').upsert(perfumeRows, {
    onConflict: 'name,brand',
    ignoreDuplicates: true,
  })
}

function buildPrompt(perfumes: string[], situation?: string, dislikedPerfumes?: string[]): string {
  const situationLine = situation
    ? `\n추천 상황: ${situation} — 이 상황에 특히 어울리는 향수를 우선적으로 추천해줘.`
    : ''

  const dislikedLine = dislikedPerfumes && dislikedPerfumes.length > 0
    ? `\n싫어하는 향수: ${dislikedPerfumes.join(', ')} — 이 향수들과 비슷한 향 계열(노트, 분위기, 무드)은 절대 추천하지 마. 취향 요약에도 이 점을 반영해줘.`
    : ''

  return `사용자가 좋아하는 향수 목록: ${perfumes.join(', ')}${dislikedLine}${situationLine}

위 향수들을 분석해서 사용자의 향수 취향을 파악하고, 입력한 향수와 겹치지 않는 향수 5개를 추천해줘.

반드시 아래 JSON 형식으로만 응답해. 다른 텍스트나 마크다운 없이 순수 JSON만:
{
  "taste_summary": "2-3문장으로 사용자 취향 요약 (감성적이고 시적인 문체, 한국어)",
  "recommendations": [
    {
      "name": "향수명 (영문)",
      "brand": "브랜드명",
      "top_notes": ["탑노트1", "탑노트2"],
      "middle_notes": ["미들노트1", "미들노트2"],
      "base_notes": ["베이스노트1", "베이스노트2"],
      "reason": "추천 이유 (입력한 향수와 연결고리 포함, 한국어 2문장)"
    }
  ]
}`
}

function getMockResult(perfumes: string[], situation?: string): RecommendResult {
  const situationText = situation ? ` ${situation}에 어울리는` : ''
  return {
    taste_summary: `${perfumes.join(', ')}를 선택하신 당신은 플로럴과 우디가 균형을 이루는 향을 선호하시는군요. 가볍고 청량하면서도 깊이 있는 잔향을 즐기시는 섬세한 취향이 느껴집니다.`,
    recommendations: [
      {
        name: 'Replica Jazz Club',
        brand: 'Maison Margiela',
        top_notes: ['베티버', '라임'],
        middle_notes: ['피아노 어코드', '럼'],
        base_notes: ['머스크', '앰버', '우드'],
        reason: `입력하신 향수들의 부드러운 계열과${situationText} 자연스럽게 이어지는 향이에요. 포근하고 피부에 밀착되는 느낌이 매력적입니다.`,
      },
      {
        name: 'Black Opium',
        brand: 'Yves Saint Laurent',
        top_notes: ['핑크 페퍼', '오렌지 블로섬'],
        middle_notes: ['커피', '재스민'],
        base_notes: ['바닐라', '파출리', '시더우드'],
        reason: `달콤하면서도 강렬한 중독성이 있는${situationText} 향으로 저녁 자리에 특히 잘 어울려요. 취향하시는 향수의 관능적인 면을 더욱 강조한 향입니다.`,
      },
      {
        name: 'Chance Eau Tendre',
        brand: 'Chanel',
        top_notes: ['자몽', '퀸스'],
        middle_notes: ['재스민', '아이리스'],
        base_notes: ['화이트 머스크', '앰브록산'],
        reason: `상큼하고 여성스러운${situationText} 플로럴 프루티 향으로 일상에서 부담 없이 즐길 수 있어요. 선호하시는 향수들의 경쾌한 느낌을 공유합니다.`,
      },
      {
        name: 'Sì Intense',
        brand: 'Giorgio Armani',
        top_notes: ['블랙커런트', '만다린'],
        middle_notes: ['로즈', '프리지아'],
        base_notes: ['파출리', '바닐라', '우드'],
        reason: `깊고 관능적인${situationText} 플로럴 우디 향으로 한층 강렬한 인상을 남겨요. 특별한 날을 위한 시그니처 향수로 추천드립니다.`,
      },
      {
        name: 'Light Blue',
        brand: 'Dolce & Gabbana',
        top_notes: ['시칠리안 레몬', '애플', '씨더'],
        middle_notes: ['뱀부', '재스민', '화이트 로즈'],
        base_notes: ['씨더우드', '머스크', '앰버'],
        reason: `상쾌하고 깨끗한${situationText} 시트러스 우디 계열로 여름철에 특히 빛을 발하는 향이에요. 입력하신 향수들의 청량감을 더욱 살려주는 선택입니다.`,
      },
    ],
  }
}
