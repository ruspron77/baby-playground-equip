import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CartItem } from './data/catalogData';
import { OrderForm, OrderFormData } from './OrderForm';
import { ContactDialog } from './ContactDialog';
import { Navbar } from './header/Navbar';

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
  generateKP: (options?: { address?: string; installationPercent?: number; deliveryCost?: number; hideInstallation?: boolean; hideDelivery?: boolean; format?: 'xlsx' | 'pdf'; sortedCart?: CartItem[]; discountPercent?: number; discountAmount?: number }) => void;
  isExcelSettingsOpen: boolean;
  setIsExcelSettingsOpen: (open: boolean) => void;
  imageColumnWidth: number;
  setImageColumnWidth: (width: number) => void;
  imageRowHeight: number;
  setImageRowHeight: (height: number) => void;
  favoritesCount?: number;
  allProducts?: Product[];
  onAddToCart?: (product: Product) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  handleResetFilters?: () => void;
}

export function HeaderSimple(props: HeaderProps) {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

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
    if (props.clearCart) {
      props.clearCart();
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b px-0">
        <Navbar
          favoritesCount={props.favoritesCount || 0}
          searchQuery={props.searchQuery || ''}
          setSearchQuery={props.setSearchQuery}
          handleResetFilters={props.handleResetFilters}
          setIsCartOpen={props.setIsCartOpen}
          setIsSideMenuOpen={props.setIsSideMenuOpen}
          setIsContactDialogOpen={setIsContactDialogOpen}
          cartLength={props.cart.length}
        />
      </header>

      <OrderForm 
        open={showOrderForm}
        onOpenChange={setShowOrderForm}
        cart={props.cart}
        calculateTotal={props.calculateTotal}
        deliveryCost={props.deliveryCost}
        installationPercent={props.installationPercent}
        calculateInstallationCost={props.calculateInstallationCost}
        calculateGrandTotal={props.calculateGrandTotal}
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
            <p className="text-lg mb-2">Ваш заказ #{orderNumber} принят в обработку</p>
            <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время</p>
          </div>
        </DialogContent>
      </Dialog>

      <ContactDialog 
        isOpen={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
      />
    </>
  );
}
