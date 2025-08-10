
import axios from "axios"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, X } from "lucide-react"


export function ProjectForm({ project, onBack }) {

  const [formData, setFormData] = useState({
    _id: project?._id || "",
    name: project?.["Project Name"] || "",
    projectId: project?.["Id"] || "",
    developer: project?.["Developer"] || "",
    registry: project?.["Registry"] || "",
    methodology: project?.["Methodology"] || "",
    sector: project?.["Sector"] || "",
    country: project?.["Country"] || "",
    status: project?.["Project Status"] || "",
    creditingStart: project?.["Crediting Period Start"] || "",
    creditingEnd: project?.["Crediting Period End"] || "",
    annualUnits: project?.["Annual Est. Units"] || "",
    issuedUnits: project?.["Total Issued Units"] || "",
    retiredUnits: project?.["Total Retired Units"] || "",
    availableUnits: project?.["Total Available Units"] || "",
    price: project?.["Price"] || ""
  });

  const [selectedCoBenefits, setSelectedCoBenefits] = useState([])

  const handleCoBenefitChange = (benefit, checked) => {
    if (checked) {
      setSelectedCoBenefits([...selectedCoBenefits, benefit])
    } else {
      setSelectedCoBenefits(selectedCoBenefits.filter((b) => b !== benefit))
    }
  }

  const coBenefitOptions = [
    "Employment", "Health", "Education", "Biodiversity", "Energy Access", "Gender Equity", "Climate Resilience"
  ]

  const [projects, setProjects] = useState([])
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects");
      setProjects(response.data.projects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (project) {
        alert("Updating project with ID:", project._id);
        await axios.put(`http://localhost:5000/api/projects/update/${project._id}`, formData)
      } else {
        await axios.post("http://localhost:5000/api/projects", formData)
      }
      fetchProjects();
      onBack()
    } catch (error) {
      console.error("Failed to submit form:", error)
    }
  }

  return(
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{project ? "Edit Project" : "Add New Project"}</h1>
          <p className="text-gray-600 mt-2">
            {project ? "Update project information" : "Create a new carbon offset project"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details of the carbon project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Rajasthan Solar PV"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectId">Project ID</Label>
                    <Input
                      id="projectId"
                      value={formData.projectId}
                      onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                      placeholder="e.g., ID-6909"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sector">Project Type</Label>
                    <Select value={formData.sector} onValueChange={(value) => setFormData({ ...formData, sector: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Solar">Solar</SelectItem>
                        <SelectItem value="Wind">Wind</SelectItem>
                        <SelectItem value="Methane Capture">Methane Capture</SelectItem>
                        <SelectItem value="Forestry">Forestry</SelectItem>
                        <SelectItem value="Hydroelectric">Hydroelectric</SelectItem>
                        <SelectItem value="Biomass">Biomass</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Listed">Listed</SelectItem>
                        <SelectItem value="Verified">Registered</SelectItem>
                        <SelectItem value="Authorized">Authorized</SelectItem>
                        <SelectItem value="Tokenized">Tokenized</SelectItem>
                        <SelectItem value="Burnt">Burnt</SelectItem>
                        <SelectItem value="CORSIA-eligible">CORSIA-eligible</SelectItem>
                        <SelectItem value="Retired">Retired</SelectItem>
                        <SelectItem value="Validated">Validated</SelectItem>
                        <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="developer">Developer</Label>
                    <Input
                      id="developer"
                      value={formData.developer}
                      onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                      placeholder="e.g., Tata Power"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g., India"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Large-scale solar photovoltaic project generating clean energy and supporting local communities."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Technical Details */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Details</CardTitle>
                <CardDescription>Technical specifications and carbon metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="availableUnits">Available Units</Label>
                    <Input
                      id="availableUnits"
                      value={formData.availableUnits}
                      onChange={(e) => setFormData({ ...formData, availableUnits: e.target.value })}
                      placeholder="e.g., 150 MW"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="issuedUnits">Issued Units</Label>
                    <Input
                      id="issuedUnits"
                      value={formData.issuedUnits}
                      onChange={(e) => setFormData({ ...formData, issuedUnits: e.target.value })}
                      placeholder="e.g., 150 MW"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="retiredUnits">Retired Units</Label>
                    <Input
                      id="retiredUnits"
                      value={formData.retiredUnits}
                      onChange={(e) => setFormData({ ...formData, retiredUnits: e.target.value })}
                      placeholder="e.g., 150 MW"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="annualUnits">Annual Est. Units</Label>
                    <Input
                      id="annualUnits"
                      value={formData.annualUnits}
                      onChange={(e) => setFormData({ ...formData, annualUnits: e.target.value })}
                      placeholder="e.g., 150 MW"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($/Tonne)</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="e.g., $5"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="creditingStart">Crediting Period Start</Label>
                    <Input
                      id="creditingStart"
                      value={formData.creditingStart}
                      onChange={(e) => setFormData({ ...formData, creditingStart: e.target.value })}
                      placeholder="e.g., 1-12-2023"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="creditingEnd">Crediting Period End</Label>
                    <Input
                      id="creditingEnd"
                      value={formData.creditingEnd}
                      onChange={(e) => setFormData({ ...formData, creditingEnd: e.target.value })}
                      placeholder="e.g., 1-12-2023"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="methodology">Methodology</Label>
                    <Input
                      id="methodology"
                      value={formData.methodology}
                      onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                      placeholder="e.g., ACM0002"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="registry">Registry</Label>
                    <Select
                      value={formData.registry}
                      onValueChange={(value) => setFormData({ ...formData, registry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Registry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UNFCCC-CDM">UNFCCC-CDM</SelectItem>
                        <SelectItem value="Gold Standard">Gold Standard</SelectItem>
                        <SelectItem value="Verra">Verra</SelectItem>
                        <SelectItem value="GCC">GCC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                </div>
              </CardContent>
            </Card>

            {/* Co-benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Co-benefits</CardTitle>
                <CardDescription>Select the additional benefits this project provides</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {coBenefitOptions.map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-2">
                      <Checkbox
                        id={benefit}
                        checked={selectedCoBenefits.includes(benefit)}
                        onCheckedChange={(checked) => handleCoBenefitChange(benefit, checked)}
                      />
                      <Label htmlFor={benefit} className="text-sm">
                        {benefit}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedCoBenefits.map((benefit) => (
                      <Badge key={benefit} variant="secondary" className="flex items-center gap-1">
                        {benefit}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => handleCoBenefitChange(benefit, false)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Image & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Image</CardTitle>
                <CardDescription>Upload an image for this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  {project ? "Update Project" : "Create Project"}
                </Button>
                <Button type="button" variant="outline" className="w-full bg-transparent" onClick={onBack}>
                  Cancel
                </Button>
                {project && (
                  <Button type="button" variant="destructive" className="w-full">
                    Delete Project
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>

    )
}
