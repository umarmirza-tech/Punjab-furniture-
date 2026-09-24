import { CartItem, Product, CustomerOrderInfo } from '../types';
import { BUSINESS_CONFIG } from '../config/business';

/**
 * Generates an official WhatsApp deep link for an inquiry or order
 */
export function createProductWhatsAppLink(
  product: Product,
  quantity = 1,
  customer?: Partial<CustomerOrderInfo>,
  selectedColor?: string,
  selectedSize?: string
): string {
  const priceDisplay = product.price > 0 ? `₹${(product.price * quantity).toLocaleString('en-IN')}` : 'Custom Quotation Request';
  
  const lines = [
    `Hello Punjab Furnitures,`,
    ``,
    `I am interested in:`,
    `Product: ${product.name}`,
    `Quantity: ${quantity}`,
    `Price: ${priceDisplay}`,
    selectedColor ? `Color: ${selectedColor}` : null,
    selectedSize ? `Size: ${selectedSize}` : null,
    `My name: ${customer?.fullName || ''}`,
    `My phone: ${customer?.phone || ''}`,
    `Delivery location: ${customer?.city ? `${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}` : 'Saharanpur / Nearby'}`
  ].filter(line => line !== null);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${text}`;
}

export function createCartWhatsAppOrderLink(
  items: CartItem[],
  totalAmount: number,
  customer?: Partial<CustomerOrderInfo>
): string {
  const itemsText = items.map((item, idx) => {
    const itemTotal = item.product.price > 0 ? `₹${(item.product.price * item.quantity).toLocaleString('en-IN')}` : 'Quotation';
    const variant = [item.selectedColor, item.selectedSize].filter(Boolean).join(', ');
    return `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}${variant ? ` | ${variant}` : ''}) - ${itemTotal}`;
  }).join('\n');

  const lines = [
    `Hello Punjab Furnitures,`,
    ``,
    `I would like to place an order from your website:`,
    ``,
    itemsText,
    ``,
    `Total Amount: ₹${totalAmount.toLocaleString('en-IN')}`,
    ``,
    `Customer Details:`,
    `My name: ${customer?.fullName || ''}`,
    `My phone: ${customer?.phone || ''}`,
    `Delivery location: ${customer?.address ? `${customer.address}, ${customer.city || ''} ${customer.pincode || ''}` : 'To be confirmed on call'}`,
    customer?.deliveryNotes ? `Notes: ${customer.deliveryNotes}` : null,
    ``,
    `Please confirm product availability and showroom delivery schedule.`
  ].filter(line => line !== null);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${text}`;
}

export function createGeneralInquiryWhatsAppLink(topic?: string): string {
  const lines = [
    `Hello Punjab Furnitures,`,
    `I would like to enquire about furniture at your Saharanpur showroom${topic ? ` regarding ${topic}` : ''}.`,
    `Could you please share more details and catalogue options?`
  ];
  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${text}`;
}
