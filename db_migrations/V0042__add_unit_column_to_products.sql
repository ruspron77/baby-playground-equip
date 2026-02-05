-- Добавляем колонку unit (единица измерения) в таблицу products
ALTER TABLE products ADD COLUMN IF NOT EXISTS unit VARCHAR(20) DEFAULT 'шт';