import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import RoleSelectPage from "@/pages/RoleSelect";
import Dashboard from "@/components/Dashboard";
import DomesticPage from "@/pages/Domestic";
import IndustryPage from "@/pages/Industry";
import AdministratorPage from "@/pages/Administrator";
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
    try {
      if (role) localStorage.setItem('selectedRole', role);
    } catch (e) {}
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
    setUserRole(null);
  };

  const handleBackToRoleSelect = () => {
    setCurrentView("roleSelect");
    setUserRole(null);
  };

  // Restore selection from localStorage if present
  useState(() => {
    try {
      const s = localStorage.getItem('selectedRole') as UserRole | null;
      if (s) {
        setUserRole(s);
        setCurrentView('dashboard');
      }
    } catch (e) {}
  });

  if (currentView === "dashboard" && userRole) {
    // Render role-specific page wrapper which includes its own Change Role button
    if (userRole === "domestic") {
      return <DomesticPage onBackToRoleSelect={handleBackToRoleSelect} />;
    }

    if (userRole === "company") {
      return <IndustryPage onBackToRoleSelect={handleBackToRoleSelect} />;
    }

    if (userRole === "admin") {
      return <AdministratorPage onBackToRoleSelect={handleBackToRoleSelect} />;
    }

    // Fallback: render generic dashboard
    return <Dashboard userRole={userRole} />;
  }

  if (currentView === "roleSelect") {
    return <RoleSelectPage onBack={handleBackToLanding} onRoleSelect={handleRoleSelect} />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default App;