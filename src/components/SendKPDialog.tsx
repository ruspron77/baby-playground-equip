import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface SendKPDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SendKPDialog({ open, onOpenChange }: SendKPDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    status: '',
    comment: ''
  });
  const [sendEmail, setSendEmail] = useState(true);
  const [sendWhatsApp, setSendWhatsApp] = useState(false);
  const [sendTelegram, setSendTelegram] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sendEmail && !sendWhatsApp && !sendTelegram) {
      toast({
        title: "Выберите способ отправки",
        description: "Выберите хотя бы один способ для отправки КП",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/79b601c4-b94b-4c1b-a0d0-851dbad1734e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'kp',
          sendEmail,
          sendWhatsApp,
          sendTelegram
        }),
      });

      if (response.ok) {
        const methods = [];
        if (sendEmail) methods.push('Email');
        if (sendWhatsApp) methods.push('WhatsApp');
        if (sendTelegram) methods.push('Telegram');
        
        toast({
          title: "Заявка отправлена!",
          description: `КП будет отправлено через: ${methods.join(', ')}`,
        });
      } else {
        throw new Error('Failed to send request');
      }
    } catch (error) {
      console.error('Failed to send KP request:', error);
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позвонить напрямую: +7 918 115-15-51",
        variant: "destructive"
      });
    }
    
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      status: '',
      comment: ''
    });
    setSendEmail(true);
    setSendWhatsApp(false);
    setSendTelegram(false);
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Отправка КП</DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Заполните форму и мы отправим коммерческое предложение удобным для вас способом
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Ф.И.О*"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Телефон*"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="email"
                placeholder="Email*"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                placeholder="Ваш город*"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })} required>
              <SelectTrigger>
                <SelectValue placeholder="Правовой статус*" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Физическое лицо</SelectItem>
                <SelectItem value="entrepreneur">Индивидуальный предприниматель</SelectItem>
                <SelectItem value="legal">Юридическое лицо</SelectItem>
                <SelectItem value="government">Государственная организация</SelectItem>
                <SelectItem value="education">Образовательное учреждение</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Textarea
              placeholder="Ваш комментарий"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={5}
              className="resize-none"
            />
          </div>

          <div className="space-y-3 border rounded-lg p-4 bg-muted/30">
            <p className="text-sm font-medium">Способ отправки КП:</p>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="email" 
                checked={sendEmail}
                onCheckedChange={(checked) => setSendEmail(checked as boolean)}
              />
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
              >
                <Icon name="Mail" size={16} />
                Email
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="whatsapp" 
                checked={sendWhatsApp}
                onCheckedChange={(checked) => setSendWhatsApp(checked as boolean)}
              />
              <label
                htmlFor="whatsapp"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
              >
                <Icon name="MessageCircle" size={16} />
                WhatsApp
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="telegram" 
                checked={sendTelegram}
                onCheckedChange={(checked) => setSendTelegram(checked as boolean)}
              />
              <label
                htmlFor="telegram"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
              >
                <Icon name="Send" size={16} />
                Telegram
              </label>
            </div>
          </div>

          <Button type="submit" size="lg" variant="outline" className="w-full border-[#3eaa03] text-[#3eaa03] hover:bg-[#3eaa03] hover:text-white hover:border-[#3eaa03] active:bg-[#3eaa03] active:text-white md:hover:bg-transparent md:hover:text-[#3eaa03] md:active:bg-transparent md:active:text-[#3eaa03]">
            <Icon name="Send" size={20} className="mr-2" />
            Отправить КП
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Оставляя заявку, вы соглашаетесь с{' '}
            <span className="text-primary">обработкой персональных данных</span> и{' '}
            <span className="text-primary">политикой конфиденциальности</span>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
