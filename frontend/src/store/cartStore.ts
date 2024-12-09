import { create } from "zustand";
import { CartType } from "../types/type";
import { CartSchema } from "../schema/productSchema";

type CartState = {
    cart: CartType[];
    addToCart: (product: CartType) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
};

//crear el useCartStore
export const useCartStore = create<CartState>((set) => ({
    cart: (() => {
        try {
            const storedCart = JSON.parse(localStorage.getItem("cart") || "[]").map((item: CartType) => ({
                ...item,
                price: Number(item.price),
                quantity: Number(item.quantity),
            }));
            return CartSchema.array().parse(storedCart);
        } catch (error) {
            console.error(error);
            return [];
        }
    })(),
    addToCart: (product) =>
        set((state) => {
            const existingProduct = state.cart.find(
                (item) => item._id === product._id
            );
            let updatedCart;
            if (existingProduct) {
                updatedCart = state.cart.map((item) =>
                    item._id === product._id
                        ? {
                            ...item,
                            quantity: item.quantity + product.quantity,
                        }
                        : item
                );
            } else {
                updatedCart = [...state.cart, product];
            }
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return { cart: updatedCart };
        }),
    removeFromCart: (productId) =>
        set((state) => {
            const updatedCart = state.cart.filter(
                (item) => item._id !== productId
            );
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return { cart: updatedCart };
        }),
    clearCart: () =>
        set(() => {
            localStorage.removeItem("cart");
            return { cart: [] };
        }),
}));
