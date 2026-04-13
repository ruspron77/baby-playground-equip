import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ContactDialog } from './ContactDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ContentSectionsProps {
  onCategorySelect?: (categoryName: string) => void;
}

export function ContentSections({ onCategorySelect }: ContentSectionsProps) {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <div className="order-4 bg-[#49187100] my-0 py-0 px-0 mx-0">
      <section id="about" className="pt-4 pb-8 bg-muted/30">
        <div className="container mx-auto px-0">
          <div className="grid md:grid-cols-2 gap-12 items-center px-3">
            <div className="animate-fade-in px-3">
              <h2 className="font-heading mb-6 font-semibold text-center md:text-left text-3xl">О компании</h2>
              <p className="text-muted-foreground mb-4 text-base">Мы специализируемся на производстве детского игрового и спортивного оборудования на протяжении 5 лет. За это время мы оснастили более 300 детских площадок по всей России.</p>
              <p className="text-muted-foreground mb-6 text-base">
                Наша продукция соответствует всем стандартам безопасности и имеет необходимые сертификаты. 
                Мы используем только качественные материалы и современные технологии производства.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">лет на рынке</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">300+</div>
                  <div className="text-sm text-muted-foreground">площадок</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#0284c7] mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">товаров</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="aspect-square flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                <CardContent className="text-center p-6">
                  <div className="text-5xl font-bold text-primary mb-2"></div>
                  <div className="text-sm text-muted-foreground"></div>
                </CardContent>
              </Card>
              <Card className="aspect-square flex items-center justify-center bg-gradient-to-br from-secondary/10 to-secondary/5">
                <CardContent className="text-center p-6">
                  <div className="text-5xl font-bold text-secondary mb-2"></div>
                  <div className="text-sm text-muted-foreground"></div>
                </CardContent>
              </Card>
              <Card className="aspect-square flex items-center justify-center bg-gradient-to-br from-[#0284c7]/10 to-[#0284c7]/5">
                <CardContent className="text-center p-6">
                  <div className="text-5xl font-bold text-[#0284c7] mb-2"></div>
                  <div className="text-sm text-muted-foreground"></div>
                </CardContent>
              </Card>
              <Card className="aspect-square flex items-center justify-center bg-gradient-to-br from-accent/10 to-accent/5">
                <CardContent className="text-center p-6">
                  <div className="text-5xl font-bold text-accent mb-2"></div>
                  <div className="text-sm text-muted-foreground"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="certificates" className="bg-white py-5">
        <div className="container mx-auto py-0 px-3">
          <div className="text-center mb-12">
            <h2 className="font-heading mb-4 font-semibold text-3xl">Сертификаты</h2>
            <p className="text-muted-foreground text-base mt-8 mb-3">Вся продукция сертифицирована и соответствует стандартам качества</p>
          </div>
          <div className="grid grid-cols-3 gap-4 md:gap-6 my-0 py-0">
            {['ГОСТ Р', 'ТР ТС', 'ISO 9001'].map((cert, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardContent className="p-3 md:py-4 md:px-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                    <Icon name="Award" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-sm md:text-xl font-heading font-bold mb-1 md:mb-2">{cert}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Сертификат соответствия</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer id="contacts" className="px-0 pt-10 pb-0 bg-muted/30 my-[22px]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
            {/* Лого + телефон + кнопка */}
            <div className="flex flex-row items-center gap-4">
              <img
                src="https://cdn.poehali.dev/projects/ffd62df4-6e6a-420c-99f5-4d24cf68fcf3/bucket/18e86aba-1013-49c2-b81f-ea612c1819cc.png"
                alt="Urban Play"
                className="h-20 w-auto object-contain flex-shrink-0"
              />
              <div className="flex flex-col gap-2 justify-center">
                <a href="tel:+79181151551" className="text-xl font-heading font-bold text-foreground hover:text-primary transition-colors">
                  +7 (918) 115-15-51
                </a>
                <Button
                  onClick={() => setIsContactDialogOpen(true)}
                  className="bg-primary hover:bg-primary/90 h-9 w-fit"
                >
                  Получить КП
                </Button>
              </div>
            </div>

            {/* Навигация колонка 1 */}
            <div className="flex flex-col gap-3 mx-[90px]">
              {[
                { label: 'Каталог', href: '#catalog' },
                { label: 'О компании', href: '#about' },
                { label: 'Сертификаты', href: '#certificates' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Навигация колонка 2 */}
            <div className="flex flex-col gap-3">
              {[
                { label: 'Игровое оборудование', category: 'Игра' },
                { label: 'Спортивное оборудование', category: 'Спорт' },
                { label: 'Парковое оборудование', category: 'Парк' },
                { label: 'Покрытие для площадок', category: 'Покрытие' },
              ].map(link => (
                <button
                  key={link.label}
                  onClick={() => {
                    onCategorySelect?.(link.category);
                    setTimeout(() => {
                      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Соцсети + email */}
            <div className="flex flex-col gap-4 my-0 mx-0">
              <div className="flex gap-3">
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#29a9eb' }}
                >
                  <Icon name="Send" size={18} className="text-white" />
                </a>
                <a
                  href="https://wa.me/79181151551"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#25d366' }}
                >
                  <Icon name="MessageCircle" size={18} className="text-white" />
                </a>
                <a
                  href="mailto:info@urban-play.ru"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#4f8ef7' }}
                >
                  <Icon name="Mail" size={18} className="text-white" />
                </a>
                <a
                  href="https://yandex.ru/maps/?pt=38.973389,45.053547&z=16&l=map"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#7c4dff' }}
                >
                  <Icon name="MapPin" size={18} className="text-white" />
                </a>
              </div>
              <a href="mailto:info@urban-play.ru" className="text-foreground font-semibold text-sm hover:text-primary transition-colors">
                info@urban-play.ru
              </a>
              <p className="text-muted-foreground text-sm">г. Краснодар, ул. Кореновская, д. 57 оф. 7</p>
            </div>
          </div>

          {/* Нижняя строка */}
          <div className="border-t border-border py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-muted-foreground text-xs">
            <span>&copy; 2026 Urban Play. Все права защищены.</span>
            <div className="flex gap-4">
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-foreground transition-colors underline"
              >
                Политика конфиденциальности
              </button>
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-foreground transition-colors underline"
              >
                Обработка персональных данных
              </button>
            </div>
          </div>
        </div>
      </footer>

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
            <p>3.1. Оператор имеет право:</p>
            <p>— получать от Субъекта Персональных данных достоверные информацию и / или документы, содержащие Персональные данные;</p>
            <p>— самостоятельно определять состав и перечень мер, необходимых и достаточных для обеспечения выполнения обязанностей, предусмотренных Законом о персональных данных и принятыми в соответствии с ним нормативными правовыми актами, если иное не предусмотрено Законом о персональных данных или другими нормативно-правовыми актами;</p>
            <p>— в случае отзыва Субъектом персональных данных согласия на обработку Персональных данных или направления обращения с требованием о прекращении обработки Персональных данных, Оператор вправе продолжить обработку Персональных данных без согласия Субъекта Персональных данных при наличии оснований, указанных в Законе о персональных данных.</p>
            <p>3.2. Оператор обязан:</p>
            <p>— предоставлять Субъекту Персональных данных по его просьбе информацию, касающуюся обработки его Персональных данных;</p>
            <p>— организовывать обработку Персональных данных в порядке, установленном действующим законодательством Российской Федерации;</p>
            <p>— отвечать на обращения и запросы Субъектов Персональных данных и их законных представителей в соответствии с требованиями Закона о персональных данных;</p>
            <p>— сообщать в уполномоченный орган по защите прав Субъектов Персональных данных по запросу этого органа необходимую информацию в течение 10 (Десяти) дней с даты получения такого запроса;</p>
            <p>— публиковать или иным образом обеспечивать неограниченный доступ к настоящей Политике;</p>
            <p>— принимать правовые, организационные и технические меры для защиты Персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения Персональных данных, а также от неправомерных действий в отношении Персональных данных;</p>
            <p>— прекратить передачу (предоставление, доступ) Персональных данных, прекратить обработку и уничтожить Персональные данные в порядке и случаях, предусмотренных Законом о персональных данных;</p>
            <p>— исполнять иные обязанности, предусмотренные Законом о персональных данных.</p>

            <h3 className="font-semibold text-foreground">4. Права и обязанности Субъектов Персональных данных</h3>
            <p>4.1. Субъекты Персональных данных имеют право:</p>
            <p>— получать информацию, касающуюся обработки их Персональных данных, за исключением случаев, предусмотренных законодательством;</p>
            <p>— требовать от Оператора уточнения его Персональных данных, их блокирования или уничтожения в случае, если Персональные данные являются неполными, устаревшими, неточными или не являются необходимыми для заявленной цели обработки, а также принимать предусмотренные законом меры по защите своих прав;</p>
            <p>— на отзыв согласия на обработку Персональных данных, а также направление требования о прекращении обработки Персональных данных;</p>
            <p>— обжаловать в уполномоченный орган по защите прав Субъектов Персональных данных или в судебном порядке неправомерные действия или бездействие Оператора при обработке его Персональных данных;</p>
            <p>— на осуществление иных прав, предусмотренных законодательством Российской Федерации.</p>
            <p>4.2. Субъекты Персональных данных обязаны предоставлять Оператору достоверные данные о себе; сообщать Оператору об уточнении (обновлении, изменении) своих Персональных данных.</p>
            <p>4.3. Лица, передавшие Оператору недостоверные сведения о себе, либо сведения о другом Субъекте Персональных данных без согласия последнего, несут ответственность в соответствии с законодательством Российской Федерации.</p>

            <h3 className="font-semibold text-foreground">5. Принципы обработки Персональных данных</h3>
            <p>5.1. Обработка Персональных данных осуществляется на законной и справедливой основе.</p>
            <p>5.2. Обработка Персональных данных ограничивается достижением конкретных, заранее определенных и законных целей. Не допускается обработка Персональных данных, несовместимая с целями сбора Персональных данных.</p>
            <p>5.3. Не допускается объединение баз данных, содержащих Персональные данные, обработка которых осуществляется в целях, несовместимых между собой.</p>
            <p>5.4. Обработке подлежат только Персональные данные, которые отвечают целям их обработки.</p>
            <p>5.5. Содержание и объем обрабатываемых Персональных данных соответствуют заявленным целям обработки. Не допускается избыточность обрабатываемых Персональных данных по отношению к заявленным целям их обработки.</p>
            <p>5.6. При обработке Персональных данных обеспечивается точность Персональных данных, их достаточность, а в необходимых случаях и актуальность по отношению к целям обработки Персональных данных.</p>
            <p>5.7. Хранение Персональных данных осуществляется в форме, позволяющей определить Субъекта Персональных данных, не дольше, чем этого требуют цели их обработки, если срок хранения Персональных данных не установлен законодательством Российской Федерации.</p>
            <p>5.8. Уничтожение или обеспечение уничтожения Персональных данных проводится по достижении целей их обработки или в случае утраты необходимости в достижении этих целей, если иное не предусмотрено законодательством Российской Федерации.</p>

            <h3 className="font-semibold text-foreground">6. Цели обработки Персональных данных</h3>
            <p>6.1. Оператор осуществляет обработку Персональных данных в следующих целях:</p>
            <p>6.1.1. Предоставление Пользователям услуг Оператора и (или) приобретение товаров Оператора: оформление, исполнение и доставка заказов; создание личного кабинета; консультационная и техническая поддержка; направление уведомлений; выполнение обязанностей по законодательству РФ; защита законных прав и интересов продавца; аналитика и улучшение работы Сайта; рассмотрение обращений Пользователя.</p>
            <p>Перечень персональных данных: идентификаторы Пользователя; фамилия, имя, отчество; номер телефона; адрес электронной почты; адреса доставки; данные заказов и предпочтений; технические и аналитические данные (IP-адрес, cookies, действия на сайте); признак согласия с документами; коммуникации с Оператором; отзывы клиентов.</p>
            <p>Правовое основание: исполнение договора, согласие Пользователя на использование Cookies и обработку Персональных данных.</p>
            <p>6.1.2. Проведение маркетинговых и рекламных коммуникаций (в случае их проведения Оператором). Правовое основание: согласие Пользователя на получение рекламных сообщений (в соответствии с ч. 1 ст. 18 Федерального закона «О рекламе»).</p>

            <h3 className="font-semibold text-foreground">7. Условия обработки Персональных данных</h3>
            <p>7.1. Обработка Персональных данных включает: сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу, блокирование, удаление, уничтожение Персональных данных.</p>
            <p>7.2. Способы обработки: автоматизированная (с использованием средств вычислительной техники) и неавтоматизированная (без использования средств вычислительной техники) с фиксацией Персональных данных на материальных носителях.</p>
            <p>7.3. Сроки обработки и хранения Персональных данных устанавливаются с учетом требований законодательства Российской Федерации и условий договора.</p>
            <p>7.4. Уничтожение Персональных данных производится при достижении цели обработки, выявлении факта неправомерной обработки, отзыве согласия или предъявлении требования о прекращении обработки.</p>
            <p>7.5. Передача Персональных данных третьим лицам допускается с согласия Субъекта Персональных данных или при наличии иных оснований, предусмотренных законодательством Российской Федерации.</p>
            <p>7.6. Трансграничная передача Персональных данных может осуществляться Оператором с учетом условий и ограничений, установленных Законом о персональных данных.</p>

            <h3 className="font-semibold text-foreground">8. Yandex.Metrica (Яндекс.Метрика), AppMetrica</h3>
            <p>8.1. Сайт использует Yandex.Metrica (Яндекс.Метрика), AppMetrica — службу веб-аналитики ООО «Яндекс», 119021, Россия, Москва, ул. Л. Толстого, 16.</p>
            <p>8.2. Yandex.Metrica использует cookie для анализа активности пользователей Сайта. Информация, собранная с помощью cookie, не раскрывает личность пользователя.</p>
            <p>8.3. Вы можете запретить сбор данных, загрузив плагин для браузера по ссылке: <a href="https://yandex.com/support/metrica/general/optout.html?lang=ru" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://yandex.com/support/metrica/general/optout.html</a></p>

            <h3 className="font-semibold text-foreground">9. Меры обеспечения конфиденциальности и безопасности Персональных данных</h3>
            <p>9.1. Оператор при обработке Персональных данных обеспечивает их конфиденциальность.</p>
            <p>9.2. Безопасность Персональных данных обеспечивается путем реализации правовых, организационных и технических мер: разработана Политика обработки Персональных данных; осуществляется внутренний контроль; работники ознакомлены с законодательством о персональных данных; определены угрозы безопасности; обеспечен учет машинных носителей; ограничен доступ посторонних лиц в помещения для обработки Персональных данных.</p>

            <h3 className="font-semibold text-foreground">10. Порядок рассмотрения обращений Субъектов Персональных данных</h3>
            <p>10.1. Пользователь может обращаться к Оператору для получения информации об обработке Персональных данных; уточнения, блокирования или уничтожения Персональных данных; подачи жалобы на неправомерную обработку; отзыва согласия на обработку Персональных данных.</p>
            <p>10.2. Ответ на запрос направляется в срок, не превышающий 10 (Десяти) дней со дня обращения с возможностью продления до 5 (Пяти) рабочих дней.</p>
            <p>10.3. При отказе в предоставлении информации Субъекту Персональных данных направляется мотивированный ответ в срок, не превышающий 10 (Десяти) дней.</p>

            <h3 className="font-semibold text-foreground">12. Заключительные положения</h3>
            <p>12.1. Пользователь может получить разъяснения по вопросам обработки его Персональных данных, обратившись по электронной почте <a href="mailto:info@mafkrasnodar.ru" className="text-primary hover:underline">info@urban-play.ru</a></p>
            <p>12.2. Оператор имеет право вносить изменения в настоящую Политику. Новая редакция Политики вступает в силу с момента её размещения на Сайте.</p>

            <h3 className="font-semibold text-foreground">13. Контакты и вопросы по персональным данным</h3>
            <p>13.1. Все обращения по поводу настоящей Политики направляйте:</p>
            <p>По адресу электронной почты: <a href="mailto:info@urban-play.ru" className="text-primary hover:underline">info@urban-play.ru</a></p>
            <p>По почтовому адресу: 350005, Россия, г. Краснодар, ул. Кореновская, д. 57, оф. 7</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}