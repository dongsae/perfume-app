'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { searchPerfumes, BRAND_KO } from '@/lib/perfume-list'

interface Props {
  onAdd: (name: string) => void
  placeholder: string
  variant?: 'liked' | 'disliked'
  excludes?: string[]
  maxReached?: boolean
}

export default function PerfumeInput({
  onAdd,
  placeholder,
  variant = 'liked',
  excludes = [],
  maxReached = false,
}: Props) {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const [dropdownRect, setDropdownRect] = useState<{ top: number; left: number; width: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestions = searchPerfumes(value, excludes)
  const showCustom =
    value.trim().length > 0 &&
    !suggestions.some(s => s.name.toLowerCase() === value.trim().toLowerCase())
  const totalItems = suggestions.length + (showCustom ? 1 : 0)

  const primaryColor = variant === 'disliked' ? 'var(--red)' : 'var(--primary)'
  const primaryHover  = variant === 'disliked' ? '#c73d42' : 'var(--primary-hover)'
  const subtleColor   = variant === 'disliked' ? 'rgba(224,69,74,0.08)' : 'var(--primary-subtle)'
  const focusBorder   = variant === 'disliked' ? 'var(--red)' : 'var(--border-focus)'
  const focusShadow   = variant === 'disliked' ? '0 0 0 3px var(--red-subtle)' : '0 0 0 3px var(--primary-subtle)'

  // 드롭다운 위치 계산 (input 기준 fixed 좌표)
  const updateRect = useCallback(() => {
    if (!containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    setDropdownRect({ top: r.bottom + 4, left: r.left, width: r.width })
  }, [])

  const handleAdd = useCallback((name: string) => {
    const trimmed = name.trim()
    if (!trimmed || maxReached) return
    onAdd(trimmed)
    setValue('')
    setOpen(false)
    setHighlighted(-1)
    inputRef.current?.focus()
  }, [onAdd, maxReached])

  // 외부 클릭 시 닫기
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setHighlighted(-1)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  // 스크롤/리사이즈 시 위치 업데이트
  useEffect(() => {
    if (!open) return
    const onScroll = () => updateRect()
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onScroll)
    }
  }, [open, updateRect])

  const openDropdown = () => {
    updateRect()
    setOpen(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted(h => (h + 1) % totalItems)
      openDropdown()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted(h => (h <= 0 ? totalItems - 1 : h - 1))
      openDropdown()
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (open && highlighted >= 0) {
        highlighted < suggestions.length
          ? handleAdd(suggestions[highlighted].name)
          : handleAdd(value)
      } else if (value.trim()) {
        handleAdd(value)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setHighlighted(-1)
    }
  }

  const dropdown = open && totalItems > 0 && !maxReached && dropdownRect ? (
    <div
      style={{
        position: 'fixed',
        top: dropdownRect.top,
        left: dropdownRect.left,
        width: dropdownRect.width,
        background: 'var(--surface)',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {suggestions.map((p, i) => {
        const isActive = highlighted === i
        const brandKo = BRAND_KO[p.brand]
        return (
          <div
            key={p.name}
            onMouseDown={() => handleAdd(p.name)}
            onMouseEnter={() => setHighlighted(i)}
            style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '11px 14px',
              cursor: 'pointer',
              background: isActive ? subtleColor : 'transparent',
              transition: 'background 0.1s',
              borderBottom: i < suggestions.length - 1 || showCustom ? '1px solid var(--border)' : 'none',
            }}
          >
            {/* 향수명 + 한국어명 */}
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <span style={{
                fontSize: 14, fontWeight: isActive ? 600 : 500,
                color: isActive ? primaryColor : 'var(--text-primary)',
              }}>
                {highlightMatch(p.name, value)}
              </span>
              {p.nameKo && (
                <span style={{ fontSize: 12, color: 'var(--text-tertiary)', marginLeft: 6 }}>
                  {highlightMatch(p.nameKo, value)}
                </span>
              )}
            </div>
            {/* 브랜드명 한국어 · 영문 */}
            <div style={{ flexShrink: 0, marginLeft: 10, textAlign: 'right' }}>
              <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500 }}>
                {brandKo ? (
                  <>{highlightMatch(brandKo, value)}<span style={{ opacity: 0.55 }}> · {p.brand}</span></>
                ) : p.brand}
              </span>
            </div>
          </div>
        )
      })}

      {/* 직접 추가 */}
      {showCustom && (
        <div
          onMouseDown={() => handleAdd(value)}
          onMouseEnter={() => setHighlighted(suggestions.length)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 14px', cursor: 'pointer',
            background: highlighted === suggestions.length ? subtleColor : 'transparent',
            transition: 'background 0.1s',
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>직접 추가</span>
          <span style={{
            fontSize: 14, fontWeight: 600,
            color: highlighted === suggestions.length ? primaryColor : 'var(--text-secondary)',
          }}>
            &ldquo;{value.trim()}&rdquo;
          </span>
        </div>
      )}
    </div>
  ) : null

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          ref={inputRef}
          value={value}
          disabled={maxReached}
          onChange={e => {
            setValue(e.target.value)
            openDropdown()
            setHighlighted(-1)
          }}
          onKeyDown={handleKeyDown}
          onFocus={e => {
            if (value.trim()) openDropdown()
            e.currentTarget.style.borderColor = focusBorder
            e.currentTarget.style.boxShadow = focusShadow
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          placeholder={maxReached ? '최대 10개 추가됨' : placeholder}
          style={{
            flex: 1, height: 46, padding: '0 14px',
            fontSize: 15, fontFamily: 'inherit',
            background: 'var(--bg)', border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
            outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s',
            opacity: maxReached ? 0.5 : 1,
          }}
        />
        <button
          onClick={() => {
            if (highlighted >= 0 && highlighted < suggestions.length) {
              handleAdd(suggestions[highlighted].name)
            } else {
              handleAdd(value)
            }
          }}
          disabled={maxReached}
          onMouseEnter={e => { if (!maxReached) e.currentTarget.style.background = primaryHover }}
          onMouseLeave={e => { e.currentTarget.style.background = primaryColor }}
          style={{
            height: 46, padding: '0 18px', fontSize: 15, fontWeight: 700,
            fontFamily: 'inherit', background: primaryColor, color: '#fff',
            border: 'none', borderRadius: 'var(--radius-sm)',
            cursor: maxReached ? 'default' : 'pointer',
            whiteSpace: 'nowrap', transition: 'background 0.15s',
            opacity: maxReached ? 0.4 : 1,
          }}
        >추가</button>
      </div>

      {/* portal로 body에 마운트 → 카드 overflow 영향 없음 */}
      {typeof document !== 'undefined' && createPortal(dropdown, document.body)}
    </div>
  )
}

/** 검색어 일치 부분을 굵게 처리 */
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <strong style={{ fontWeight: 700 }}>{text.slice(idx, idx + query.length)}</strong>
      {text.slice(idx + query.length)}
    </>
  )
}
