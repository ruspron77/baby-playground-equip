import { useState, useEffect, useRef } from 'react';
import { ContactDialog } from './ContactDialog';
import { CatalogSideMenu } from './catalog/CatalogSideMenu';
import { CategoryDialogs } from './catalog/CategoryDialogs';
import { CategoryGrid } from './catalog/CategoryGrid';
import { ProductDialog } from './catalog/ProductDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SubSubSubcategory {
  name: string;
  image: string;
  hasChildren?: boolean;
  children?: { name: string; image: string }[];
}

interface SubSubcategory {
  name: string;
  image: string;
  hasChildren?: boolean;
  children?: SubSubSubcategory[];
}

interface Subcategory {
  name: string;
  image: string;
  hasChildren?: boolean;
  children?: SubSubcategory[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  image: string;
  bgImage: string;
  subcategories: Subcategory[];
  order?: number;
}

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory?: string;
  subsubcategory?: string;
  price: string;
  image: string;
  description?: string;
  dimensions?: string;
  article?: string;
}

interface CatalogSectionProps {
  categories: Category[];
  products: Product[];
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: (open: boolean) => void;
  expandedCategories: string[];
  toggleCategory: (id: string) => void;
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  selectedSubSubcategory: string | null;
  setSelectedSubSubcategory: (value: string | null) => void;
  handleTreeCategorySelect: (id: string, cat: Category) => void;
  expandedSubcategories: string[];
  expandedSubSubcategories: string[];
  handleTreeSubcategorySelect: (catId: string, cat: Category, subName: string, sub: Subcategory) => void;
  handleTreeSubSubcategorySelect: (catId: string, cat: Category, subName: string, subSubName: string, subSub: SubSubcategory) => void;
  handleTreeSubSubSubcategorySelect: (catId: string, cat: Category, subName: string, subSubName: string, subSubSubName: string) => void;
  isCategoryDialogOpen: boolean;
  setIsCategoryDialogOpen: (open: boolean) => void;
  currentCategory: Category | null;
  handleCategoryClick: (cat: Category) => void;
  handleSubcategoryClick: (sub: Subcategory) => void;
  isSubSubcategoryDialogOpen: boolean;
  setIsSubSubcategoryDialogOpen: (open: boolean) => void;
  currentSubcategory: Subcategory | null;
  currentSubSubcategory: SubSubcategory | null;
  handleSubSubcategoryClick: (subSub: SubSubcategory) => void;
  isSubSubSubcategoryDialogOpen: boolean;
  setIsSubSubSubcategoryDialogOpen: (open: boolean) => void;
  handleSubSubSubcategoryClick: (subSubSubName: string) => void;
  currentSubSubSubcategory: SubSubSubcategory | null;
  setCurrentSubSubSubcategory: (cat: SubSubSubcategory | null) => void;
  isFinalCategoryDialogOpen: boolean;
  setIsFinalCategoryDialogOpen: (open: boolean) => void;
  filteredProducts: Product[];
  handleAddToCart: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleResetFilters: () => void;
  selectedSeries: string | null;
  setSelectedSeries: (series: string | null) => void;
  availableCategories: string[];
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  cart: Product[];
  updateQuantity: (id: number, quantity: number) => void;
  setIsCartOpen: (open: boolean) => void;
  productToOpen?: Product | null;
  onProductToOpenHandled?: () => void;
}

