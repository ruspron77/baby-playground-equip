-- Возвращаем Classic Sport товары из архива
UPDATE t_p92226548_baby_playground_equi.products 
SET category = REPLACE(category, 'Спорт > [Архив] Classic Sport >', 'Спорт > Classic Sport >')
WHERE category LIKE 'Спорт > [Архив] Classic Sport >%';