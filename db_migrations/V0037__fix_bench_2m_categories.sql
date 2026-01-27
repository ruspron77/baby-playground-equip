-- Исправление категорий для скамеек уличных 2.0 м
UPDATE t_p92226548_baby_playground_equi.products 
SET category = 'Парк > Скамейки > Скамья уличная 2.0 м'
WHERE category LIKE 'Скамья    парковая%> Скамейки > Скамья уличная 2.0 м';