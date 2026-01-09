-- Обновление основной картинки товара 0115
UPDATE products
SET image_url = 'https://cdn.poehali.dev/files/115.png'
WHERE article = '0115';

-- Обновление картинки в галерее товара 0115
UPDATE product_images pi
SET image_url = 'https://cdn.poehali.dev/files/115.png'
FROM products p
WHERE pi.product_id = p.id AND p.article = '0115';