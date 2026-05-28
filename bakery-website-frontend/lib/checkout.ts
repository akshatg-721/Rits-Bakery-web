import type { CartItem } from '@/lib/cart-context'
import { siteConfig } from '@/lib/data'

const MAX_WHATSAPP_MESSAGE_LENGTH = 1800

export function checkoutWithWhatsApp(cartItems: CartItem[]) {
  const phoneNumber = siteConfig.whatsappNumber.replace(/\D/g, '')

  if (!phoneNumber || cartItems.length === 0) return

  let message = `Hello ${siteConfig.name}! I would like to place an order:\n\n`
  let total = 0

  cartItems.forEach((item) => {
    const quantity = Math.max(1, Math.min(item.quantity, 99))
    const lineTotal = item.price * quantity

    message += `- ${item.name} (x${quantity}) - ฿${lineTotal}\n`
    total += lineTotal
  })

  message += `\n*Total: ฿${total}*\n\nPlease confirm my order.`

  if (message.length > MAX_WHATSAPP_MESSAGE_LENGTH) {
    message = `Hello ${siteConfig.name}! I would like to place an order with ${cartItems.length} item types. Please confirm availability.`
  }

  const checkoutUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  const checkoutWindow = window.open(checkoutUrl, '_blank', 'noopener,noreferrer')

  if (checkoutWindow) {
    checkoutWindow.opener = null
  }
}
