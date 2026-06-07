import { NextResponse } from 'next/server'

/**
 * Simple CSV parser that handles basic quoted values.
 */
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
    // Clean up quotes from results
    result.push(cells.map((c) => c.replace(/^"|"$/g, '').trim()))
  }
  return result
}

export async function POST(request: Request) {
  try {
    const { code } = await request.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Coupon code is required.' },
        { status: 400 },
      )
    }

    const csvUrl = process.env.GOOGLE_SHEET_CSV_URL
    if (!csvUrl) {
      console.error('GOOGLE_SHEET_CSV_URL is not defined in environment variables.')
      return NextResponse.json(
        { success: false, message: 'System configuration error.' },
        { status: 500 },
      )
    }

    // Fetch the CSV data
    const response = await fetch(csvUrl, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`)
    }

    const csvText = await response.text()
    const rows = parseCSV(csvText)

    if (rows.length < 2) {
      return NextResponse.json(
        { success: false, message: 'Invalid or empty coupon data.' },
        { status: 500 },
      )
    }

    const headers = rows[0]
    const codeIdx = headers.findIndex((h) => h.toLowerCase() === 'code')
    const typeIdx = headers.findIndex((h) => h.toLowerCase() === 'type')
    const valueIdx = headers.findIndex((h) => h.toLowerCase() === 'value')
    const expiryIdx = headers.findIndex((h) => h.toLowerCase() === 'expirydate')

    if (codeIdx === -1 || typeIdx === -1 || valueIdx === -1 || expiryIdx === -1) {
      console.error('CSV missing required columns. Headers found:', headers)
      return NextResponse.json(
        { success: false, message: 'Coupon data format error.' },
        { status: 500 },
      )
    }

    // Find the matching code (case-insensitive)
    const normalizedInputCode = code.trim().toLowerCase()
    const couponRow = rows.slice(1).find((row) => {
      const rowCode = row[codeIdx]?.toLowerCase()
      return rowCode === normalizedInputCode
    })

    if (!couponRow) {
      return NextResponse.json({
        success: false,
        message: 'Invalid or expired code',
      })
    }

    let type = couponRow[typeIdx]?.toLowerCase() // 'flat' or 'percent'
    
    // Normalize type names
    if (type === 'percentage') type = 'percent'
    if (type === 'fixed') type = 'flat'
    
    const value = parseFloat(couponRow[valueIdx] || '0')
    const expiryDateStr = couponRow[expiryIdx]

    // Validation
    if (isNaN(value) || value <= 0) {
      return NextResponse.json({
        success: false,
        message: 'Invalid coupon configuration.',
      })
    }

    const expiryDate = new Date(expiryDateStr)
    const now = new Date()

    // Check if expiry date is valid and not in the past
    // We compare start of day for current date to be inclusive of the expiry day
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    if (isNaN(expiryDate.getTime()) || expiryDate < today) {
      return NextResponse.json({
        success: false,
        message: 'Invalid or expired code',
      })
    }

    return NextResponse.json({
      success: true,
      code: couponRow[codeIdx],
      type,
      value,
    })
  } catch (error) {
    console.error('Coupon validation error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to validate coupon code.' },
      { status: 500 },
    )
  }
}
