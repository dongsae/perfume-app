import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sillage — 향수 추천',
  description: '좋아하는 향수를 입력하면 AI가 취향을 분석해 새로운 향수를 추천해 드려요',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
