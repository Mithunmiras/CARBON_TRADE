import type { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Dashboard from "@/components/Dashboard";

const allowedRoles = new Set(["company", "admin", "domestic"]);

const RolePage: FC = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  if (!role || !allowedRoles.has(role)) {
    // invalid role - go to role select
    navigate("/role-select", { replace: true });
    return null;
  }

  // Dashboard expects userRole types - dashboard supports 'company' string
  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="absolute top-4 left-4 z-50"
        onClick={() => navigate("/role-select")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      <Dashboard userRole={role as "company" | "admin" | "domestic"} />
    </div>
  );
};

export default RolePage;
