import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  Database,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Settings,
  Edit,
  Trash2,
  Eye,
  Download
} from "lucide-react";

interface DashboardContentProps {
  userRole: "company" | "auditor" | "admin" | "domestic";
  currentView: string;
}

// Sample data for domestic users
const domesticEnergyData = [
  { month: "Jan 2024", electricity: 850, gas: 45, water: 12, total: 907, cost: 234 },
  { month: "Feb 2024", electricity: 780, gas: 52, water: 11, total: 843, cost: 218 },
  { month: "Mar 2024", electricity: 720, gas: 38, water: 13, total: 771, cost: 201 },
  { month: "Apr 2024", electricity: 680, gas: 25, water: 14, total: 719, cost: 187 },
  { month: "May 2024", electricity: 620, gas: 18, water: 15, total: 653, cost: 169 },
  { month: "Jun 2024", electricity: 847, gas: 45, water: 12, total: 904, cost: 234 }
];

const domesticBills = [
  { id: "B001", provider: "Green Energy Co.", type: "Electricity", amount: 156.78, dueDate: "2024-07-15", status: "Paid", usage: "847 kWh" },
  { id: "B002", provider: "City Gas", type: "Natural Gas", amount: 67.45, dueDate: "2024-07-20", status: "Pending", usage: "45 therms" },
  { id: "B003", provider: "Water Works", type: "Water", amount: 34.20, dueDate: "2024-07-25", status: "Paid", usage: "12,000 gal" },
  { id: "B004", provider: "Solar Panel Co.", type: "Solar Credit", amount: -23.50, dueDate: "2024-07-30", status: "Credit", usage: "Generated 180 kWh" }
];

// Sample data for company users
const companyFacilities = [
  { id: "F001", name: "Manufacturing Plant A", location: "Detroit, MI", emissions: 2847, status: "Verified", lastUpdate: "2024-06-15" },
  { id: "F002", name: "Warehouse B", location: "Chicago, IL", emissions: 1234, status: "Pending", lastUpdate: "2024-06-14" },
  { id: "F003", name: "Office Complex", location: "Austin, TX", emissions: 567, status: "Approved", lastUpdate: "2024-06-13" },
  { id: "F004", name: "Distribution Center", location: "Phoenix, AZ", emissions: 890, status: "Flagged", lastUpdate: "2024-06-12" }
];

const companyReports = [
  { id: "R001", title: "Q2 2024 Carbon Footprint Report", facility: "All Facilities", date: "2024-06-30", status: "Complete", size: "2.4 MB" },
  { id: "R002", title: "Manufacturing Emissions Analysis", facility: "Plant A", date: "2024-06-25", status: "Draft", size: "1.8 MB" },
  { id: "R003", title: "Scope 1 & 2 Emissions Summary", facility: "Warehouse B", date: "2024-06-20", status: "Review", size: "1.2 MB" },
  { id: "R004", title: "Annual Sustainability Report", facility: "All Facilities", date: "2024-06-15", status: "Published", size: "5.1 MB" }
];

const validationQueue = [
  { id: "V001", facility: "Manufacturing Plant A", dataType: "Energy Consumption", submittedBy: "John Smith", date: "2024-06-15", priority: "High", status: "Pending" },
  { id: "V002", facility: "Warehouse B", dataType: "Waste Management", submittedBy: "Sarah Johnson", date: "2024-06-14", priority: "Medium", status: "In Review" },
  { id: "V003", facility: "Office Complex", dataType: "Transportation", submittedBy: "Mike Davis", date: "2024-06-13", priority: "Low", status: "Verified" },
  { id: "V004", facility: "Distribution Center", dataType: "Process Emissions", submittedBy: "Lisa Wilson", date: "2024-06-12", priority: "High", status: "Flagged" }
];

// Sample data for auditor users
const flaggedRecords = [
  { id: "FR001", company: "TechCorp Industries", facility: "Plant A", issue: "Anomalous energy spike", severity: "High", date: "2024-06-15", auditor: "Unassigned" },
  { id: "FR002", company: "GreenManufacturing", facility: "Facility B", issue: "Missing documentation", severity: "Medium", date: "2024-06-14", auditor: "Alice Brown" },
  { id: "FR003", company: "EcoSolutions Ltd", facility: "Warehouse C", issue: "Data inconsistency", severity: "High", date: "2024-06-13", auditor: "Bob Wilson" },
  { id: "FR004", company: "CleanTech Corp", facility: "Office D", issue: "Calculation error", severity: "Low", date: "2024-06-12", auditor: "Carol Davis" }
];

