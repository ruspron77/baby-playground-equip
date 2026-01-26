import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    '''Загрузка изображения для подкатегории по имени'''
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        subcategory_name = body.get('subcategory', '')
        image_url = body.get('image_url', '')
        
        print(f'Получен запрос на загрузку изображения для подкатегории: {subcategory_name}')
        print(f'URL изображения: {image_url}')
        
        if not subcategory_name or not image_url:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'error': 'Название подкатегории и URL изображения обязательны'
                }),
                'isBase64Encoded': False
            }
        
        # Подключаемся к БД
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cursor = conn.cursor()
        schema = os.environ['MAIN_DB_SCHEMA']
        
        safe_name = subcategory_name.replace("'", "''")
        safe_url = image_url.replace("'", "''")
        
        print(f'Ищем подкатегорию: {safe_name} в схеме: {schema}')
        
        # Проверяем существует ли подкатегория
        cursor.execute(f"SELECT id, name FROM {schema}.subcategories WHERE name ILIKE '%{safe_name}%' LIMIT 1")
        result = cursor.fetchone()
        
        if not result:
            print(f'Подкатегория {subcategory_name} не найдена в базе!')
            cursor.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'error': f'Подкатегория {subcategory_name} не найдена'
                }),
                'isBase64Encoded': False
            }
        
        subcat_id = result[0]
        subcat_name = result[1]
        
        print(f'Подкатегория найдена: ID={subcat_id}, name={subcat_name}')
        
        # Обновляем URL изображения
        update_query = f"UPDATE {schema}.subcategories SET image_url = '{safe_url}' WHERE id = {subcat_id}"
        print(f'Выполняю UPDATE: {update_query}')
        cursor.execute(update_query)
        
        print(f'UPDATE выполнен, строк обновлено: {cursor.rowcount}')
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'subcategory_id': subcat_id,
                'subcategory_name': subcat_name,
                'image_url': image_url
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f'Error: {error_details}')
        
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': str(e)
            }),
            'isBase64Encoded': False
        }
