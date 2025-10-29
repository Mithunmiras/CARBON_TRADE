import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Settings, ArrowRight } from "lucide-react";

interface RoleSelectorProps {
  onRoleSelect: (role: "company" | "admin" | "domestic") => void;
}

const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  const roles = [
    {
      id: "domestic" as const,
      title: "Domestic User",
      description: "Track household energy consumption, view your carbon score, and get personalized eco-friendly recommendations.",
      icon: Users,
      badge: "Personal",
      color: "bg-accent text-accent-foreground",
      features: ["Energy Tracking", "Carbon Score", "Eco Tips", "Cost Savings"]
    },
    {
      id: "company" as const,
      title: "Industry User",
      description: "Monitor industrial carbon emissions, track your carbon score, and optimize your facility's environmental performance.",
      icon: Users,
      badge: "Primary Users",
      color: "bg-primary text-primary-foreground",
      features: ["Carbon Data Upload", "Carbon Score", "Emissions Analytics", "Compliance Reports"]
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
      <div className="container max-w-6xl">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 animate-scale-in">
            Choose Your Role
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
            Select your role to access the appropriate dashboard and features for carbon measurement and reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {roles.map((role, index) => (
            <Card 
              key={role.id} 
              className="border-2 border-border hover:border-primary/40 transition-all duration-300 hover:shadow-elegant group cursor-pointer bg-card animate-fade-in h-full flex flex-col"
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

              <CardContent className="space-y-4 flex-1 flex flex-col items-center justify-between text-center">
                <div>
                  <CardDescription className="text-center text-muted-foreground leading-relaxed text-sm sm:text-base transition-colors group-hover:text-foreground/80">
                    {role.description}
                  </CardDescription>

                  <div className="space-y-2 mt-4">
                    <p className="text-sm font-medium text-foreground">Key Features:</p>
                    <ul className="space-y-1 flex flex-col items-center mt-2">
                      {role.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className="text-sm text-muted-foreground flex items-center justify-center transition-all duration-300 group-hover:text-foreground/90 animate-fade-in"
                          style={{ animationDelay: `${(index * 100) + (featureIndex * 50)}ms` }}
                        >
                          <span className="w-2 h-2 bg-primary rounded-full inline-block mr-2 transition-all group-hover:scale-125 group-hover:bg-primary/80"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="w-full flex justify-center mt-4">
                  <Button
                    className="mt-2"
                    onClick={(e) => { e.stopPropagation(); onRoleSelect(role.id); }}
                    aria-label={`Access ${role.title} dashboard`}
                  >
                    Access Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200" />
                  </Button>
                </div>
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