const auditReports = [
  { id: "AR001", company: "TechCorp Industries", auditor: "Alice Brown", date: "2024-06-15", status: "Complete", findings: 3, recommendations: 5 },
  { id: "AR002", company: "GreenManufacturing", auditor: "Bob Wilson", date: "2024-06-10", status: "In Progress", findings: 1, recommendations: 2 },
  { id: "AR003", company: "EcoSolutions Ltd", auditor: "Carol Davis", date: "2024-06-05", status: "Draft", findings: 2, recommendations: 4 },
  { id: "AR004", company: "CleanTech Corp", auditor: "Alice Brown", date: "2024-06-01", status: "Published", findings: 0, recommendations: 1 }
];

// Sample data for admin users
const systemUsers = [
  { id: "U001", name: "John Smith", email: "john.smith@techcorp.com", role: "Company Admin", company: "TechCorp Industries", lastLogin: "2024-06-15", status: "Active" },
  { id: "U002", name: "Alice Brown", email: "alice.brown@audit.com", role: "Senior Auditor", company: "Carbon Audit Services", lastLogin: "2024-06-15", status: "Active" },
  { id: "U003", name: "Sarah Johnson", email: "sarah.j@greenmanuf.com", role: "Environmental Manager", company: "GreenManufacturing", lastLogin: "2024-06-14", status: "Active" },
  { id: "U004", name: "Mike Davis", email: "mike.davis@ecosol.com", role: "Sustainability Officer", company: "EcoSolutions Ltd", lastLogin: "2024-06-12", status: "Inactive" }
];

const industryRegistry = [
  { id: "I001", name: "TechCorp Industries", industry: "Manufacturing", location: "Detroit, MI", facilities: 4, employees: 2500, registrationDate: "2023-01-15", status: "Verified" },
  { id: "I002", name: "GreenManufacturing", industry: "Heavy Industry", location: "Pittsburgh, PA", facilities: 6, employees: 3200, registrationDate: "2023-02-20", status: "Verified" },
  { id: "I003", name: "EcoSolutions Ltd", industry: "Data Centers", location: "Austin, TX", facilities: 2, employees: 800, registrationDate: "2023-03-10", status: "Pending" },
  { id: "I004", name: "CleanTech Corp", industry: "Transport & Logistics", location: "Los Angeles, CA", facilities: 8, employees: 1500, registrationDate: "2023-04-05", status: "Verified" }
];

