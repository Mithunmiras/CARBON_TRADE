import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  Shield,
  Award,
  XCircle,
  Home,
  Car,
  Lightbulb,
  Leaf,
  DollarSign,
  Calculator,
  FileText,
  Users,
  Settings,
  Database,
  Eye,
  Plus,
  Edit,
  Trash2,
  Download,
  Filter,
  Search,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Building,
  Recycle,
  Wind,
  Sun,
  Droplets,
  TreePine,
  Target,
  Clock,
  Globe,
  PieChart,
  LineChart,
  Activity
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

interface DashboardContentProps {
  userRole: "company" | "auditor" | "admin" | "domestic";
  currentView: string;
}

export function DashboardContent({ userRole, currentView }: DashboardContentProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [calculatorInputs, setCalculatorInputs] = useState({
    electricity: "",
    gas: "",
    transport: "",
    waste: ""
  });

  // Mock data for demonstration
  const mockMetrics = {
    totalEmissions: 12450,
    monthlyChange: -8.2,
    validatedRecords: 1247,
    flaggedRecords: 23,
    dataQuality: 94.2,
    lastUpdate: "2 hours ago"
  };

  const mockCarbonScore = {
    score: 87,
    grade: "B+",
    improvement: 12,
    trend: "improving"
  };

  const mockVerificationStats = {
    verified: 1247,
    notVerified: 156,
    pending: 89
  };

  const mockIndustries = [
    { name: "Steel Manufacturing", emissions: 4200, trend: -5.2, status: "validated" },
    { name: "Chemical Plant A", emissions: 3100, trend: 2.1, status: "flagged" },
    { name: "Data Center B", emissions: 2890, trend: -12.3, status: "validated" },
    { name: "Logistics Hub", emissions: 2260, trend: -3.8, status: "pending" }
  ];

  const energyData = [
    { month: "Jan", electricity: 450, gas: 280, water: 120, total: 850 },
    { month: "Feb", electricity: 420, gas: 260, water: 115, total: 795 },
    { month: "Mar", electricity: 380, gas: 220, water: 110, total: 710 },
    { month: "Apr", electricity: 340, gas: 180, water: 105, total: 625 },
    { month: "May", electricity: 320, gas: 160, water: 100, total: 580 },
    { month: "Jun", electricity: 380, gas: 140, water: 95, total: 615 }
  ];

  const carbonEmissionData = [
    { month: "Jan", emissions: 2.4, target: 2.0 },
    { month: "Feb", emissions: 2.2, target: 2.0 },
    { month: "Mar", emissions: 1.9, target: 2.0 },
    { month: "Apr", emissions: 1.7, target: 2.0 },
    { month: "May", emissions: 1.5, target: 2.0 },
    { month: "Jun", emissions: 1.6, target: 2.0 }
  ];

  const costData = [
    { category: "Electricity", amount: 145, trend: -8, color: "#3b82f6" },
    { category: "Gas", amount: 89, trend: -12, color: "#10b981" },
    { category: "Water", amount: 34, trend: 3, color: "#06b6d4" },
    { category: "Transport", amount: 267, trend: -5, color: "#f59e0b" }
  ];

  const industryAnalytics = [
    { facility: "Plant A", efficiency: 87, emissions: 2340, status: "optimal" },
    { facility: "Plant B", efficiency: 92, emissions: 1890, status: "excellent" },
    { facility: "Plant C", efficiency: 78, emissions: 2890, status: "needs_improvement" },
    { facility: "Warehouse D", efficiency: 85, emissions: 1560, status: "good" }
  ];

  const auditData = [
    { id: "AUD-001", company: "GreenTech Industries", status: "verified", date: "2024-01-15", score: 94 },
    { id: "AUD-002", company: "EcoManufacturing Co", status: "pending", date: "2024-01-14", score: 87 },
    { id: "AUD-003", company: "SustainableCorp", status: "flagged", date: "2024-01-13", score: 72 },
    { id: "AUD-004", company: "CleanEnergy Ltd", status: "verified", date: "2024-01-12", score: 91 }
  ];

  const platformUsers = [
    { id: 1, name: "John Smith", email: "john@greentech.com", role: "company", status: "active", lastLogin: "2024-01-15" },
    { id: 2, name: "Sarah Johnson", email: "sarah@ecomanuf.com", role: "company", status: "active", lastLogin: "2024-01-14" },
    { id: 3, name: "Mike Wilson", email: "mike@auditor.com", role: "auditor", status: "active", lastLogin: "2024-01-15" },
    { id: 4, name: "Lisa Brown", email: "lisa@home.com", role: "domestic", status: "inactive", lastLogin: "2024-01-10" }
  ];

  const calculateCarbonFootprint = () => {
    const electricity = parseFloat(calculatorInputs.electricity) || 0;
    const gas = parseFloat(calculatorInputs.gas) || 0;
    const transport = parseFloat(calculatorInputs.transport) || 0;
    const waste = parseFloat(calculatorInputs.waste) || 0;

    // Emission factors (kg CO2 per unit)
    const electricityFactor = 0.233; // kg CO2 per kWh
    const gasFactor = 0.184; // kg CO2 per kWh
    const transportFactor = 0.171; // kg CO2 per km
    const wasteFactor = 0.57; // kg CO2 per kg

    const electricityEmissions = electricity * electricityFactor;
    const gasEmissions = gas * gasFactor;
    const transportEmissions = transport * transportFactor;
    const wasteEmissions = waste * wasteFactor;

    return {
      electricity: electricityEmissions,
      gas: gasEmissions,
      transport: transportEmissions,
      waste: wasteEmissions,
      total: electricityEmissions + gasEmissions + transportEmissions + wasteEmissions
    };
  };

  const ecoTips = [
    {
      title: "Switch to LED Lighting",
      description: "Replace incandescent bulbs with LED lights to reduce energy consumption by up to 80%",
      impact: "Save 50kg CO₂/year",
      icon: Lightbulb,
      difficulty: "Easy",
      cost: "Low"
    },
    {
      title: "Optimize Heating & Cooling",
      description: "Set thermostat 2°C lower in winter and 2°C higher in summer",
      impact: "Save 200kg CO₂/year",
      icon: Home,
      difficulty: "Easy",
      cost: "Free"
    },
    {
      title: "Use Public Transport",
      description: "Replace car trips with public transport, cycling, or walking when possible",
      impact: "Save 1,200kg CO₂/year",
      icon: Car,
      difficulty: "Medium",
      cost: "Variable"
    },
    {
      title: "Reduce Water Heating",
      description: "Lower water heater temperature to 60°C and take shorter showers",
      impact: "Save 150kg CO₂/year",
      icon: Droplets,
      difficulty: "Easy",
      cost: "Free"
    },
    {
      title: "Install Solar Panels",
      description: "Generate clean energy and reduce dependence on grid electricity",
      impact: "Save 1,500kg CO₂/year",
      icon: Sun,
      difficulty: "Hard",
      cost: "High"
    },
    {
      title: "Improve Insulation",
      description: "Better insulation reduces heating and cooling energy needs",
      impact: "Save 800kg CO₂/year",
      icon: Home,
      difficulty: "Medium",
      cost: "Medium"
    }
  ];

  if (currentView === "overview") {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              {userRole === "company" && "Industry Carbon Dashboard"}
              {userRole === "auditor" && "Audit Overview"}
              {userRole === "admin" && "Platform Administration"}
              {userRole === "domestic" && "Home Energy Dashboard"}
            </h2>
            <p className="text-muted-foreground mt-1">
              {userRole === "company" && "Monitor your industrial carbon footprint and validation status"}
              {userRole === "auditor" && "Review flagged records and validation queue"}
              {userRole === "admin" && "Manage platform operations and system health"}
              {userRole === "domestic" && "Track your household energy consumption and carbon footprint"}
            </p>
          </div>
          <Button className="bg-gradient-primary shadow-elegant hover:shadow-glow transition-all">
            <Upload className="w-4 h-4 mr-2" />
            {userRole === "company" && "Add Carbon Data"}
            {userRole === "auditor" && "New Audit"}
            {userRole === "admin" && "System Report"}
            {userRole === "domestic" && "Add Reading"}
          </Button>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(userRole === "company" || userRole === "domestic") && (
            <Card className="border-0 shadow-card hover:shadow-elegant transition-all bg-gradient-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Carbon Score
                </CardTitle>
                <Award className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {mockCarbonScore.score}/100
                </div>
                <div className="flex items-center mt-2">
                  <Badge variant="secondary" className="mr-2">
                    Grade {mockCarbonScore.grade}
                  </Badge>
                  <TrendingUp className="h-4 w-4 text-success mr-1" />
                  <span className="text-sm text-success">
                    +{mockCarbonScore.improvement}% this month
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {userRole === "auditor" && (
            <>
              <Card className="border-0 shadow-card hover:shadow-elegant transition-all bg-gradient-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Verified Records
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {mockVerificationStats.verified.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Successfully verified
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card hover:shadow-elegant transition-all bg-gradient-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Not Verified
                  </CardTitle>
                  <XCircle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {mockVerificationStats.notVerified}
                  </div>
                  <Badge variant="destructive" className="mt-2 text-xs">
                    Requires Action
                  </Badge>
                </CardContent>
              </Card>
            </>
          )}

          <Card className="border-0 shadow-card hover:shadow-elegant transition-all bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {userRole === "domestic" ? "Monthly CO₂" : "Total CO₂ Emissions"}
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

          {userRole !== "auditor" && (
            <Card className="border-0 shadow-card hover:shadow-elegant transition-all bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {userRole === "domestic" ? "Energy Efficiency" : "Validated Records"}
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {userRole === "domestic" ? "92%" : mockMetrics.validatedRecords.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {userRole === "domestic" ? "Above average" : `Last updated ${mockMetrics.lastUpdate}`}
              </p>
            </CardContent>
          </Card>
          )}

          <Card className="border-0 shadow-card hover:shadow-elegant transition-all bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {userRole === "domestic" ? "Monthly Savings" : "Flagged Records"}
              </CardTitle>
              {userRole === "domestic" ? (
                <TrendingDown className="h-4 w-4 text-success" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-warning" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {userRole === "domestic" ? "$127" : mockMetrics.flaggedRecords}
              </div>
              <Badge variant="outline" className={`mt-2 text-xs ${userRole === "domestic" ? "border-success/50 text-success" : "border-warning/50 text-warning"}`}>
                {userRole === "domestic" ? "Cost Reduced" : "Requires Review"}
              </Badge>
            </CardContent>
          </Card>

          {userRole !== "auditor" && (
            <Card className="border-0 shadow-card hover:shadow-elegant transition-all bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {userRole === "domestic" ? "Eco Score" : "Data Quality Score"}
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
          )}
        </div>

        {/* Industries/Facilities Table */}
        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {userRole === "company" && "Industrial Facility Performance"}
              {userRole === "auditor" && "Industry Overview"}
              {userRole === "admin" && "Top Industries"}
              {userRole === "domestic" && "Household Energy Usage"}
            </CardTitle>
            <CardDescription>
              {userRole === "domestic" ? "Your monthly energy consumption breakdown" : "Recent carbon emissions data and validation status"}
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

  // Domestic User - Energy Tracking
  if (currentView === "energy" && userRole === "domestic") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Energy Tracking</h2>
            <p className="text-muted-foreground mt-1">Monitor your household energy consumption and carbon footprint</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Reading
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {costData.map((item, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all bg-gradient-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.category}
                </CardTitle>
                {item.category === "Electricity" && <Zap className="h-4 w-4 text-primary" />}
                {item.category === "Gas" && <Fuel className="h-4 w-4 text-primary" />}
                {item.category === "Water" && <Droplets className="h-4 w-4 text-primary" />}
                {item.category === "Transport" && <Car className="h-4 w-4 text-primary" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  ${item.amount}
                </div>
                <div className="flex items-center mt-2">
                  {item.trend < 0 ? (
                    <TrendingDown className="h-4 w-4 text-success mr-1" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-destructive mr-1" />
                  )}
                  <span className={`text-sm ${item.trend < 0 ? 'text-success' : 'text-destructive'}`}>
                    {Math.abs(item.trend)}% vs last month
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Energy Consumption Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip />
                  <Line type="monotone" dataKey="electricity" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="gas" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="water" stroke="#06b6d4" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Carbon Emissions vs Target
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={carbonEmissionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip />
                  <Bar dataKey="emissions" fill="#ef4444" />
                  <Bar dataKey="target" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Energy Usage Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {energyData.slice(-1).map((data, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Electricity</span>
                      <span className="text-sm text-muted-foreground">{data.electricity} kWh</span>
                    </div>
                    <Progress value={(data.electricity / data.total) * 100} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Gas</span>
                      <span className="text-sm text-muted-foreground">{data.gas} kWh</span>
                    </div>
                    <Progress value={(data.gas / data.total) * 100} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Water</span>
                      <span className="text-sm text-muted-foreground">{data.water} L</span>
                    </div>
                    <Progress value={(data.water / data.total) * 100} className="h-2" />
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Electricity", value: energyData[energyData.length - 1].electricity, fill: "#3b82f6" },
                        { name: "Gas", value: energyData[energyData.length - 1].gas, fill: "#10b981" },
                        { name: "Water", value: energyData[energyData.length - 1].water, fill: "#06b6d4" }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    />
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Domestic User - Carbon Calculator
  if (currentView === "calculator" && userRole === "domestic") {
    const emissions = calculateCarbonFootprint();
    
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Carbon Calculator</h2>
            <p className="text-muted-foreground mt-1">Calculate your household carbon footprint with real emission factors</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Carbon Footprint Calculator
              </CardTitle>
              <CardDescription>
                Enter your monthly consumption data to calculate emissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="electricity">Electricity Usage (kWh/month)</Label>
                <Input
                  id="electricity"
                  type="number"
                  placeholder="e.g., 350"
                  value={calculatorInputs.electricity}
                  onChange={(e) => setCalculatorInputs({...calculatorInputs, electricity: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">Average household: 300-400 kWh/month</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gas">Natural Gas Usage (kWh/month)</Label>
                <Input
                  id="gas"
                  type="number"
                  placeholder="e.g., 200"
                  value={calculatorInputs.gas}
                  onChange={(e) => setCalculatorInputs({...calculatorInputs, gas: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">Average household: 150-250 kWh/month</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transport">Transport Distance (km/month)</Label>
                <Input
                  id="transport"
                  type="number"
                  placeholder="e.g., 1200"
                  value={calculatorInputs.transport}
                  onChange={(e) => setCalculatorInputs({...calculatorInputs, transport: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">Average: 1000-1500 km/month</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="waste">Waste Generated (kg/month)</Label>
                <Input
                  id="waste"
                  type="number"
                  placeholder="e.g., 50"
                  value={calculatorInputs.waste}
                  onChange={(e) => setCalculatorInputs({...calculatorInputs, waste: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">Average household: 40-60 kg/month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Your Carbon Footprint
              </CardTitle>
              <CardDescription>
                Monthly CO₂ emissions breakdown
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-muted/20 rounded-lg">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {emissions.total.toFixed(1)} kg CO₂
                </div>
                <p className="text-sm text-muted-foreground">Total Monthly Emissions</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Electricity</span>
                  </div>
                  <span className="text-sm font-bold">{emissions.electricity.toFixed(1)} kg CO₂</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Natural Gas</span>
                  </div>
                  <span className="text-sm font-bold">{emissions.gas.toFixed(1)} kg CO₂</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium">Transport</span>
                  </div>
                  <span className="text-sm font-bold">{emissions.transport.toFixed(1)} kg CO₂</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Recycle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Waste</span>
                  </div>
                  <span className="text-sm font-bold">{emissions.waste.toFixed(1)} kg CO₂</span>
                </div>
              </div>

              <Alert>
                <Leaf className="h-4 w-4" />
                <AlertTitle>Environmental Impact</AlertTitle>
                <AlertDescription>
                  {emissions.total < 500 ? "Great job! Your carbon footprint is below average." :
                   emissions.total < 800 ? "Your footprint is average. Consider our eco tips to reduce it." :
                   "Your footprint is above average. Check our recommendations to reduce emissions."}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Emissions Visualization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Electricity", value: emissions.electricity, fill: "#3b82f6" },
                    { name: "Gas", value: emissions.gas, fill: "#10b981" },
                    { name: "Transport", value: emissions.transport, fill: "#f59e0b" },
                    { name: "Waste", value: emissions.waste, fill: "#8b5cf6" }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value.toFixed(1)}kg`}
                />
                <ChartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Domestic User - Eco Tips
  if (currentView === "tips" && userRole === "domestic") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Eco Tips</h2>
            <p className="text-muted-foreground mt-1">Actionable tips to reduce your carbon footprint and save money</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecoTips.map((tip, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all bg-gradient-card group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <tip.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={tip.difficulty === "Easy" ? "default" : tip.difficulty === "Medium" ? "secondary" : "destructive"}>
                      {tip.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      {tip.cost}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {tip.description}
                </CardDescription>
                
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">Impact</span>
                  <span className="text-sm font-bold text-green-800 dark:text-green-200">{tip.impact}</span>
                </div>

                <Button className="w-full" variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TreePine className="h-5 w-5 text-primary" />
              Your Potential Impact
            </CardTitle>
            <CardDescription>
              See how much you could save by implementing these eco-friendly practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <TreePine className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">3,900 kg</div>
                <p className="text-sm text-green-600 dark:text-green-400">CO₂ Reduction Potential</p>
              </div>
              
              <div className="text-center p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">$1,240</div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Annual Savings Potential</p>
              </div>
              
              <div className="text-center p-6 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">A+</div>
                <p className="text-sm text-purple-600 dark:text-purple-400">Achievable Eco Grade</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Domestic User - Bills & Costs
  if (currentView === "bills" && userRole === "domestic") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Bills & Costs</h2>
            <p className="text-muted-foreground mt-1">Track your utility bills and identify cost-saving opportunities</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Bill
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {costData.map((item, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all bg-gradient-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.category}
                </CardTitle>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: `${item.color}20`}}>
                  {item.category === "Electricity" && <Zap className="h-4 w-4" style={{color: item.color}} />}
                  {item.category === "Gas" && <Fuel className="h-4 w-4" style={{color: item.color}} />}
                  {item.category === "Water" && <Droplets className="h-4 w-4" style={{color: item.color}} />}
                  {item.category === "Transport" && <Car className="h-4 w-4" style={{color: item.color}} />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  ${item.amount}
                </div>
                <div className="flex items-center mt-2">
                  {item.trend < 0 ? (
                    <TrendingDown className="h-4 w-4 text-success mr-1" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-destructive mr-1" />
                  )}
                  <span className={`text-sm ${item.trend < 0 ? 'text-success' : 'text-destructive'}`}>
                    {Math.abs(item.trend)}% vs last month
                  </span>
                </div>
                <Progress value={75} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">75% of budget used</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Monthly Cost Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip />
                  <Area type="monotone" dataKey="total" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Cost Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={costData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="amount"
                    label={({category, amount}) => `${category}: $${amount}`}
                  >
                    {costData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Cost Optimization Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Alert>
                  <TrendingDown className="h-4 w-4" />
                  <AlertTitle>High Usage Alert</AlertTitle>
                  <AlertDescription>
                    Your transport costs are 23% above average. Consider carpooling or public transport.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Optimization Tip</AlertTitle>
                  <AlertDescription>
                    Switch to off-peak electricity hours to save up to $45/month.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Good Progress</AlertTitle>
                  <AlertDescription>
                    Your gas usage is 12% below average. Keep up the good work!
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Potential Monthly Savings</h4>
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">$127</div>
                  <p className="text-sm text-green-600 dark:text-green-400">By implementing our recommendations</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Energy Efficiency</span>
                    <span className="text-sm font-medium">$45</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Transport Optimization</span>
                    <span className="text-sm font-medium">$62</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Water Conservation</span>
                    <span className="text-sm font-medium">$20</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Industry User - Data Upload
  if (currentView === "upload" && userRole === "company") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Carbon Data Upload</h2>
            <p className="text-muted-foreground mt-1">Upload your industrial carbon emission data for validation and reporting</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload Carbon Data
              </CardTitle>
              <CardDescription>
                Select data type and upload your emission records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dataType">Data Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fuel">Fuel Consumption</SelectItem>
                    <SelectItem value="electricity">Electricity Usage</SelectItem>
                    <SelectItem value="materials">Raw Materials</SelectItem>
                    <SelectItem value="transport">Transportation</SelectItem>
                    <SelectItem value="waste">Waste Generation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="facility">Facility</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select facility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plant-a">Manufacturing Plant A</SelectItem>
                    <SelectItem value="plant-b">Manufacturing Plant B</SelectItem>
                    <SelectItem value="warehouse">Distribution Warehouse</SelectItem>
                    <SelectItem value="office">Corporate Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Reporting Period</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jan-2024">January 2024</SelectItem>
                    <SelectItem value="feb-2024">February 2024</SelectItem>
                    <SelectItem value="mar-2024">March 2024</SelectItem>
                    <SelectItem value="q1-2024">Q1 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your files here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supported formats: CSV, Excel, JSON (Max 10MB)
                </p>
                <Button className="mt-4" variant="outline">
                  Choose Files
                </Button>
              </div>

              <Button className="w-full bg-gradient-primary">
                Upload Data
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Recent Uploads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { file: "fuel_consumption_jan2024.csv", date: "2024-01-15", status: "verified", size: "2.3 MB" },
                  { file: "electricity_usage_jan2024.xlsx", date: "2024-01-14", status: "pending", size: "1.8 MB" },
                  { file: "raw_materials_dec2023.json", date: "2024-01-10", status: "flagged", size: "3.1 MB" },
                  { file: "transport_data_dec2023.csv", date: "2024-01-08", status: "verified", size: "1.2 MB" }
                ].map((upload, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{upload.file}</p>
                        <p className="text-xs text-muted-foreground">{upload.date} • {upload.size}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={upload.status === "verified" ? "default" : upload.status === "flagged" ? "destructive" : "secondary"}
                    >
                      {upload.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Upload Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">247</div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Total Uploads</p>
              </div>
              
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">198</div>
                <p className="text-sm text-green-600 dark:text-green-400">Verified</p>
              </div>
              
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">34</div>
                <p className="text-sm text-orange-600 dark:text-orange-400">Pending</p>
              </div>
              
              <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-700 dark:text-red-300">15</div>
                <p className="text-sm text-red-600 dark:text-red-400">Flagged</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Industry User - Analytics
  if (currentView === "analytics" && userRole === "company") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Advanced Analytics</h2>
            <p className="text-muted-foreground mt-1">Deep insights and predictive models for your carbon emissions</p>
          </div>
          <Button className="bg-gradient-primary">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industryAnalytics.map((facility, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all bg-gradient-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {facility.facility}
                </CardTitle>
                <Factory className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {facility.efficiency}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {facility.emissions.toLocaleString()} kg CO₂
                </p>
                <Badge 
                  variant={facility.status === "excellent" ? "default" : facility.status === "optimal" || facility.status === "good" ? "secondary" : "destructive"}
                  className="mt-2 text-xs capitalize"
                >
                  {facility.status.replace('_', ' ')}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Emission Trends & Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={carbonEmissionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip />
                  <Line type="monotone" dataKey="emissions" stroke="#ef4444" strokeWidth={2} name="Actual" />
                  <Line type="monotone" dataKey="target" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Facility Performance Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={industryAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="facility" />
                  <YAxis />
                  <ChartTooltip />
                  <Bar dataKey="efficiency" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              AI-Powered Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertTitle>Efficiency Opportunity</AlertTitle>
                  <AlertDescription>
                    Plant C shows 15% higher emissions than optimal. Implementing energy-efficient equipment could reduce emissions by 420 kg CO₂/month.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Best Practice Identified</AlertTitle>
                  <AlertDescription>
                    Plant B's efficiency model can be replicated across other facilities for 12% overall improvement.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Seasonal Pattern Detected</AlertTitle>
                  <AlertDescription>
                    Winter months show 18% higher emissions. Consider seasonal optimization strategies.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg">
                  <h4 className="font-medium mb-2">Predicted Impact</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Emission Reduction</span>
                      <span className="text-sm font-bold text-green-600">-23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Cost Savings</span>
                      <span className="text-sm font-bold text-green-600">$45,000/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">ROI Timeline</span>
                      <span className="text-sm font-bold">18 months</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-primary">
                  Generate Action Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Industry User - Reports
  if (currentView === "reports" && userRole === "company") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Compliance Reports</h2>
            <p className="text-muted-foreground mt-1">Professional reports with compliance tracking and future projections</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Monthly Report
              </CardTitle>
              <CardDescription>January 2024 Emissions Summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">2,340 kg</div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Total CO₂ Emissions</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Compliance Status</span>
                  <Badge variant="default">Compliant</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Target Achievement</span>
                  <span className="text-sm font-bold text-green-600">108%</span>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Quarterly Report
              </CardTitle>
              <CardDescription>Q4 2023 Comprehensive Analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">6,890 kg</div>
                <p className="text-sm text-green-600 dark:text-green-400">Quarterly CO₂ Total</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Trend vs Q3</span>
                  <span className="text-sm font-bold text-green-600">-12%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Audit Score</span>
                  <Badge variant="default">A-</Badge>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Annual Forecast
              </CardTitle>
              <CardDescription>2024 Projections & Targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">24,500 kg</div>
                <p className="text-sm text-purple-600 dark:text-purple-400">Projected Annual Total</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Target Reduction</span>
                  <span className="text-sm font-bold text-green-600">-18%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Confidence</span>
                  <Badge variant="secondary">High</Badge>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View Forecast
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Report History & Compliance Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Period</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Emissions (kg CO₂)</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Audit Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>January 2024</TableCell>
                  <TableCell>Monthly</TableCell>
                  <TableCell>2,340</TableCell>
                  <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                  <TableCell>A-</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Q4 2023</TableCell>
                  <TableCell>Quarterly</TableCell>
                  <TableCell>6,890</TableCell>
                  <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                  <TableCell>A-</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>December 2023</TableCell>
                  <TableCell>Monthly</TableCell>
                  <TableCell>2,180</TableCell>
                  <TableCell><Badge variant="secondary">Under Review</Badge></TableCell>
                  <TableCell>B+</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>November 2023</TableCell>
                  <TableCell>Monthly</TableCell>
                  <TableCell>2,450</TableCell>
                  <TableCell><Badge variant="destructive">Non-Compliant</Badge></TableCell>
                  <TableCell>C+</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Future Projections & Strategic Planning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">2024 Emission Targets</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Q1 Target</span>
                      <span className="text-sm font-bold">6,200 kg CO₂</span>
                    </div>
                    <Progress value={75} />
                    <p className="text-xs text-muted-foreground mt-1">75% progress</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Annual Target</span>
                      <span className="text-sm font-bold">24,500 kg CO₂</span>
                    </div>
                    <Progress value={28} />
                    <p className="text-xs text-muted-foreground mt-1">28% progress</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Strategic Initiatives</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Energy Efficiency Upgrade</p>
                      <p className="text-xs text-muted-foreground">Expected: -15% emissions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Renewable Energy Transition</p>
                      <p className="text-xs text-muted-foreground">Expected: -25% emissions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium">Process Optimization</p>
                      <p className="text-xs text-muted-foreground">Expected: -8% emissions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Data Validation (for both company and auditor)
  if (currentView === "validation") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Data Validation</h2>
            <p className="text-muted-foreground mt-1">
              {userRole === "company" ? "Track validation status of your carbon data submissions" : "Review and validate carbon emission data"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-gradient-primary">
              <Shield className="w-4 h-4 mr-2" />
              {userRole === "company" ? "Request Validation" : "Validate Data"}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Verified Records
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {mockVerificationStats.verified}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Successfully validated
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Not Verified
              </CardTitle>
              <XCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {mockVerificationStats.notVerified}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Requires attention
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Review
              </CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {mockVerificationStats.pending}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Awaiting validation
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Validation Queue
            </CardTitle>
            <CardDescription>
              Carbon emission data pending validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Submission ID</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Data Type</TableHead>
                  <TableHead>Emissions (kg CO₂)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>SUB-001</TableCell>
                  <TableCell>GreenTech Industries</TableCell>
                  <TableCell>Fuel Consumption</TableCell>
                  <TableCell>2,340</TableCell>
                  <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                  <TableCell><Badge variant="destructive">High</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SUB-002</TableCell>
                  <TableCell>EcoManufacturing Co</TableCell>
                  <TableCell>Electricity</TableCell>
                  <TableCell>1,890</TableCell>
                  <TableCell><Badge variant="default">Verified</Badge></TableCell>
                  <TableCell><Badge variant="secondary">Medium</Badge></TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SUB-003</TableCell>
                  <TableCell>SustainableCorp</TableCell>
                  <TableCell>Raw Materials</TableCell>
                  <TableCell>3,120</TableCell>
                  <TableCell><Badge variant="destructive">Flagged</Badge></TableCell>
                  <TableCell><Badge variant="destructive">High</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Validation Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Validation Trends</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={carbonEmissionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip />
                    <Area type="monotone" dataKey="emissions" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h4 className="font-medium mb-4">Validation Statistics</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Processing Time</span>
                    <span className="text-sm font-bold">2.3 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Validation Accuracy</span>
                    <span className="text-sm font-bold text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Auto-Validation Rate</span>
                    <span className="text-sm font-bold">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Manual Review Rate</span>
                    <span className="text-sm font-bold">22%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Auditor - Flagged Records
  if (currentView === "flagged" && userRole === "auditor") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Flagged Records</h2>
            <p className="text-muted-foreground mt-1">Review suspicious or inconsistent carbon emission data entries</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button className="bg-gradient-primary">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Review All
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Critical Flags
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">23</div>
              <p className="text-xs text-muted-foreground mt-2">Requires immediate attention</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Data Anomalies
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">47</div>
              <p className="text-xs text-muted-foreground mt-2">Statistical outliers detected</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Resolved Today
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12</div>
              <p className="text-xs text-muted-foreground mt-2">Successfully reviewed</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Resolution Time
              </CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">4.2h</div>
              <p className="text-xs text-muted-foreground mt-2">Per flagged record</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              High Priority Flagged Records
            </CardTitle>
            <CardDescription>
              Records requiring immediate audit attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Record ID</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Flag Reason</TableHead>
                  <TableHead>Emissions (kg CO₂)</TableHead>
                  <TableHead>Deviation</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>REC-001</TableCell>
                  <TableCell>SustainableCorp</TableCell>
                  <TableCell>Unusual spike in emissions</TableCell>
                  <TableCell>4,890</TableCell>
                  <TableCell className="text-destructive">+156%</TableCell>
                  <TableCell><Badge variant="destructive">Critical</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <AlertTriangle className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>REC-002</TableCell>
                  <TableCell>EcoManufacturing Co</TableCell>
                  <TableCell>Inconsistent data format</TableCell>
                  <TableCell>2,340</TableCell>
                  <TableCell className="text-warning">+23%</TableCell>
                  <TableCell><Badge variant="destructive">High</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>REC-003</TableCell>
                  <TableCell>GreenTech Industries</TableCell>
                  <TableCell>Missing supporting documents</TableCell>
                  <TableCell>1,890</TableCell>
                  <TableCell className="text-muted-foreground">N/A</TableCell>
                  <TableCell><Badge variant="secondary">Medium</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Flag Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Data Anomalies", value: 47, fill: "#ef4444" },
                      { name: "Missing Documents", value: 23, fill: "#f59e0b" },
                      { name: "Format Issues", value: 18, fill: "#3b82f6" },
                      { name: "Calculation Errors", value: 12, fill: "#8b5cf6" }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}`}
                  />
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Resolution Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={carbonEmissionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip />
                  <Line type="monotone" dataKey="emissions" stroke="#ef4444" strokeWidth={2} name="Flagged" />
                  <Line type="monotone" dataKey="target" stroke="#22c55e" strokeWidth={2} name="Resolved" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Auditor - Audit Reports
  if (currentView === "reports" && userRole === "auditor") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Audit Reports</h2>
            <p className="text-muted-foreground mt-1">Latest compliance analysis with global business insights and predictions</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Audit Report
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Compliance Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">94.2%</div>
                <Badge variant="default" className="mb-4">Excellent</Badge>
                <Progress value={94.2} className="mb-2" />
                <p className="text-xs text-muted-foreground">Industry average: 87.3%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Global Ranking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">#12</div>
                <Badge variant="secondary" className="mb-4">Top 5%</Badge>
                <p className="text-sm text-muted-foreground mb-2">Out of 2,847 audited companies</p>
                <p className="text-xs text-success">↑ 3 positions this quarter</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">Low</div>
                <Badge variant="outline" className="mb-4 border-success text-success">Stable</Badge>
                <p className="text-sm text-muted-foreground mb-2">Risk factors identified: 2</p>
                <p className="text-xs text-muted-foreground">Next review: March 2024</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Recent Audit Reports
            </CardTitle>
            <CardDescription>
              Comprehensive audit analysis and compliance tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Audit ID</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Audit Date</TableHead>
                  <TableHead>Compliance Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditData.map((audit) => (
                  <TableRow key={audit.id}>
                    <TableCell>{audit.id}</TableCell>
                    <TableCell>{audit.company}</TableCell>
                    <TableCell>{audit.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{audit.score}%</span>
                        <Badge variant={audit.score >= 90 ? "default" : audit.score >= 75 ? "secondary" : "destructive"}>
                          {audit.score >= 90 ? "Excellent" : audit.score >= 75 ? "Good" : "Needs Improvement"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={audit.status === "verified" ? "default" : audit.status === "flagged" ? "destructive" : "secondary"}>
                        {audit.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={audit.score >= 85 ? "outline" : "destructive"} className={audit.score >= 85 ? "border-success text-success" : ""}>
                        {audit.score >= 85 ? "Low" : "Medium"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Global Business Environment Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertTitle>Market Trend Alert</AlertTitle>
                <AlertDescription>
                  Carbon pricing mechanisms are expanding globally. 73% of Fortune 500 companies now have net-zero commitments, driving demand for verified carbon data.
                </AlertDescription>
              </Alert>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertTitle>Regulatory Update</AlertTitle>
                <AlertDescription>
                  New EU Carbon Border Adjustment Mechanism (CBAM) requires enhanced carbon reporting for imports. Compliance deadline: October 2024.
                </AlertDescription>
              </Alert>

              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Industry Insight</AlertTitle>
                <AlertDescription>
                  Manufacturing sector showing 18% improvement in carbon efficiency year-over-year, driven by AI-powered optimization and renewable energy adoption.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Future Predictions & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">2024 Predictions</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Carbon credit prices expected to rise 25-30%</li>
                  <li>• Mandatory climate disclosures in 15+ countries</li>
                  <li>• AI-driven carbon tracking adoption up 200%</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Strategic Recommendations</h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Invest in real-time monitoring systems</li>
                  <li>• Establish supply chain carbon tracking</li>
                  <li>• Prepare for scope 3 emission requirements</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Technology Trends</h4>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• Blockchain for carbon credit verification</li>
                  <li>• IoT sensors for automated data collection</li>
                  <li>• Machine learning for emission prediction</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Admin - User Management
  if (currentView === "users" && userRole === "admin") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">User Management</h2>
            <p className="text-muted-foreground mt-1">Manage carbon platform users, roles, and permissions</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2,847</div>
              <p className="text-xs text-muted-foreground mt-2">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Users
              </CardTitle>
              <Activity className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2,634</div>
              <p className="text-xs text-muted-foreground mt-2">92.5% active rate</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                New This Month
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">342</div>
              <p className="text-xs text-muted-foreground mt-2">18% increase</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Approval
              </CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">23</div>
              <p className="text-xs text-muted-foreground mt-2">Awaiting review</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Platform Users
            </CardTitle>
            <CardDescription>
              Manage user accounts, roles, and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search users..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="auditor">Auditor</SelectItem>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {platformUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary-foreground">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                User Distribution by Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Company Users", value: 1847, fill: "#3b82f6" },
                      { name: "Domestic Users", value: 892, fill: "#10b981" },
                      { name: "Auditors", value: 89, fill: "#f59e0b" },
                      { name: "Administrators", value: 19, fill: "#8b5cf6" }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}`}
                  />
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                User Activity Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip />
                  <Area type="monotone" dataKey="total" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Admin - Industry Registry
  if (currentView === "industries" && userRole === "admin") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Industry Registry</h2>
            <p className="text-muted-foreground mt-1">Categorized list of industries with carbon data and insights</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Register Industry
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Registered Industries
              </CardTitle>
              <Building className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1,247</div>
              <p className="text-xs text-muted-foreground mt-2">Across 23 sectors</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                High Emitters
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">89</div>
              <p className="text-xs text-muted-foreground mt-2">Above threshold</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Carbon Neutral
              </CardTitle>
              <Leaf className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">234</div>
              <p className="text-xs text-muted-foreground mt-2">Certified neutral</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Reduction
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">-12.3%</div>
              <p className="text-xs text-muted-foreground mt-2">Year over year</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5 text-primary" />
              Industry Categories
            </CardTitle>
            <CardDescription>
              Browse industries by sector and carbon performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="manufacturing" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="manufacturing">Manufacturing</TabsTrigger>
                <TabsTrigger value="energy">Energy</TabsTrigger>
                <TabsTrigger value="transport">Transport</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
              </TabsList>
              
              <TabsContent value="manufacturing" className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Steel Production", companies: 89, avgEmissions: 4200, trend: -8.2, efficiency: 78 },
                    { name: "Chemical Manufacturing", companies: 156, avgEmissions: 3100, trend: -5.1, efficiency: 82 },
                    { name: "Automotive Assembly", companies: 234, avgEmissions: 2890, trend: -12.3, efficiency: 85 },
                    { name: "Textile Production", companies: 178, avgEmissions: 1560, trend: -3.8, efficiency: 79 },
                    { name: "Food Processing", companies: 267, avgEmissions: 1890, trend: -6.7, efficiency: 88 },
                    { name: "Electronics Assembly", companies: 145, avgEmissions: 1230, trend: -15.2, efficiency: 91 }
                  ].map((industry, index) => (
                    <Card key={index} className="border border-border/50 hover:shadow-md transition-all">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{industry.name}</CardTitle>
                        <CardDescription>{industry.companies} companies registered</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Avg Emissions</span>
                          <span className="text-sm font-bold">{industry.avgEmissions.toLocaleString()} kg CO₂</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Efficiency</span>
                          <div className="flex items-center gap-2">
                            <Progress value={industry.efficiency} className="w-16 h-2" />
                            <span className="text-sm font-bold">{industry.efficiency}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">YoY Trend</span>
                          <div className="flex items-center gap-1">
                            <TrendingDown className="h-3 w-3 text-success" />
                            <span className="text-sm font-bold text-success">{Math.abs(industry.trend)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="energy" className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Coal Power Plants", companies: 45, avgEmissions: 8900, trend: -25.3, efficiency: 65 },
                    { name: "Natural Gas Plants", companies: 78, avgEmissions: 4200, trend: -18.7, efficiency: 78 },
                    { name: "Solar Farms", companies: 234, avgEmissions: 120, trend: -2.1, efficiency: 95 },
                    { name: "Wind Farms", companies: 189, avgEmissions: 89, trend: -1.8, efficiency: 97 },
                    { name: "Hydroelectric", companies: 67, avgEmissions: 45, trend: -0.9, efficiency: 98 },
                    { name: "Nuclear Plants", companies: 23, avgEmissions: 67, trend: -1.2, efficiency: 94 }
                  ].map((industry, index) => (
                    <Card key={index} className="border border-border/50 hover:shadow-md transition-all">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{industry.name}</CardTitle>
                        <CardDescription>{industry.companies} facilities registered</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Avg Emissions</span>
                          <span className="text-sm font-bold">{industry.avgEmissions.toLocaleString()} kg CO₂</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Efficiency</span>
                          <div className="flex items-center gap-2">
                            <Progress value={industry.efficiency} className="w-16 h-2" />
                            <span className="text-sm font-bold">{industry.efficiency}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">YoY Trend</span>
                          <div className="flex items-center gap-1">
                            <TrendingDown className="h-3 w-3 text-success" />
                            <span className="text-sm font-bold text-success">{Math.abs(industry.trend)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="transport" className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Airlines", companies: 67, avgEmissions: 12400, trend: -8.9, efficiency: 72 },
                    { name: "Shipping Companies", companies: 89, avgEmissions: 8900, trend: -12.3, efficiency: 75 },
                    { name: "Trucking & Logistics", companies: 456, avgEmissions: 3400, trend: -15.7, efficiency: 81 },
                    { name: "Rail Transport", companies: 34, avgEmissions: 890, trend: -5.2, efficiency: 89 },
                    { name: "Public Transit", companies: 178, avgEmissions: 1200, trend: -18.4, efficiency: 86 },
                    { name: "Electric Vehicle Fleet", companies: 234, avgEmissions: 340, trend: -45.6, efficiency: 94 }
                  ].map((industry, index) => (
                    <Card key={index} className="border border-border/50 hover:shadow-md transition-all">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{industry.name}</CardTitle>
                        <CardDescription>{industry.companies} operators registered</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Avg Emissions</span>
                          <span className="text-sm font-bold">{industry.avgEmissions.toLocaleString()} kg CO₂</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Efficiency</span>
                          <div className="flex items-center gap-2">
                            <Progress value={industry.efficiency} className="w-16 h-2" />
                            <span className="text-sm font-bold">{industry.efficiency}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">YoY Trend</span>
                          <div className="flex items-center gap-1">
                            <TrendingDown className="h-3 w-3 text-success" />
                            <span className="text-sm font-bold text-success">{Math.abs(industry.trend)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="technology" className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Data Centers", companies: 234, avgEmissions: 2890, trend: -22.1, efficiency: 87 },
                    { name: "Cloud Providers", companies: 45, avgEmissions: 5600, trend: -28.4, efficiency: 89 },
                    { name: "Software Companies", companies: 567, avgEmissions: 340, trend: -35.7, efficiency: 92 },
                    { name: "Hardware Manufacturing", companies: 123, avgEmissions: 1890, trend: -18.9, efficiency: 84 },
                    { name: "Telecommunications", companies: 89, avgEmissions: 1200, trend: -15.3, efficiency: 86 },
                    { name: "Cryptocurrency Mining", companies: 67, avgEmissions: 8900, trend: -45.2, efficiency: 78 }
                  ].map((industry, index) => (
                    <Card key={index} className="border border-border/50 hover:shadow-md transition-all">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{industry.name}</CardTitle>
                        <CardDescription>{industry.companies} companies registered</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Avg Emissions</span>
                          <span className="text-sm font-bold">{industry.avgEmissions.toLocaleString()} kg CO₂</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Efficiency</span>
                          <div className="flex items-center gap-2">
                            <Progress value={industry.efficiency} className="w-16 h-2" />
                            <span className="text-sm font-bold">{industry.efficiency}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">YoY Trend</span>
                          <div className="flex items-center gap-1">
                            <TrendingDown className="h-3 w-3 text-success" />
                            <span className="text-sm font-bold text-success">{Math.abs(industry.trend)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin - Ledger View
  if (currentView === "ledger" && userRole === "admin") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Carbon Ledger System</h2>
            <p className="text-muted-foreground mt-1">Optimized, validated carbon records with blockchain anchoring</p>
          </div>
          <Button className="bg-gradient-primary">
            <Shield className="w-4 h-4 mr-2" />
            Anchor to Blockchain
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Records
              </CardTitle>
              <Database className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1,247,893</div>
              <p className="text-xs text-muted-foreground mt-2">Validated entries</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Blockchain Anchored
              </CardTitle>
              <Shield className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1,247,234</div>
              <p className="text-xs text-muted-foreground mt-2">99.95% anchored</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Data Integrity
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">99.98%</div>
              <p className="text-xs text-muted-foreground mt-2">Verification rate</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Daily Transactions
              </CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12,847</div>
              <p className="text-xs text-muted-foreground mt-2">+8% from yesterday</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Recent Ledger Entries
            </CardTitle>
            <CardDescription>
              Latest carbon emission records with validation status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Record ID</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Emissions (kg CO₂)</TableHead>
                  <TableHead>Validation</TableHead>
                  <TableHead>Blockchain Hash</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>REC-1247893</TableCell>
                  <TableCell>GreenTech Industries</TableCell>
                  <TableCell>2024-01-15 14:32:18</TableCell>
                  <TableCell>2,340</TableCell>
                  <TableCell><Badge variant="default">Verified</Badge></TableCell>
                  <TableCell className="font-mono text-xs">0x7a8b9c...def123</TableCell>
                  <TableCell><Badge variant="default">Anchored</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>REC-1247892</TableCell>
                  <TableCell>EcoManufacturing Co</TableCell>
                  <TableCell>2024-01-15 14:28:45</TableCell>
                  <TableCell>1,890</TableCell>
                  <TableCell><Badge variant="default">Verified</Badge></TableCell>
                  <TableCell className="font-mono text-xs">0x6f7e8d...abc456</TableCell>
                  <TableCell><Badge variant="default">Anchored</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>REC-1247891</TableCell>
                  <TableCell>SustainableCorp</TableCell>
                  <TableCell>2024-01-15 14:25:12</TableCell>
                  <TableCell>3,120</TableCell>
                  <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">Pending...</TableCell>
                  <TableCell><Badge variant="secondary">Processing</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>REC-1247890</TableCell>
                  <TableCell>CleanEnergy Ltd</TableCell>
                  <TableCell>2024-01-15 14:21:33</TableCell>
                  <TableCell>890</TableCell>
                  <TableCell><Badge variant="default">Verified</Badge></TableCell>
                  <TableCell className="font-mono text-xs">0x5e6d7c...789def</TableCell>
                  <TableCell><Badge variant="default">Anchored</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Ledger Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip />
                  <Area type="monotone" dataKey="total" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Blockchain Anchoring Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Anchoring Success Rate</span>
                  <span className="text-sm font-bold text-success">99.95%</span>
                </div>
                <Progress value={99.95} />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Average Confirmation Time</span>
                  <span className="text-sm font-bold">2.3 minutes</span>
                </div>
                <Progress value={85} />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Network Reliability</span>
                  <span className="text-sm font-bold text-success">99.99%</span>
                </div>
                <Progress value={99.99} />
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertTitle>System Status</AlertTitle>
                <AlertDescription>
                  All blockchain anchoring services are operational. Last maintenance: 2024-01-10
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Admin - System Settings
  if (currentView === "settings" && userRole === "admin") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">System Settings</h2>
            <p className="text-muted-foreground mt-1">Configure platform settings and system parameters</p>
          </div>
          <Button className="bg-gradient-primary">
            <Settings className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="roles" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="roles">User Roles</TabsTrigger>
            <TabsTrigger value="data">Data Config</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="platform">Platform</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roles" className="space-y-6">
            <Card className="border-0 shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Role Management
                </CardTitle>
                <CardDescription>
                  Configure user roles and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Company Users</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="company-upload">Data Upload</Label>
                        <Switch id="company-upload" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="company-analytics">Analytics Access</Label>
                        <Switch id="company-analytics" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="company-reports">Generate Reports</Label>
                        <Switch id="company-reports" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="company-export">Export Data</Label>
                        <Switch id="company-export" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Auditor Users</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auditor-validate">Validate Data</Label>
                        <Switch id="auditor-validate" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auditor-flag">Flag Records</Label>
                        <Switch id="auditor-flag" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auditor-reports">Audit Reports</Label>
                        <Switch id="auditor-reports" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auditor-admin">Admin Access</Label>
                        <Switch id="auditor-admin" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Domestic Users</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="domestic-tracking">Energy Tracking</Label>
                        <Switch id="domestic-tracking" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="domestic-calculator">Carbon Calculator</Label>
                        <Switch id="domestic-calculator" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="domestic-tips">Eco Tips</Label>
                        <Switch id="domestic-tips" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="domestic-bills">Bill Tracking</Label>
                        <Switch id="domestic-bills" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Administrator Users</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="admin-users">User Management</Label>
                        <Switch id="admin-users" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="admin-system">System Settings</Label>
                        <Switch id="admin-system" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="admin-ledger">Ledger Access</Label>
                        <Switch id="admin-ledger" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="admin-analytics">Platform Analytics</Label>
                        <Switch id="admin-analytics" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-6">
            <Card className="border-0 shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Data Configuration
                </CardTitle>
                <CardDescription>
                  Configure data validation and processing parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="validation-threshold">Validation Threshold (%)</Label>
                      <Input id="validation-threshold" type="number" defaultValue="95" />
                      <p className="text-xs text-muted-foreground">Minimum accuracy required for auto-validation</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="anomaly-sensitivity">Anomaly Detection Sensitivity</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="retention-period">Data Retention Period (years)</Label>
                      <Input id="retention-period" type="number" defaultValue="7" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="max-file-size">Max Upload File Size (MB)</Label>
                      <Input id="max-file-size" type="number" defaultValue="10" />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-validation">Enable Auto-Validation</Label>
                      <Switch id="auto-validation" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure system notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Email Notifications</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-validation">Data Validation Complete</Label>
                        <Switch id="email-validation" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-flagged">Records Flagged</Label>
                        <Switch id="email-flagged" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-reports">Report Generation</Label>
                        <Switch id="email-reports" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-system">System Alerts</Label>
                        <Switch id="email-system" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">In-App Notifications</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="app-uploads">New Data Uploads</Label>
                        <Switch id="app-uploads" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="app-anomalies">Anomalies Detected</Label>
                        <Switch id="app-anomalies" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="app-compliance">Compliance Updates</Label>
                        <Switch id="app-compliance" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="app-maintenance">Maintenance Alerts</Label>
                        <Switch id="app-maintenance" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Notification Frequency</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="freq-immediate">Immediate Alerts</Label>
                      <Select defaultValue="critical">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Events</SelectItem>
                          <SelectItem value="important">Important Only</SelectItem>
                          <SelectItem value="critical">Critical Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="freq-daily">Daily Digest</Label>
                      <Select defaultValue="enabled">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="freq-weekly">Weekly Summary</Label>
                      <Select defaultValue="enabled">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="platform" className="space-y-6">
            <Card className="border-0 shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Platform Customization
                </CardTitle>
                <CardDescription>
                  Customize platform appearance and behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="platform-name">Platform Name</Label>
                      <Input id="platform-name" defaultValue="Carbon Platform" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="support-email">Support Email</Label>
                      <Input id="support-email" type="email" defaultValue="support@carbonplatform.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input id="session-timeout" type="number" defaultValue="60" />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                      <Switch id="maintenance-mode" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="default-theme">Default Theme</Label>
                      <Select defaultValue="light">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="default-language">Default Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Default Timezone</Label>
                      <Select defaultValue="utc">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">Eastern Time</SelectItem>
                          <SelectItem value="pst">Pacific Time</SelectItem>
                          <SelectItem value="cet">Central European Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="public-registration">Public Registration</Label>
                      <Switch id="public-registration" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Feature Flags</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="feature-ai">AI Analytics</Label>
                      <Switch id="feature-ai" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="feature-blockchain">Blockchain Anchoring</Label>
                      <Switch id="feature-blockchain" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="feature-api">Public API</Label>
                      <Switch id="feature-api" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="feature-mobile">Mobile App</Label>
                      <Switch id="feature-mobile" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="feature-export">Data Export</Label>
                      <Switch id="feature-export" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="feature-integrations">Third-party Integrations</Label>
                      <Switch id="feature-integrations" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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