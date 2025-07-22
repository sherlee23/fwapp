import React from 'react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/useToast';
import { getProductImageUrl } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = () => {
    try {
      addToCart(product);
      addToast(`${product.name} 已添加到购物车`, 'success');
    } catch (e) {
      if (e instanceof Error) {
        addToast(e.message, 'warning');
      }
    }
  };

  const isOutOfStock = !product.is_unlimited && product.stock === 0;
  const isLowStock = !product.is_unlimited && product.stock > 0 && product.stock <= product.minStock;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col border border-gray-100">
      <div className="relative h-56 w-full">
        <img className="w-full h-full object-cover" src={getProductImageUrl(product.image)} alt={product.name} loading="lazy" />
        <div className="absolute top-3 right-3 text-4xl bg-white/70 backdrop-blur-sm p-2 rounded-lg shadow-md">{product.emoji}</div>
        
        {product.is_unlimited && (
            <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              无限预购
            </div>
        )}
        {isOutOfStock && (
          <div className="absolute top-3 left-3 bg-danger text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            已售完
          </div>
        )}
        {isLowStock && (
          <div className="absolute top-3 left-3 bg-warning text-text-dark text-xs font-bold px-3 py-1 rounded-full shadow">
            库存紧张
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-text-dark">{product.name}</h3>
        {!product.is_unlimited && <p className="text-sm text-text-light mb-1">库存: {product.stock}</p>}
        <p className="text-sm text-text-light mb-3">{product.category}</p>
        
        <div className="mt-auto flex justify-between items-center pt-3">
          <p className="text-2xl font-extrabold text-primary">RM{product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="bg-primary text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-primary-hover active:scale-95 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
            aria-label={`Add ${product.name} to cart`}
          >
            <i className="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;