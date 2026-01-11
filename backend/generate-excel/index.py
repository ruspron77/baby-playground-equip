import json
import io
import base64
import os
from datetime import datetime
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from openpyxl.drawing.image import Image as XLImage
from openpyxl.utils import get_column_letter
import urllib.request

COUNTER_FILE = '/tmp/kp_counter.txt'

def get_next_kp_number():
    """Получить следующий номер КП из счетчика"""
    try:
        if os.path.exists(COUNTER_FILE):
            with open(COUNTER_FILE, 'r') as f:
                counter = int(f.read().strip())
        else:
            counter = 0
        
        counter += 1
        
        with open(COUNTER_FILE, 'w') as f:
            f.write(str(counter))
        
        return counter
    except:
        return 1

def handler(event, context):
    """Генерация Excel файла с коммерческим предложением"""
    
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        products = body.get('products', [])
        delivery_cost = body.get('deliveryCost', 0)
        
        wb = Workbook()
        ws = wb.active
        ws.title = "Коммерческое предложение"
        
        current_row = 1
        
        # Заголовок компании (правый верхний угол)
        ws.merge_cells(f'E{current_row}:G{current_row}')
        cell = ws.cell(row=current_row, column=5, value='ИП ИРОНИН РУСЛАН ОЛЕГОВИЧ')
        cell.font = Font(bold=True, size=11)
        cell.alignment = Alignment(horizontal='right', vertical='center')
        current_row += 1
        
        # ИНН и ОГРНИП
        ws.merge_cells(f'E{current_row}:G{current_row}')
        cell = ws.cell(row=current_row, column=5, value='ИНН 110290632307 ОГРНИП 321112300012852')
        cell.font = Font(size=9)
        cell.alignment = Alignment(horizontal='right', vertical='center')
        current_row += 1
        
        # Адрес
        ws.merge_cells(f'E{current_row}:G{current_row}')
        cell = ws.cell(row=current_row, column=5, value='353900, г. Новороссийск, ул. Героев-Десантников, д. 57 кв. 7')
        cell.font = Font(size=9)
        cell.alignment = Alignment(horizontal='right', vertical='center')
        current_row += 1
        
        # Телефон и email
        ws.merge_cells(f'E{current_row}:G{current_row}')
        cell = ws.cell(row=current_row, column=5, value='тел. +7 918 115 15 51, e-mail: info@urban-play.ru')
        cell.font = Font(size=9)
        cell.alignment = Alignment(horizontal='right', vertical='center')
        current_row += 2
        
        # Заголовок КП с постоянным счетчиком
        ws.merge_cells(f'A{current_row}:G{current_row}')
        kp_number = get_next_kp_number()
        cell = ws.cell(row=current_row, column=1, value=f'Коммерческое предложение № {kp_number} от {datetime.now().strftime("%d.%m.%Y")}')
        cell.font = Font(bold=True, size=14)
        cell.alignment = Alignment(horizontal='center', vertical='center')
        ws.row_dimensions[current_row].height = 25
        current_row += 2
        
        # Адрес объекта
        ws.cell(row=current_row, column=1, value='Адрес объекта:').font = Font(bold=True)
        ws.cell(row=current_row, column=2, value='_' * 80)
        current_row += 2
        
        # Настройка колонок для таблицы
        ws.column_dimensions['A'].width = 4   # №
        ws.column_dimensions['B'].width = 30  # Наименование
        ws.column_dimensions['C'].width = 18  # Рисунок
        ws.column_dimensions['D'].width = 8   # Кол-во
        ws.column_dimensions['E'].width = 8   # Ед. изм
        ws.column_dimensions['F'].width = 12  # Цена
        ws.column_dimensions['G'].width = 14  # Сумма
        
        # Стили границ
        thin_border = Border(
            left=Side(style='thin'),
            right=Side(style='thin'),
            top=Side(style='thin'),
            bottom=Side(style='thin')
        )
        
        # Заголовки таблицы
        table_start_row = current_row
        headers = ['№', 'Наименование', 'Рисунок', 'Кол-во', 'Ед. изм', 'Цена, руб', 'Сумма, руб']
        for col_num, header in enumerate(headers, 1):
            cell = ws.cell(row=current_row, column=col_num, value=header)
            cell.font = Font(bold=True, size=10)
            cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
            cell.border = thin_border
        
        ws.row_dimensions[current_row].height = 30
        current_row += 1
        
        # Заполнение данных
        equipment_total = 0
        
        for idx, product in enumerate(products, 1):
            row_start = current_row
            ws.row_dimensions[current_row].height = 80
            
            # Номер
            cell = ws.cell(row=current_row, column=1, value=idx)
            cell.alignment = Alignment(horizontal='center', vertical='center')
            cell.border = thin_border
            
            # Наименование (артикул + название)
            article = product.get('article', '')
            name = product.get('name', '')
            full_name = f"{article}\n{name}" if article else name
            cell = ws.cell(row=current_row, column=2, value=full_name)
            cell.alignment = Alignment(horizontal='left', vertical='center', wrap_text=True)
            cell.border = thin_border
            
            # Рисунок - изображение (уменьшенный размер)
            if product.get('image') and product['image'].startswith('http'):
                try:
                    req = urllib.request.Request(product['image'], headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req, timeout=10) as response:
                        img_data = response.read()
                        img = XLImage(io.BytesIO(img_data))
                        # Уменьшенные размеры чтобы картинка не выходила за ячейку
                        img.width = 90
                        img.height = 75
                        ws.add_image(img, f'C{current_row}')
                except Exception as e:
                    print(f'Failed to load image: {e}')
            
            cell = ws.cell(row=current_row, column=3, value='')
            cell.border = thin_border
            cell.alignment = Alignment(horizontal='center', vertical='center')
            
            # Количество
            quantity = product['quantity']
            cell = ws.cell(row=current_row, column=4, value=quantity)
            cell.alignment = Alignment(horizontal='center', vertical='center')
            cell.border = thin_border
            
            # Ед. изм
            cell = ws.cell(row=current_row, column=5, value='шт')
            cell.alignment = Alignment(horizontal='center', vertical='center')
            cell.border = thin_border
            
            # Цена
            price = int(product['price'].replace(' ', '')) if isinstance(product['price'], str) else product['price']
            cell = ws.cell(row=current_row, column=6, value=price)
            cell.alignment = Alignment(horizontal='right', vertical='center')
            cell.number_format = '#,##0.00'
            cell.border = thin_border
            
            # Сумма
            sum_price = price * quantity
            equipment_total += sum_price
            cell = ws.cell(row=current_row, column=7, value=sum_price)
            cell.alignment = Alignment(horizontal='right', vertical='center')
            cell.number_format = '#,##0.00'
            cell.border = thin_border
            
            current_row += 1
        
        # Монтаж и доставка (20% от стоимости оборудования)
        installation_cost = equipment_total * 0.2
        
        cell = ws.cell(row=current_row, column=1, value=len(products) + 1)
        cell.alignment = Alignment(horizontal='center', vertical='center')
        cell.border = thin_border
        
        cell = ws.cell(row=current_row, column=2, value='Монтаж и доставка')
        cell.alignment = Alignment(horizontal='left', vertical='center')
        cell.border = thin_border
        
        cell = ws.cell(row=current_row, column=3, value='')
        cell.border = thin_border
        
        cell = ws.cell(row=current_row, column=4, value=1)
        cell.alignment = Alignment(horizontal='center', vertical='center')
        cell.border = thin_border
        
        cell = ws.cell(row=current_row, column=5, value='усл')
        cell.alignment = Alignment(horizontal='center', vertical='center')
        cell.border = thin_border
        
        cell = ws.cell(row=current_row, column=6, value=installation_cost)
        cell.alignment = Alignment(horizontal='right', vertical='center')
        cell.number_format = '#,##0.00'
        cell.border = thin_border
        
        cell = ws.cell(row=current_row, column=7, value=installation_cost)
        cell.alignment = Alignment(horizontal='right', vertical='center')
        cell.number_format = '#,##0.00'
        cell.border = thin_border
        
        current_row += 1
        
        # Итоговая сумма
        total_sum = equipment_total + installation_cost
        
        ws.merge_cells(f'A{current_row}:F{current_row}')
        cell = ws.cell(row=current_row, column=1, value='Итого:')
        cell.font = Font(bold=True, size=12)
        cell.alignment = Alignment(horizontal='right', vertical='center')
        cell.border = thin_border
        
        cell = ws.cell(row=current_row, column=7, value=total_sum)
        cell.font = Font(bold=True, size=12)
        cell.alignment = Alignment(horizontal='right', vertical='center')
        cell.number_format = '#,##0.00'
        cell.border = thin_border
        
        current_row += 2
        
        # Условия
        ws.cell(row=current_row, column=1, value='Оборудование имеет сертификат соответствия ТС ЕАЭС 042-2017')
        current_row += 1
        
        ws.cell(row=current_row, column=1, value='Сроки выполнения работ: 30 рабочих дней')
        current_row += 1
        
        ws.cell(row=current_row, column=1, value='Гарантия: 12 месяцев')
        current_row += 2
        
        # Подпись
        ws.cell(row=current_row, column=1, value='Индивидуальный предприниматель:')
        ws.cell(row=current_row, column=5, value='Иронин Р.О.')
        current_row += 2
        
        ws.cell(row=current_row, column=1, value='Дата выдачи коммерческого предложения:')
        ws.cell(row=current_row, column=5, value=datetime.now().strftime('%d.%m.%Y'))
        
        # Сохранение
        output = io.BytesIO()
        wb.save(output)
        output.seek(0)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="commercial_offer.xlsx"',
                'Access-Control-Allow-Origin': '*'
            },
            'body': base64.b64encode(output.read()).decode('utf-8'),
            'isBase64Encoded': True
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
