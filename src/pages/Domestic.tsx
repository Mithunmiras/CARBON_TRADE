import Dashboard from '@/components/Dashboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface DomesticPageProps {
  onBackToRoleSelect?: () => void;
}

const DomesticPage: FC<DomesticPageProps> = ({ onBackToRoleSelect }) => {
  const navigate = useNavigate();

  const back = () => {
    try {
      localStorage.removeItem('selectedRole');
    } catch (e) {}
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
        <div className="mb-4 p-4 rounded-lg bg-success/5 border border-success/20">
          <h2 className="text-lg font-semibold">Welcome, Domestic User</h2>
          <p className="text-sm text-muted-foreground">Personalized energy tracking and tips to reduce your household carbon footprint.</p>
        </div>
      </div>

      <Dashboard userRole="domestic" />
    </div>
  );
};

export default DomesticPage;
