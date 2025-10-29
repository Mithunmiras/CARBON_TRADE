import RoleSelector from "@/components/RoleSelector";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

const RoleSelect: FC = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: "company" | "admin" | "domestic") => {
    try {
      localStorage.setItem("selectedRole", role);
    } catch (e) {
      /* ignore */
    }
    navigate(`/role/${role}`);
  };

  const handleBack = () => navigate("/");

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

export default RoleSelect;
