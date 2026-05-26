import type { CartItem } from '@/lib/cart-context'

export const siteConfig = {
  name: 'The Rits Baker',
  whatsappNumber: '+91-9896695955',
}

export function checkoutWithWhatsApp(cartItems: CartItem[]) {
  const phoneNumber = siteConfig.whatsappNumber.replace(/\D/g, '')

  let message = `Hello ${siteConfig.name}! I would like to place an order:%0A%0A`
  let total = 0

  cartItems.forEach((item) => {
    message += `- ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}%0A`
    total += item.price * item.quantity
  })

  message += `%0A*Total: ₹${total}*%0A%0APlease confirm my order.`

  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
}
