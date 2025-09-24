import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Settings, ArrowRight } from "lucide-react";

interface RoleSelectorProps {
  onRoleSelect: (role: "company" | "auditor" | "admin" | "domestic") => void;
}

const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  const roles = [
    {
      id: "domestic" as const,
      title: "Domestic User",
      description: "Track household energy consumption, calculate personal carbon footprint, and get eco-friendly recommendations.",
      icon: Users,
      badge: "Personal",
      color: "bg-accent text-accent-foreground",
      features: ["Energy Tracking", "Carbon Calculator", "Eco Tips", "Cost Analysis"]
    },
    {
      id: "company" as const,
      title: "Industry User",
      description: "Upload telemetry data, view emissions reports, and get carbon footprint insights for your industrial operations.",
      icon: Users,
      badge: "Primary Users",
      color: "bg-primary text-primary-foreground",
      features: ["Data Upload", "Emissions Analytics", "Compliance Reports", "Optimization Insights"]
    },
    {
      id: "auditor" as const,
      title: "Auditor",
      description: "Review flagged records, validate suspicious data, and generate audit-ready compliance reports.",
      icon: Shield,
      badge: "Validation",
      color: "bg-secondary text-secondary-foreground",
      features: ["Anomaly Review", "Data Validation", "Audit Reports", "Compliance Checks"]
    },
    {
      id: "admin" as const,
      title: "Administrator",
      description: "Manage platform operations, user access, industry registrations, and ledger anchoring systems.",
      icon: Settings,
      badge: "Management",
      color: "bg-warning text-warning-foreground",
      features: ["User Management", "System Analytics", "Ledger Operations", "Platform Settings"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4 sm:p-6">
      <div className="container max-w-7xl">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 animate-scale-in">
            Choose Your Role
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
            Select your role to access the appropriate dashboard and features for carbon measurement and reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {roles.map((role, index) => (
            <Card 
              key={role.id} 
              className="border-2 border-border hover:border-primary/40 transition-all duration-500 hover:shadow-elegant group cursor-pointer bg-gradient-card hover-scale animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onRoleSelect(role.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:scale-110 transition-all duration-300 group-hover:shadow-2xl">
                  <role.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground transition-transform group-hover:rotate-3" />
                </div>
                <Badge className={`${role.color} transition-all duration-300 group-hover:scale-105`} variant="default">
                  {role.badge}
                </Badge>
                <CardTitle className="text-xl sm:text-2xl mt-3 group-hover:text-primary transition-all duration-300 group-hover:scale-105">
                  {role.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-center text-muted-foreground leading-relaxed text-sm sm:text-base transition-colors group-hover:text-foreground/80">
                  {role.description}
                </CardDescription>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Key Features:</p>
                  <ul className="space-y-1">
                    {role.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className="text-sm text-muted-foreground flex items-center transition-all duration-300 group-hover:text-foreground/90 animate-fade-in"
                        style={{ animationDelay: `${(index * 100) + (featureIndex * 50)}ms` }}
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 transition-all group-hover:scale-125 group-hover:bg-primary/80"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className="w-full mt-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                  variant="outline"
                >
                  Access Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12 animate-fade-in [animation-delay:600ms]">
          <p className="text-sm text-muted-foreground">
            Need help choosing? Contact our support team for guidance on the best role for your organization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;