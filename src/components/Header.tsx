import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { CartItem } from './data/catalogData';
import { Link } from 'react-router-dom';
import { OrderForm, OrderFormData } from './OrderForm';
import { ContactDialog } from './ContactDialog';
import { MobileMenu } from './header/MobileMenu';
import { CartSheet } from './header/CartSheet';
import { KPDialog } from './header/KPDialog';
import { ExcelSettingsDialog } from './header/ExcelSettingsDialog';

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

interface HeaderProps {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsSideMenuOpen: (open: boolean) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart?: () => void;
  calculateTotal: () => number;
  deliveryCost: number;
  setDeliveryCost: (cost: number) => void;
  installationPercent: number;
  setInstallationPercent: (percent: number) => void;
  calculateInstallationCost: () => number;
  calculateGrandTotal: () => number;
  generateKP: (options?: { address?: string; installationPercent?: number; deliveryCost?: number; hideInstallation?: boolean; hideDelivery?: boolean }) => void;
  isExcelSettingsOpen: boolean;
  setIsExcelSettingsOpen: (open: boolean) => void;
  imageColumnWidth: number;
  setImageColumnWidth: (width: number) => void;
  imageRowHeight: number;
  setImageRowHeight: (height: number) => void;
  favoritesCount?: number;
  allProducts?: Product[];
  onAddToCart?: (product: Product) => void;
}

