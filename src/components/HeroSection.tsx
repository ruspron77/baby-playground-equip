import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onOpenCatalog: () => void;
}

export function HeroSection({ onOpenCatalog }: HeroSectionProps) {
  return (
    <section id="hero" className="relative pt-0 pb-2 md:pb-4 overflow-hidden min-h-[225px] md:min-h-[400px]">
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: 'url(https://cdn.poehali.dev/projects/ffd62df4-6e6a-420c-99f5-4d24cf68fcf3/bucket/3dfae01f-ed05-4e73-8732-003e8bd94840.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 px-0 mx-0 bg-[#00000030] py-0 my-0"></div>
      </div>

      <div className="w-full relative z-10 md:my-[93px] mx-0 my-[33px] py-2.5">
        <div className="max-w-3xl animate-fade-in mx-0 md:ml-[50px] px-[7px] py-0 my-0">
          <h2 className="md:text-4xl lg:text-6xl font-heading md:mb-6 text-white font-semibold px-0 mx-0 text-3xl py-0 my-1">
            Создаём пространство для игры и спорта
          </h2>
          <p className="md:text-xl text-white/90 md:mb-8 font-normal mx-0 px-0.5 md:px-0 text-left py-0 my-0 text-base"> Безопасность, долговечность и яркий дизайн — наши главные приоритеты.</p>
          <div className="flex flex-wrap gap-4 mx-0 px-0 py-0 my-[18px]">
            <Button size="lg" className="text-lg px-8 hover:brightness-90" style={{ backgroundColor: '#3eaa03' }} onClick={onOpenCatalog}>Каталог</Button>
          </div>
        </div>
      </div>
    </section>
  );
}