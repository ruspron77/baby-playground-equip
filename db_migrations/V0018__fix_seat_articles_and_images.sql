-- Исправление артикулов и обновление всех данных сидений
UPDATE products SET 
    name = 'Сиденье качели',
    dimensions = '380х400х310',
    price = 10230,
    image_url = 'https://cdn.poehali.dev/files/123.png'
WHERE article = '0123';

UPDATE products SET 
    article = '0124',
    name = 'Сиденье прорезиненное "Люлька"',
    dimensions = '440х290х230',
    price = 28830,
    image_url = 'https://cdn.poehali.dev/files/124.png'
WHERE name LIKE '%прорезиненное%Люлька%' OR (article = '0124');

UPDATE products SET 
    name = 'Сиденье гибкое без спинки',
    dimensions = '670х140х8',
    price = 8370,
    image_url = 'https://cdn.poehali.dev/files/125.png'
WHERE article = '0125';

UPDATE products SET 
    name = 'Сиденье металлическое прорезиненное',
    dimensions = '450х180х27',
    price = 8680,
    image_url = 'https://cdn.poehali.dev/files/126.png'
WHERE article = '0126';

UPDATE products SET 
    name = 'Сиденье пластиковое "Люлька"',
    dimensions = '320х260х190',
    price = 22475,
    image_url = 'https://cdn.poehali.dev/files/127.png'
WHERE article = '0127';