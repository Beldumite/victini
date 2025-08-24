import { state } from '../state.js';
import { API } from '../api.js';
import { formatPrice, updateCartCount } from '../utils.js';

// Menu Functions
export const loadMenu = async () => {
    const menuGrid = document.getElementById('menu-grid');
    
    try {
        state.menu = await API.getMenu();
        
        if (state.menu.length === 0) {
            menuGrid.innerHTML = '<div class="col-span-full text-center text-gray-500 py-8">No menu items available</div>';
            return;
        }

        menuGrid.innerHTML = state.menu.map(item => `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img src=${item.url} alt="cheeseCake" class="w-full bg-gradient-to-br from-amber-400 to-orange-500 h-80 object-cover">
                <div class="p-6">
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">${item.name}</h4>
                    <p class="text-2xl font-bold text-amber-600 mb-4">${formatPrice(item.price)}</p>
                    <button onclick="addToCart(${item.id})" class="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        menuGrid.innerHTML = '<div class="col-span-full text-center text-red-500 py-8">Failed to load menu</div>';
    }
};

export const addToCart = (itemId) => {
    const menuItem = state.menu.find(item => item.id === itemId);
    if (!menuItem) return;

    const existingItem = state.cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1
        });
    }
    
    updateCartCount();
};