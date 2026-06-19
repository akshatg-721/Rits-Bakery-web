'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, TrendingUp, Sparkles, ArrowRight } from 'lucide-react'
import { menuProducts } from '@/lib/menu-data'
import {
  searchProducts,
  highlightText,
  POPULAR_SEARCHES,
  type SearchResult,
} from '@/lib/search-engine'

// ─── Max suggestions shown in dropdown ───────────────────────────────────────
const MAX_SUGGESTIONS = 5

// ─── Shared highlight renderer ────────────────────────────────────────────────
function HighlightedText({ text, query }: { text: string; query: string }) {
  const segments = highlightText(text, query)
  return (
    <>
      {segments.map((seg, i) =>
        seg.highlight ? (
          <mark
            key={i}
            style={{ background: 'none', color: '#006241', fontWeight: 700, padding: 0 }}
          >
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  )
}

// ─── Badge label builder ──────────────────────────────────────────────────────
function getBadgeLabels(result: SearchResult): string[] {
  const p = result.product
  const badges: string[] = []
  if (p.vegan || p.name.toLowerCase().includes('vegan')) badges.push('Vegan')
  if (p.isHighProtein) badges.push('High Protein')
  if ((p.tags ?? []).some(t => t.toLowerCase().includes('ekadashi'))) badges.push('Ekadashi')
  if (p.isTopSeller) badges.push('Top Seller')
  if ((p.tags ?? []).some(t => t.toLowerCase().includes('gluten free') || t.toLowerCase().includes('gluten-free'))) badges.push('Gluten Free')
  if ((p.tags ?? []).some(t => t.toLowerCase().includes('no sugar'))) badges.push('No Sugar')
  return badges
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface MenuSearchBarProps {
  value: string
  onChange: (value: string) => void
  /** Forwarded ref so parent can call .focus() */
  inputRef?: React.RefObject<HTMLInputElement | null>
  placeholder?: string
  /**
   * "menu"   — selecting a suggestion fills the filter query (default, used on /menu page)
   * "global" — selecting a suggestion navigates to /menu?q=… (used in header / homepage)
   */
  mode?: 'menu' | 'global'
  /**
   * "default" — full-height 52px, used on the menu page
   * "compact" — 40px pill, used in the header
   */
  size?: 'default' | 'compact'
  /** Extra class on the outer wrapper div */
  className?: string
  /** id for the <input> — must be unique per page */
  inputId?: string
}

export function MenuSearchBar({
  value,
  onChange,
  inputRef: externalRef,
  placeholder = 'Search eggless cakes, cookies, brownies...',
  mode = 'menu',
  size = 'default',
  className = '',
  inputId = 'menu-search-input',
}: MenuSearchBarProps) {
  const isCompact = size === 'compact'
  const router = useRouter()
  const internalRef = useRef<HTMLInputElement>(null)
  const inputRef = (externalRef ?? internalRef) as React.RefObject<HTMLInputElement>
  const containerRef = useRef<HTMLDivElement>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchResult[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Live search ──
  const updateSuggestions = useCallback((query: string) => {
    if (!query.trim()) {
      setSuggestions([])
      setTotalCount(0)
      return
    }
    const results = searchProducts(menuProducts, query)
    setTotalCount(results.length)
    setSuggestions(results.slice(0, MAX_SUGGESTIONS))
  }, [])

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => updateSuggestions(value), 120)
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current) }
  }, [value, updateSuggestions])

  // ── Close on outside click ──
  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  // ── State flags ──
  const showDropdown = isFocused
  const showPopular = showDropdown && !value.trim()
  const showSuggestions = showDropdown && value.trim().length > 0 && suggestions.length > 0
  const showNoResults = showDropdown && value.trim().length > 0 && suggestions.length === 0
  const hasMore = totalCount > MAX_SUGGESTIONS

  // ── Keyboard navigation ──
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setIsFocused(false)
      setSelectedIndex(-1)
      return
    }
    if (!showSuggestions) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelectSuggestion(suggestions[selectedIndex])
      }
    }
  }

  // ── Selection handlers ──
  function handleSelectSuggestion(result: SearchResult) {
    const productName = result.product.name
    if (mode === 'global') {
      router.push(`/menu?q=${encodeURIComponent(productName.trim())}`)
      onChange('')
    } else {
      onChange(productName)
    }
    setIsFocused(false)
    setSelectedIndex(-1)
    inputRef.current?.blur()
  }

  function handleSelectPopular(term: string) {
    if (mode === 'global') {
      router.push(`/menu?q=${encodeURIComponent(term.trim())}`)
      onChange('')
    } else {
      onChange(term)
    }
    setIsFocused(false)
    inputRef.current?.blur()
  }

  function handleViewAll() {
    router.push(`/menu?q=${encodeURIComponent(value.trim())}`)
    onChange('')
    setIsFocused(false)
  }

  function clearSearch() {
    onChange('')
    setSuggestions([])
    setTotalCount(0)
    setSelectedIndex(-1)
    // Keep focus on input — don't close dropdown (user may keep typing)
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className={`relative ${isCompact ? 'w-[210px]' : 'mx-auto max-w-2xl'} ${className}`}>
      {/* ── Input wrapper ── */}
      <div
        className={[
          'relative flex items-center overflow-hidden bg-white transition-all duration-300',
          isCompact
            ? 'rounded-full border shadow-none'
            : 'rounded-2xl border shadow-[0_4px_24px_rgb(0,0,0,0.06)]',
          isFocused
            ? 'border-[#006241]/40 shadow-[0_6px_32px_rgb(0,98,65,0.12)] ring-2 ring-[#006241]/10'
            : 'border-gray-200/80 hover:border-gray-300',
        ].join(' ')}
      >
        <Search
          className={[
            'pointer-events-none absolute shrink-0 transition-colors duration-200',
            isCompact ? 'left-3 size-4' : 'left-4 size-5',
            isFocused ? 'text-[#006241]' : 'text-gray-400',
          ].join(' ')}
        />

        {/* Use type="text" (not "search") to suppress browser's native X button */}
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setSelectedIndex(-1)
          }}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search menu"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-controls="search-suggestions-list"
          aria-activedescendant={selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined}
          className={[
            'w-full bg-transparent text-[#111111] placeholder:text-gray-400 focus:outline-none',
            isCompact
              ? 'min-h-[38px] py-1.5 pl-9 pr-8 text-sm'
              : 'min-h-[52px] py-3 pl-12 pr-11 text-base',
          ].join(' ')}
        />

        {/* Single X button — only when there's a value */}
        {value && (
          <button
            type="button"
            aria-label="Clear search"
            tabIndex={-1}
            onMouseDown={(e) => {
              // prevent blur-then-click race
              e.preventDefault()
              clearSearch()
            }}
            className={[
              'absolute flex items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-150 hover:bg-gray-200 hover:text-gray-700 active:scale-95',
              isCompact ? 'right-2 size-5' : 'right-3 size-7',
            ].join(' ')}
          >
            <X className={isCompact ? 'size-3' : 'size-3.5'} />
          </button>
        )}
      </div>

      {/* ── Dropdown ── */}
      {showDropdown && (showPopular || showSuggestions || showNoResults) && (
        <div
          id="search-suggestions-list"
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_16px_48px_rgba(0,0,0,0.13)] animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* ── Popular searches ── */}
          {showPopular && (
            <div className="p-3 pb-4">
              <div className="mb-2.5 flex items-center gap-2 px-2">
                <TrendingUp className="size-3.5 text-[#006241]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                  Popular Searches
                </span>
              </div>
              <div className="flex flex-wrap gap-2 px-1">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    role="option"
                    aria-selected={false}
                    onMouseDown={(e) => { e.preventDefault(); handleSelectPopular(term) }}
                    className="group flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/80 px-3.5 py-1.5 text-sm font-medium text-gray-600 transition-all duration-150 hover:border-[#006241]/30 hover:bg-[#006241]/5 hover:text-[#006241] active:scale-[0.97]"
                  >
                    <Search className="size-3 opacity-40 group-hover:opacity-100" />
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Live suggestions ── */}
          {showSuggestions && (
            <div className="pb-1 pt-2">
              <div className="mb-1 flex items-center gap-2 px-4 py-1">
                <Sparkles className="size-3.5 text-[#006241]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                  Results
                </span>
                <span className="ml-auto text-[11px] text-gray-300">{totalCount} found</span>
              </div>

              <ul>
                {suggestions.map((result, idx) => {
                  const badges = getBadgeLabels(result)
                  const isSelected = idx === selectedIndex
                  return (
                    <li
                      key={result.product.id}
                      id={`suggestion-${idx}`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <button
                        type="button"
                        onMouseDown={(e) => { e.preventDefault(); handleSelectSuggestion(result) }}
                        className={[
                          'flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100',
                          isSelected ? 'bg-[#006241]/6' : 'hover:bg-gray-50',
                        ].join(' ')}
                      >
                        {/* Thumbnail */}
                        <div className="size-10 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                          <img
                            src={result.product.image}
                            alt=""
                            aria-hidden="true"
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Name / category — primary info */}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13.5px] font-semibold leading-snug text-gray-900">
                            <HighlightedText text={result.product.name} query={value} />
                          </p>
                          <p className="mt-0.5 truncate text-xs text-gray-400">
                            {result.product.category}
                          </p>
                        </div>

                        {/* Price (right-aligned) + subtle badges */}
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          <span className="text-sm font-semibold text-[#1a1a1a]">
                            {result.product.price}
                          </span>
                          {badges.length > 0 && (
                            <div className="flex flex-wrap justify-end gap-1">
                              {badges.slice(0, 1).map((b) => (
                                <span
                                  key={b}
                                  className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-gray-500"
                                >
                                  {b}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>

              {/* View all results */}
              {hasMore && (
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); handleViewAll() }}
                  className="group flex w-full items-center justify-between border-t border-gray-100 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="text-xs font-semibold text-[#006241]">
                    View all {totalCount} results for &ldquo;{value}&rdquo;
                  </span>
                  <ArrowRight className="size-3.5 text-[#006241] transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </div>
          )}

          {/* ── Inline no-results ── */}
          {showNoResults && (
            <div className="px-5 py-6 text-center">
              <p className="text-2xl">🧁</p>
              <p className="mt-2 text-sm font-semibold text-gray-800">
                No treats found for &ldquo;{value}&rdquo;
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Try a different spelling or pick a popular search
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {['Brownies', 'Cheesecakes', 'Cookies', 'Vegan'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); handleSelectPopular(t) }}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500 transition-colors hover:border-[#006241]/30 hover:bg-[#006241]/5 hover:text-[#006241]"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
