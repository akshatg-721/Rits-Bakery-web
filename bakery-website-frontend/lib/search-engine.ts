/**
 * Premium search engine for The Rits Baker menu.
 *
 * Features:
 *  - Weighted ranking: exact name > partial name > badge/attribute > category > description
 *  - Typo tolerance via Levenshtein distance (fuzzy matching)
 *  - Badge/attribute search: Vegan, High Protein, Top Seller, Ekadashi, Gluten Free, No Sugar
 *  - Synonym mapping: vrat/fasting → ekadashi, protein → high protein, gluten → gluten free
 *  - Tag search
 *  - Match highlighting
 */

import type { MenuProductWithCategory } from '@/lib/menu-data'

export const POPULAR_SEARCHES = [
  'Brownies',
  'Cheesecakes',
  'Cookies',
  'Ekadashi',
  'Vegan',
  'High Protein',
  'No Sugar',
]

// ─── Typo correction dictionary ───────────────────────────────────────────────
// Maps common misspellings / synonyms → canonical search forms
const TYPO_MAP: Record<string, string> = {
  // Brownies
  browni: 'brownie',
  brownies: 'brownie',
  brownie: 'brownie',
  // Cheesecakes
  chesecake: 'cheesecake',
  cheescake: 'cheesecake',
  cheesecak: 'cheesecake',
  cheesecake: 'cheesecake',
  // Biscoff
  biscof: 'biscoff',
  biscoff: 'biscoff',
  // Cookies
  cooki: 'cookie',
  cookis: 'cookies',
  // Chocolate
  chocolat: 'chocolate',
  choclate: 'chocolate',
  chocholate: 'chocolate',
  // Vegan
  veagn: 'vegan',
  vegn: 'vegan',
  // Protein
  protien: 'protein',
  protin: 'protein',
}

// ─── Attribute synonym map ────────────────────────────────────────────────────
// Maps search synonyms → canonical attribute key used in scoring
const ATTRIBUTE_SYNONYMS: Record<string, string> = {
  // Ekadashi
  ekadashi: 'ekadashi',
  ekadasi: 'ekadashi',
  ekaadashi: 'ekadashi',
  vrat: 'ekadashi',
  fast: 'ekadashi',
  fasting: 'ekadashi',
  upvas: 'ekadashi',
  // Vegan
  vegan: 'vegan',
  plantbased: 'vegan',
  'plant-based': 'vegan',
  // High Protein
  protein: 'high protein',
  'high protein': 'high protein',
  highprotein: 'high protein',
  'high-protein': 'high protein',
  // Gluten Free
  gluten: 'gluten free',
  'gluten free': 'gluten free',
  glutenfree: 'gluten free',
  'gluten-free': 'gluten free',
  'no gluten': 'gluten free',
  // No Sugar
  'no sugar': 'no sugar',
  nosugar: 'no sugar',
  sugarfree: 'no sugar',
  'sugar free': 'no sugar',
  'sugar-free': 'no sugar',
  diabetic: 'no sugar',
  // Top Seller
  'top seller': 'top seller',
  bestseller: 'top seller',
  'best seller': 'top seller',
  popular: 'top seller',
  topseller: 'top seller',
}

// ─── Levenshtein distance ─────────────────────────────────────────────────────
function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  )
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
      }
    }
  }
  return dp[m][n]
}

// ─── Normalise & correct typos ────────────────────────────────────────────────
function normalise(text: string): string {
  return text.trim().toLowerCase()
}

/** Apply dictionary correction then try fuzzy correction on each token. */
function correctQuery(raw: string): string {
  const tokens = normalise(raw).split(/\s+/)
  return tokens
    .map((token) => {
      // Direct typo-map hit
      if (TYPO_MAP[token]) return TYPO_MAP[token]
      // Fuzzy: if token is ≥4 chars, check Levenshtein distance ≤2 against all keys
      if (token.length >= 4) {
        for (const [typo, canonical] of Object.entries(TYPO_MAP)) {
          if (Math.abs(token.length - typo.length) <= 2 && levenshtein(token, typo) <= 2) {
            return canonical
          }
        }
      }
      return token
    })
    .join(' ')
}

// ─── Resolve attribute synonym ────────────────────────────────────────────────
/** Returns the canonical attribute key if the query matches a synonym, else null. */
function resolveAttributeSynonym(q: string): string | null {
  // Exact key match first
  if (ATTRIBUTE_SYNONYMS[q]) return ATTRIBUTE_SYNONYMS[q]
  // Check if any multi-word key matches
  for (const [syn, canonical] of Object.entries(ATTRIBUTE_SYNONYMS)) {
    if (q.includes(syn) || syn.includes(q)) return canonical
  }
  return null
}

// ─── Score constants ──────────────────────────────────────────────────────────
const SCORE = {
  EXACT_NAME: 100,
  STARTS_NAME: 80,
  PARTIAL_NAME: 60,
  ATTRIBUTE: 70,   // ekadashi / vegan / high protein / gluten free / no sugar / top seller
  BADGE: 55,       // badge field match (secondary)
  CATEGORY_EXACT: 50,
  CATEGORY_PARTIAL: 40,
  TAG: 35,
  DESCRIPTION: 20,
}

export interface SearchResult {
  product: MenuProductWithCategory
  score: number
  /** Which fields matched, for highlighting */
  matchedFields: string[]
}

