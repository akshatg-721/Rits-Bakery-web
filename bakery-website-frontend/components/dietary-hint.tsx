'use client'

import { useEffect, useState } from 'react'

const HINT_KEY = 'rits:dietary-hint-seen'

/**
 * One-time onboarding hint that teaches users about the "Details ▾" expand interaction.
 * Shown only until the user expands any product card for the first time.
 * After that, the flag is stored in localStorage and the hint never reappears.
 */
export function DietaryHint() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show if the user hasn't interacted with dietary info yet
    if (!localStorage.getItem(HINT_KEY)) {
      setVisible(true)
    }

    // Hide as soon as the user expands any card
    const handler = () => setVisible(false)
    window.addEventListener('rits:dietary-first-expand', handler)
    return () => window.removeEventListener('rits:dietary-first-expand', handler)
  }, [])

  if (!visible) return null

  return (
    <p
      className="mb-5 text-center text-[11px] tracking-wide text-neutral-400"
      role="note"
      aria-live="polite"
    >
      ℹ︎&nbsp; Tap{' '}
      <span className="font-medium text-neutral-500">&ldquo;Details&rdquo;</span>
      {' '}on any product to view dietary information and allergens.
    </p>
  )
}
