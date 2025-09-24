import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Factory, 
  Zap, 
  Fuel,
  BarChart3,
  Upload,
  Shield
} from "lucide-react";

interface DashboardContentProps {
  userRole: "company" | "auditor" | "admin";
  currentView: string;
}

export function DashboardContent({ userRole, currentView }: DashboardContentProps) {
  // Mock data for demonstration
  const mockMetrics = {
    totalEmissions: 12450,
    monthlyChange: -8.2,
    validatedRecords: 1247,
    flaggedRecords: 23,
    dataQuality: 94.2,
    lastUpdate: "2 hours ago"
  };

  const mockIndustries = [
    { name: "Steel Manufacturing", emissions: 4200, trend: -5.2, status: "validated" },
    { name: "Chemical Plant A", emissions: 3100, trend: 2.1, status: "flagged" },
    { name: "Data Center B", emissions: 2890, trend: -12.3, status: "validated" },
    { name: "Logistics Hub", emissions: 2260, trend: -3.8, status: "pending" }
  ];

  if (currentView === "overview") {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              {userRole === "company" && "Carbon Dashboard"}
              {userRole === "auditor" && "Audit Overview"}
              {userRole === "admin" && "Platform Administration"}
            </h2>
            <p className="text-muted-foreground mt-1">
              {userRole === "company" && "Monitor your carbon footprint and validation status"}
              {userRole === "auditor" && "Review flagged records and validation queue"}
              {userRole === "admin" && "Manage platform operations and system health"}
            </p>
          </div>
          <Button className="bg-gradient-primary shadow-elegant hover:shadow-glow transition-all">
            <Upload className="w-4 h-4 mr-2" />
            {userRole === "company" && "Upload Data"}
            {userRole === "auditor" && "New Audit"}
            {userRole === "admin" && "System Report"}
          </Button>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-card hover:shadow-elegant transition-all bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total CO₂ Emissions
              </CardTitle>
              <Factory className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {mockMetrics.totalEmissions.toLocaleString()} kg
              </div>
              <div className="flex items-center mt-2">
                {mockMetrics.monthlyChange < 0 ? (
                  <TrendingDown className="h-4 w-4 text-success mr-1" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-destructive mr-1" />
                )}
                <span className={`text-sm ${mockMetrics.monthlyChange < 0 ? 'text-success' : 'text-destructive'}`}>
                  {Math.abs(mockMetrics.monthlyChange)}% vs last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card hover:shadow-elegant transition-all bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Validated Records
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {mockMetrics.validatedRecords.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Last updated {mockMetrics.lastUpdate}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card hover:shadow-elegant transition-all bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Flagged Records
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {mockMetrics.flaggedRecords}
              </div>
              <Badge variant="outline" className="mt-2 text-xs border-warning/50 text-warning">
                Requires Review
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card hover:shadow-elegant transition-all bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Data Quality Score
              </CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {mockMetrics.dataQuality}%
              </div>
              <Progress value={mockMetrics.dataQuality} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Industries/Facilities Table */}
        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {userRole === "company" && "Facility Performance"}
              {userRole === "auditor" && "Industry Overview"}
              {userRole === "admin" && "Top Industries"}
            </CardTitle>
            <CardDescription>
              Recent carbon emissions data and validation status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockIndustries.map((industry, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 rounded-full bg-gradient-primary"></div>
                    <div>
                      <h4 className="font-medium text-foreground">{industry.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {industry.emissions.toLocaleString()} kg CO₂
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {industry.trend < 0 ? (
                        <TrendingDown className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-destructive" />
                      )}
                      <span className={`text-sm font-medium ${industry.trend < 0 ? 'text-success' : 'text-destructive'}`}>
                        {Math.abs(industry.trend)}%
                      </span>
                    </div>
                    
                    <Badge 
                      variant={industry.status === "validated" ? "default" : industry.status === "flagged" ? "destructive" : "secondary"}
                      className="capitalize"
                    >
                      {industry.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Placeholder for other views
  return (
    <div className="p-6 space-y-6">
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {currentView.charAt(0).toUpperCase() + currentView.slice(1)} View
        </h3>
        <p className="text-muted-foreground">
          This section is under development. Check back soon for more features!
        </p>
      </div>
    </div>
  );
}