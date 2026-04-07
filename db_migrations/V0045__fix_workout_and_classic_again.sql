-- Исправляем Workout → Воркаут
UPDATE t_p92226548_baby_playground_equi.products
SET category = REPLACE(category, 'Workout', 'Воркаут')
WHERE category LIKE '%Workout%';

-- Убираем уровень Classic если остался
UPDATE t_p92226548_baby_playground_equi.products
SET category = REGEXP_REPLACE(category, '^Игра > Classic > ', 'Игра > ')
WHERE category LIKE 'Игра > Classic > %';

UPDATE t_p92226548_baby_playground_equi.products
SET category = REGEXP_REPLACE(category, '^Спорт > Classic Sport > ', 'Спорт > ')
WHERE category LIKE 'Спорт > Classic Sport > %';