-- Добавляем изображение балансира "Классик" в галерею
INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, 'https://cdn.poehali.dev/files/0131.png', 0
FROM products
WHERE article = '0131';