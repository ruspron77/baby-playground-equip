import io
import os
import urllib.request
from datetime import datetime
from fpdf import FPDF
from PIL import Image as PILImage


def generate_pdf_fpdf(products, address, installation_percent, installation_cost, delivery_cost, 
                      hide_installation, hide_delivery, kp_number):
    """Генерация PDF с использованием FPDF2"""
    
    pdf = FPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=False)
    
    # Используем встроенные шрифты без кириллицы
    pdf.set_font('Helvetica', '', 11)
    
    # Логотип
    try:
        logo_url = 'https://cdn.poehali.dev/files/%D0%BB%D0%BE%D0%B3%D0%BE%D0%BA%D0%BF.png'
        req = urllib.request.Request(logo_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            logo_data = io.BytesIO(response.read())
            with open('/tmp/logo_temp.png', 'wb') as f:
                f.write(logo_data.getvalue())
            pdf.image('/tmp/logo_temp.png', x=10, y=10, w=60)
    except Exception as e:
        print(f'Failed to load logo: {e}')
    
    # Информация о компании (справа) - транслитом
    pdf.set_font('Helvetica', 'B', 11)
    pdf.set_xy(120, 10)
    pdf.cell(0, 5, 'IP PRONIN RUSLAN OLEGOVICH', align='R')
    
    pdf.set_font('Helvetica', '', 9)
    pdf.set_xy(120, 15)
    pdf.cell(0, 5, 'INN 110209455200 OGRNIP 323774600102482', align='R')
    
    pdf.set_xy(120, 20)
    pdf.cell(0, 5, '350005, Krasnodar, ul. Korenovskaya, 57-7', align='R')
    
    pdf.set_xy(120, 25)
    pdf.cell(0, 5, 'tel: +7 918 115 15 51', align='R')
    
    pdf.set_xy(120, 30)
    pdf.cell(0, 5, 'e-mail: info@urban-play.ru', align='R')
    
    pdf.set_xy(120, 35)
    pdf.set_text_color(5, 99, 193)
    pdf.cell(0, 5, 'www.urban-play.ru', align='R', link='https://www.urban-play.ru')
    pdf.set_text_color(0, 0, 0)
    
    # Декоративные линии
    pdf.set_fill_color(68, 170, 2)
    pdf.rect(10, 45, 190, 0.5, 'F')
    
    pdf.set_fill_color(88, 7, 138)
    pdf.rect(10, 46, 190, 0.5, 'F')
    
    # Заголовок КП
    pdf.set_font('Helvetica', 'B', 14)
    pdf.set_xy(10, 52)
    kp_date = datetime.now().strftime("%d.%m.%Y")
    pdf.cell(0, 8, f'Commercial Offer No {kp_number:04d} from {kp_date}', align='C')
    
    # Адрес объекта
    y_pos = 65
    if address:
        pdf.set_font('Helvetica', '', 11)
        pdf.set_xy(10, y_pos)
        pdf.cell(0, 6, f'Address: {address}')
        y_pos += 10
    
    # Таблица товаров
    pdf.set_font('Helvetica', 'B', 9)
    pdf.set_fill_color(68, 170, 2)
    pdf.set_text_color(255, 255, 255)
    
    col_widths = [10, 25, 75, 25, 15, 30]
    headers = ['No', 'Article', 'Name', 'Price, RUB', 'Qty', 'Sum, RUB']
    
    x_start = 10
    pdf.set_xy(x_start, y_pos)
    for i, header in enumerate(headers):
        pdf.cell(col_widths[i], 8, header, border=1, fill=True, align='C')
    
    y_pos += 8
    pdf.set_text_color(0, 0, 0)
    pdf.set_fill_color(255, 255, 255)
    pdf.set_font('Helvetica', '', 9)
    
    total = 0
    for idx, product in enumerate(products, 1):
        price = int(product['price'].replace(' ', ''))
        quantity = product['quantity']
        
        if hide_installation:
            price = int(price * (1 + installation_percent / 100))
        if hide_delivery:
            price = int(price + delivery_cost / len(products))
        
        sum_price = price * quantity
        total += sum_price
        
        pdf.set_xy(x_start, y_pos)
        pdf.cell(col_widths[0], 6, str(idx), border=1, align='C')
        pdf.cell(col_widths[1], 6, product.get('article', ''), border=1, align='C')
        
        # Только латиница в названиях
        name = product['name'][:40]
        # Простая очистка от кириллицы
        name_clean = ''.join(c if ord(c) < 128 else '?' for c in name)
        pdf.cell(col_widths[2], 6, name_clean, border=1)
        
        pdf.cell(col_widths[3], 6, f"{price:,}".replace(',', ' '), border=1, align='R')
        pdf.cell(col_widths[4], 6, str(quantity), border=1, align='C')
        pdf.cell(col_widths[5], 6, f"{sum_price:,}".replace(',', ' '), border=1, align='R')
        y_pos += 6
    
    # Итого
    pdf.set_font('Helvetica', 'B', 9)
    pdf.set_xy(x_start + sum(col_widths[:4]), y_pos)
    pdf.cell(col_widths[4], 6, 'Total:', border=1, align='R')
    pdf.cell(col_widths[5], 6, f"{total:,}".replace(',', ' '), border=1, align='R')
    y_pos += 6
    
    # Монтаж
    if not hide_installation and installation_cost > 0:
        pdf.set_xy(x_start + sum(col_widths[:4]), y_pos)
        pdf.cell(col_widths[4], 6, f'Install ({installation_percent}%):', border=1, align='R')
        pdf.cell(col_widths[5], 6, f"{installation_cost:,}".replace(',', ' '), border=1, align='R')
        total += installation_cost
        y_pos += 6
    
    # Доставка
    if not hide_delivery and delivery_cost > 0:
        pdf.set_xy(x_start + sum(col_widths[:4]), y_pos)
        pdf.cell(col_widths[4], 6, 'Delivery:', border=1, align='R')
        pdf.cell(col_widths[5], 6, f"{delivery_cost:,}".replace(',', ' '), border=1, align='R')
        total += delivery_cost
        y_pos += 6
    
    # Всего
    pdf.set_xy(x_start + sum(col_widths[:4]), y_pos)
    pdf.cell(col_widths[4], 6, 'Grand Total:', border=1, align='R')
    pdf.cell(col_widths[5], 6, f"{total:,}".replace(',', ' '), border=1, align='R')
    y_pos += 10
    
    # Футер
    pdf.set_font('Helvetica', '', 10)
    pdf.set_xy(10, y_pos)
    pdf.cell(0, 5, 'Equipment has certificate TS EAES 042-2017')
    y_pos += 6
    
    pdf.set_xy(10, y_pos)
    pdf.cell(0, 5, 'Commercial offer validity: 15 days')
    y_pos += 6
    
    pdf.set_xy(10, y_pos)
    pdf.cell(0, 5, 'Production time: 30 days')
    y_pos += 10
    
    # Подпись
    pdf.set_xy(10, y_pos)
    pdf.cell(0, 5, 'Individual entrepreneur___________________________/Pronin R.O./', align='C')
    
    return pdf.output()