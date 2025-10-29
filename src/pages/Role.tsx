import type { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  return <Dashboard userRole={role as "company" | "admin" | "domestic"} />;
};

export default RolePage;
