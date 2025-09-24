import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Settings, ArrowRight } from "lucide-react";

interface RoleSelectorProps {
  onRoleSelect: (role: "company" | "auditor" | "admin") => void;
}

const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  const roles = [
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-6">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Role
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your role to access the appropriate dashboard and features for carbon measurement and reporting.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <Card 
              key={role.id} 
              className="border-2 border-border hover:border-primary/40 transition-all duration-300 hover:shadow-elegant group cursor-pointer bg-gradient-card"
              onClick={() => onRoleSelect(role.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:scale-110 transition-transform">
                  <role.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <Badge className={role.color} variant="default">
                  {role.badge}
                </Badge>
                <CardTitle className="text-2xl mt-3 group-hover:text-primary transition-colors">
                  {role.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  {role.description}
                </CardDescription>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Key Features:</p>
                  <ul className="space-y-1">
                    {role.features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className="w-full mt-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  variant="outline"
                >
                  Access Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Need help choosing? Contact our support team for guidance on the best role for your organization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;