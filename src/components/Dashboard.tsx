import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardContent } from "@/components/DashboardContent";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, User } from "lucide-react";

interface DashboardProps {
  userRole: "company" | "auditor" | "admin" | "domestic";
}

const Dashboard = ({ userRole }: DashboardProps) => {
  const [currentView, setCurrentView] = useState("overview");

  const roleColors = {
    company: "bg-primary text-primary-foreground",
    auditor: "bg-secondary text-secondary-foreground", 
    admin: "bg-warning text-warning-foreground",
    domestic: "bg-accent text-accent-foreground"
  };

  const roleLabels = {
    company: "Industry User",
    auditor: "Auditor",
    admin: "Administrator",
    domestic: "Domestic User"
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar userRole={userRole} currentView={currentView} onViewChange={setCurrentView} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card shadow-sm flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">Carbon Platform</h1>
                <Badge className={roleColors[userRole]}>
                  {roleLabels[userRole]}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <DashboardContent userRole={userRole} currentView={currentView} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;