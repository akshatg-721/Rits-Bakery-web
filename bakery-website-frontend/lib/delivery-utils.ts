const TIMEZONE = 'Asia/Bangkok'

export const TIME_SLOTS = [
  { id: 'morning', label: 'Morning (9:00 AM - 12:00 PM)', cutoffHour: 12 },
  { id: 'afternoon', label: 'Afternoon (1:00 PM - 4:00 PM)', cutoffHour: 16 },
  { id: 'evening', label: 'Evening (5:00 PM - 9:00 PM)', cutoffHour: 21 },
] as const

export type TimeSlotId = (typeof TIME_SLOTS)[number]['id']

function getBangkokDate(date: Date): Date {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const parts = formatter.formatToParts(date)
  const year = parseInt(parts.find(p => p.type === 'year')!.value, 10)
  const month = parseInt(parts.find(p => p.type === 'month')!.value, 10) - 1
  const day = parseInt(parts.find(p => p.type === 'day')!.value, 10)
  const hour = parseInt(parts.find(p => p.type === 'hour')!.value, 10)
  const minute = parseInt(parts.find(p => p.type === 'minute')!.value, 10)
  
  return new Date(year, month, day, hour, minute)
}

function formatDateForDisplay(date: Date): string {
  return date.toLocaleDateString('en-US', {
    timeZone: TIMEZONE,
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  })
}

export function getValidDeliveryDates(): { value: string; label: string; isTomorrow: boolean }[] {
  const bkkNow = getBangkokDate(new Date())
  const currentHour = bkkNow.getHours()
  let startDaysFromToday = 1
  
  if (currentHour >= 21) {
    startDaysFromToday = 2
  }

  // Calculate tomorrow's date in BKK for comparison
  const tomorrow = new Date(bkkNow)
  tomorrow.setDate(bkkNow.getDate() + 1)
  const tomorrowDateStr = tomorrow.toISOString().split('T')[0]

  const dates: { value: string; label: string; isTomorrow: boolean }[] = []
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(bkkNow)
    date.setDate(bkkNow.getDate() + startDaysFromToday + i)
    const dateValue = date.toISOString().split('T')[0]
    dates.push({
      value: dateValue,
      label: i === 0 && startDaysFromToday === 1 ? 'Tomorrow' : formatDateForDisplay(date),
      isTomorrow: dateValue === tomorrowDateStr,
    })
  }

  return dates
}

export function getAvailableTimeSlots(selectedDateValue: string): { id: TimeSlotId; label: string; disabled: boolean }[] {
  const bkkNow = getBangkokDate(new Date())
  const dates = getValidDeliveryDates()
  const selectedDate = dates.find(d => d.value === selectedDateValue)

  if (!selectedDate) {
    return TIME_SLOTS.map(slot => ({ ...slot, disabled: false }))
  }

  if (!selectedDate.isTomorrow) {
    return TIME_SLOTS.map(slot => ({ ...slot, disabled: false }))
  }

  const currentHour = bkkNow.getHours()

  return TIME_SLOTS.map(slot => ({
    ...slot,
    disabled: currentHour >= slot.cutoffHour,
  }))
}