const systemSettings = [
  { category: "Data Validation", setting: "Auto-validation threshold", value: "95%", description: "Automatic validation for data with confidence above this threshold" },
  { category: "Security", setting: "Session timeout", value: "30 minutes", description: "User session timeout duration" },
  { category: "Notifications", setting: "Email alerts", value: "Enabled", description: "Send email notifications for critical events" },
  { category: "Reporting", setting: "Report retention", value: "7 years", description: "How long to retain generated reports" },
  { category: "API", setting: "Rate limiting", value: "1000/hour", description: "API requests per hour per user" },
  { category: "Backup", setting: "Backup frequency", value: "Daily", description: "Automated backup schedule" }
];

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
                <div className="text-2xl font-bold">5,538 tCO₂e</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-destructive flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% from last quarter
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

          {/* Facilities Overview */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle>Facility Emissions Overview</CardTitle>
              <CardDescription>Carbon emissions by facility location</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Facility</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Emissions (tCO₂e)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Update</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companyFacilities.map((facility) => (
                    <TableRow key={facility.id}>
                      <TableCell className="font-medium">{facility.name}</TableCell>
                      <TableCell>{facility.location}</TableCell>
                      <TableCell>{facility.emissions.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={facility.status === "Verified" ? "default" : facility.status === "Flagged" ? "destructive" : "secondary"}>
                          {facility.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{facility.lastUpdate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentView === "analytics") {
      return (
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Emissions Trend Analysis</CardTitle>
                <CardDescription>Monthly carbon emissions across all facilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "Jan 2024", emissions: 5200, change: "+5%" },
                    { month: "Feb 2024", emissions: 4980, change: "-4%" },
                    { month: "Mar 2024", emissions: 5150, change: "+3%" },
                    { month: "Apr 2024", emissions: 5380, change: "+4%" },
                    { month: "May 2024", emissions: 5290, change: "-2%" },
                    { month: "Jun 2024", emissions: 5538, change: "+5%" }
                  ].map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{data.month}</p>
                        <p className="text-sm text-muted-foreground">{data.emissions} tCO₂e</p>
                      </div>
                      <Badge variant={data.change.startsWith('+') ? "destructive" : "default"}>
                        {data.change}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Emissions by Source</CardTitle>
                <CardDescription>Breakdown of carbon emissions by source type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "Energy Consumption", percentage: 45, amount: "2,492 tCO₂e", color: "bg-primary" },
                    { source: "Transportation", percentage: 28, amount: "1,551 tCO₂e", color: "bg-secondary" },
                    { source: "Manufacturing Process", percentage: 18, amount: "997 tCO₂e", color: "bg-accent" },
                    { source: "Waste Management", percentage: 9, amount: "498 tCO₂e", color: "bg-success" }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.source}</span>
                        <span className="text-sm text-muted-foreground">{item.amount}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    if (currentView === "reports") {
      return (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Generate New Report
            </Button>
          </div>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Generated carbon footprint and sustainability reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Title</TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead>Date Generated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companyReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>{report.facility}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <Badge variant={report.status === "Complete" || report.status === "Published" ? "default" : "secondary"}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentView === "validation") {
      return (
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Data Validation</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Validation</CardTitle>
                <AlertTriangle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Awaiting review</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Validated Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">8</div>
                <p className="text-xs text-muted-foreground">Successfully verified</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Validation Rate</CardTitle>
                <Shield className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">94.2%</div>
                <p className="text-xs text-muted-foreground">Overall accuracy</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle>Validation Queue</CardTitle>
              <CardDescription>Data submissions awaiting validation</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead>Data Type</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {validationQueue.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.facility}</TableCell>
                      <TableCell>{item.dataType}</TableCell>
                      <TableCell>{item.submittedBy}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Badge variant={item.priority === "High" ? "destructive" : item.priority === "Medium" ? "secondary" : "outline"}>
                          {item.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.status === "Verified" ? "default" : item.status === "Flagged" ? "destructive" : "secondary"}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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

    if (currentView === "flagged") {
      return (
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Flagged Records</h1>
          
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle>Records Requiring Attention</CardTitle>
              <CardDescription>Data submissions flagged for review</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Record ID</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Assigned Auditor</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flaggedRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.company}</TableCell>
                      <TableCell>{record.facility}</TableCell>
                      <TableCell>{record.issue}</TableCell>
                      <TableCell>
                        <Badge variant={record.severity === "High" ? "destructive" : record.severity === "Medium" ? "secondary" : "outline"}>
                          {record.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.auditor}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentView === "validation") {
      return (
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Validation Queue</h1>
          
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle>Pending Validations</CardTitle>
              <CardDescription>Data submissions awaiting auditor review</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead>Data Type</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {validationQueue.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.facility}</TableCell>
                      <TableCell>{item.dataType}</TableCell>
                      <TableCell>{item.submittedBy}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Badge variant={item.priority === "High" ? "destructive" : item.priority === "Medium" ? "secondary" : "outline"}>
                          {item.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.status === "Verified" ? "default" : item.status === "Flagged" ? "destructive" : "secondary"}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentView === "reports") {
      return (
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Audit Reports</h1>
          
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle>Generated Audit Reports</CardTitle>
              <CardDescription>Completed and in-progress audit reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Auditor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Findings</TableHead>
                    <TableHead>Recommendations</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.company}</TableCell>
                      <TableCell>{report.auditor}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <Badge variant={report.status === "Complete" || report.status === "Published" ? "default" : "secondary"}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.findings}</TableCell>
                      <TableCell>{report.recommendations}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentView === "analytics") {
      return (
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Compliance Analytics</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Audit Performance</CardTitle>
                <CardDescription>Monthly audit completion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "Jan 2024", completed: 45, pending: 8, rate: "85%" },
                    { month: "Feb 2024", completed: 52, pending: 6, rate: "90%" },
                    { month: "Mar 2024", completed: 48, pending: 12, rate: "80%" },
                    { month: "Apr 2024", completed: 61, pending: 4, rate: "94%" },
                    { month: "May 2024", completed: 58, pending: 7, rate: "89%" },
                    { month: "Jun 2024", completed: 47, pending: 23, rate: "67%" }
                  ].map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{data.month}</p>
                        <p className="text-sm text-muted-foreground">{data.completed} completed, {data.pending} pending</p>
                      </div>
                      <Badge variant="outline">{data.rate}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Compliance Issues</CardTitle>
                <CardDescription>Common issues found during audits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { issue: "Missing Documentation", count: 15, percentage: 35 },
                    { issue: "Data Inconsistency", count: 12, percentage: 28 },
                    { issue: "Calculation Errors", count: 8, percentage: 19 },
                    { issue: "Anomalous Values", count: 5, percentage: 12 },
                    { issue: "Late Submissions", count: 3, percentage: 7 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.issue}</span>
                        <span className="text-sm text-muted-foreground">{item.count} cases</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-destructive h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
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

    if (currentView === "users") {
      return (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">User Management</h1>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </div>
          
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle>System Users</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.company}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentView === "industries") {
      return (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Industry Registry</h1>
            <Button>
              <Factory className="h-4 w-4 mr-2" />
              Register New Industry
            </Button>
          </div>
          
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle>Registered Industries</CardTitle>
              <CardDescription>Companies registered on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Industry Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Facilities</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {industryRegistry.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>{company.industry}</TableCell>
                      <TableCell>{company.location}</TableCell>
                      <TableCell>{company.facilities}</TableCell>
                      <TableCell>{company.employees.toLocaleString()}</TableCell>
                      <TableCell>{company.registrationDate}</TableCell>
                      <TableCell>
                        <Badge variant={company.status === "Verified" ? "default" : "secondary"}>
                          {company.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentView === "settings") {
      return (
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle>Platform Configuration</CardTitle>
              <CardDescription>Manage system-wide settings and configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {systemSettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{setting.category}</Badge>
                        <h3 className="font-medium">{setting.setting}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{setting.value}</span>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
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

    if (currentView === "energy") {
      return (
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Energy Tracking</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Monthly Energy Usage</CardTitle>
                <CardDescription>Track your energy consumption over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Electricity</TableHead>
                      <TableHead>Gas</TableHead>
                      <TableHead>Water</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {domesticEnergyData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{data.month}</TableCell>
                        <TableCell>{data.electricity} kWh</TableCell>
                        <TableCell>{data.gas} therms</TableCell>
                        <TableCell>{data.water}k gal</TableCell>
                        <TableCell>{data.total}</TableCell>
                        <TableCell>${data.cost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
                <CardDescription>Your energy consumption patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {domesticEnergyData.slice(-3).map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{data.month}</p>
                        <p className="text-sm text-muted-foreground">{data.total} units total</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${data.cost}</p>
                        <p className="text-sm text-muted-foreground">
                          {index > 0 && domesticEnergyData[domesticEnergyData.length - 3 + index - 1] ? 
                            (((data.cost - domesticEnergyData[domesticEnergyData.length - 3 + index - 1].cost) / domesticEnergyData[domesticEnergyData.length - 3 + index - 1].cost * 100).toFixed(1) + "% change") : 
                            "Base month"
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    if (currentView === "bills") {
      return (
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Bills & Costs</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Monthly Cost</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$234.93</div>
                <p className="text-xs text-muted-foreground">Current month</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Bills</CardTitle>
                <AlertTriangle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Due soon</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings This Year</CardTitle>
                <TrendingDown className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">$312</div>
                <p className="text-xs text-muted-foreground">vs. last year</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle>Recent Bills</CardTitle>
              <CardDescription>Your utility bills and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill ID</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {domesticBills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell className="font-medium">{bill.id}</TableCell>
                      <TableCell>{bill.provider}</TableCell>
                      <TableCell>{bill.type}</TableCell>
                      <TableCell className={bill.amount < 0 ? "text-success" : ""}>
                        ${Math.abs(bill.amount).toFixed(2)}
                        {bill.amount < 0 && " (Credit)"}
                      </TableCell>
                      <TableCell>{bill.usage}</TableCell>
                      <TableCell>{bill.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant={bill.status === "Paid" ? "default" : bill.status === "Credit" ? "outline" : "secondary"}>
                          {bill.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Estimated Monthly CO₂ Emissions</h4>
                    <p className="text-2xl font-bold text-primary">1.2 tons CO₂e</p>
                    <p className="text-sm text-muted-foreground">Based on current inputs</p>
                  </div>
                </TabsContent>
                <TabsContent value="transport" className="space-y-4">
                  <p className="text-muted-foreground">Transportation and travel information.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Miles Driven (monthly)</label>
                      <input className="w-full mt-1 p-2 border rounded-md" placeholder="1200" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Vehicle MPG</label>
                      <input className="w-full mt-1 p-2 border rounded-md" placeholder="28" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="waste" className="space-y-4">
                  <p className="text-muted-foreground">Waste and recycling habits.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Waste Generated (lbs/week)</label>
                      <input className="w-full mt-1 p-2 border rounded-md" placeholder="25" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Recycling Rate (%)</label>
                      <input className="w-full mt-1 p-2 border rounded-md" placeholder="65" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="results" className="space-y-4">
                  <div className="text-center space-y-4">
                    <div className="bg-gradient-primary p-6 rounded-lg text-primary-foreground">
                      <h3 className="text-lg font-medium mb-2">Your Total Carbon Footprint</h3>
                      <p className="text-4xl font-bold">2.8 tons CO₂e</p>
                      <p className="text-sm opacity-90">per month</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Energy</p>
                        <p className="text-xl font-bold">1.2t</p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Transport</p>
                        <p className="text-xl font-bold">1.4t</p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Waste</p>
                        <p className="text-xl font-bold">0.2t</p>
                      </div>
                    </div>
                  </div>
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