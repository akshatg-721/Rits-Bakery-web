import type { CartItem } from '@/lib/cart-context'
import { siteConfig } from '@/lib/data'

const MAX_WHATSAPP_MESSAGE_LENGTH = 1800
export const LINE_ORDER_URL = 'https://line.me/R/ti/p/%40553mbcam'
export const WHATSAPP_ORDER_URL =
  'https://wa.me/66972932849?text=Hi%2C%20I%20would%20like%20to%20place%20an%20order'

export function getWhatsAppOrderUrl(message = 'Hello The Rits Baker! I would like to place an order.') {
  const phoneNumber = siteConfig.whatsappNumber.replace(/\D/g, '')

  if (!phoneNumber) return '#'

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}

export function buildCheckoutOrderMessage(cartItems: CartItem[]) {
  let message = `Hello ${siteConfig.name}! I would like to place an order:\n\n`
  let total = 0

  cartItems.forEach((item) => {
    const quantity = Math.max(1, Math.min(item.quantity, 99))
    const lineTotal = item.price * quantity
    const itemName = item.vegan ? `${item.name} (Vegan)` : item.name

    message += `- ${itemName} (x${quantity}) - ฿${lineTotal}\n`
    total += lineTotal
  })

  message += `\n*Total: ฿${total}*\n\nPlease confirm my order.`

  return message
}

export function checkoutWithLine(cartItems: CartItem[]) {
  if (cartItems.length === 0) return

  const orderString = buildCheckoutOrderMessage(cartItems)
  const encodedMessage = encodeURIComponent(orderString)

  const checkoutWindow = window.open(
    `https://line.me/R/oaMessage/%40553mbcam/?${encodedMessage}`,
    '_blank',
    'noopener,noreferrer',
  )

  if (checkoutWindow) {
    checkoutWindow.opener = null
  }
}

export function checkoutWithWhatsApp(cartItems: CartItem[]) {
  const phoneNumber = siteConfig.whatsappNumber.replace(/\D/g, '')

  if (!phoneNumber || cartItems.length === 0) return

  let message = buildCheckoutOrderMessage(cartItems)

  if (message.length > MAX_WHATSAPP_MESSAGE_LENGTH) {
    message = `Hello ${siteConfig.name}! I would like to place an order with ${cartItems.length} item types. Please confirm availability.`
  }

  const checkoutUrl = getWhatsAppOrderUrl(message)
  const checkoutWindow = window.open(checkoutUrl, '_blank', 'noopener,noreferrer')

  if (checkoutWindow) {
    checkoutWindow.opener = null
  }
}