// ─── Build attribute strings for a product ───────────────────────────────────
function getProductAttributes(product: MenuProductWithCategory): string[] {
  const attrs: string[] = []

  if (product.vegan || product.name.toLowerCase().includes('vegan')) {
    attrs.push('vegan')
  }
  if (product.isHighProtein) {
    attrs.push('high protein')
  }
  if (product.isTopSeller) {
    attrs.push('top seller')
  }

  // Tags-based attributes
  const tags = (product.tags ?? []).map(t => t.toLowerCase())
  if (tags.some(t => t.includes('ekadashi'))) {
    attrs.push('ekadashi')
  }
  if (tags.some(t => t.includes('gluten free') || t.includes('gluten-free'))) {
    attrs.push('gluten free')
  }
  if (tags.some(t => t.includes('no sugar') || t.includes('sugar free'))) {
    attrs.push('no sugar')
  }

  return attrs
}

// ─── Main search function ─────────────────────────────────────────────────────
export function searchProducts(
  products: MenuProductWithCategory[],
  rawQuery: string,
): SearchResult[] {
  if (!rawQuery.trim()) return []

  const query = correctQuery(rawQuery)
  const q = normalise(query)

  // Check if query resolves to a known attribute
  const resolvedAttribute = resolveAttributeSynonym(q)

  const results: SearchResult[] = []

  for (const product of products) {
    const name = normalise(product.name)
    const category = normalise(product.category)
    const description = normalise(product.description ?? '')
    const tags = (product.tags ?? []).map(normalise)
    const attributes = getProductAttributes(product)

    let score = 0
    const matchedFields: string[] = []

    // ── Attribute/badge matching (highest priority for dietary/special searches) ──
    if (resolvedAttribute) {
      if (attributes.includes(resolvedAttribute)) {
        score += SCORE.ATTRIBUTE
        matchedFields.push('attribute')
      }
    } else {
      // Raw badge string check (partial — e.g. "protein" without resolution)
      if (attributes.some((a) => a.includes(q) || q.includes(a.split(' ')[0]))) {
        score += SCORE.BADGE
        matchedFields.push('badge')
      }
    }

    // ── Name matching ──
    if (name === q) {
      score += SCORE.EXACT_NAME
      if (!matchedFields.includes('name')) matchedFields.push('name')
    } else if (name.startsWith(q)) {
      score += SCORE.STARTS_NAME
      if (!matchedFields.includes('name')) matchedFields.push('name')
    } else if (name.includes(q)) {
      score += SCORE.PARTIAL_NAME
      if (!matchedFields.includes('name')) matchedFields.push('name')
    } else {
      // Multi-token: check if all tokens appear in name
      const tokens = q.split(/\s+/).filter(Boolean)
      if (tokens.length > 1 && tokens.every((t) => name.includes(t))) {
        score += SCORE.PARTIAL_NAME - 5
        if (!matchedFields.includes('name')) matchedFields.push('name')
      }
    }

    // ── Category matching ──
    if (category === q) {
      score += SCORE.CATEGORY_EXACT
      if (!matchedFields.includes('category')) matchedFields.push('category')
    } else if (category.includes(q)) {
      score += SCORE.CATEGORY_PARTIAL
      if (!matchedFields.includes('category')) matchedFields.push('category')
    }

    // ── Tag matching ──
    const tagMatch = tags.some((t) => t.includes(q) || q.includes(t))
    if (tagMatch) {
      score += SCORE.TAG
      if (!matchedFields.includes('tags')) matchedFields.push('tags')
    }

    // ── Description matching ──
    if (description.includes(q)) {
      score += SCORE.DESCRIPTION
      if (!matchedFields.includes('description')) matchedFields.push('description')
    } else {
      // multi-token description
      const tokens = q.split(/\s+/).filter(Boolean)
      if (tokens.length > 1 && tokens.filter((t) => description.includes(t)).length >= 2) {
        score += SCORE.DESCRIPTION - 5
        if (!matchedFields.includes('description')) matchedFields.push('description')
      }
    }

    if (score > 0) {
      results.push({ product, score, matchedFields })
    }
  }

  return results.sort((a, b) => b.score - a.score)
}

// ─── Highlight helper ─────────────────────────────────────────────────────────
/**
 * Returns an array of {text, highlight} segments.
 * The caller renders highlighted segments in a <mark> or styled span.
 */
export function highlightText(
  text: string,
  rawQuery: string,
): Array<{ text: string; highlight: boolean }> {
  if (!rawQuery.trim()) return [{ text, highlight: false }]

  const query = correctQuery(rawQuery)
  const q = normalise(query)
  const lowerText = normalise(text)

  const segments: Array<{ text: string; highlight: boolean }> = []
  let lastIndex = 0
  let searchStart = 0

  while (searchStart < lowerText.length) {
    const idx = lowerText.indexOf(q, searchStart)
    if (idx === -1) break

    if (idx > lastIndex) {
      segments.push({ text: text.slice(lastIndex, idx), highlight: false })
    }
    segments.push({ text: text.slice(idx, idx + q.length), highlight: true })
    lastIndex = idx + q.length
    searchStart = lastIndex
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), highlight: false })
  }

  return segments.length > 0 ? segments : [{ text, highlight: false }]
}
