-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    article VARCHAR(100) UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    subcategory2 TEXT,
    subcategory3 TEXT,
    subcategory4 TEXT,
    price VARCHAR(50) NOT NULL,
    image TEXT,
    description TEXT,
    dimensions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on article for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_article ON products(article);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);