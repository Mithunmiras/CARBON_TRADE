import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import RoleSelector from "@/components/RoleSelector";
import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type UserRole = "company" | "auditor" | "admin" | "domestic" | null;
type AppView = "landing" | "roleSelect" | "dashboard";

const App = () => {
  const [currentView, setCurrentView] = useState<AppView>("landing");
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleGetStarted = () => {
    setCurrentView("roleSelect");
  };

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setCurrentView("dashboard");
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
    setUserRole(null);
  };

  const handleBackToRoleSelect = () => {
    setCurrentView("roleSelect");
    setUserRole(null);
  };

  if (currentView === "dashboard" && userRole) {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToRoleSelect}
          className="absolute top-4 left-4 z-50 bg-card/80 backdrop-blur-sm border border-border/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Change Role
        </Button>
        <Dashboard userRole={userRole} />
      </div>
    );
  }

  if (currentView === "roleSelect") {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToLanding}
          className="absolute top-4 left-4 z-50 bg-card/80 backdrop-blur-sm border border-border/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <RoleSelector onRoleSelect={handleRoleSelect} />
      </div>
    );
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default App;