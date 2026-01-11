import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SubSubcategory {
  name: string;
  image: string;
}

interface Subcategory {
  name: string;
  image: string;
  hasChildren?: boolean;
  children?: SubSubcategory[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  image: string;
  bgImage: string;
  subcategories: Subcategory[];
  order?: number;
}

interface CategoryDialogsProps {
  isCategoryDialogOpen: boolean;
  setIsCategoryDialogOpen: (open: boolean) => void;
  currentCategory: Category | null;
  handleSubcategoryClick: (sub: Subcategory) => void;
  isSubSubcategoryDialogOpen: boolean;
  setIsSubSubcategoryDialogOpen: (open: boolean) => void;
  currentSubcategory: Subcategory | null;
  handleSubSubcategoryClick: (subSubName: string) => void;
}

export function CategoryDialogs({
  isCategoryDialogOpen,
  setIsCategoryDialogOpen,
  currentCategory,
  handleSubcategoryClick,
  isSubSubcategoryDialogOpen,
  setIsSubSubcategoryDialogOpen,
  currentSubcategory,
  handleSubSubcategoryClick,
}: CategoryDialogsProps) {
  return (
    <>
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-heading text-center mb-2">
              {currentCategory?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {currentCategory?.subcategories.map((sub) => (
              <Card
                key={sub.name}
                className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden group border-2 border-transparent hover:border-primary"
                onClick={() => handleSubcategoryClick(sub)}
              >
                <div className="aspect-square relative overflow-hidden bg-white flex items-center justify-center">
                  {sub.image.startsWith('http') ? (
                    <img src={sub.image} alt={sub.name} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{sub.image}</span>
                  )}
                </div>
                <div className="py-2 px-3 bg-white">
                  <h4 className="text-xl font-semibold text-center">{sub.name}</h4>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSubSubcategoryDialogOpen} onOpenChange={setIsSubSubcategoryDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-heading text-center mb-2">
              {currentSubcategory?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {currentSubcategory?.children?.map((subSub) => (
              <Card
                key={subSub.name}
                className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden group border-2 border-transparent hover:border-primary"
                onClick={() => handleSubSubcategoryClick(subSub.name)}
              >
                <div className="aspect-square relative overflow-hidden bg-white flex items-center justify-center">
                  {subSub.image.startsWith('http') ? (
                    <img src={subSub.image} alt={subSub.name} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{subSub.image}</span>
                  )}
                </div>
                <div className="py-2 px-3 bg-white">
                  <h4 className="text-sm font-semibold text-center">{subSub.name}</h4>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
