import { useState, useEffect } from 'react';

interface Product {
  id: number;
  article: string;
  name: string;
  category: string;
  subcategory?: string;
  subsubcategory?: string;
  price: string;
  image: string;
  description?: string;
  dimensions?: string;
  unit?: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/6f221f1d-5b1c-4e9c-afc2-b4a2876203a1');
        const data = await response.json();
        if (data.success) {
          const categoryMap: Record<string, string> = {
            'playground': 'playground',
            'Workout': 'sport',
            'park': 'park',
            'coating': 'coating'
          };
          
          setProducts(data.products.map((p: any) => {
            let mappedCategory = categoryMap[p.category] || p.category;
            let subcategory = undefined;
            let subsubcategory = undefined;
            
            // Обработка старого формата для Workout (без иерархии)
            if (p.category === 'Workout') {
              mappedCategory = 'sport';
              subcategory = 'Classic Sport';
              subsubcategory = 'Воркаут';
              console.log(`🏋️ Маппинг Workout товара: ${p.name} → subsubcategory: "Воркаут"`);
            }
            
            // Парсим категорию из формата "Категория > Подкатегория > Подподкатегория > ..."
            if (typeof p.category === 'string' && p.category.includes(' > ')) {
              // Нормализуем множественные пробелы перед парсингом
              const normalizedCategory = p.category.replace(/\s+/g, ' ').trim();
              const parts = normalizedCategory.split(' > ').map((s: string) => s.trim());
              
              // parts[0] - основная категория (Детские площадки, Игра, Спорт и т.д.)
              if (parts[0] === 'Детские площадки' || parts[0] === 'Игра') {
                mappedCategory = 'playground';
              } else if (parts[0] === 'Спорт') {
                mappedCategory = 'sport';
              } else if (parts[0] === 'Парк') {
                mappedCategory = 'park';
              }
              
              // Новая структура (без уровня Classic/Classic Sport):
              // Игра > Горки > h-1.0
              // Игра > Комплексы 3-7 лет > Классик
              // Спорт > Воркаут
              // Парк > Скамейки > Скамья уличная 1.5 м
              
              // Устаревшая структура (с уровнем Classic):
              // Игра > Classic > Горки > h-1.0
              // Спорт > Classic Sport > Воркаут
              
              const SERIES_NAMES = ['Classic', 'classic', 'Eco', 'eco', 'Classic Sport', 'Eco Sport'];
              const hasSeriesLevel = parts.length >= 2 && SERIES_NAMES.includes(parts[1]);
              
              if (parts.length >= 2) {
                if (parts[0] === 'Парк') {
                  subcategory = parts[1]; // "Скамейки", "Урны" и т.д.
                } else if (hasSeriesLevel) {
                  // Старый формат: Игра > Classic > ...
                  subcategory = parts[1];
                } else {
                  // Новый формат: Игра > Горки > ...  — subcategory не нужен (фильтрация по subsubcategory)
                  subcategory = undefined;
                }
              }
              
              if (parts.length === 2) {
                if (parts[0] === 'Парк') {
                  subsubcategory = parts[1]; // "Урны", "Скамейки"
                } else if (!hasSeriesLevel) {
                  // Новый формат: Игра > Качели → subsubcategory = "Качели"
                  subsubcategory = parts[1];
                }
              } else if (parts.length >= 3) {
                if (parts[0] === 'Парк') {
                  subsubcategory = parts[2]; // "Скамья уличная 1.5 м"
                } else if (!hasSeriesLevel) {
                  // Новый формат: Игра > Горки > h-1.0 → subsubcategory = "Горки > h-1.0"
                  // или Игра > Комплексы 3-7 лет > Классик → "Комплексы 3-7 лет > Классик"
                  let subParts = parts.slice(1); // всё начиная с parts[1]
                  subParts = subParts.map(p => p.replace(/\s+/g, ' ').trim());
                  subsubcategory = subParts.join(' > ');
                } else {
                  // Старый формат: Игра > Classic > Горки > h-1.0
                  // Объединяем всё после серии (начиная с parts[2])
                  let subParts = parts.slice(2);
                
                // Убираем "Игровые комплексы" если он первый (он уже в структуре диалога)
                if (subParts[0] === 'Игровые комплексы') {
                  subParts = subParts.slice(1);
                }
                
                // Сначала нормализуем пробелы во всех элементах
                subParts = subParts.map(p => p.replace(/\s+/g, ' ').trim());
                
                // Убираем дублирование: ["Горки", "Горки h-1.0"] → ["Горки", "h-1.0"]
                // Если второй элемент начинается с первого + пробел, убираем дубль из второго
                if (subParts.length >= 2 && subParts[1].toLowerCase().startsWith(subParts[0].toLowerCase() + ' ')) {
                  const before = subParts[1];
                  subParts[1] = subParts[1].substring(subParts[0].length + 1); // Убираем "Горки " из "Горки h-1.0"
                  if (p.name.includes('Горк')) {
                    console.log(`🛝 Горка обработка: "${before}" → "${subParts[1]}", full path: ${p.category}`);
                  }
                }
                
                // Преобразуем "Игровой комплекс X-Y лет" → "Комплексы X-Y лет"
                subParts = subParts.map(p => {
                  let normalized = p;
                  
                  if (normalized.includes('Игровой комплекс')) {
                    // "Игровой комплекс 3-7 лет" → "Комплексы 3-7 лет"
                    normalized = normalized.replace('Игровой комплекс', 'Комплексы');
                  }
                  
                  // Маппинг единственного числа в множественное
                  const singularToPlural: Record<string, string> = {
                    'балансир': 'Балансиры',
                    'горка': 'Горки',
                    'качели': 'Качели',
                    'карусель': 'Карусели',
                    'качалка': 'Качалки',
                    'домик': 'Домики',
                    'песочница': 'Песочницы',
                    'лаз': 'Лазы'
                  };
                  
                  const lowerNormalized = normalized.toLowerCase();
                  if (singularToPlural[lowerNormalized]) {
                    return singularToPlural[lowerNormalized];
                  }
                  
                  // Нормализуем регистр названий (классик → Классик)
                  if (lowerNormalized === 'классик') {
                    return 'Классик';
                  }
                  if (lowerNormalized === 'джунгли') {
                    return 'Джунгли';
                  }
                  if (lowerNormalized === 'замок') {
                    return 'Замок';
                  }
                  if (lowerNormalized === 'морская') {
                    return 'Морская';
                  }
                  if (lowerNormalized === 'лабиринт') {
                    return 'Лабиринт';
                  }
                  
                  // Маппинг спортивных категорий (английский → русский)
                  if (lowerNormalized === 'workout') {
                    return 'Воркаут';
                  }
                  
                  return normalized;
                });
                
                subsubcategory = subParts.join(' > ');
                
                // Лог для Горок и Спорта
                if (p.name.includes('Горк')) {
                  console.log(`🛝 Итоговая subsubcategory для "${p.name}": "${subsubcategory}"`);
                }
                if (mappedCategory === 'sport' && p.name.includes('Арт. 8')) {
                  console.log(`🏋️ Eco Sport товар: "${p.name}", category: "${p.category}", subcategory: "${subcategory}", subsubcategory: "${subsubcategory}"`);
                }
                }
              }
            } else {
              // Старая логика для обратной совместимости
              if (p.name.includes('Сиденье') || p.name.includes('Качели')) {
                subcategory = 'Classic';
                subsubcategory = 'Качели';
              } else if (p.name.includes('Карусель')) {
                subcategory = 'Classic';
                subsubcategory = 'Карусели';
              } else if (p.name.includes('Балансир')) {
                subcategory = 'Classic';
                subsubcategory = 'Балансиры';
              } else if (p.name.includes('Горка')) {
                subcategory = 'Серия "Classic"';
                subsubcategory = 'Горки';
              } else if (p.name.includes('Игровой комплекс')) {
                subcategory = 'Серия "Classic"';
                subsubcategory = 'Игровые комплексы';
              } else if (p.name.includes('Воркаут')) {
                subcategory = 'Серия "Classic"';
                subsubcategory = 'Workout';
              }
            }
            
            return {
              id: p.id,
              article: p.article,
              name: `Арт. ${p.article}\n${p.name}`,
              category: mappedCategory,
              subcategory,
              subsubcategory,
              price: p.price?.toString() || '0',
              image: p.image,
              description: p.description,
              dimensions: p.dimensions,
              unit: p.unit || 'шт'
            };
          }));
        }
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    loadProducts();
  }, []);

  return { products, isLoadingProducts };
}