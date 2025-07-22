import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/useToast';
import { CloseIcon, TrashIcon } from './icons';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartItemRow: React.FC<{
  item: ReturnType<typeof useCart>['cart'][0];
}> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    const { addToast } = useToast();

    const handleQuantityChange = (newQuantity: number) => {
      try {
        updateQuantity(item.id, newQuantity);
      } catch (e) {
        if (e instanceof Error) {
          addToast(e.message, 'warning');
        }
      }
    };
    
    return (
        <div className="flex items-center gap-4 py-4">
            <div className="text-4xl bg-gray-100 p-2 rounded-lg">{item.emoji}</div>
            <div className="flex-grow">
                <p className="font-semibold text-text-dark">{item.name}</p>
                <p className="text-sm text-primary font-bold">RM{item.price.toFixed(2)}</p>
                {item.is_unlimited && <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">预购</span>}
                <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => handleQuantityChange(item.quantity - 1)} className="w-7 h-7 rounded-md bg-border-light text-text-dark hover:bg-gray-300 transition-colors active:scale-90">-</button>
                    <input
                        type="number"
                        value={item.quantity}
                        onChange={e => handleQuantityChange(parseInt(e.target.value) || 1)}
                        className="w-12 text-center border border-border-light rounded-md h-7"
                        max={item.is_unlimited ? undefined : item.stock}
                        min="1"
                    />
                    <button onClick={() => handleQuantityChange(item.quantity + 1)} className="w-7 h-7 rounded-md bg-border-light text-text-dark hover:bg-gray-300 transition-colors active:scale-90">+</button>
                </div>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                <TrashIcon className="w-5 h-5"/>
            </button>
        </div>
    );
}


const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, totalPrice, totalItems } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <header className="flex items-center justify-between p-5 border-b border-border-light">
          <h2 className="text-xl font-bold text-text-dark">购物车</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="flex-grow overflow-y-auto px-5 divide-y divide-border-light">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-text-light">
              <span className="text-6xl mb-4">🛍️</span>
              <h3 className="font-semibold text-lg">购物车是空的</h3>
              <p className="text-sm">快去选购美食吧！</p>
            </div>
          ) : (
            cart.map(item => (
                <CartItemRow key={item.id} item={item} />
            ))
          )}
        </div>

        <footer className="p-5 border-t border-border-light bg-gray-50">
          <div className="flex justify-between items-center mb-4 text-lg">
            <span className="font-semibold text-text-dark">总计:</span>
            <span className="font-extrabold text-primary text-2xl">RM{totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={totalItems === 0}
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-primary-hover transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <i className="fa fa-credit-card"></i>
            立即结账
          </button>
        </footer>
      </div>
    </>
  );
};

export default CartSidebar;