import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onOpenCatalog: () => void;
}

export function HeroSection({ onOpenCatalog }: HeroSectionProps) {
  return (
    <section id="hero" className="relative md:pb-4 overflow-hidden min-h-[500px] md:min-h-[400px] my-0 py-0">
      <div 
        className="absolute inset-0 mx-0 py-0 my-0"
        style={{ 
          backgroundImage: 'url(https://cdn.poehali.dev/projects/ffd62df4-6e6a-420c-99f5-4d24cf68fcf3/bucket/622050d5-0302-4129-83ff-de6ffb5f39b6.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 px-0 mx-0 py-0 bg-[#0000001c] my-0"></div>
      </div>


      <div className="w-full relative z-10 md:my-[93px] mx-0 py-0 my-[102px]">
        <div className="max-w-3xl animate-fade-in mx-0 md:ml-[50px] px-[7px] my-0 py-0">
          <h2 className="md:text-4xl lg:text-6xl font-heading md:mb-6 text-white font-semibold px-0 mx-0 my-[50px] text-5xl py-[18px]">
            Создаём пространство для игры и спорта
          </h2>
          <p className="md:text-xl text-white/90 md:mb-8 font-normal mx-0 px-0.5 md:px-0 text-left text-base py-0 my-0">Производим качественное детское игровое, спортивное и парковое оборудование. Безопасность, долговечность и яркий дизайн — наши главные приоритеты.</p>
          <div className="flex flex-wrap gap-4 mx-0 px-0 py-0 my-[58px]">
            <Button size="lg" className="text-lg px-8 hover:brightness-90" style={{ backgroundColor: '#3eaa03' }} onClick={onOpenCatalog}>Каталог</Button>
          </div>
        </div>
      </div>
    </section>
  );
}