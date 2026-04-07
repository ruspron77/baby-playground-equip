interface Product {
  id: number;
  article: string;
  name: string;
  category: string;
  subcategory?: string;
  subsubcategory?: string;
  price: string;
  image: string;
  description?: string;
  dimensions?: string;
}

interface UseCatalogFiltersProps {
  products: Product[];
  selectedCategory: string | null;
  selectedSeries: string | null;
  selectedSubSubcategory: string | null;
  searchQuery: string;
}

export function useCatalogFilters({
  products,
  selectedCategory,
  selectedSeries,
  selectedSubSubcategory,
  searchQuery,
}: UseCatalogFiltersProps) {
  console.log(`🔵 useCatalogFilters вызван с:`, {
    selectedCategory,
    selectedSeries,
    selectedSubSubcategory,
    searchQuery
  });
  const availableCategories = (() => {
    let filtered = products;
    
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (selectedSeries) {
      filtered = filtered.filter(p => p.subcategory === selectedSeries);
    }
    
    const categories = new Set(filtered.map(p => p.subsubcategory).filter(Boolean));
    return Array.from(categories);
  })();

  const filteredProducts = (() => {
    let filtered = products;
    
    if (searchQuery.trim()) {
      filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toString().includes(searchQuery) ||
        (p.article && p.article.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      filtered = filtered.filter(p => parseInt(p.price) > 0);
      return filtered;
    }
    
    // Сначала фильтруем по категории
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
      console.log(`После фильтра по категории "${selectedCategory}":`, filtered.length, 'товаров');
    }
    
    // Фильтр по подкатегории (subcategory) через selectedSeries
    if (selectedSeries) {
      filtered = filtered.filter(p => p.subcategory === selectedSeries);
    }
    
    // Фильтр по подподкатегории (теперь основной фильтр для Игра/Спорт)
    if (selectedSubSubcategory) {
      const parts = selectedSubSubcategory.split(' > ');
      console.log(`Фильтруем по subsubcategory "${selectedSubSubcategory}"`);
      
      filtered = filtered.filter(p => {
        if (!p.subsubcategory) return false;
        
        if (parts.length === 1) {
          // Простой фильтр: "Воркаут", "Балансиры", "Качели" и т.д.
          return p.subsubcategory === parts[0] || p.subsubcategory.startsWith(parts[0] + ' >');
        }
        
        // Составной фильтр: "Комплексы 3-7 лет > Классик" или "Тренажеры уличные > Одиночные"
        return p.subsubcategory === selectedSubSubcategory || 
               p.subsubcategory.startsWith(selectedSubSubcategory + ' >');
      });
      console.log(`После фильтра по subsubcategory "${selectedSubSubcategory}":`, filtered.length, 'товаров');
    }
    
    // Временно отключил фильтр по цене, чтобы показывать товары без цены
    // filtered = filtered.filter(p => parseInt(p.price) > 0);
    
    return filtered;
  })();

  return {
    availableCategories,
    filteredProducts,
  };
}