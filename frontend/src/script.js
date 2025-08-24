import { state } from './state.js';
import { API } from './api.js';
import { formatPrice, updateCartCount, calculateTotal, showPage } from './utils.js';
import { loadMenu, addToCart } from './pages/menu.js';
import { renderCartPage, removeFromCart, updateQuantity } from './pages/cart.js';
import { renderPaymentPage, processPayment } from './pages/payment.js';
import { renderReceiptPage } from './pages/receipt.js';

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadMenu();

    // Navigation
    document.getElementById('cart-btn').onclick = () => {
        renderCartPage();
        showPage('cartpage');
    };

    document.getElementById('back-to-menu').onclick = () => showPage('homepage');
    document.getElementById('back-to-cart').onclick = () => {
        renderCartPage();
        showPage('cartpage');
    };

    // Checkout
    document.getElementById('checkout-btn').onclick = () => {
        renderPaymentPage();
        showPage('paymentpage');
    };

    // Payment
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.onchange = () => {
            state.paymentMethod = radio.value;
            document.getElementById('pay-btn').disabled = false;
        };
    });

    document.getElementById('pay-btn').onclick = processPayment;

    // Receipt actions
    document.getElementById('print-btn').onclick = () => window.print();
    document.getElementById('new-order-btn').onclick = () => {
        state.currentOrder = null;
        state.paymentMethod = null;
        showPage('homepage');
    };
});