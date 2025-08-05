import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Leaf, TrendingUp, Users, FileCheck, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"


export function Dashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [overview, setOverview] = useState({
    totalProjects: 0,
    activeCredits: 0,
    totalUsers: 0,
    totalRetirements: 0
  })
  const [recentProjects, setRecentProjects] = useState([])
  const [breakdown, setBreakdown] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overviewRes, breakdownRes, projectsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/dashboard/overview"),
          axios.get("http://localhost:5000/api/dashboard/project-breakdown"),
          axios.get("http://localhost:5000/api/projects")
        ])

        setOverview(overviewRes.data.overview)
        setBreakdown(breakdownRes?.data?.projectBreakdown || [])

        // Fetch recent projects manually (optional)
        const response = await axios.get("http://localhost:5000/api/projects")
        const projects = response.data.projects || [];
        setProjectCount(projects.length);
        setRecentProjects((response.data.projects || []).slice(0, 5));
        
      } catch (error) {
        console.error("Dashboard fetch error:", error)
      }
    }

    fetchData()
  }, [])


  const stats = [
    {
      title: "Total Projects",
      value: "156",
      change: "+12%",
      trend: "up",
      icon: Leaf,
      color: "text-green-600",
    },
    {
      title: "CO₂ Offset (tCO₂e)",
      value: "2.4M",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+5.1%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Certificates Issued",
      value: "89",
      change: "-2.3%",
      trend: "down",
      icon: FileCheck,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your carbon projects and performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{projectCount}</div>
                <div className="flex items-center text-sm mt-1">
                  <TrendIcon className={`w-4 h-4 mr-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Latest carbon offset projects added</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{project["Project Name"]}</h4>
                      <Badge variant="outline" className="text-xs">
                        {project.Sector}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{project.Country}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>ID: {project.Id}</span>
                      <span>{project["Methodology"]}</span>
                      <span>{project["Total Available Units"]} tCO₂e</span>
                    </div>
                  </div>
                  <Badge variant={project["Project Status"] === "Active" ? "default" : "secondary"} className="ml-4">
                     {project["Project Status"]}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Types Distribution</CardTitle>
            <CardDescription>Breakdown by project categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                {breakdown.map((item) => (
                <div key={item.Sector}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.Sector || "Other"}</span>
                    <span>{item.count}</span>
                  </div>
                  <Progress value={item.count} className="h-2" />
                </div>
              ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
