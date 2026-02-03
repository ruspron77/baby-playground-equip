-- Переносим Воркаут из Eco Sport в Classic Sport
UPDATE t_p92226548_baby_playground_equi.products 
SET category = 'Спорт > Classic Sport > Workout'
WHERE category = 'Спорт > Eco Sport > Воркаут';

-- Переносим Тренажеры из Eco Sport в Classic Sport (объединяем обратно в Тренажеры уличные)
UPDATE t_p92226548_baby_playground_equi.products 
SET category = 'Спорт > Classic Sport > Тренажеры уличные > Комбинированные'
WHERE category = 'Спорт > Eco Sport > Тренажеры';