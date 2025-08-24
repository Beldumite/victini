import { state } from './state.js';

// Utility Functions
export const formatPrice = (price) => `Rp ${price.toLocaleString()}`;

export const updateCartCount = () => {
    const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
};

export const calculateTotal = () => {
    return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

// Page Navigation
export const showPage = (pageId) => {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
    state.currentPage = pageId;
};