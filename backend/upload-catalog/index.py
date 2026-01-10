import json
import base64
import os
import boto3
import xlrd
import re
from io import BytesIO

def handler(event: dict, context) -> dict:
    '''Загрузка Excel-файла с каталогом и обновление базы товаров'''
    
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
        filename = body.get('filename', 'catalog.xls')
        base64_content = body.get('content', '')
        
        if not base64_content:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'error': 'Файл не передан'
                }),
                'isBase64Encoded': False
            }
        
        # Декодируем base64
        file_data = base64.b64decode(base64_content)
        
        # Загружаем в S3
        s3 = boto3.client('s3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
        )
        
        s3.put_object(
            Bucket='files',
            Key=filename,
            Body=file_data,
            ContentType='application/vnd.ms-excel'
        )
        
        # Парсим Excel для подсчёта товаров
        workbook = xlrd.open_workbook(file_contents=file_data)
        products_count = 0
        
        for sheet_idx in range(workbook.nsheets):
            sheet = workbook.sheet_by_index(sheet_idx)
            sheet_name = workbook.sheet_names()[sheet_idx]
            
            if 'оглавление' in sheet_name.lower():
                continue
            
            header_row_idx = None
            for row_idx in range(min(10, sheet.nrows)):
                row_values = [str(sheet.cell_value(row_idx, col)) for col in range(sheet.ncols)]
                if any('артикул' in val.lower() for val in row_values):
                    header_row_idx = row_idx
                    break
            
            if header_row_idx is None:
                continue
            
            for row_idx in range(header_row_idx + 1, sheet.nrows):
                row_values = [sheet.cell_value(row_idx, col) for col in range(sheet.ncols)]
                
                if not any(str(val).strip() for val in row_values):
                    continue
                
                name_and_code = str(row_values[2]).strip() if len(row_values) > 2 else ''
                
                if not name_and_code:
                    continue
                
                if any(word in name_and_code.lower() for word in ['workout, комплексы', 'workout, снаряды', 'тренажеры']):
                    continue
                
                article_match = re.search(r'([А-Яа-яA-Za-z]{2,4}-\d+)', name_and_code)
                if article_match or name_and_code:
                    products_count += 1
        
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{filename}"
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'productsCount': products_count,
                'fileUrl': cdn_url,
                'message': f'Файл загружен успешно. Найдено товаров: {products_count}'
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except Exception as e:
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
