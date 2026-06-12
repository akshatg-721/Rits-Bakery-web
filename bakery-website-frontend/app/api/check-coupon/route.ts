import { NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// CSV Parser — handles quoted cells, strips all surrounding whitespace.
// ---------------------------------------------------------------------------
function parseCSV(text: string): string[][] {
  const result: string[][] = []
  const rows = text.split(/\r?\n/)

  for (const row of rows) {
    if (!row.trim()) continue
    const cells: string[] = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < row.length; i++) {
      const char = row[i]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        cells.push(current)
        current = ''
      } else {
        current += char
      }
    }
    cells.push(current)

    // Strip surrounding quotes AND whitespace from every cell.
    result.push(cells.map((c) => c.replace(/^"|"$/g, '').trim()))
  }

  return result
}

// ---------------------------------------------------------------------------
// POST /api/check-coupon
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const rawCode = body?.code

    if (!rawCode || typeof rawCode !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Coupon code is required.' },
        { status: 400 },
      )
    }

    // Sanitize user input — uppercase + trim to match sheet entries.
    const normalizedInputCode = rawCode.trim().toUpperCase()

    const csvUrl = process.env.GOOGLE_SHEET_CSV_URL
    if (!csvUrl) {
      console.error('GOOGLE_SHEET_CSV_URL is not set.')
      return NextResponse.json(
        { success: false, message: 'System configuration error.' },
        { status: 500 },
      )
    }

    // Always fetch fresh — never serve stale promo data from cache.
    const fetchResponse = await fetch(csvUrl, { cache: 'no-store' })
    if (!fetchResponse.ok) {
      throw new Error(`Failed to fetch CSV: ${fetchResponse.statusText}`)
    }

    const csvText = await fetchResponse.text()
    const rows = parseCSV(csvText)

    if (rows.length < 2) {
      return NextResponse.json(
        { success: false, message: 'Invalid or empty coupon data.' },
        { status: 500 },
      )
    }

    // -----------------------------------------------------------------------
    // Locate columns by header name (case-insensitive).
    // -----------------------------------------------------------------------
    const headers = rows[0]
    const col = (name: string) =>
      headers.findIndex((h) => h.toLowerCase() === name.toLowerCase())

    const codeIdx      = col('code')
    const typeIdx      = col('type')
    const valueIdx     = col('value')
    const expiryIdx    = col('expirydate')
    const minAmountIdx = col('minamount') // Optional 5th column

    if (codeIdx === -1 || typeIdx === -1 || valueIdx === -1 || expiryIdx === -1) {
      console.error('CSV missing required columns. Found:', headers)
      return NextResponse.json(
        { success: false, message: 'Coupon data format error.' },
        { status: 500 },
      )
    }

    // -----------------------------------------------------------------------
    // Find matching row — sheet codes are matched case-insensitively.
    // -----------------------------------------------------------------------
    const couponRow = rows.slice(1).find((row) => {
      return (row[codeIdx] ?? '').trim().toUpperCase() === normalizedInputCode
    })

    if (!couponRow) {
      return NextResponse.json({ success: false, message: 'Invalid or expired code.' })
    }

    // -----------------------------------------------------------------------
    // Parse & strictly validate each field.
    // -----------------------------------------------------------------------

    // code — always return in uppercase, trimmed.
    const code = (couponRow[codeIdx] ?? '').trim().toUpperCase()

    // type — must be exactly 'percent' or 'flat' (normalize aliases).
    const rawType = (couponRow[typeIdx] ?? '').trim().toLowerCase()
    let type: 'percent' | 'flat'
    if (rawType === 'percent' || rawType === 'percentage') {
      type = 'percent'
    } else if (rawType === 'flat' || rawType === 'fixed') {
      type = 'flat'
    } else {
      console.error(`Unknown coupon type "${rawType}" for code ${code}`)
      return NextResponse.json({ success: false, message: 'Invalid coupon configuration.' })
    }

    // value — must be a positive finite number.
    const value = parseFloat((couponRow[valueIdx] ?? '').trim())
    if (!isFinite(value) || value <= 0) {
      return NextResponse.json({ success: false, message: 'Invalid coupon configuration.' })
    }

    // minAmount — optional, defaults to 0 if missing or unparseable.
    const rawMin   = (minAmountIdx !== -1 ? couponRow[minAmountIdx] ?? '' : '').trim()
    const parsedMin = rawMin ? parseInt(rawMin, 10) : 0
    const minAmount = isNaN(parsedMin) || parsedMin < 0 ? 0 : parsedMin

    // -----------------------------------------------------------------------
    // Expiry check — Asia/Bangkok timezone (UTC+7).
    // -----------------------------------------------------------------------
    const expiryDateStr = (couponRow[expiryIdx] ?? '').trim()
    if (!expiryDateStr) {
      return NextResponse.json({ success: false, message: 'Invalid or expired code.' })
    }

    // Parse the expiry date (expected format: YYYY-MM-DD or MM/DD/YYYY etc.)
    const expiryDate = new Date(expiryDateStr)
    if (isNaN(expiryDate.getTime())) {
      console.error(`Could not parse expiry date "${expiryDateStr}" for code ${code}`)
      return NextResponse.json({ success: false, message: 'Invalid or expired code.' })
    }

    // Get today's date in Asia/Bangkok (UTC+7) to ensure same-day codes are still valid.
    const bangkokNow = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }),
    )
    const todayBangkok = new Date(
      bangkokNow.getFullYear(),
      bangkokNow.getMonth(),
      bangkokNow.getDate(),
    )
    // Normalise expiry to start-of-day for inclusive comparison.
    const expiryStartOfDay = new Date(
      expiryDate.getFullYear(),
      expiryDate.getMonth(),
      expiryDate.getDate(),
    )
    if (expiryStartOfDay < todayBangkok) {
      return NextResponse.json({ success: false, message: 'This promo code has expired.' })
    }

    // -----------------------------------------------------------------------
    // All checks passed — return clean payload.
    // -----------------------------------------------------------------------
    return NextResponse.json({
      success: true,
      code,
      type,
      value,
      minAmount,
    })
  } catch (error) {
    console.error('Coupon validation error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to validate coupon code.' },
      { status: 500 },
    )
  }
}
