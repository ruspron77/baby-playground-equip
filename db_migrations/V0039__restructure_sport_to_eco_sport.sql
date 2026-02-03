-- Переименовываем Classic Sport в Eco Sport и объединяем тренажеры
-- 1. Переименовываем Workout
UPDATE t_p92226548_baby_playground_equi.products 
SET category = 'Спорт > Eco Sport > Воркаут'
WHERE category = 'Спорт > Classic Sport > Workout';

-- 2. Объединяем все тренажеры в одну категорию
UPDATE t_p92226548_baby_playground_equi.products 
SET category = 'Спорт > Eco Sport > Тренажеры'
WHERE category LIKE 'Спорт > Classic Sport > Тренажеры уличные >%';

-- 3. Удаляем остальные категории (переносим в архив или удаляем товары)
-- Для безопасности переименуем их с префиксом [Архив]
UPDATE t_p92226548_baby_playground_equi.products 
SET category = REPLACE(category, 'Спорт > Classic Sport >', 'Спорт > [Архив] Classic Sport >')
WHERE category LIKE 'Спорт > Classic Sport >%' 
  AND category NOT LIKE 'Спорт > Eco Sport >%';