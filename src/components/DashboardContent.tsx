import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Leaf, 
  Factory, 
  Home, 
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Database,
  Shield
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { emissionData } from "@/data/emissionData";
import { carbonCreditTransfers } from "@/data/carbonCreditTransfers";

interface DashboardContentProps {
  userRole: "company" | "auditor" | "admin" | "domestic";
  currentView: string;
}

export function DashboardContent({ userRole, currentView }: DashboardContentProps) {
  // Process emission data for analytics
  const homeEmissions = emissionData.filter(record => record.home_id === "home");
  const industryEmissions = emissionData.filter(record => record.home_id === "industry");
  
  const totalHomeEmissions = homeEmissions.reduce((sum, record) => sum + record.emission_kg, 0);
  const totalIndustryEmissions = industryEmissions.reduce((sum, record) => sum + record.emission_kg, 0);
  const totalCreditsTransferred = carbonCreditTransfers.reduce((sum, transfer) => sum + transfer.credit_kg, 0);
  
  const avgHomeEmission = totalHomeEmissions / homeEmissions.length;
  const avgIndustryEmission = totalIndustryEmissions / industryEmissions.length;

  // Create chart data for emissions by cluster
  const clusterData = [
    {
      cluster: "Urban Homes",
      emissions: homeEmissions.filter(r => r.cluster === "urban").reduce((sum, r) => sum + r.emission_kg, 0),
      devices: homeEmissions.filter(r => r.cluster === "urban").length,
      avgEmission: homeEmissions.filter(r => r.cluster === "urban").reduce((sum, r) => sum + r.emission_kg, 0) / homeEmissions.filter(r => r.cluster === "urban").length
    },
    {
      cluster: "Urban Industry",
      emissions: industryEmissions.filter(r => r.cluster === "urban").reduce((sum, r) => sum + r.emission_kg, 0),
      devices: industryEmissions.filter(r => r.cluster === "urban").length,
      avgEmission: industryEmissions.filter(r => r.cluster === "urban").reduce((sum, r) => sum + r.emission_kg, 0) / industryEmissions.filter(r => r.cluster === "urban").length
    },
    {
      cluster: "Industrial Complex",
      emissions: industryEmissions.filter(r => r.cluster === "industry").reduce((sum, r) => sum + r.emission_kg, 0),
      devices: industryEmissions.filter(r => r.cluster === "industry").length,
      avgEmission: industryEmissions.filter(r => r.cluster === "industry").reduce((sum, r) => sum + r.emission_kg, 0) / industryEmissions.filter(r => r.cluster === "industry").length
    }
  ];

  // Create transfer flow data
  const transfersByReceiver = carbonCreditTransfers.reduce((acc, transfer) => {
    if (!acc[transfer.received_by]) {
      acc[transfer.received_by] = 0;
    }
    acc[transfer.received_by] += transfer.credit_kg;
    return acc;
  }, {} as Record<string, number>);

  const topReceivers = Object.entries(transfersByReceiver)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([device, credits]) => ({ device, credits }));

  // Emission distribution data
  const emissionRanges = [
    { range: "20-23 kg", count: emissionData.filter(r => r.emission_kg >= 20 && r.emission_kg < 23).length },
    { range: "23-25 kg", count: emissionData.filter(r => r.emission_kg >= 23 && r.emission_kg < 25).length },
    { range: "25-27 kg", count: emissionData.filter(r => r.emission_kg >= 25 && r.emission_kg < 27).length },
    { range: "400-500 kg", count: emissionData.filter(r => r.emission_kg >= 400 && r.emission_kg < 500).length },
    { range: "1800-2200 kg", count: emissionData.filter(r => r.emission_kg >= 1800 && r.emission_kg < 2200).length }
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (currentView === "overview") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Carbon Emissions Overview</h1>
            <p className="text-muted-foreground">Real-time carbon footprint tracking and analysis</p>
          </div>
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
            Live Data
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Devices</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{emissionData.length}</span>
                <Database className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {homeEmissions.length} homes + {industryEmissions.length} industrial
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Emissions</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{(totalHomeEmissions + totalIndustryEmissions).toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">kg CO₂</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-warning" />
                <span className="text-xs text-muted-foreground">Across all clusters</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Credits Transferred</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{totalCreditsTransferred.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">kg CO₂</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="h-4 w-4 text-success" />
                <span className="text-xs text-muted-foreground">{carbonCreditTransfers.length} transfers</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-secondary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Home Emission</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{avgHomeEmission.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">kg CO₂</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                <Home className="h-4 w-4 text-secondary" />
                <span className="text-xs text-muted-foreground">Per device</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Emissions by Cluster
              </CardTitle>
              <CardDescription>Carbon emissions distribution across different clusters</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                emissions: { label: "Emissions (kg CO₂)", color: "hsl(var(--primary))" },
                devices: { label: "Devices", color: "hsl(var(--secondary))" }
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={clusterData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="cluster" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="emissions" fill="var(--color-emissions)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Emission Distribution
              </CardTitle>
              <CardDescription>Distribution of emission levels across devices</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                count: { label: "Device Count", color: "hsl(var(--primary))" }
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={emissionRanges}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ range, count }) => `${range}: ${count}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {emissionRanges.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Transfer Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5" />
              Top Carbon Credit Recipients
            </CardTitle>
            <CardDescription>Industrial devices receiving the most carbon credits</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              credits: { label: "Credits (kg CO₂)", color: "hsl(var(--success))" }
            }}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={topReceivers} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="device" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="credits" fill="var(--color-credits)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentView === "analytics") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Advanced Analytics</h1>
            <p className="text-muted-foreground">Deep insights into carbon emission patterns</p>
          </div>
        </div>

        <Tabs defaultValue="emissions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="emissions">Emission Analysis</TabsTrigger>
            <TabsTrigger value="transfers">Credit Transfers</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="emissions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Home vs Industry Emissions</CardTitle>
                  <CardDescription>Comparative analysis of emission levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Home Devices</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{homeEmissions.length} devices</span>
                    </div>
                    <Progress value={(totalHomeEmissions / (totalHomeEmissions + totalIndustryEmissions)) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {totalHomeEmissions.toFixed(1)} kg CO₂ ({((totalHomeEmissions / (totalHomeEmissions + totalIndustryEmissions)) * 100).toFixed(1)}%)
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Factory className="h-4 w-4 text-warning" />
                        <span className="text-sm font-medium">Industry Devices</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{industryEmissions.length} devices</span>
                    </div>
                    <Progress value={(totalIndustryEmissions / (totalHomeEmissions + totalIndustryEmissions)) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {totalIndustryEmissions.toFixed(1)} kg CO₂ ({((totalIndustryEmissions / (totalHomeEmissions + totalIndustryEmissions)) * 100).toFixed(1)}%)
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emission Intensity</CardTitle>
                  <CardDescription>Average emissions per device type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="font-medium">Home Devices</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{avgHomeEmission.toFixed(2)} kg</div>
                        <div className="text-xs text-muted-foreground">avg per device</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-warning rounded-full"></div>
                        <span className="font-medium">Industry Devices</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{avgIndustryEmission.toFixed(2)} kg</div>
                        <div className="text-xs text-muted-foreground">avg per device</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        Industry devices emit <span className="font-bold text-warning">
                        {(avgIndustryEmission / avgHomeEmission).toFixed(1)}x</span> more than home devices
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Cluster Performance Comparison</CardTitle>
                <CardDescription>Detailed breakdown by cluster and device type</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                  emissions: { label: "Total Emissions", color: "hsl(var(--primary))" },
                  avgEmission: { label: "Avg per Device", color: "hsl(var(--secondary))" }
                }}>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={clusterData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="cluster" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar yAxisId="left" dataKey="emissions" fill="var(--color-emissions)" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="right" dataKey="avgEmission" fill="var(--color-avgEmission)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Transfer Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Transfers</span>
                    <span className="font-bold">{carbonCreditTransfers.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Volume</span>
                    <span className="font-bold">{totalCreditsTransferred.toFixed(1)} kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg Transfer</span>
                    <span className="font-bold">{(totalCreditsTransferred / carbonCreditTransfers.length).toFixed(2)} kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Unique Recipients</span>
                    <span className="font-bold">{Object.keys(transfersByReceiver).length}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Top Credit Recipients</CardTitle>
                  <CardDescription>Industrial devices receiving the most carbon credits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topReceivers.slice(0, 5).map((receiver, index) => (
                      <div key={receiver.device} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">#{index + 1}</span>
                          </div>
                          <span className="font-medium">{receiver.device}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{receiver.credits.toFixed(1)} kg</div>
                          <div className="text-xs text-muted-foreground">CO₂ credits</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Credit Transfer Flow</CardTitle>
                <CardDescription>Volume of carbon credits transferred to top recipients</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                  credits: { label: "Credits (kg CO₂)", color: "hsl(var(--success))" }
                }}>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={topReceivers}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="device" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="credits" stroke="var(--color-credits)" fill="var(--color-credits)" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="efficiency" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Efficiency Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-success">87%</div>
                    <Progress value={87} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      Based on emission levels and credit transfers
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Carbon Offset Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-primary">
                      {((totalCreditsTransferred / (totalHomeEmissions + totalIndustryEmissions)) * 100).toFixed(1)}%
                    </div>
                    <Progress value={(totalCreditsTransferred / (totalHomeEmissions + totalIndustryEmissions)) * 100} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      Emissions offset through credit transfers
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Network Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Devices</span>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        {emissionData.length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Quality</span>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        High
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Validation Status</span>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        Verified
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Emission efficiency across different device categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
                    <Leaf className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">{homeEmissions.length}</div>
                    <div className="text-sm text-muted-foreground">Home Devices</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Avg: {avgHomeEmission.toFixed(1)} kg CO₂
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-warning/5 to-warning/10 rounded-lg">
                    <Factory className="h-8 w-8 text-warning mx-auto mb-2" />
                    <div className="text-2xl font-bold text-warning">{industryEmissions.length}</div>
                    <div className="text-sm text-muted-foreground">Industry Devices</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Avg: {avgIndustryEmission.toFixed(1)} kg CO₂
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-success/5 to-success/10 rounded-lg">
                    <ArrowUpRight className="h-8 w-8 text-success mx-auto mb-2" />
                    <div className="text-2xl font-bold text-success">{carbonCreditTransfers.length}</div>
                    <div className="text-sm text-muted-foreground">Credit Transfers</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Total: {totalCreditsTransferred.toFixed(1)} kg
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

  if (currentView === "upload" && userRole === "company") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Data Upload</h1>
            <p className="text-muted-foreground">Upload and manage your carbon emission data</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Data Status</CardTitle>
              <CardDescription>Overview of your uploaded emission data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-success/5 border border-success/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <div>
                    <div className="font-medium">Emission Records</div>
                    <div className="text-sm text-muted-foreground">{emissionData.length} devices tracked</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-success/10 text-success">
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Credit Transfers</div>
                    <div className="text-sm text-muted-foreground">{carbonCreditTransfers.length} transactions</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Verified
                </Badge>
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Last updated: <span className="font-medium">Real-time</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Quality Metrics</CardTitle>
              <CardDescription>Validation and integrity scores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Completeness</span>
                  <span className="text-sm font-medium">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Validation Score</span>
                  <span className="text-sm font-medium">98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Anti-Cheat Score</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-success">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Data Integrity Verified</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentView === "validation" && userRole === "auditor") {
    const verifiedRecords = emissionData.filter(record => record.credits_signed > 0);
    const unverifiedRecords = emissionData.filter(record => record.credits_signed === 0);

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Data Validation</h1>
            <p className="text-muted-foreground">Review and verify carbon emission records</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Verified Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{verifiedRecords.length}</div>
              <p className="text-sm text-muted-foreground">
                {((verifiedRecords.length / emissionData.length) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Pending Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{unverifiedRecords.length}</div>
              <p className="text-sm text-muted-foreground">
                {((unverifiedRecords.length / emissionData.length) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Validation Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {((verifiedRecords.length / emissionData.length) * 100).toFixed(1)}%
              </div>
              <Progress value={(verifiedRecords.length / emissionData.length) * 100} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Validation Queue</CardTitle>
            <CardDescription>Records requiring auditor review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unverifiedRecords.slice(0, 10).map((record, index) => (
                <div key={record.device_id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      {record.home_id === "home" ? <Home className="h-5 w-5" /> : <Factory className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="font-medium">{record.device_id}</div>
                      <div className="text-sm text-muted-foreground">
                        {record.cluster} • {record.home_id}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{record.emission_kg.toFixed(2)} kg CO₂</div>
                    <Badge variant="outline" className="text-xs">
                      Pending
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

  if (currentView === "energy" && userRole === "domestic") {
    const userHomeData = homeEmissions.slice(0, 10); // Simulate user's home devices
    const userTotalEmissions = userHomeData.reduce((sum, record) => sum + record.emission_kg, 0);
    const userAvgEmission = userTotalEmissions / userHomeData.length;

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Energy Tracking</h1>
            <p className="text-muted-foreground">Monitor your household carbon footprint</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Your Devices</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{userHomeData.length}</span>
                <Home className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Active monitoring</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Emissions</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{userTotalEmissions.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">kg CO₂</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                <TrendingDown className="h-4 w-4 text-success" />
                <span className="text-xs text-success">-5% vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Carbon Score</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">B+</span>
                <Leaf className="h-5 w-5 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Above average efficiency</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-secondary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Daily Average</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{userAvgEmission.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">kg CO₂</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Per device</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Device Emissions</CardTitle>
              <CardDescription>Carbon footprint by device</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                emission_kg: { label: "Emissions (kg CO₂)", color: "hsl(var(--primary))" }
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userHomeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="device_id" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="emission_kg" fill="var(--color-emission_kg)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Efficiency Comparison</CardTitle>
              <CardDescription>How you compare to other homes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{userAvgEmission.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground">Your average (kg CO₂)</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">vs Network Average</span>
                    <div className="flex items-center gap-2">
                      {userAvgEmission < avgHomeEmission ? (
                        <TrendingDown className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-warning" />
                      )}
                      <span className={`text-sm font-medium ${userAvgEmission < avgHomeEmission ? 'text-success' : 'text-warning'}`}>
                        {Math.abs(((userAvgEmission - avgHomeEmission) / avgHomeEmission) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <Progress 
                    value={userAvgEmission < avgHomeEmission ? 75 : 45} 
                    className="h-2" 
                  />

                  <div className="text-xs text-muted-foreground">
                    Network average: {avgHomeEmission.toFixed(1)} kg CO₂
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Device Performance</CardTitle>
            <CardDescription>Individual device emission tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userHomeData.map((device, index) => (
                <div key={device.device_id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Home className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{device.device_id}</div>
                      <div className="text-sm text-muted-foreground">{device.cluster} cluster</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{device.emission_kg.toFixed(2)} kg CO₂</div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${device.emission_kg < avgHomeEmission ? 'border-success text-success' : 'border-warning text-warning'}`}
                    >
                      {device.emission_kg < avgHomeEmission ? 'Efficient' : 'Above Avg'}
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

  // Default overview for other roles and views
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Carbon emission tracking and analysis platform</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Records</span>
              <span className="font-bold">{emissionData.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Home Devices</span>
              <span className="font-bold">{homeEmissions.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Industry Devices</span>
              <span className="font-bold">{industryEmissions.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Credit Transfers</span>
              <span className="font-bold">{carbonCreditTransfers.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Emission Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Emissions</span>
              <span className="font-bold">{(totalHomeEmissions + totalIndustryEmissions).toFixed(1)} kg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Home Emissions</span>
              <span className="font-bold">{totalHomeEmissions.toFixed(1)} kg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Industry Emissions</span>
              <span className="font-bold">{totalIndustryEmissions.toFixed(1)} kg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Credits Transferred</span>
              <span className="font-bold">{totalCreditsTransferred.toFixed(1)} kg</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Data Quality</span>
              <Badge variant="secondary" className="bg-success/10 text-success">High</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Validation</span>
              <Badge variant="secondary" className="bg-success/10 text-success">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Anti-Cheat</span>
              <Badge variant="secondary" className="bg-success/10 text-success">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Network</span>
              <Badge variant="secondary" className="bg-success/10 text-success">Online</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}