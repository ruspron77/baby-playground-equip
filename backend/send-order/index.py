import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявок на email zakaz@urban-play.ru"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        data = json.loads(event.get('body', '{}'))
        order_type = data.get('type', 'order')
        name = data.get('name', '')
        phone = data.get('phone', '')
        email_address = data.get('email', '')
        comment = data.get('comment', '')
        items = data.get('items', [])
        total = data.get('total', 0)
        
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port_str = os.environ.get('SMTP_PORT', '587')
        smtp_port = int(smtp_port_str) if smtp_port_str.isdigit() else 587
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        
        if not all([smtp_host, smtp_user, smtp_password]):
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'SMTP not configured'})
            }
        
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = 'zakaz@urban-play.ru'
        
        if order_type == 'callback':
            msg['Subject'] = f'Заявка на обратный звонок - {name}'
            body = f"""
Новая заявка на обратный звонок!

Имя: {name}
Телефон: {phone}
Email: {email_address or 'не указан'}
Комментарий: {comment or 'нет'}
"""
        else:
            msg['Subject'] = f'Новый заказ от {name}'
            items_text = '\n'.join([f"- {item['name']} (Арт: {item['article']}) x{item['quantity']} шт = {item['price'] * item['quantity']} ₽" for item in items])
            body = f"""
Новый заказ!

Клиент: {name}
Телефон: {phone}
Email: {email_address or 'не указан'}
Комментарий: {comment or 'нет'}

Товары:
{items_text}

ИТОГО: {total} ₽
"""
        
        msg.attach(MIMEText(body, 'plain', 'utf-8'))
        
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'message': 'Email sent successfully'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }