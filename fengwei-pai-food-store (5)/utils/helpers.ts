
import { OrderDataForConfirmation, CartItem } from '../types';
import { SELF_PICKUP_ADDRESS, PRODUCT_IMAGE_BASE_URL } from '../constants';

export const getProductImageUrl = (imageFilename: string | null | undefined): string => {
    // 1. Trim whitespace from the filename
    const trimmedFilename = imageFilename?.trim();

    // 2. Check if the filename is valid and not empty
    if (trimmedFilename) {
        // 3. Remove any leading slashes to prevent double slashes in the URL
        const cleanedFilename = trimmedFilename.replace(/^\/+/, '');
        
        // 4. URL-encode the filename to handle special characters like spaces
        const encodedFilename = encodeURIComponent(cleanedFilename);
        
        // 5. Construct the final URL, ensuring no double slashes between base and filename
        return `${PRODUCT_IMAGE_BASE_URL.replace(/\/$/, '')}/${encodedFilename}`;
    }
    
    // 6. Return a placeholder if no valid filename is provided
    return 'https://via.placeholder.com/300x200.png?text=No+Image';
};

export const buildWhatsAppMessage = (order: OrderDataForConfirmation): string => {
    let msg = `🛎️ *锋味派新订单 #${order.orderId}*\n\n`;
    msg += `👤 *客户信息*\n`;
    msg += `  - 姓名: ${order.name}\n`;
    msg += `  - 电话: ${order.phone}\n`;
    msg += `  - 取货: ${order.delivery === 'self-pickup' ? '自取' : 'Lalamove'}\n`;
    msg += `  - 付款方式: ${order.paymentMethod}\n`;
    if (order.delivery === 'self-pickup') {
        msg += `  - 地址: ${SELF_PICKUP_ADDRESS}\n`;
    }
    msg += `\n🛒 *订单明细*\n`;
    order.items.forEach((item: CartItem) => {
        const itemType = item.is_unlimited ? ' (预购)' : '';
        msg += `${item.emoji} ${item.name}${itemType} × ${item.quantity} = RM${(item.quantity * item.price).toFixed(2)}\n`;
    });
    msg += `\n💰 *总金额: RM${order.total.toFixed(2)}*\n`;
    msg += `📝 *备注*: ${order.remarks || '无'}\n`;
    msg += `\n📅 *下单时间*: ${new Date().toLocaleString('en-MY')}`;
    return msg;
};