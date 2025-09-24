import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Upload, 
  FileText, 
  Users, 
  Factory,
  Leaf,
  Zap,
  Home,
  Calculator,
  Lightbulb,
  DollarSign,
  BarChart3,
  Shield,
  Database
} from "lucide-react";

interface DashboardContentProps {
  userRole: "company" | "auditor" | "admin" | "domestic";
  currentView: string;
}

export function DashboardContent({ userRole, currentView }: DashboardContentProps) {
  const renderCompanyDashboard = () => {
    if (currentView === "overview") {
      return (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Carbon Emissions Overview</h1>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              Verified Data
            </Badge>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Emissions</CardTitle>
                <Factory className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847 tCO₂e</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-destructive flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last month
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carbon Score</CardTitle>
                <Leaf className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">B+</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Improved from B
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reduction Target</CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">73%</div>
                <Progress value={73} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  On track for 2030 goals
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Validation Status</CardTitle>
                <Shield className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">94%</div>
                <p className="text-xs text-muted-foreground">
                  Data verified by auditors
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest carbon data submissions and validations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Data Upload", facility: "Manufacturing Plant A", status: "Verified", time: "2 hours ago" },
                  { action: "Emissions Report", facility: "Warehouse B", status: "Pending", time: "5 hours ago" },
                  { action: "Audit Complete", facility: "Office Complex", status: "Approved", time: "1 day ago" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Upload className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-muted-foreground">{item.facility}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={item.status === "Verified" || item.status === "Approved" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentView === "upload") {
      return (
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Data Upload</h1>
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle>Upload Carbon Emissions Data</CardTitle>
              <CardDescription>Submit your facility's carbon footprint measurements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Drop your files here or click to browse</p>
                <p className="text-muted-foreground">Supported formats: CSV, Excel, JSON</p>
                <Button className="mt-4">Choose Files</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
        </h1>
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">This section is under development.</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAuditorDashboard = () => {
    if (currentView === "overview") {
      return (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Audit Dashboard</h1>
            <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
              Auditor Access
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <AlertTriangle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">Awaiting validation</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Verified Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">47</div>
                <p className="text-xs text-muted-foreground">Records validated</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Flagged Records</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">8</div>
                <p className="text-xs text-muted-foreground">Require attention</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Audit Score</CardTitle>
                <Shield className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">98.2%</div>
                <p className="text-xs text-muted-foreground">Accuracy rate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
        </h1>
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">This section is under development.</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAdminDashboard = () => {
    if (currentView === "overview") {
      return (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">System Overview</h1>
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
              Administrator
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +18 this week
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Records</CardTitle>
                <Database className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89.2K</div>
                <p className="text-xs text-muted-foreground">Carbon measurements</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Health</CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">99.8%</div>
                <p className="text-xs text-muted-foreground">Uptime this month</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ledger Anchors</CardTitle>
                <Shield className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">Blockchain records</p>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
        </h1>
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">This section is under development.</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderDomesticDashboard = () => {
    if (currentView === "overview") {
      return (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Home Dashboard</h1>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              Domestic User
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Usage</CardTitle>
                <Zap className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">847 kWh</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success flex items-center">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -12% from last month
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carbon Score</CardTitle>
                <Leaf className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">A-</div>
                <p className="text-xs text-muted-foreground">Excellent performance</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
                <DollarSign className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">$47</div>
                <p className="text-xs text-muted-foreground">Compared to average</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CO₂ Avoided</CardTitle>
                <Leaf className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127 kg</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Energy Breakdown */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle>Energy Breakdown</CardTitle>
              <CardDescription>Your household energy consumption by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Heating & Cooling", usage: "45%", amount: "381 kWh", color: "bg-primary" },
                  { category: "Water Heating", usage: "23%", amount: "195 kWh", color: "bg-secondary" },
                  { category: "Appliances", usage: "18%", amount: "152 kWh", color: "bg-accent" },
                  { category: "Lighting", usage: "14%", amount: "119 kWh", color: "bg-success" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="font-medium">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{item.usage}</span>
                      <p className="text-sm text-muted-foreground">{item.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentView === "calculator") {
      return (
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Carbon Calculator</h1>
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Your Carbon Footprint
              </CardTitle>
              <CardDescription>Estimate your household's environmental impact</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="energy" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="energy">Energy</TabsTrigger>
                  <TabsTrigger value="transport">Transport</TabsTrigger>
                  <TabsTrigger value="waste">Waste</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>
                <TabsContent value="energy" className="space-y-4">
                  <p className="text-muted-foreground">Enter your monthly energy consumption details.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Electricity (kWh)</label>
                      <input className="w-full mt-1 p-2 border rounded-md" placeholder="847" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Natural Gas (therms)</label>
                      <input className="w-full mt-1 p-2 border rounded-md" placeholder="45" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="transport" className="space-y-4">
                  <p className="text-muted-foreground">Transportation and travel information.</p>
                </TabsContent>
                <TabsContent value="waste" className="space-y-4">
                  <p className="text-muted-foreground">Waste and recycling habits.</p>
                </TabsContent>
                <TabsContent value="results" className="space-y-4">
                  <p className="text-muted-foreground">Your calculated carbon footprint results.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentView === "tips") {
      return (
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Eco Tips</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Smart Thermostat",
                description: "Install a programmable thermostat to reduce heating and cooling costs by up to 15%.",
                impact: "Save $180/year",
                icon: Home
              },
              {
                title: "LED Lighting",
                description: "Replace incandescent bulbs with LED lights to use 75% less energy.",
                impact: "Reduce 450kg CO₂",
                icon: Lightbulb
              },
              {
                title: "Energy Star Appliances",
                description: "Choose ENERGY STAR certified appliances for maximum efficiency.",
                impact: "Save $300/year",
                icon: Zap
              },
              {
                title: "Solar Panels",
                description: "Consider solar installation to generate clean, renewable energy.",
                impact: "Offset 80% emissions",
                icon: Leaf
              }
            ].map((tip, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <tip.icon className="h-5 w-5 mr-2 text-primary" />
                    {tip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{tip.description}</p>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    {tip.impact}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
        </h1>
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">This section is under development.</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Route to appropriate dashboard based on user role
  switch (userRole) {
    case "company":
      return renderCompanyDashboard();
    case "auditor":
      return renderAuditorDashboard();
    case "admin":
      return renderAdminDashboard();
    case "domestic":
      return renderDomesticDashboard();
    default:
      return (
        <div className="p-6">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Please select a valid user role.</p>
            </CardContent>
          </Card>
        </div>
      );
  }
}