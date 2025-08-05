import { useState, useEffect } from "react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Download } from "lucide-react"


export function ProjectsManager({ onEditProject, onNewProject }) {
  const [searchTerm, setSearchTerm] = useState("")

  const [projects, setProjects] = useState([])

  // Fetch all projects
  const fetchProjects = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/projects");
    setProjects(response.data.projects || []);
  } catch (error) {
    console.error("Error fetching projects:", error);
    setProjects([]);
  }
};

useEffect(() => {
  fetchProjects();
}, []);


  //Search
  useEffect(() => {
  if (!searchTerm.trim()) return;

  const fetchSearchResults = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects/search?q=${encodeURIComponent(searchTerm)}");
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error("Error searching projects:", err);
      const response = await axios.get("http://localhost:5000/api/projects");
      setProjects(response.data.projects || []);
    }
  };

  const delayDebounce = setTimeout(() => {
    fetchSearchResults();
  }, 300);

  return () => clearTimeout(delayDebounce);
}, [searchTerm]);



  
//view  details
  const handleViewDetails = async (projectId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/projects/${projectId}`);
    const project = response.data;
    console.log("Project Details:", project); 
    alert(`Project Name: ${project["Project Name"]}\nCountry: ${project.Country}`);
  } catch (error) {
    console.error("Error fetching project details:", error);
    alert("Failed to fetch project details");
  }
};

//delete project
const handleDeleteProject = async (projectId) => {
  try {
    await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
    setProjects(prevProjects =>prevProjects.filter(project => project._id !== projectId)
    );
    fetchProjects();
  } catch (error) {
    console.error("Failed to delete project:", error);
  }
};



const filteredProjects = searchTerm.trim()
  ? projects.filter(
      (project) =>
        project["Project Name"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project["Country"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project["Sector"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project["Registry"]?.toLowerCase().includes(searchTerm.toLowerCase())
    )  : projects;

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Verified":
        return "bg-blue-100 text-blue-800"
      case "CORSIA-eligible":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">Manage your carbon offset projects</p>
        </div>
        <Button onClick={onNewProject} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Project
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Projects</CardTitle>
              <CardDescription>{filteredProjects.length} projects found</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Annual Est. Units</TableHead>
                <TableHead>Registry</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project["_id"]}>

                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{project["Project Name"]}</div>
                      <div className="text-sm text-gray-500">{project["Id"]}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{project["Sector"] || "N/A"}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{project["Country"]}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project["Project Status"])}>
                      {project["Project Status"]}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{project["Annual Est. Units"]} tCO₂e</TableCell>
                  <TableCell>{project["Registry"]}</TableCell>
                  <TableCell className="font-medium">{project["Price"] || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(project._id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditProject(project)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download Report
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProject(project._id)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
