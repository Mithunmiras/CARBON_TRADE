import RoleSelector from '@/components/RoleSelector';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface RoleSelectPageProps {
  onBack?: () => void;
  onRoleSelect?: (role: 'company' | 'admin' | 'domestic') => void;
}

const RoleSelectPage: FC<RoleSelectPageProps> = ({ onBack, onRoleSelect }) => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'company' | 'admin' | 'domestic') => {
    // persist selection
    try {
      localStorage.setItem('selectedRole', role);
    } catch (e) {
      /* ignore */
    }

    if (onRoleSelect) {
      onRoleSelect(role);
      return;
    }

    // navigate to role-specific page when used as a route
    if (role === 'domestic') navigate('/role/domestic');
    else if (role === 'company') navigate('/role/industry');
    else if (role === 'admin') navigate('/role/admin');
  };

  const handleBack = () => {
    if (onBack) return onBack();
    navigate('/');
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBack}
        className="absolute top-4 left-4 z-50 bg-card/80 backdrop-blur-sm border border-border/50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>

      <RoleSelector onRoleSelect={handleRoleSelect} />
    </div>
  );
};

export default RoleSelectPage;
