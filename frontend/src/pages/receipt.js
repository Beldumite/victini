import { state } from '../state.js';
import { formatPrice } from '../utils.js';

// Receipt Functions
export const renderReceiptPage = () => {
    if (!state.currentOrder) return;

    document.getElementById('receipt-order-id').textContent = `#${state.currentOrder.id}`;
    document.getElementById('receipt-date').textContent = new Date().toLocaleDateString();
    document.getElementById('receipt-payment').textContent = state.paymentMethod === 'bni' ? 'Bank BNI' : 'Cash';
    document.getElementById('receipt-total').textContent = formatPrice(state.currentOrder.total);

    // Show items from the order
    const receiptItems = document.getElementById('receipt-items');
    const orderItems = JSON.parse(state.currentOrder.items);
    
    receiptItems.innerHTML = orderItems.map(itemId => {
        const menuItem = state.menu.find(item => item.id === itemId);
        return `
            <div class="flex justify-between">
                <span>${menuItem ? menuItem.name : 'Unknown Item'}</span>
                <span>${menuItem ? formatPrice(menuItem.price) : '-'}</span>
            </div>
        `;
    }).join('');
};