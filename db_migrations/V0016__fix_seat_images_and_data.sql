-- Правильное соответствие изображений сидениям
UPDATE products SET 
  name = 'Сиденье качели',
  image_url = 'https://cdn.poehali.dev/files/124.png',
  dimensions = '380х400х310',
  price = 10230
WHERE article = '0123';

UPDATE products SET 
  name = 'Сиденье прорезиненное "Люлька"',
  image_url = 'https://cdn.poehali.dev/files/128.png',
  dimensions = '440х290х230',
  price = 28830
WHERE article = '0124';

UPDATE products SET 
  name = 'Сиденье гибкое без спинки',
  image_url = 'https://cdn.poehali.dev/files/125.png',
  dimensions = '670х140х8',
  price = 8370
WHERE article = '0125';

UPDATE products SET 
  name = 'Сиденье металлическое прорезиненное',
  image_url = 'https://cdn.poehali.dev/files/126.png',
  dimensions = '450х180х27',
  price = 8680
WHERE article = '0126';

UPDATE products SET 
  name = 'Сиденье пластиковое "Люлька"',
  image_url = 'https://cdn.poehali.dev/files/127.png',
  dimensions = '320х260х190',
  price = 22475
WHERE article = '0127';