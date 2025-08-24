import { state } from '../state.js';
import { API } from '../api.js';
import { formatPrice, updateCartCount, calculateTotal, showPage } from '../utils.js';
import { renderReceiptPage } from './receipt.js';

// Payment Functions
export const renderPaymentPage = () => {
    const orderSummary = document.getElementById('order-summary');
    const finalTotal = document.getElementById('final-total');

    orderSummary.innerHTML = state.cart.map(item => `
        <div class="flex justify-between text-sm">
            <span>${item.name} x${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');

    finalTotal.textContent = formatPrice(calculateTotal());
};

export const processPayment = async () => {
    const payBtn = document.getElementById('pay-btn');
    payBtn.disabled = true;
    payBtn.textContent = 'Processing...';

    try {
        // Create order
        const orderItems = state.cart.map(item => item.id);
        state.currentOrder = await API.createOrder(orderItems);
        
        // Show receipt page
        renderReceiptPage();
        showPage('receiptpage');
        
        // Clear cart
        state.cart = [];
        updateCartCount();
        
    } catch (error) {
        alert('Payment failed. Please try again.');
    } finally {
        payBtn.disabled = false;
        payBtn.textContent = 'Complete Payment';
    }
};