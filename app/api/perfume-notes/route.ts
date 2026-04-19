import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const MOCK_MODE = !process.env.ANTHROPIC_API_KEY

const anthropic = MOCK_MODE ? null : new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

interface PerfumeNotes {
  name: string
  brand: string
  top_notes: string[]
  middle_notes: string[]
  base_notes: string[]
}

export async function POST(req: NextRequest) {
  try {
    const { perfumes } = await req.json() as { perfumes: string[] }
    if (!perfumes || perfumes.length === 0) {
      return NextResponse.json({ error: '향수 목록을 입력해주세요.' }, { status: 400 })
    }

    if (MOCK_MODE) {
      await new Promise(r => setTimeout(r, 600))
      return NextResponse.json({ notes: getMockNotes(perfumes) })
    }

    const msg = await anthropic!.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `다음 향수들의 탑/미들/베이스 노트와 브랜드를 알려줘.
향수 목록: ${perfumes.join(', ')}

반드시 아래 JSON 배열 형식으로만 응답해. 모르는 향수는 최대한 추정해서 채워줘:
[
  {
    "name": "향수명 (입력값 그대로)",
    "brand": "브랜드명",
    "top_notes": ["노트1", "노트2"],
    "middle_notes": ["노트1", "노트2"],
    "base_notes": ["노트1", "노트2"]
  }
]`,
      }],
    })

    const raw = msg.content.map(b => ('text' in b ? b.text : '')).join('')
    const clean = raw.replace(/```json|```/g, '').trim()
    const notes: PerfumeNotes[] = JSON.parse(clean)
    return NextResponse.json({ notes })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: '노트 조회 중 오류가 발생했어요.' }, { status: 500 })
  }
}

function getMockNotes(perfumes: string[]): PerfumeNotes[] {
  const mockData: Record<string, PerfumeNotes> = {
    default: {
      name: '',
      brand: '—',
      top_notes: ['시트러스', '베르가못'],
      middle_notes: ['로즈', '재스민'],
      base_notes: ['머스크', '우드'],
    },
  }
  return perfumes.map(name => ({
    ...mockData.default,
    name,
  }))
}
