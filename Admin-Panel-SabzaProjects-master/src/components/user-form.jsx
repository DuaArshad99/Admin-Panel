
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Upload, User, Mail, Phone, MapPin, Calendar } from "lucide-react"
import axios from "axios"



export function UserForm({ user, onBack }) {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    department: user?.department || "",
    location: user?.location || "",
    status: user?.status || "Active",
    bio: user?.bio || "",
    joinDate: user?.joinDate || "",
    permissions: {
      canCreateProjects: user?.permissions?.canCreateProjects || false,
      canEditProjects: user?.permissions?.canEditProjects || false,
      canDeleteProjects: user?.permissions?.canDeleteProjects || false,
      canManageUsers: user?.permissions?.canManageUsers || false,
      canViewAnalytics: user?.permissions?.canViewAnalytics || true,
      canIssueCertificates: user?.permissions?.canIssueCertificates || false,
    },
  })
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       if (user) {
         await axios.put(`http://localhost:5000/api/users/${user._id}`, formData);
         alert("User  updated successfully");
       } else {
         await axios.post("http://localhost:5000/api/users", formData);
         alert("User  created successfully");
       } 
       onBack(); 
     } catch (err) {
       console.error("Failed to submit user form:", err);
       alert("An error occurred");
     }
   };
   


  const handlePermissionChange = (permission, value) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [permission]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{user ? "Edit User" : "Add New User"}</h1>
          <p className="text-gray-600 mt-2">
            {user ? "Update user information and permissions" : "Create a new user account"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Basic user details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Smith"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john.smith@company.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter Password"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="New York, USA"
                      required
                    />
                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="joinDate" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Join Date
                    </Label>
                    <Input
                      id="joinDate"
                      type="date"
                      value={formData.joinDate}
                      required
                      onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio / Description</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Brief description about the user..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Role & Department */}
            <Card>
              <CardHeader>
                <CardTitle>Role & Department</CardTitle>
                <CardDescription>User role and organizational details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Project Manager">Project Manager</SelectItem>
                        <SelectItem value="Verifier">Verifier</SelectItem>
                        <SelectItem value="Analyst">Analyst</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData({ ...formData, department: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Carbon Projects">Carbon Projects</SelectItem>
                        <SelectItem value="Verification">Verification</SelectItem>
                        <SelectItem value="Analytics">Analytics</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
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
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Permissions */}
            <Card>
              <CardHeader>
                <CardTitle>Permissions</CardTitle>
                <CardDescription>Set user permissions and access levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label htmlFor="canCreateProjects">Create Projects</Label>
                      <p className="text-sm text-gray-600">Allow user to create new projects</p>
                    </div>
                    <Switch
                      id="canCreateProjects"
                      checked={formData.permissions.canCreateProjects}
                      onCheckedChange={(checked) => handlePermissionChange("canCreateProjects", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label htmlFor="canEditProjects">Edit Projects</Label>
                      <p className="text-sm text-gray-600">Allow user to modify existing projects</p>
                    </div>
                    <Switch
                      id="canEditProjects"
                      checked={formData.permissions.canEditProjects}
                      onCheckedChange={(checked) => handlePermissionChange("canEditProjects", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label htmlFor="canDeleteProjects">Delete Projects</Label>
                      <p className="text-sm text-gray-600">Allow user to delete projects</p>
                    </div>
                    <Switch
                      id="canDeleteProjects"
                      checked={formData.permissions.canDeleteProjects}
                      onCheckedChange={(checked) => handlePermissionChange("canDeleteProjects", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label htmlFor="canManageUsers">Manage Users</Label>
                      <p className="text-sm text-gray-600">Allow user to manage other users</p>
                    </div>
                    <Switch
                      id="canManageUsers"
                      checked={formData.permissions.canManageUsers}
                      onCheckedChange={(checked) => handlePermissionChange("canManageUsers", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label htmlFor="canViewAnalytics">View Analytics</Label>
                      <p className="text-sm text-gray-600">Allow user to access analytics</p>
                    </div>
                    <Switch
                      id="canViewAnalytics"
                      checked={formData.permissions.canViewAnalytics}
                      onCheckedChange={(checked) => handlePermissionChange("canViewAnalytics", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label htmlFor="canIssueCertificates">Issue Certificates</Label>
                      <p className="text-sm text-gray-600">Allow user to issue certificates</p>
                    </div>
                    <Switch
                      id="canIssueCertificates"
                      checked={formData.permissions.canIssueCertificates}
                      onCheckedChange={(checked) => handlePermissionChange("canIssueCertificates", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Picture & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Upload user profile image</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="text-lg">
                    {formData.firstName[0]}
                    {formData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
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
                  {user ? "Update User" : "Create User"}
                </Button>
                <Button type="button" variant="outline" className="w-full bg-transparent" onClick={onBack}>
                  Cancel
                </Button>
                {user && (
                  <>
                    <Button type="button" variant="outline" className="w-full bg-transparent">
                      Reset Password
                    </Button>
                    <Button type="button" variant="destructive" className="w-full">
                      Delete User
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
