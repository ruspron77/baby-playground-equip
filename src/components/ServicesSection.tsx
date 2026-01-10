import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export function ServicesSection() {
  return (
    <section id="services" className="pt-4 pb-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: 'Ruler', title: 'Проектирование', desc: 'Разработка индивидуальных проектов детских площадок', color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { icon: 'Factory', title: 'Производство', desc: 'Собственное производство из качественных материалов', color: 'text-orange-500', bg: 'bg-orange-500/10' },
            { icon: 'Truck', title: 'Доставка', desc: 'Доставка по всей России в удобное время', color: 'text-green-500', bg: 'bg-green-500/10' },
            { icon: 'Wrench', title: 'Монтаж', desc: 'Профессиональная установка и гарантия качества', color: 'text-purple-500', bg: 'bg-purple-500/10' }
          ].map((service, idx) => (
            <Card key={idx} className="text-center hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: `${idx * 0.15}s` }}>
              <CardHeader className="py-3 px-4">
                <div className={`w-12 h-12 ${service.bg} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <Icon name={service.icon as any} size={24} className={service.color} />
                </div>
                <CardTitle className="text-base mb-1">{service.title}</CardTitle>
                <CardDescription className="text-sm leading-snug">{service.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}