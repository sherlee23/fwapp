import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { Product, CartItem } from '../types';
import { fetchProducts, updateProduct } from '../services/supabaseService';
import { useToast } from '../hooks/useToast';

const CART_STORAGE_KEY = 'food_store_cart';

interface CartContextType {
  products: Product[];
  isLoadingProducts: boolean;
  errorProducts: string | null;
  refreshProducts: () => Promise<void>;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  updateProductStock: (productId: number, quantitySold: number) => Promise<void>;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);
  const { addToast } = useToast();

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage', error);
      return [];
    }
  });

  const refreshProducts = useCallback(async () => {
    setLoadingProducts(true);
    setErrorProducts(null);
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unknown error occurred";
      setErrorProducts(message);
      addToast(`Error fetching products: ${message}`, 'error');
    } finally {
      setLoadingProducts(false);
    }
  }, [addToast]);
  
  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage', error);
    }
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      const targetProduct = products.find(p => p.id === product.id);
      if (!targetProduct) throw new Error("Product not found");

      if (!targetProduct.is_unlimited) {
          const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
          if (currentQuantityInCart >= targetProduct.stock) {
            throw new Error(`${product.name} is out of stock!`);
          }
      }

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, [products]);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct) throw new Error("Product not found");

    if (!targetProduct.is_unlimited && newQuantity > targetProduct.stock) {
        throw new Error(`Only ${targetProduct.stock} of ${targetProduct.name} available.`);
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [removeFromCart, products]);

  const updateProductStock = useCallback(async (productId: number, quantitySold: number) => {
    const productToUpdate = products.find(p => p.id === productId);
    if (!productToUpdate || productToUpdate.is_unlimited) return; // Do not update stock for unlimited products

    const newStock = productToUpdate.stock - quantitySold;
    
    // Optimistic update of local state
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, stock: newStock } : p
      )
    );

    try {
      // Persist to Supabase
      await updateProduct(productId, { stock: newStock });
    } catch (error) {
      addToast('Failed to update stock in database. Please refresh.', 'error');
      // Optional: Rollback on error
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === productId ? { ...p, stock: productToUpdate.stock } : p
        )
      );
    }
  }, [products, addToast]);


  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const value = {
    products,
    isLoadingProducts,
    errorProducts,
    refreshProducts,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateProductStock,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};