import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Globe, Calendar, DollarSign, Leaf } from "lucide-react"

export function Analytics() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$2.4M",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Carbon Credits Sold",
      value: "1.8M tCO₂e",
      change: "+8.2%",
      icon: Leaf,
      color: "text-blue-600",
    },
    {
      title: "Active Markets",
      value: "23",
      change: "+3",
      icon: Globe,
      color: "text-purple-600",
    },
    {
      title: "Avg. Price/Tonne",
      value: "$4.50",
      change: "+$0.30",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const topPerformingProjects = [
    {
      name: "Rajasthan Solar PV",
      revenue: "$450K",
      credits: "90K tCO₂e",
      performance: 95,
    },
    {
      name: "Wind Farm Tray",
      revenue: "$380K",
      credits: "76K tCO₂e",
      performance: 88,
    },
    {
      name: "Methane Recovery, Columbia",
      revenue: "$520K",
      credits: "104K tCO₂e",
      performance: 92,
    },
  ]

  const marketTrends = [
    { region: "North America", demand: 85, growth: "+15%" },
    { region: "Europe", demand: 92, growth: "+22%" },
    { region: "Asia Pacific", demand: 78, growth: "+18%" },
    { region: "Latin America", demand: 65, growth: "+12%" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Performance insights and market trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="flex items-center text-sm mt-1">
                  <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                  <span className="text-green-600">{metric.change}</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Projects</CardTitle>
            <CardDescription>Projects with highest revenue and carbon credits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingProjects.map((project, index) => (
                <div key={project.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                      <h4 className="font-medium text-gray-900">{project.name}</h4>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Revenue: {project.revenue}</span>
                      <span>Credits: {project.credits}</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Performance</span>
                        <span>{project.performance}%</span>
                      </div>
                      <Progress value={project.performance} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Market Demand by Region</CardTitle>
            <CardDescription>Regional carbon credit demand and growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketTrends.map((trend) => (
                <div key={trend.region} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{trend.region}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-600">
                        {trend.growth}
                      </Badge>
                      <span className="text-sm text-gray-600">{trend.demand}%</span>
                    </div>
                  </div>
                  <Progress value={trend.demand} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Monthly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">+18.2%</div>
            <p className="text-sm text-gray-600">Carbon credits sold this month compared to last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Project Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">94.5%</div>
            <p className="text-sm text-gray-600">Projects meeting or exceeding carbon offset targets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Global Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">2.4M tCO₂e</div>
            <p className="text-sm text-gray-600">Total carbon emissions offset across all projects</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
