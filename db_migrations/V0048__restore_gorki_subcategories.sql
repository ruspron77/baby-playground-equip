-- Восстанавливаем подкатегории горок по высоте
-- Временно помечаем горки признаком высоты по артикулу/названию товара
-- h-0.6 = горки с высотой 0.6, h-1.0 = 1.0, h-1.5 = 1.5
UPDATE t_p92226548_baby_playground_equi.products
SET category = CASE
  WHEN name ILIKE '%h-0.6%' OR name ILIKE '%h0.6%' OR dimensions ILIKE '%h-0.6%' THEN 'Игра > Горки > h-0.6'
  WHEN name ILIKE '%h-1.5%' OR name ILIKE '%h1.5%' OR dimensions ILIKE '%h-1.5%' THEN 'Игра > Горки > h-1.5'
  WHEN name ILIKE '%h-1.0%' OR name ILIKE '%h1.0%' OR dimensions ILIKE '%h-1.0%' THEN 'Игра > Горки > h-1.0'
  ELSE category
END
WHERE category = 'Игра > Горки';