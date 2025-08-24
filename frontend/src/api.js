// API Functions
export const API = {
    async getMenu() {
        try {
            const response = await fetch('http://localhost:8080/menu');
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch menu:', error);
            return [];
        }
    },

    async createOrder(items) {
        try {
            const response = await fetch('http://localhost:8080/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items })
            });
            return await response.json();
        } catch (error) {
            console.error('Failed to create order:', error);
            throw error;
        }
    },

    async getOrder(id) {
        try {
            const response = await fetch(`http://localhost:8080/order/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch order:', error);
            throw error;
        }
    }
};