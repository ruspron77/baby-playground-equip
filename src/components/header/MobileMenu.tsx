import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function MobileMenu({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileMenuProps) {
  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="md:hidden hover:border-primary hover:text-primary hover:bg-transparent w-10 h-10 active:scale-95 transition-transform"
        >
          <Icon name="Menu" size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-2xl font-heading">Меню</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-6">
          <a 
            href="#about" 
            className="text-base hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            О компании
          </a>
          <a 
            href="#catalog" 
            className="text-base hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Каталог
          </a>
          <a 
            href="#services" 
            className="text-base hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Услуги
          </a>
          <a 
            href="#certificates" 
            className="text-base hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Сертификаты
          </a>
          <a 
            href="#contacts" 
            className="text-base hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Контакты
          </a>
          <div className="border-t pt-4 mt-2">
            <Button 
              asChild
              className="w-full bg-primary text-white hover:bg-primary/90"
              size="lg"
            >
              <a 
                href="tel:+79181151551" 
                className="flex items-center gap-2"
              >
                <Icon name="Phone" size={20} />
                +7 918 115-15-51
              </a>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}