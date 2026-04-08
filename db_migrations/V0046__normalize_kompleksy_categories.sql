-- Нормализуем "Игровой комплекс 3-7 лет" → "Комплексы 3-7 лет"
UPDATE t_p92226548_baby_playground_equi.products
SET category = REPLACE(category, 'Игровой комплекс 3-7 лет', 'Комплексы 3-7 лет')
WHERE category LIKE '%Игровой комплекс 3-7 лет%';

-- Убираем двойной пробел в "Комплексы  5-12 лет"
UPDATE t_p92226548_baby_playground_equi.products
SET category = REPLACE(category, 'Комплексы  5-12 лет', 'Комплексы 5-12 лет')
WHERE category LIKE '%Комплексы  5-12 лет%';

-- Нормализуем "Игра > Комплексы 5-12 лет > Лабиринт" → "Игра > Комплексы 5-12 лет"
UPDATE t_p92226548_baby_playground_equi.products
SET category = 'Игра > Комплексы 5-12 лет'
WHERE category = 'Игра > Комплексы 5-12 лет > Лабиринт';