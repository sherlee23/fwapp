
import React from 'react';
import { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  currentCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ categories, currentCategory, onSelectCategory }) => {
  
  const allCategoriesWithAllOption = [{ id: 'all', name: '全部', emoji: '🍽️' }, ...categories];

  const handleCategoryClick = (id: string) => {
    onSelectCategory(id);
  };

  return (
    <nav className="category-nav mb-8 sticky top-[88px] bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-md z-30" aria-label="Product Categories">
      <div className="flex overflow-x-auto gap-2 pb-2 -mb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`.category-nav-links::-webkit-scrollbar { display: none; }`}</style>
        {allCategoriesWithAllOption.map(cat => {
          const isActive = currentCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex-shrink-0 flex items-center gap-2 border-2
                ${isActive 
                  ? 'bg-primary border-primary text-white shadow' 
                  : 'bg-gray-100 border-transparent text-text-dark hover:bg-primary/10 hover:text-primary active:scale-95'
                }`}
              aria-pressed={isActive}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryNav;