export function Header({
  cart,
  isCartOpen,
  setIsCartOpen,
  setIsSideMenuOpen,
  updateQuantity,
  removeFromCart,
  clearCart,
  calculateTotal,
  deliveryCost,
  setDeliveryCost,
  installationPercent,
  setInstallationPercent,
  calculateInstallationCost,
  calculateGrandTotal,
  generateKP,
  isExcelSettingsOpen,
  setIsExcelSettingsOpen,
  imageColumnWidth,
  setImageColumnWidth,
  imageRowHeight,
  setImageRowHeight,
  favoritesCount = 0,
  allProducts = [],
  onAddToCart
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [showKPDialog, setShowKPDialog] = useState(false);
  const [kpAddress, setKpAddress] = useState('');
  const [kpInstallationPercent, setKpInstallationPercent] = useState(0);
  const [kpDeliveryCost, setKpDeliveryCost] = useState(0);
  const [hideInstallationInKP, setHideInstallationInKP] = useState(false);
  const [hideDeliveryInKP, setHideDeliveryInKP] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  const getNextOrderNumber = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    const savedYear = parseInt(localStorage.getItem('orderYear') || '0', 10);
    let orderCount = parseInt(localStorage.getItem('orderCount') || '0', 10);
    
    if (savedYear !== currentYear) {
      orderCount = 0;
      localStorage.setItem('orderYear', currentYear.toString());
    }
    
    orderCount += 1;
    localStorage.setItem('orderCount', orderCount.toString());
    
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = currentYear;
    return `${String(orderCount).padStart(4, '0')} ${day}.${month}.${year}`;
  };

  const getCurrentOrderNumber = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    const savedYear = parseInt(localStorage.getItem('orderYear') || '0', 10);
    let orderCount = parseInt(localStorage.getItem('orderCount') || '0', 10);
    
    if (savedYear !== currentYear) {
      orderCount = 0;
    }
    
    orderCount += 1;
    
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = currentYear;
    return `${String(orderCount).padStart(4, '0')} ${day}.${month}.${year}`;
  };

  const [currentOrderNumber, setCurrentOrderNumber] = useState(() => getCurrentOrderNumber());

  const handleOrderSubmit = (formData: OrderFormData) => {
    const newOrderNumber = getNextOrderNumber();
    setOrderNumber(newOrderNumber);
    setCurrentOrderNumber(getCurrentOrderNumber());
    setShowOrderForm(false);
    setShowSuccessDialog(true);
    if (clearCart) {
      clearCart();
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#hero" className="cursor-pointer">
              <img 
                src="https://cdn.poehali.dev/files/photo_643632026-01-05_09-32-44.png" 
                alt="Urban Play"
                className="h-16 w-auto object-contain rounded-0"
              />
            </a>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#about" className="text-foreground hover:text-primary transition-colors text-base font-medium">О компании</a>
            <a href="#catalog" className="text-foreground hover:text-primary transition-colors text-base font-medium">Каталог</a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors text-base font-medium">Услуги</a>
            <a href="#certificates" className="text-foreground hover:text-primary transition-colors text-base font-medium">Сертификаты</a>
            <a href="#contacts" className="text-foreground hover:text-primary transition-colors text-base font-medium">Контакты</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3">
              <a 
                href="tel:+79181151551" 
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-base font-medium whitespace-nowrap"
              >
                <Icon name="Phone" size={20} className="text-primary" />
                +7 918 115-15-51
              </a>
              <Button onClick={() => setIsContactDialogOpen(true)} size="sm">
                Заказать звонок
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <MobileMenu 
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />

              <div className="lg:hidden">
                <Button 
                  asChild
                  className="bg-[#3eaa03] text-white hover:bg-[#2d8902] active:scale-95 transition-all h-9 px-4"
                >
                  <a href="tel:+79181151551">
                    Позвонить
                  </a>
                </Button>
              </div>

              <Link to="/favorites">
                <Button variant="outline" size="icon" className="relative hover:border-primary hover:text-primary hover:bg-transparent w-10 h-10 active:scale-95 transition-transform">
                  <Icon name="Heart" size={20} />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold">
                      {favoritesCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              <CartSheet
                cart={cart}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                calculateTotal={calculateTotal}
                deliveryCost={deliveryCost}
                setDeliveryCost={setDeliveryCost}
                installationPercent={installationPercent}
                setInstallationPercent={setInstallationPercent}
                calculateInstallationCost={calculateInstallationCost}
                calculateGrandTotal={calculateGrandTotal}
                setShowOrderForm={setShowOrderForm}
                setShowKPDialog={setShowKPDialog}
                setIsExcelSettingsOpen={setIsExcelSettingsOpen}
                allProducts={allProducts}
                onAddToCart={onAddToCart}
                setIsSideMenuOpen={setIsSideMenuOpen}
              />
            </div>
          </div>
        </div>
      </div>

      <OrderForm 
        open={showOrderForm}
        onOpenChange={setShowOrderForm}
        cart={cart}
        calculateTotal={calculateTotal}
        deliveryCost={deliveryCost}
        installationPercent={installationPercent}
        calculateInstallationCost={calculateInstallationCost}
        calculateGrandTotal={calculateGrandTotal}
        onSubmit={handleOrderSubmit}
        currentOrderNumber={currentOrderNumber}
      />

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Заказ успешно оформлен!</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-lg mb-2">Ваш заказ №{orderNumber} принят</p>
            <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время</p>
          </div>
        </DialogContent>
      </Dialog>

      <KPDialog
        showKPDialog={showKPDialog}
        setShowKPDialog={setShowKPDialog}
        kpAddress={kpAddress}
        setKpAddress={setKpAddress}
        kpInstallationPercent={kpInstallationPercent}
        setKpInstallationPercent={setKpInstallationPercent}
        kpDeliveryCost={kpDeliveryCost}
        setKpDeliveryCost={setKpDeliveryCost}
        hideInstallationInKP={hideInstallationInKP}
        setHideInstallationInKP={setHideInstallationInKP}
        hideDeliveryInKP={hideDeliveryInKP}
        setHideDeliveryInKP={setHideDeliveryInKP}
        generateKP={generateKP}
      />

      <ExcelSettingsDialog
        isExcelSettingsOpen={isExcelSettingsOpen}
        setIsExcelSettingsOpen={setIsExcelSettingsOpen}
        imageColumnWidth={imageColumnWidth}
        setImageColumnWidth={setImageColumnWidth}
        imageRowHeight={imageRowHeight}
        setImageRowHeight={setImageRowHeight}
      />

      <ContactDialog
        open={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
      />
    </header>
  );
}
