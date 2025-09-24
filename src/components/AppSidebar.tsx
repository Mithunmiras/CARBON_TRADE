import { 
  Home, 
  Upload, 
  BarChart3, 
  FileText, 
  Shield, 
  Users, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Database,
  TrendingUp
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  userRole: "company" | "auditor" | "admin" | "domestic";
  currentView: string;
  onViewChange: (view: string) => void;
}

export function AppSidebar({ userRole, currentView, onViewChange }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const companyMenuItems = [
    { id: "overview", title: "Overview", icon: Home },
    { id: "upload", title: "Data Upload", icon: Upload },
    { id: "analytics", title: "Analytics", icon: BarChart3 },
    { id: "reports", title: "Reports", icon: FileText },
    { id: "validation", title: "Data Validation", icon: CheckCircle },
  ];

  const auditorMenuItems = [
    { id: "overview", title: "Audit Dashboard", icon: Home },
    { id: "flagged", title: "Flagged Records", icon: AlertTriangle },
    { id: "validation", title: "Validation Queue", icon: Shield },
    { id: "reports", title: "Audit Reports", icon: FileText },
    { id: "analytics", title: "Compliance Analytics", icon: TrendingUp },
  ];

  const adminMenuItems = [
    { id: "overview", title: "System Overview", icon: Home },
    { id: "users", title: "User Management", icon: Users },
    { id: "industries", title: "Industry Registry", icon: Database },
    { id: "ledger", title: "Ledger Anchoring", icon: Shield },
    { id: "analytics", title: "Platform Analytics", icon: BarChart3 },
    { id: "settings", title: "System Settings", icon: Settings },
  ];

  const domesticMenuItems = [
    { id: "overview", title: "Home Dashboard", icon: Home },
    { id: "energy", title: "Energy Tracking", icon: BarChart3 },
    { id: "calculator", title: "Carbon Calculator", icon: TrendingUp },
    { id: "tips", title: "Eco Tips", icon: CheckCircle },
    { id: "bills", title: "Bills & Costs", icon: FileText },
  ];

  const menuItems = {
    company: companyMenuItems,
    auditor: auditorMenuItems,
    admin: adminMenuItems,
    domestic: domesticMenuItems
  };

  const getNavClasses = (itemId: string) => {
    const isActive = currentView === itemId;
    return isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-card border-r border-border">
        <SidebarGroup className="py-4">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems[userRole].map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => onViewChange(item.id)}
                    className={getNavClasses(item.id)}
                  >
                    <item.icon className="h-5 w-5" />
                    {!collapsed && <span className="font-medium">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}