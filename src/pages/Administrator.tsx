import Dashboard from '@/components/Dashboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminPageProps {
  onBackToRoleSelect?: () => void;
}

const AdministratorPage: FC<AdminPageProps> = ({ onBackToRoleSelect }) => {
  const navigate = useNavigate();

  const back = () => {
    try { localStorage.removeItem('selectedRole'); } catch (e) {}
    if (onBackToRoleSelect) return onBackToRoleSelect();
    navigate('/role-select');
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={back}
        className="absolute top-4 left-4 z-50 bg-card/80 backdrop-blur-sm border border-border/50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Change Role
      </Button>

      <div className="p-4 max-w-6xl mx-auto">
        <div className="mb-4 p-4 rounded-lg bg-warning/5 border border-warning/20">
          <h2 className="text-lg font-semibold">Welcome, Administrator</h2>
          <p className="text-sm text-muted-foreground">Manage platform operations, users, and system settings from the admin console.</p>
        </div>
      </div>

      <Dashboard userRole="admin" />
    </div>
  );
};

export default AdministratorPage;
