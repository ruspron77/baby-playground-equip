import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface ExcelSettingsDialogProps {
  isExcelSettingsOpen: boolean;
  setIsExcelSettingsOpen: (open: boolean) => void;
  imageColumnWidth: number;
  setImageColumnWidth: (width: number) => void;
  imageRowHeight: number;
  setImageRowHeight: (height: number) => void;
}

export function ExcelSettingsDialog({
  isExcelSettingsOpen,
  setIsExcelSettingsOpen,
  imageColumnWidth,
  setImageColumnWidth,
  imageRowHeight,
  setImageRowHeight
}: ExcelSettingsDialogProps) {
  return (
    <Dialog open={isExcelSettingsOpen} onOpenChange={setIsExcelSettingsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Настройки изображений Excel</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Ширина столбца с изображением</label>
            <Input
              type="number"
              value={imageColumnWidth}
              onChange={(e) => setImageColumnWidth(Number(e.target.value))}
              min={10}
              max={50}
            />
            <p className="text-xs text-muted-foreground mt-1">Рекомендуемое значение: 20</p>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Высота строки с изображением</label>
            <Input
              type="number"
              value={imageRowHeight}
              onChange={(e) => setImageRowHeight(Number(e.target.value))}
              min={50}
              max={200}
            />
            <p className="text-xs text-muted-foreground mt-1">Рекомендуемое значение: 100</p>
          </div>
          <Button 
            className="w-full" 
            onClick={() => setIsExcelSettingsOpen(false)}
          >
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