export function CatalogSection({
  categories,
  products,
  isSideMenuOpen,
  setIsSideMenuOpen,
  expandedCategories,
  toggleCategory,
  selectedCategory,
  selectedSubcategory,
  selectedSubSubcategory,
  setSelectedSubSubcategory,
  handleTreeCategorySelect,
  expandedSubcategories,
  expandedSubSubcategories,
  handleTreeSubcategorySelect,
  handleTreeSubSubcategorySelect,
  handleTreeSubSubSubcategorySelect,
  isCategoryDialogOpen,
  setIsCategoryDialogOpen,
  currentCategory,
  handleCategoryClick,
  handleSubcategoryClick,
  isSubSubcategoryDialogOpen,
  setIsSubSubcategoryDialogOpen,
  currentSubcategory,
  currentSubSubcategory,
  handleSubSubcategoryClick,
  isSubSubSubcategoryDialogOpen,
  setIsSubSubSubcategoryDialogOpen,
  handleSubSubSubcategoryClick,
  currentSubSubSubcategory,
  setCurrentSubSubSubcategory,
  isFinalCategoryDialogOpen,
  setIsFinalCategoryDialogOpen,
  filteredProducts,
  handleAddToCart,
  searchQuery,
  setSearchQuery,
  handleResetFilters,
  selectedSeries,
  setSelectedSeries,
  availableCategories,
  favorites,
  toggleFavorite,
  cart,
  updateQuantity,
  setIsCartOpen,
  productToOpen,
  onProductToOpenHandled,
}: CatalogSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery && productsRef.current) {
      setTimeout(() => {
        const element = productsRef.current;
        if (element) {
          const yOffset = -300;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [searchQuery]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    if (productId) {
      const product = products.find(p => p.id === parseInt(productId));
      if (product) {
        handleProductClick(product);
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, [products]);

  useEffect(() => {
    if (selectedCategory && filtersRef.current) {
      setTimeout(() => {
        const element = filtersRef.current;
        if (element) {
          // Calculate absolute position of element
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
          // Scroll so the element sits at 84px from top (matching sticky top-[84px])
          const targetScrollPosition = elementTop - 84;
          window.scrollTo({ top: targetScrollPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [selectedCategory]);



  useEffect(() => {
    if (productToOpen) {
      handleProductClick(productToOpen);
      onProductToOpenHandled?.();
    }
  }, [productToOpen]);

  const handleProductClick = async (product: Product) => {
    setSelectedProduct(product);
    setIsProductDialogOpen(true);
    setCurrentImageIndex(0);
    setProductImages([]);
    
    const article = product.name.split('\n')[0]?.replace('Арт. ', '');
    if (article) {
      try {
        const response = await fetch(`https://functions.poehali.dev/686e9704-6a8f-429d-a2d2-88f49ab86fd8?article=${article}`);
        const data = await response.json();
        if (data.success && data.images.length > 0) {
          setProductImages(data.images);
        }
      } catch (error) {
        console.error('Failed to load product images:', error);
      }
    }
  };



  const handleNextProduct = () => {
    if (!selectedProduct) return;
    const currentIndex = filteredProducts.findIndex(p => p.id === selectedProduct.id);
    if (currentIndex < filteredProducts.length - 1) {
      handleProductClick(filteredProducts[currentIndex + 1]);
    }
  };

  const handlePreviousProduct = () => {
    if (!selectedProduct) return;
    const currentIndex = filteredProducts.findIndex(p => p.id === selectedProduct.id);
    if (currentIndex > 0) {
      handleProductClick(filteredProducts[currentIndex - 1]);
    }
  };

  const currentProductIndex = selectedProduct 
    ? filteredProducts.findIndex(p => p.id === selectedProduct.id)
    : -1;
  const hasNextProduct = currentProductIndex >= 0 && currentProductIndex < filteredProducts.length - 1;
  const hasPreviousProduct = currentProductIndex > 0;

  return (
    <>
      <CatalogSideMenu
        isSideMenuOpen={isSideMenuOpen}
        setIsSideMenuOpen={setIsSideMenuOpen}
        categories={categories}
        expandedCategories={expandedCategories}
        toggleCategory={toggleCategory}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        handleTreeCategorySelect={handleTreeCategorySelect}
        expandedSubcategories={expandedSubcategories}
        expandedSubSubcategories={expandedSubSubcategories}
        handleTreeSubcategorySelect={handleTreeSubcategorySelect}
        handleTreeSubSubcategorySelect={handleTreeSubSubcategorySelect}
        handleTreeSubSubSubcategorySelect={handleTreeSubSubSubcategorySelect}
      />

      <CategoryDialogs
        isCategoryDialogOpen={isCategoryDialogOpen}
        setIsCategoryDialogOpen={setIsCategoryDialogOpen}
        currentCategory={currentCategory}
        handleSubcategoryClick={handleSubcategoryClick}
        isSubSubcategoryDialogOpen={isSubSubcategoryDialogOpen}
        setIsSubSubcategoryDialogOpen={setIsSubSubcategoryDialogOpen}
        currentSubcategory={currentSubcategory}
        currentSubSubcategory={currentSubSubcategory}
        handleSubSubcategoryClick={handleSubSubcategoryClick}
        isSubSubSubcategoryDialogOpen={isSubSubSubcategoryDialogOpen}
        setIsSubSubSubcategoryDialogOpen={setIsSubSubSubcategoryDialogOpen}
        handleSubSubSubcategoryClick={handleSubSubSubcategoryClick}
        currentSubSubSubcategory={currentSubSubSubcategory}
        setCurrentSubSubSubcategory={setCurrentSubSubSubcategory}
        isFinalCategoryDialogOpen={isFinalCategoryDialogOpen}
        setIsFinalCategoryDialogOpen={setIsFinalCategoryDialogOpen}
        onBackFromSubSubcategory={() => {
          setIsCategoryDialogOpen(true);
        }}
      />

      <CategoryGrid
        selectedCategory={selectedCategory}
        categories={categories}
        filtersRef={filtersRef}
        selectedSeries={selectedSeries}
        setSelectedSeries={setSelectedSeries}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleResetFilters={handleResetFilters}
        selectedSubcategory={selectedSubcategory}
        selectedSubSubcategory={selectedSubSubcategory}
        setSelectedSubSubcategory={setSelectedSubSubcategory}
        productsRef={productsRef}
        filteredProducts={filteredProducts}
        handleProductClick={handleProductClick}
        handleAddToCart={handleAddToCart}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        handleTreeCategorySelect={handleTreeCategorySelect}
        isProductDialogOpen={isProductDialogOpen}
        cart={cart}
        updateQuantity={updateQuantity}
        setIsCartOpen={setIsCartOpen}
      />

      <ProductDialog
        isProductDialogOpen={isProductDialogOpen}
        setIsProductDialogOpen={setIsProductDialogOpen}
        selectedProduct={selectedProduct}
        productImages={productImages}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        handleAddToCart={handleAddToCart}
        setIsContactDialogOpen={setIsContactDialogOpen}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onBackToCatalog={() => {}}
        onNextProduct={handleNextProduct}
        onPreviousProduct={handlePreviousProduct}
        hasNextProduct={hasNextProduct}
        hasPreviousProduct={hasPreviousProduct}
        cart={cart}
        updateQuantity={updateQuantity}
      />

      <ContactDialog 
        open={isContactDialogOpen} 
        onOpenChange={setIsContactDialogOpen}
      />



      <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Политика конфиденциальности</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground space-y-4">
            <h3 className="font-semibold text-foreground">1. Общие положения</h3>
            <p>1.1. Настоящий документ «Пользовательское соглашение» (далее - «Соглашение») представляет собой предложение Индивидуальный предприниматель Пронин Руслан Олегович, ИНН: 110209455200 ОГРНИП 323774600102482 (далее – Продавец), размещенное на сайте www.urban-play.ru (далее - «Сайт»), использовать Сайт на условиях, изложенных в настоящем Соглашении.</p>
            <p>1.2. Настоящая Политика применяется в отношении персональных данных следующих категорий лиц:</p>
            <p>— Покупателей, оформивших заказ товаров или услуг на Сайте;</p>
            <p>— Посетителей Сайта, предоставивших свои персональные данные (в том числе при заполнении форм обратной связи, регистрации, использовании сервисов Сайта или принятии Сookie).</p>
            <p>Все указанные лица именуются в настоящем документе как «Пользователи».</p>
            <h3 className="font-semibold text-foreground">2. Основные понятия, используемые в Политике</h3>
            <p>2.1. Автоматизированная обработка Персональных данных — обработка Персональных данных с помощью средств вычислительной техники.</p>
            <p>2.2. Сайт — веб-сайт urban-play.ru, посредством которого ИП Пронин Р.О. реализует свои товары / услуги.</p>
            <p>2.3. Обработка Персональных данных — любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с Персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение Персональных данных.</p>
            <p>2.4. Оператор — лицо, осуществляющее обработку Персональных данных, а также определяющее цели обработки Персональных данных, состав Персональных данных, подлежащих обработке, действия (операции), совершаемые с Персональными данными.</p>
            <p>2.5. Персональные данные — любая информация, относящаяся прямо или косвенно к определенному или определяемому Субъекту Персональных данных.</p>
            <p>2.6. Субъект Персональных данных — физическое лицо, которое прямо или косвенно определено или определяемо с помощью Персональных данных.</p>
            <p>2.7. Трансграничная передача Персональных данных — передача Персональных данных на территорию иностранного государства органу власти иностранного государства, иностранному физическому или иностранному юридическому лицу.</p>
            <h3 className="font-semibold text-foreground">3. Права и обязанности Оператора</h3>
            <p>3.1. Оператор имеет право получать от Субъекта Персональных данных достоверные информацию и / или документы, содержащие Персональные данные; самостоятельно определять состав и перечень мер, необходимых и достаточных для обеспечения выполнения обязанностей.</p>
            <p>3.2. Оператор обязан предоставлять Субъекту Персональных данных по его просьбе информацию, касающуюся обработки его Персональных данных; организовывать обработку Персональных данных в порядке, установленном действующим законодательством Российской Федерации.</p>
            <h3 className="font-semibold text-foreground">12. Заключительные положения</h3>
            <p>12.1. Пользователь может получить разъяснения по вопросам обработки его Персональных данных, обратившись по электронной почте <a href="mailto:info@urban-play.ru" className="text-primary hover:underline">info@urban-play.ru</a></p>
            <p>12.2. Оператор имеет право вносить изменения в настоящую Политику. Новая редакция Политики вступает в силу с момента её размещения на Сайте.</p>
            <p>По почтовому адресу: 350005, Россия, г. Краснодар, ул. Кореновская, д. 57, оф. 7</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}