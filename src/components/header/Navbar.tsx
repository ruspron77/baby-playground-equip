import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

interface NavbarProps {
  favoritesCount: number;
  searchQuery: string;
  setSearchQuery?: (query: string) => void;
  handleResetFilters?: () => void;
  setIsCartOpen: (open: boolean) => void;
  setIsSideMenuOpen: (open: boolean) => void;
  setIsContactDialogOpen: (open: boolean) => void;
  cartLength: number;
}

export function Navbar({
  favoritesCount,
  searchQuery,
  setSearchQuery,
  handleResetFilters,
  setIsCartOpen,
  setIsSideMenuOpen,
  setIsContactDialogOpen,
  cartLength,
}: NavbarProps) {
  return (
    <div className="container mx-auto my-0 py-0 px-0">
      <div className="flex items-center justify-between py-[5px] px-[15px]">
        <div className="flex items-center gap-3">
          <a href="#hero" className="cursor-pointer" onClick={() => handleResetFilters?.()}>
            <img 
              src="https://cdn.poehali.dev/files/photo_643632026-01-05_09-32-44.png" 
              alt="Urban Play"
              className="h-16 w-auto object-contain rounded-0 px-0"
            />
          </a>
        </div>
        <div className="hidden md:flex items-center gap-6 flex-1 justify-between ml-6">
          <nav className="flex gap-6">
            <a href="#about" onClick={(e) => { e.preventDefault(); handleResetFilters?.(); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-foreground hover:text-primary transition-colors font-medium">О нас</a>
            <a href="#catalog" onClick={(e) => { e.preventDefault(); handleResetFilters?.(); setTimeout(() => { const element = document.getElementById('catalog'); if (element) { const yOffset = -90; const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset; window.scrollTo({ top: y, behavior: 'smooth' }); } }, 100); }} className="text-foreground hover:text-primary transition-colors font-medium">Каталог</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); handleResetFilters?.(); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-foreground hover:text-primary transition-colors font-medium">Услуги</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleResetFilters?.(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-foreground hover:text-primary transition-colors font-medium">Контакты</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/favorites">
              <Button variant="outline" size="icon" className="relative hover:border-primary hover:text-primary hover:bg-transparent w-10 h-10 active:scale-95 transition-transform">
                <Icon name="Heart" size={20} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold">
                    {favoritesCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Link to="/favorites">
            <Button variant="outline" size="icon" className="relative hover:border-primary hover:text-primary hover:bg-transparent w-10 h-10 active:scale-95 transition-transform">
              <Icon name="Heart" size={20} />
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold">
                  {favoritesCount}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="outline" size="icon" onClick={() => setIsCartOpen(true)} className="relative hover:border-primary hover:text-primary hover:bg-transparent w-10 h-10 active:scale-95 transition-transform">
            <Icon name="ShoppingCart" size={20} />
            {cartLength > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold">
                {cartLength}
              </span>
            )}
          </Button>
          <Button variant="outline" size="icon" onClick={() => setIsSideMenuOpen(true)} className="hover:border-primary hover:text-primary hover:bg-transparent w-10 h-10 active:scale-95 transition-transform">
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
