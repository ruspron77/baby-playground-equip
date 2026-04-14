import { useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const services = [
  {
    icon: 'Ruler',
    title: 'Проектирование',
    desc: 'Разработка индивидуальных проектов детских площадок',
    color: 'text-[#44aa02]',
    bg: 'bg-[#44aa02]/10',
    content: (
      <div className="space-y-4 text-sm leading-relaxed text-foreground">
        <p className="font-semibold text-base">Проектирование уличного игрового и спортивного оборудования: безопасность, надёжность, комфорт — с учётом ваших идей</p>
        <p>Наша компания занимается профессиональным проектированием оборудования для детских и спортивных площадок — от отдельных элементов до комплексных решений «под ключ». Мы не просто следуем стандартам — мы воплощаем ваши задумки в жизнь, создавая уникальные пространства для игр и спорта.</p>

        <div>
          <p className="font-semibold mb-2">Что мы проектируем:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>детские игровые комплексы (горки, качели, карусели, песочницы, лазалки, канатные конструкции);</li>
            <li>спортивные комплексы (воркаут‑зоны, турники, брусья, рукоходы, тренажёры для улицы);</li>
            <li>инклюзивное оборудование для детей с ограниченными возможностями;</li>
            <li>тематические игровые городки (пиратские корабли, замки, динозавры и т. д.);</li>
            <li>многофункциональные площадки для разных возрастных групп;</li>
            <li>малые архитектурные формы для парков (скамейки, беседки, перголы, урны).</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">Наши принципы проектирования:</p>
          <ul className="space-y-2">
            <li><span className="font-medium">Безопасность.</span> Все проекты соответствуют ГОСТ Р 52169‑2012, ТР ТС 042/2017 и другим нормативам. Рассчитываем зоны безопасности, амортизирующие покрытия, нагрузки на конструкции.</li>
            <li><span className="font-medium">Долговечность.</span> Подбираем материалы, устойчивые к погодным условиям, вандализму и интенсивной эксплуатации: нержавеющая сталь, влагостойкая древесина, полимерные покрытия.</li>
            <li><span className="font-medium">Эргономика.</span> Учитываем возрастные особенности пользователей: высоту ступеней, диаметр перекладин, угол наклона горок.</li>
            <li><span className="font-medium">Эстетика.</span> Создаём гармоничные решения, которые вписываются в ландшафт и архитектурный стиль территории.</li>
            <li><span className="font-medium">Функциональность.</span> Продумываем зонирование, маршруты движения, места для отдыха родителей и наблюдения за детьми.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">Индивидуальность. Мы ценим идеи заказчика — и готовы адаптировать любой проект под ваши пожелания:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>реализуем тематические концепции (космос, джунгли, средневековье, морские приключения и др.);</li>
            <li>учитываем фирменный стиль — используем корпоративные цвета, логотипы, элементы брендинга;</li>
            <li>создаём уникальные формы — проектируем нестандартные конструкции по эскизам или описаниям заказчика;</li>
            <li>интегрируем специальные элементы — интерактивные панели, музыкальные инструменты, тактильные дорожки;</li>
            <li>подстраиваемся под бюджет и сроки — предлагаем варианты оптимизации без потери качества и безопасности.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">Как мы работаем с пожеланиями заказчика:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>на этапе брифинга детально обсуждаем ваши идеи, цели и ограничения;</li>
            <li>предлагаем несколько концепций с разными стилистическими и функциональными решениями;</li>
            <li>создаём 3D‑визуализацию — вы видите, как площадка будет выглядеть в реальности;</li>
            <li>согласовываем все изменения до запуска в производство.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">Мы создаём оборудование, которое:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>радует детей и даёт возможность тренироваться взрослым;</li>
            <li>делает городскую среду комфортнее для всех;</li>
            <li>отражает индивидуальность территории или бренда;</li>
            <li>служит долгие годы, сохраняя безопасность и эстетику.</li>
          </ul>
        </div>

        <p className="font-medium text-[#44aa02]">Доверьте проектирование профессионалам — мы воплотим ваши идеи в надёжные, красивые и функциональные пространства!</p>
      </div>
    )
  },
  {
    icon: 'Factory',
    title: 'Производство',
    desc: 'Собственное производство из качественных материалов',
    color: 'text-[#ea580c]',
    bg: 'bg-[#ea580c]/10',
    content: (
      <div className="space-y-4 text-sm leading-relaxed text-foreground">
        <p className="font-semibold text-base">Производство уличного игрового и спортивного оборудования: надёжность, безопасность, долговечность</p>
        <p>Наша компания осуществляет полный цикл производства уличного оборудования для детских и спортивных площадок. Мы создаём надёжные и безопасные конструкции, которые служат долгие годы и радуют пользователей всех возрастов.</p>

        <div>
          <p className="font-semibold mb-2">Что мы производим:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>детские игровые комплексы (горки, качели, карусели, песочницы, лазалки, канатные конструкции);</li>
            <li>спортивные комплексы (воркаут‑зоны, турники, брусья, рукоходы, уличные тренажёры);</li>
            <li>инклюзивное оборудование для детей с ограниченными возможностями;</li>
            <li>тематические игровые городки (пиратские корабли, замки, динозавры и т. д.);</li>
            <li>многофункциональные площадки для разных возрастных групп;</li>
            <li>малые архитектурные формы для парков (скамейки, беседки, перголы, урны).</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">Этапы производства</p>
          <div className="space-y-3">
            <div>
              <p className="font-medium">Закупка материалов</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>порошковая покраска металла;</li>
                <li>влагостойкая древесина с антисептической пропиткой;</li>
                <li>полимерные композиты повышенной прочности;</li>
                <li>травмобезопасные покрытия.</li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Обработка металла</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>лазерная резка заготовок с точностью до 0,1 мм;</li>
                <li>гибка и сварка конструкций с контролем швов;</li>
                <li>пескоструйная обработка поверхности;</li>
                <li>нанесение антикоррозийного покрытия и порошковой краски.</li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Обработка древесины</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>калибровка и сушка до оптимальной влажности (8–12 %);</li>
                <li>фрезеровка деталей с ЧПУ‑точностью;</li>
                <li>пропитка защитными составами;</li>
                <li>финишная шлифовка и лакировка.</li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Изготовление полимерных элементов</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>литьё под давлением для создания прочных форм;</li>
                <li>УФ‑стабилизация для защиты от выгорания;</li>
                <li>контроль толщины стенок и прочности соединений.</li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Сборка конструкций</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>поэтапная сборка с проверкой всех узлов;</li>
                <li>тестирование подвижных элементов (качели, карусели);</li>
                <li>контроль затяжки болтовых соединений по нормам;</li>
                <li>проверка соответствия ГОСТ Р 52169‑2012 и ТР ТС 042/2017.</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold mb-2">Контроль качества</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>визуальный осмотр каждой детали;</li>
            <li>испытания на нагрузку (статическую и динамическую);</li>
            <li>проверка зон безопасности и травмоопасных элементов;</li>
            <li>оформление паспорта изделия и гарантийных документов.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">Упаковка и логистика</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>защита поверхностей плёнкой и уголками;</li>
            <li>маркировка комплектов для удобства монтажа;</li>
            <li>подготовка сопроводительной документации;</li>
            <li>организация доставки на объект.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">Преимущества нашего производства</p>
          <ul className="space-y-1">
            <li><span className="font-medium">Собственные мощности.</span> Полный цикл на заводе позволяет контролировать сроки и качество на всех этапах.</li>
            <li><span className="font-medium">Современное оборудование.</span> Используем ЧПУ‑станки, лазерные резаки, роботизированные линии сборки.</li>
            <li><span className="font-medium">Соответствие стандартам.</span> Вся продукция проходит сертификацию и соответствует требованиям ГОСТ и ТР ТС.</li>
            <li><span className="font-medium">Экологичность.</span> Применяем материалы без токсичных примесей — безопасные для детей и окружающей среды.</li>
            <li><span className="font-medium">Долговечность.</span> Конструкции рассчитаны на интенсивную эксплуатацию в любых погодных условиях.</li>
            <li><span className="font-medium">Гарантия.</span> Предоставляем гарантию до 5 лет на конструкции и покрытия.</li>
            <li><span className="font-medium">Сервис.</span> Консультируем по вопросам эксплуатации и обслуживания оборудования.</li>
            <li><span className="font-medium">Гибкость.</span> Выполняем заказы любых объёмов — от отдельных элементов до комплексных площадок.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">Мы создаём оборудование, которое:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>безопасно для детей всех возрастов;</li>
            <li>удобно для занятий спортом взрослых;</li>
            <li>гармонично вписывается в городскую среду и парки;</li>
            <li>устойчиво к погодным условиям и вандализму;</li>
            <li>служит долгие годы без потери функциональности и эстетики.</li>
          </ul>
        </div>

        <p className="font-medium text-[#ea580c]">Доверьте производство уличного оборудования профессионалам — получите надёжные, красивые и функциональные конструкции, которые станут точкой притяжения для всего района!</p>
      </div>
    )
  },
  {
    icon: 'Truck',
    title: 'Доставка',
    desc: 'Доставка по всей России в удобное время',
    color: 'text-[#58078a]',
    bg: 'bg-[#58078a]/10',
    content: (
      <div className="space-y-4 text-sm leading-relaxed text-foreground">
        <p>Подробная информация о доставке появится здесь.</p>
      </div>
    )
  },
  {
    icon: 'Wrench',
    title: 'Монтаж',
    desc: 'Профессиональная установка и гарантия качества',
    color: 'text-[#0284c7]',
    bg: 'bg-[#0284c7]/10',
    content: (
      <div className="space-y-4 text-sm leading-relaxed text-foreground">
        <p>Подробная информация о монтаже появится здесь.</p>
      </div>
    )
  }
];

export function ServicesSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const active = openIdx !== null ? services[openIdx] : null;

  return (
    <section id="services" className="bg-muted/30 order-1 md:order-1 py-2.5">
      <div className="container mx-auto px-3">
        <h2 className="text-2xl font-bold text-center mb-4">Наши услуги</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-2 my-[5px]">
          {services.map((service, idx) => (
            <Card
              key={idx}
              className="text-center hover:shadow-lg transition-shadow animate-scale-in cursor-pointer hover:border-primary/40"
              style={{ animationDelay: `${idx * 0.15}s` }}
              onClick={() => setOpenIdx(idx)}
            >
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

      <Dialog open={openIdx !== null} onOpenChange={(open) => !open && setOpenIdx(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              {active && (
                <div className={`w-10 h-10 ${active.bg} rounded-full flex items-center justify-center shrink-0`}>
                  <Icon name={active.icon as any} size={20} className={active.color} />
                </div>
              )}
              {active?.title}
            </DialogTitle>
          </DialogHeader>
          {active?.content}
        </DialogContent>
      </Dialog>
    </section>
  );
}