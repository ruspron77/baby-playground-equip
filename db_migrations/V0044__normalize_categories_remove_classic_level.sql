-- Обновляем старый формат Игра > Classic > ... → Игра > ...
UPDATE t_p92226548_baby_playground_equi.products
SET category = REGEXP_REPLACE(category, '^Игра > Classic > ', 'Игра > ')
WHERE category LIKE 'Игра > Classic > %';

-- Обновляем старый формат Спорт > Classic Sport > ... → Спорт > ...
UPDATE t_p92226548_baby_playground_equi.products
SET category = REGEXP_REPLACE(category, '^Спорт > Classic Sport > ', 'Спорт > ')
WHERE category LIKE 'Спорт > Classic Sport > %';

-- Обновляем Спорт > Workout → Спорт > Воркаут
UPDATE t_p92226548_baby_playground_equi.products
SET category = REPLACE(category, 'Спорт > Workout', 'Спорт > Воркаут')
WHERE category LIKE 'Спорт > Workout%';

-- Обновляем "Игровой комплекс 3-7 лет" → "Комплексы 3-7 лет"
UPDATE t_p92226548_baby_playground_equi.products
SET category = REPLACE(category, 'Игровой комплекс 3-7 лет', 'Комплексы 3-7 лет')
WHERE category LIKE '%Игровой комплекс 3-7 лет%';

-- Обновляем "Игровой комплекс 5-12 лет" → "Комплексы 5-12 лет"
UPDATE t_p92226548_baby_playground_equi.products
SET category = REPLACE(category, 'Игровой комплекс 5-12 лет', 'Комплексы 5-12 лет')
WHERE category LIKE '%Игровой комплекс 5-12 лет%';

-- Нормализуем двойные пробелы
UPDATE t_p92226548_baby_playground_equi.products
SET category = REGEXP_REPLACE(category, '\s+', ' ', 'g')
WHERE category LIKE '%  %';