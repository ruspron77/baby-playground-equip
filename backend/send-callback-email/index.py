import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

def handler(event, context):
    """Отправка заявки на обратный звонок на email ruspro23@mail.ru"""
    
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
        
        customer_name = body.get('name', '')
        customer_phone = body.get('phone', '')
        customer_email = body.get('email', '')
        customer_city = body.get('city', '')
        legal_status = body.get('status', '')
        comment = body.get('comment', '')
        
        # Словарь для перевода статусов
        status_map = {
            'individual': 'Физическое лицо',
            'entrepreneur': 'Индивидуальный предприниматель',
            'legal': 'Юридическое лицо',
            'government': 'Государственная организация',
            'education': 'Образовательное учреждение'
        }
        
        status_text = status_map.get(legal_status, legal_status)
        
        # Формируем HTML письмо
        html_content = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                h1 {{ color: #44aa02; border-bottom: 2px solid #44aa02; padding-bottom: 10px; }}
                .info-block {{ background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px; }}
                .label {{ font-weight: bold; color: #666; }}
                p {{ margin: 10px 0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Новая заявка на обратный звонок</h1>
                
                <div class="info-block">
                    <p><span class="label">Ф.И.О:</span> {customer_name}</p>
                    <p><span class="label">Телефон:</span> {customer_phone}</p>
                    <p><span class="label">Email:</span> {customer_email}</p>
                    <p><span class="label">Город:</span> {customer_city}</p>
                    <p><span class="label">Правовой статус:</span> {status_text}</p>
                    {f'<p><span class="label">Комментарий:</span> {comment}</p>' if comment else ''}
                </div>
            </div>
        </body>
        </html>
        """
        
        # Получаем SMTP настройки из переменных окружения
        smtp_host = os.environ.get('SMTP_HOST', 'smtp.yandex.ru')
        smtp_port_str = os.environ.get('SMTP_PORT', '587')
        try:
            smtp_port = int(''.join(filter(str.isdigit, smtp_port_str)) or '587')
        except:
            smtp_port = 587
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        
        if not smtp_user or not smtp_password:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'SMTP credentials not configured'})
            }
        
        # Создаем письмо
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Заявка на обратный звонок от {customer_name}'
        msg['From'] = smtp_user
        msg['To'] = 'ruspro23@mail.ru'
        
        html_part = MIMEText(html_content, 'html', 'utf-8')
        msg.attach(html_part)
        
        # Отправляем письмо
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Email sent successfully'})
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
