import { useState } from 'react';
import { categories, Subcategory, SubSubcategory, SubSubSubcategory } from '@/components/data/catalogData';

export function useCatalogState() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<string | null>(null);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isSubSubcategoryDialogOpen, setIsSubSubcategoryDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<typeof categories[0] | null>(null);
  const [currentSubcategory, setCurrentSubcategory] = useState<Subcategory | null>(null);
  const [currentSubSubcategory, setCurrentSubSubcategory] = useState<SubSubcategory | null>(null);
  const [isSubSubSubcategoryDialogOpen, setIsSubSubSubcategoryDialogOpen] = useState(false);
  const [currentSubSubSubcategory, setCurrentSubSubSubcategory] = useState<SubSubSubcategory | null>(null);
  const [isFinalCategoryDialogOpen, setIsFinalCategoryDialogOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>([]);
  const [expandedSubSubcategories, setExpandedSubSubcategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);

  return {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    selectedSubSubcategory,
    setSelectedSubSubcategory,
    isCategoryDialogOpen,
    setIsCategoryDialogOpen,
    isSubSubcategoryDialogOpen,
    setIsSubSubcategoryDialogOpen,
    currentCategory,
    setCurrentCategory,
    currentSubcategory,
    setCurrentSubcategory,
    currentSubSubcategory,
    setCurrentSubSubcategory,
    isSubSubSubcategoryDialogOpen,
    setIsSubSubSubcategoryDialogOpen,
    currentSubSubSubcategory,
    setCurrentSubSubSubcategory,
    isFinalCategoryDialogOpen,
    setIsFinalCategoryDialogOpen,
    isSideMenuOpen,
    setIsSideMenuOpen,
    expandedCategories,
    setExpandedCategories,
    expandedSubcategories,
    setExpandedSubcategories,
    expandedSubSubcategories,
    setExpandedSubSubcategories,
    searchQuery,
    setSearchQuery,
    selectedSeries,
    setSelectedSeries,
  };
}