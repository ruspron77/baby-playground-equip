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
      // Используем ту же логику что и в filteredProducts
      if (selectedCategory === 'park' || selectedCategory === 'improvement') {
        filtered = filtered.filter(p => p.subcategory === selectedSeries);
      } else {
        filtered = filtered.filter(p => 
          p.subcategory === selectedSeries || p.subcategory?.includes(selectedSeries)
        );
      }
    }
    
    const categories = new Set(filtered.map(p => p.subsubcategory).filter(Boolean));
    console.log(`📊 Доступные подкатегории для серии "${selectedSeries}":`, Array.from(categories));
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
    
    // Затем по серии (Classic/Eco) или подкатегории для Парк/Благоустройство
    if (selectedSeries) {
      console.log(`Фильтруем по серии "${selectedSeries}"`);
      console.log('Примеры subcategory:', filtered.slice(0, 5).map(p => ({ name: p.name, subcategory: p.subcategory })));
      
      // Для категорий без серий (Парк, Благоустройство) проверяем точное совпадение
      if (selectedCategory === 'park' || selectedCategory === 'improvement') {
        filtered = filtered.filter(p => p.subcategory === selectedSeries);
      } else {
        // Для категорий с сериями (Игра, Спорт) проверяем вхождение или равенство
        filtered = filtered.filter(p => 
          p.subcategory === selectedSeries || p.subcategory?.includes(selectedSeries)
        );
      }
      
      console.log(`После фильтра по серии "${selectedSeries}":`, filtered.length, 'товаров');
    }
    
    // И только потом по подподкатегории
    if (selectedSubSubcategory) {
      const parts = selectedSubSubcategory.split(' > ');
      console.log(`Фильтруем по подкатегории "${selectedSubSubcategory}"`);
      console.log('Примеры subsubcategory:', filtered.slice(0, 5).map(p => ({ name: p.name, subsubcategory: p.subsubcategory })));
      
      filtered = filtered.filter(p => {
        if (!p.subsubcategory) return false;
        
        // Если выбрано просто "Комплексы 3-7 лет" (все категории) или "Комплексы 5-12 лет" или "Воркаут"
        if (parts.length === 1) {
          // Показываем все товары, у которых subsubcategory начинается с выбранной категории или равна ей
          return p.subsubcategory === parts[0] || p.subsubcategory.startsWith(parts[0] + ' >');
        }
        
        // Если выбрано "Комплексы 3-7 лет > Классик" или "Тренажеры уличные > Одиночные"
        if (parts.length === 2) {
          // Проверяем точное совпадение ИЛИ начало строки (для вложенных категорий)
          return p.subsubcategory === selectedSubSubcategory || 
                 p.subsubcategory.startsWith(selectedSubSubcategory + ' >');
        }
        
        // Для других категорий (не игровые комплексы)
        return p.subsubcategory === selectedSubSubcategory || 
               p.subsubcategory.startsWith(selectedSubSubcategory + ' >');
      });
      console.log(`После фильтра по подкатегории "${selectedSubSubcategory}":`, filtered.length, 'товаров');
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