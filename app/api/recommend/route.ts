import { NextRequest, NextResponse } from 'next/server'

// TODO: API 키 준비되면 false로 바꾸세요
const MOCK_MODE = true

export async function POST(req: NextRequest) {
  try {
    const { perfumes } = await req.json()

    if (!perfumes || perfumes.length === 0) {
      return NextResponse.json({ error: '향수를 입력해주세요.' }, { status: 400 })
    }

    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return NextResponse.json(getMockResult(perfumes))
    }

    // 실제 Anthropic API (MOCK_MODE = false일 때)
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: buildPrompt(perfumes) }],
      }),
    })

    if (!res.ok) throw new Error(`Anthropic API error: ${res.status}`)

    const data = await res.json()
    const raw = data.content.map((b: { text?: string }) => b.text || '').join('')
    const clean = raw.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    return NextResponse.json(parsed)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: '서버 오류가 발생했어요.' }, { status: 500 })
  }
}

function getMockResult(perfumes: string[]) {
  return {
    taste_summary: `${perfumes.join(', ')}를 선택하신 당신은 플로럴과 우디가 균형을 이루는 향을 선호하시는군요. 가볍고 청량하면서도 깊이 있는 잔향을 즐기시는 섬세한 취향이 느껴집니다. 계절을 가리지 않고 일상 속에서 향수를 즐기시는 분 같아요.`,
    recommendations: [
      {
        name: 'Replica Jazz Club',
        brand: 'Maison Margiela',
        notes: ['머스크', '앰버', '로즈'],
        reason: '입력하신 향수들의 부드러운 플로럴 계열과 자연스럽게 이어지는 향이에요. 포근하고 피부에 밀착되는 느낌이 매력적입니다.',
      },
      {
        name: 'Black Opium',
        brand: 'Yves Saint Laurent',
        notes: ['커피', '바닐라', '화이트 플로럴'],
        reason: '달콤하면서도 강렬한 중독성이 있는 향으로 저녁 자리에 특히 잘 어울려요. 취향하시는 향수의 관능적인 면을 더욱 강조한 향입니다.',
      },
      {
        name: 'Chance Eau Tendre',
        brand: 'Chanel',
        notes: ['자몽', '재스민', '화이트 머스크'],
        reason: '상큼하고 여성스러운 플로럴 프루티 향으로 일상에서 부담 없이 즐길 수 있어요. 선호하시는 향수들의 경쾌한 느낌을 공유합니다.',
      },
      {
        name: 'Si Intense',
        brand: 'Giorgio Armani',
        notes: ['블랙커런트', '로즈', '파출리'],
        reason: '깊고 관능적인 플로럴 우디 향으로 취향하시는 향수보다 한층 강렬한 인상을 남겨요. 특별한 날을 위한 시그니처 향수로 추천드립니다.',
      },
      {
        name: 'Light Blue',
        brand: 'Dolce & Gabbana',
        notes: ['시칠리안 레몬', '애플', '시더우드'],
        reason: '상쾌하고 깨끗한 시트러스 우디 계열로 여름철에 특히 빛을 발하는 향이에요. 입력하신 향수들의 청량감을 더욱 살려주는 선택입니다.',
      },
    ],
  }
}

function buildPrompt(perfumes: string[]): string {
  return `사용자가 좋아하는 향수 목록: ${perfumes.join(', ')}

위 향수들을 분석해서 사용자의 향수 취향을 파악하고, 아직 써보지 않았을 향수 5개를 추천해줘.

반드시 아래 JSON 형식으로만 응답해. 다른 텍스트나 마크다운 없이 순수 JSON만:
{
  "taste_summary": "2-3문장으로 사용자 취향 요약 (감성적이고 시적인 문체로)",
  "recommendations": [
    {
      "name": "향수명",
      "brand": "브랜드명",
      "notes": ["노트1", "노트2", "노트3"],
      "reason": "이 향수를 추천하는 이유 (입력한 향수와의 연결고리 포함, 2문장)"
    }
  ]
}`
}
