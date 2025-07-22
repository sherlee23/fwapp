
import React, { useState, useMemo } from 'react';
import { Product, Category, OrderDataForConfirmation } from './types';
import { useCart } from './contexts/CartContext';
import { generateCategoriesFromProducts } from './constants';
import ProductCard from './components/ProductCard';
import CategoryNav from './components/CategoryNav';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import ConfirmationDialog from './components/ConfirmationDialog';
import OrderSuccessModal from './components/OrderSuccessModal';
import AdminPage from './components/AdminPanel';
import { CartIcon, SpinnerIcon } from './components/icons';

const App: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [isAdminView, setAdminView] = useState(false);
  
  // Modal states
  const [isCartOpen, setCartOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);

  // Order data flow states
  const [orderToConfirm, setOrderToConfirm] = useState<OrderDataForConfirmation | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDataForConfirmation | null>(null);
  
  const { cart, totalItems, updateProductStock, products, isLoadingProducts, errorProducts } = useCart();

  const categories = useMemo(() => generateCategoriesFromProducts(products), [products]);

  const filteredProducts = useMemo(() => {
    if (currentCategory === 'all') {
      return products;
    }
    const category = categories.find(c => c.id === currentCategory);
    return category 
      ? products.filter(product => product.category === category.name)
      : products;
  }, [products, currentCategory, categories]);

  const handleOpenCheckout = () => {
    if (cart.length === 0) return;
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOpenConfirmation = (orderData: OrderDataForConfirmation) => {
    setOrderToConfirm(orderData);
    setCheckoutOpen(false);
    setConfirmOpen(true);
  };

  const handleOrderConfirmed = async () => {
    if (orderToConfirm) {
      // Use Promise.all to update all product stocks concurrently
      await Promise.all(
        orderToConfirm.items.map(item => updateProductStock(item.id, item.quantity))
      );
      setConfirmedOrder(orderToConfirm);
      setConfirmOpen(false);
      setSuccessOpen(true);
    }
  };
  
  const handleCloseAll = () => {
    setCartOpen(false);
    setCheckoutOpen(false);
    setConfirmOpen(false);
    setSuccessOpen(false);
    setOrderToConfirm(null);
    setConfirmedOrder(null);
  };

  if (isAdminView) {
    return <AdminPage onExit={() => setAdminView(false)} />;
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <header className="bg-gradient-to-r from-primary to-secondary text-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <i className="fas fa-utensils"></i>
            锋味派美食团购
          </h1>
          <button
            onClick={() => setCartOpen(true)}
            className="relative bg-white/20 hover:bg-white/30 transition-colors rounded-full p-3"
            aria-label={`View cart with ${totalItems} items`}
          >
            <CartIcon className="h-6 w-6 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-text-dark text-xs font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <CategoryNav
          categories={categories}
          currentCategory={currentCategory}
          onSelectCategory={setCurrentCategory}
        />

        <section className="products-section mt-8">
          {isLoadingProducts ? (
              <div className="flex justify-center items-center h-64">
                  <SpinnerIcon className="w-12 h-12 text-primary" />
              </div>
          ) : errorProducts ? (
              <div className="text-center text-danger bg-red-100 p-4 rounded-lg">
                  <p><strong>Error:</strong> Failed to load products.</p>
                  <p>{errorProducts}</p>
              </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
        
      </main>

      <footer className="text-center p-6 mt-4">
        <button
            onClick={() => setAdminView(true)}
            className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors flex items-center gap-2 mx-auto"
        >
            <i className="fas fa-user-shield"></i>
            管理员入口
        </button>
      </footer>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleOpenCheckout}
      />

      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setCheckoutOpen(false)}
          onConfirm={handleOpenConfirmation}
        />
      )}

      {orderToConfirm && (
        <ConfirmationDialog
            isOpen={isConfirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={handleOrderConfirmed}
            order={orderToConfirm}
        />
      )}
      
      {confirmedOrder && (
        <OrderSuccessModal
            isOpen={isSuccessOpen}
            onClose={handleCloseAll}
            order={confirmedOrder}
        />
      )}

    </div>
  );
};

export default App;