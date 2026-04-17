# Sillage — 향수 추천 앱

AI가 좋아하는 향수를 분석해서 새로운 향수를 추천해주는 웹앱

## 시작하기

### 1. 환경변수 설정

`.env.local.example` 파일을 복사해서 `.env.local` 파일을 만들고 키를 입력하세요.

```
copy .env.local.example .env.local
```

`.env.local` 파일을 메모장으로 열어서 API 키를 입력하세요:
- `ANTHROPIC_API_KEY`: https://console.anthropic.com 에서 발급
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key

### 2. 로컬 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 3. 배포

main 브랜치에 push하면 Vercel이 자동으로 배포해요.

## Vercel 환경변수 등록

Vercel 대시보드 → 프로젝트 → Settings → Environment Variables에 아래 3개 추가:
- `ANTHROPIC_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## GitHub Secrets 등록 (CI용)

GitHub 레포 → Settings → Secrets and variables → Actions에 동일한 3개 추가
