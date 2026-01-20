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
    
    // Затем по серии (Classic/Eco)
    if (selectedSeries) {
      console.log(`Фильтруем по серии "${selectedSeries}"`);
      console.log('Примеры subcategory:', filtered.slice(0, 5).map(p => ({ name: p.name, subcategory: p.subcategory })));
      filtered = filtered.filter(p => p.subcategory === selectedSeries);
      console.log(`После фильтра по серии "${selectedSeries}":`, filtered.length, 'товаров');
    }
    
    // И только потом по подподкатегории
    if (selectedSubSubcategory) {
      const parts = selectedSubSubcategory.split(' > ');
      console.log(`Фильтруем по подкатегории "${selectedSubSubcategory}"`);
      console.log('Примеры subsubcategory:', filtered.slice(0, 5).map(p => ({ name: p.name, subsubcategory: p.subsubcategory })));
      
      filtered = filtered.filter(p => {
        if (!p.subsubcategory) return false;
        
        // Если выбрано просто "Комплексы 3-7 лет" (все серии) или "Комплексы 5-12 лет"
        if (parts.length === 1) {
          // Показываем все товары, у которых subsubcategory начинается с выбранной категории
          return p.subsubcategory.startsWith(parts[0]);
        }
        
        // Если выбрано "Комплексы 3-7 лет > Классик" (конкретная серия)
        if (parts.length === 2) {
          // Проверяем точное совпадение обеих частей
          return p.subsubcategory === selectedSubSubcategory;
        }
        
        // Для других категорий (не игровые комплексы)
        return p.subsubcategory === selectedSubSubcategory;
      });
      console.log(`После фильтра по подкатегории "${selectedSubSubcategory}":`, filtered.length, 'товаров');
    }
    
    filtered = filtered.filter(p => parseInt(p.price) > 0);
    
    return filtered;
  })();

  return {
    availableCategories,
    filteredProducts,
  };
}