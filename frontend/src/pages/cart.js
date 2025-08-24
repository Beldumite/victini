import { state } from '../state.js';
import { formatPrice, updateCartCount, calculateTotal, showPage } from '../utils.js';

// Cart Functions
export const removeFromCart = (itemId) => {
    state.cart = state.cart.filter(item => item.id !== itemId);
    updateCartCount();
    renderCartPage();
};

export const updateQuantity = (itemId, change) => {
    const item = state.cart.find(item => item.id === itemId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        updateCartCount();
        renderCartPage();
    }
};

export const renderCartPage = () => {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (state.cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-8">
                <p class="text-gray-500 text-lg">Your cart is empty</p>
                <button onclick="showPage('homepage')" class="mt-4 text-amber-600 hover:text-amber-700">
                    Continue Shopping
                </button>
            </div>
        `;
        checkoutBtn.disabled = true;
        cartTotal.textContent = formatPrice(0);
        return;
    }

    cartItems.innerHTML = state.cart.map(item => `
        <div class="bg-white rounded-lg p-4 shadow">
            <div class="flex justify-between items-center">
                <div class="flex-1">
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-amber-600 font-bold">${formatPrice(item.price)}</p>
                </div>
                <div class="flex items-center space-x-3">
                    <button onclick="updateQuantity(${item.id}, -1)" class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                        -
                    </button>
                    <span class="font-semibold w-8 text-center">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                        +
                    </button>
                    <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 ml-4">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    const total = calculateTotal();
    cartTotal.textContent = formatPrice(total);
    checkoutBtn.disabled = false;
};