import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface CartButtonProps {
  quantityInCart: number;
  step: number;
  productId: number;
  updateQuantity: (id: number, quantity: number) => void;
  onStopPropagation: (e: React.MouseEvent) => void;
  onOpenCart?: () => void;
  productCategory?: string;
}

export function CartButton({ quantityInCart, step, productId, updateQuantity, onStopPropagation, onOpenCart, productCategory }: CartButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevQuantity, setPrevQuantity] = useState(quantityInCart);
  
  console.log(`🔴 CartButton: productId=${productId}, productCategory="${productCategory}", quantityInCart=${quantityInCart}`);

  useEffect(() => {
    if (quantityInCart !== prevQuantity) {
      setIsAnimating(true);
      setPrevQuantity(quantityInCart);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [quantityInCart, prevQuantity]);

  return (
    <div className={`flex items-center w-full h-8 rounded-md overflow-hidden transition-all duration-300 ${
      isAnimating ? 'scale-105 shadow-lg' : 'scale-100'
    }`}>
      <button
        onClick={(e) => {
          onStopPropagation(e);
          updateQuantity(productId, Math.max(0, quantityInCart - step));
        }}
        className="flex-shrink-0 w-10 h-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-colors"
      >
        <Icon name="Minus" size={16} />
      </button>
      <button
        onClick={(e) => {
          onStopPropagation(e);
          if (onOpenCart) onOpenCart();
        }}
        className="flex-1 h-full bg-primary hover:bg-primary/80 text-primary-foreground flex items-center justify-center px-1 transition-colors cursor-pointer"
      >
        <span className="text-[11px] leading-none font-medium">В корзине {productCategory === 'improvement' ? '1' : quantityInCart} шт</span>
      </button>
      <button
        onClick={(e) => {
          onStopPropagation(e);
          updateQuantity(productId, quantityInCart + step);
        }}
        className="flex-shrink-0 w-10 h-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-colors"
      >
        <Icon name="Plus" size={16} />
      </button>
    </div>
  );
}