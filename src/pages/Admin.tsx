import { AdminPanel } from '@/components/AdminPanel';

export default function Admin() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Панель администратора</h1>
        </div>
      </header>
      <AdminPanel />
    </div>
  );
}
