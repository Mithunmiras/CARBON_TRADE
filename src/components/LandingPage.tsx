import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, FileCheck, Users, ArrowRight, Factory, BarChart3, Play } from "lucide-react";
const LazyLiquidChrome = React.lazy(() => import('./LiquidChrome'));

interface LandingPageProps {
  onGetStarted: () => void;
  onTradingPlatform?: () => void;
}

const LandingPage = ({ onGetStarted, onTradingPlatform }: LandingPageProps) => {
  // shader background will be lazy-mounted when hero intersects viewport
  const heroRef = useRef<HTMLElement | null>(null);

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

  const [showChrome, setShowChrome] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;
    const el = heroRef.current;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShowChrome(true);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      {/* Hero Section */}
  <section ref={heroRef as any} className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        {/* Background: Liquid chrome shader + overlays */}
        <div className="absolute inset-0" aria-hidden>
          {showChrome ? (
            <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/30 to-background/20 pointer-events-none" />}>
              <LazyLiquidChrome baseColor={[0.07, 0.12, 0.06]} speed={0.8} amplitude={0.45} interactive={true} />
            </Suspense>
          ) : null}
          {/* keep overlay gradients for readability (increased opacity so text shows against shader) */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/70 to-background/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <Badge variant="secondary" className="mb-6 bg-primary-glow/20 text-white border-primary-glow/30">
            <img 
              src="/carbon-credit-icon-for-graphic-design-logo-website-social-media-mobile-app-ui-illustration-vector.jpg" 
              alt="Carbon Credit Logo" 
              className="w-4 h-4 mr-2" 
            />
            Smart Carbon Measurement Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
            Measure, Validate &
            <br />
            <span className="text-white">
              Report Carbon
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-200">
            The world's most trusted platform for industrial carbon footprint measurement with anti-cheat validation and audit-ready reporting.
          </p>
          
          <div className="flex justify-center items-center animate-fade-in delay-400">
            <div className="flex justify-center w-full">
              <Button size="lg" className="shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 text-lg text-white" onClick={onGetStarted}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Leading Industries
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with rigorous validation to ensure accurate, tamper-proof carbon reporting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-white/80 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Supporting Every Industry
            </h2>
            <p className="text-xl text-white/80">
              From manufacturing to data centers, our platform adapts to your industry's unique requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-elegant group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <industry.icon className="w-12 h-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-green-400 group-hover:text-primary transition-colors">
                    {industry.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Carbon Reporting?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join industry leaders who trust our platform for accurate, verifiable carbon measurement and reporting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="shadow-xl hover:shadow-2xl transition-all duration-300" onClick={onGetStarted}>
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="shadow-xl hover:shadow-2xl transition-all duration-300 border-white text-white hover:bg-white hover:text-gray-900"
              onClick={onTradingPlatform}
            >
              Trading Platform
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;