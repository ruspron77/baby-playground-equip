import { categories, Subcategory, SubSubcategory } from '@/components/data/catalogData';

interface CatalogHandlersProps {
  setSelectedCategory: (value: string | null) => void;
  setSelectedSubcategory: (value: string | null) => void;
  setSelectedSubSubcategory: (value: string | null) => void;
  setCurrentCategory: (value: typeof categories[0] | null) => void;
  setCurrentSubcategory: (value: Subcategory | null) => void;
  setCurrentSubSubcategory: (value: SubSubcategory | null) => void;
  setIsCategoryDialogOpen: (value: boolean) => void;
  setIsSubSubcategoryDialogOpen: (value: boolean) => void;
  setIsSubSubSubcategoryDialogOpen: (value: boolean) => void;
  setIsSideMenuOpen: (value: boolean) => void;
  setExpandedSubcategories: (value: string[] | ((prev: string[]) => string[])) => void;
  setExpandedSubSubcategories: (value: string[] | ((prev: string[]) => string[])) => void;
  setExpandedCategories: (value: string[] | ((prev: string[]) => string[])) => void;
  setSelectedSeries: (value: string | null) => void;
  setSearchQuery: (value: string) => void;
  searchQuery: string;
  currentCategory: typeof categories[0] | null;
  currentSubcategory: Subcategory | null;
  currentSubSubcategory: SubSubcategory | null;
}

export function useCatalogHandlers(props: CatalogHandlersProps) {
  const {
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedSubSubcategory,
    setCurrentCategory,
    setCurrentSubcategory,
    setCurrentSubSubcategory,
    setIsCategoryDialogOpen,
    setIsSubSubcategoryDialogOpen,
    setIsSubSubSubcategoryDialogOpen,
    setIsSideMenuOpen,
    setExpandedSubcategories,
    setExpandedSubSubcategories,
    setExpandedCategories,
    setSelectedSeries,
    setSearchQuery,
    searchQuery,
    currentCategory,
    currentSubcategory,
    currentSubSubcategory,
  } = props;

  const handleCategoryClick = (cat: typeof categories[0]) => {
    setCurrentCategory(cat);
    setIsCategoryDialogOpen(true);
  };

  const handleSubcategorySelect = (sub: Subcategory) => {
    if (sub.hasChildren && sub.children) {
      setCurrentSubcategory(sub);
      setIsSubSubcategoryDialogOpen(true);
      setIsCategoryDialogOpen(false);
    } else {
      if (currentCategory) {
        setSelectedCategory(currentCategory.id);
        setSelectedSubcategory(sub.name);
        setSelectedSubSubcategory(null);
        setSelectedSeries(sub.name);
        setIsCategoryDialogOpen(false);
        setTimeout(() => {
          const productsSection = document.getElementById('products');
          if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    }
  };

  const handleSubSubcategorySelect = (subSub: SubSubcategory) => {
    console.log('handleSubSubcategorySelect called:', {
      name: subSub.name,
      hasChildren: subSub.hasChildren,
      childrenCount: subSub.children?.length
    });
    
    if (subSub.hasChildren && subSub.children) {
      console.log('Opening SubSubSub dialog with children:', subSub.children);
      setCurrentSubSubcategory(subSub);
      setIsSubSubSubcategoryDialogOpen(true);
      setIsSubSubcategoryDialogOpen(false);
    } else {
      console.log('No children, showing products');
      if (currentCategory && currentSubcategory) {
        setSelectedCategory(currentCategory.id);
        setSelectedSubcategory(currentSubcategory.name);
        setSelectedSubSubcategory(subSub.name);
        setSelectedSeries(currentSubcategory.name);
        setIsSubSubcategoryDialogOpen(false);
        setTimeout(() => {
          const productsSection = document.getElementById('products');
          if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    }
  };

  const handleTreeCategorySelect = (categoryId: string, categoryData: typeof categories[0]) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    setSelectedSubSubcategory(null);
    setSelectedSeries(null);
    setCurrentCategory(categoryData);
    setIsSideMenuOpen(false);
    setTimeout(() => {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleTreeSubcategorySelect = (categoryId: string, categoryData: typeof categories[0], subName: string, sub: Subcategory) => {
    console.log(`🎯 handleTreeSubcategorySelect: category="${categoryId}", subcategory="${subName}", hasChildren=${sub.hasChildren}`);
    console.log(`🔴 ПЕРЕД СБРОСОМ: selectedSubSubcategory будет сброшена`);
    
    // Всегда показываем товары при клике на подкатегорию
    setSelectedCategory(categoryId);
    setSelectedSubcategory(subName);
    setSelectedSubSubcategory(null); // КРИТИЧНО: всегда сбрасываем подподкатегорию
    setSelectedSeries(subName);
    setCurrentCategory(categoryData);
    
    console.log(`✅ ПОСЛЕ СБРОСА: selectedSubSubcategory установлена в null`);
    
    if (sub.hasChildren) {
      const key = `${categoryId}-${subName}`;
      // Разворачиваем меню если свернуто
      setExpandedSubcategories(prev => 
        prev.includes(key) ? prev : [...prev, key]
      );
    } else {
      setIsSideMenuOpen(false);
    }
    
    // Прокручиваем к товарам
    setTimeout(() => {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleTreeSubSubcategorySelect = (categoryId: string, categoryData: typeof categories[0], subName: string, subSubName: string, subSub: SubSubcategory) => {
    if (subSub.hasChildren) {
      const key = `${categoryId}-${subName}-${subSubName}`;
      setExpandedSubSubcategories(prev => 
        prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
      );
    } else {
      setSelectedCategory(categoryId);
      setSelectedSubcategory(subName);
      setSelectedSubSubcategory(subSubName);
      setSelectedSeries(subName);
      setCurrentCategory(categoryData);
      setIsSideMenuOpen(false);
      setTimeout(() => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  const handleTreeSubSubSubcategorySelect = (categoryId: string, categoryData: typeof categories[0], subName: string, subSubName: string, subSubSubName: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(subName);
    setSelectedSubSubcategory(`${subSubName} > ${subSubSubName}`);
    setSelectedSeries(subName);
    setCurrentCategory(categoryData);
    setIsSideMenuOpen(false);
    setTimeout(() => {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
    setExpandedSubcategories([]);
  };

  const handleResetFilters = () => {
    if (searchQuery) {
      setSearchQuery('');
    } else {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setSelectedSubSubcategory(null);
      setSelectedSeries(null);
      setCurrentCategory(null);
      setTimeout(() => {
        const catalogSection = document.getElementById('catalog');
        if (catalogSection) {
          catalogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleSubSubSubcategorySelect = (subSubSubName: string) => {
    if (currentCategory && currentSubSubcategory) {
      setSelectedCategory(currentCategory.id);
      setSelectedSubcategory(currentSubcategory?.name || null);
      
      // Теперь путь простой: "Комплексы 3-7 лет > Классик"
      const finalPath = `${currentSubSubcategory.name} > ${subSubSubName}`;
      
      setSelectedSubSubcategory(finalPath);
      setSelectedSeries(currentSubcategory?.name || null);
      setIsSubSubSubcategoryDialogOpen(false);
      setTimeout(() => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  return {
    handleCategoryClick,
    handleSubcategorySelect,
    handleSubSubcategorySelect,
    handleSubSubSubcategorySelect,
    handleTreeCategorySelect,
    handleTreeSubcategorySelect,
    handleTreeSubSubcategorySelect,
    handleTreeSubSubSubcategorySelect,
    toggleCategory,
    handleResetFilters,
  };
}