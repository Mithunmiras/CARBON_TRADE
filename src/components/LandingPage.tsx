import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, FileCheck, Users, ArrowRight, Factory, Leaf, BarChart3, Play } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const backgroundImageUrl = "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop";

  const features = [
    {
      icon: Shield,
      title: "Anti-Cheat Validation",
      description: "Advanced anomaly detection and cross-validation to prevent greenwashing and ensure data integrity."
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Live carbon footprint tracking with actionable insights to optimize your industrial processes."
    },
    {
      icon: FileCheck,
      title: "Audit-Ready Reports",
      description: "Generate compliant sustainability reports with cryptographic proof for regulators and auditors."
    },
    {
      icon: Users,
      title: "Multi-Role Dashboard",
      description: "Tailored interfaces for companies, auditors, and regulators with role-based access controls."
    }
  ];

  const industries = [
    { name: "Manufacturing", icon: Factory },
    { name: "Heavy Industry", icon: Factory },
    { name: "Data Centers", icon: BarChart3 },
    { name: "Transport & Logistics", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundImageUrl}')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <Badge variant="secondary" className="mb-6 bg-primary-glow/20 text-primary-foreground border-primary-glow/30">
            <Leaf className="w-4 h-4 mr-2" />
            Smart Carbon Measurement Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
            Measure, Validate &
            <br />
            <span className="bg-gradient-to-r from-primary-glow to-secondary bg-clip-text text-transparent">
              Report Carbon
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-200">
            The world's most trusted platform for industrial carbon footprint measurement with anti-cheat validation and audit-ready reporting.
          </p>
          
          <div className="flex justify-center items-center animate-fade-in delay-400">
            <div className="flex justify-center w-full">
              <Button size="lg" className="shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 text-lg" onClick={onGetStarted}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Leading Industries
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with rigorous validation to ensure accurate, tamper-proof carbon reporting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Supporting Every Industry
            </h2>
            <p className="text-xl text-muted-foreground">
              From manufacturing to data centers, our platform adapts to your industry's unique requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-elegant group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <industry.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {industry.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Carbon Reporting?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join industry leaders who trust our platform for accurate, verifiable carbon measurement and reporting.
          </p>
          <Button size="lg" variant="secondary" className="shadow-xl hover:shadow-2xl transition-all duration-300" onClick={onGetStarted}>
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;