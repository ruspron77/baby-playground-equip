import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface KPDialogProps {
  showKPDialog: boolean;
  setShowKPDialog: (show: boolean) => void;
  kpAddress: string;
  setKpAddress: (address: string) => void;
  kpInstallationPercent: number;
  setKpInstallationPercent: (percent: number) => void;
  kpDeliveryCost: number;
  setKpDeliveryCost: (cost: number) => void;
  hideInstallationInKP: boolean;
  setHideInstallationInKP: (hide: boolean) => void;
  hideDeliveryInKP: boolean;
  setHideDeliveryInKP: (hide: boolean) => void;
  generateKP: (options?: { address?: string; installationPercent?: number; deliveryCost?: number; hideInstallation?: boolean; hideDelivery?: boolean }) => void;
}

export function KPDialog({
  showKPDialog,
  setShowKPDialog,
  kpAddress,
  setKpAddress,
  kpInstallationPercent,
  setKpInstallationPercent,
  kpDeliveryCost,
  setKpDeliveryCost,
  hideInstallationInKP,
  setHideInstallationInKP,
  hideDeliveryInKP,
  setHideDeliveryInKP,
  generateKP
}: KPDialogProps) {
  return (
    <Dialog open={showKPDialog} onOpenChange={setShowKPDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Параметры коммерческого предложения</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Адрес доставки</label>
            <Input
              type="text"
              value={kpAddress}
              onChange={(e) => setKpAddress(e.target.value)}
              placeholder="Введите адрес"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Процент за монтаж (%)</label>
            <Input
              type="number"
              value={kpInstallationPercent || ''}
              onChange={(e) => setKpInstallationPercent(Number(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Стоимость доставки (₽)</label>
            <Input
              type="number"
              value={kpDeliveryCost || ''}
              onChange={(e) => setKpDeliveryCost(Number(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="hide-installation"
              checked={hideInstallationInKP}
              onCheckedChange={(checked) => setHideInstallationInKP(checked as boolean)}
            />
            <label htmlFor="hide-installation" className="text-sm cursor-pointer">
              Скрыть монтаж в КП
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="hide-delivery"
              checked={hideDeliveryInKP}
              onCheckedChange={(checked) => setHideDeliveryInKP(checked as boolean)}
            />
            <label htmlFor="hide-delivery" className="text-sm cursor-pointer">
              Скрыть доставку в КП
            </label>
          </div>
          <Button 
            className="w-full" 
            onClick={() => {
              generateKP({ 
                address: kpAddress, 
                installationPercent: kpInstallationPercent,
                deliveryCost: kpDeliveryCost,
                hideInstallation: hideInstallationInKP,
                hideDelivery: hideDeliveryInKP
              });
              setShowKPDialog(false);
            }}
          >
            Создать КП
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
