

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Download, Eye, FileCheck, Calendar } from "lucide-react"

export function Certificates() {
  const [searchTerm, setSearchTerm] = useState("")

  const certificates = [
    {
      id: "CERT-001",
      projectName: "Rajasthan Solar PV",
      projectId: "ID-6909",
      certificateType: "VCS",
      issueDate: "2023-12-01",
      expiryDate: "2024-12-01",
      status: "Active",
      co2Amount: "27,850",
      verifier: "UNFCCC-CDM",
    },
    {
      id: "CERT-002",
      projectName: "Wind Farm Tray",
      projectId: "ID-1509",
      certificateType: "Gold Standard",
      issueDate: "2023-11-15",
      expiryDate: "2024-11-15",
      status: "Active",
      co2Amount: "19,500",
      verifier: "VCS",
    },
    {
      id: "CERT-003",
      projectName: "Methane Recovery, Columbia",
      projectId: "ID-GS23254",
      certificateType: "CORSIA",
      issueDate: "2023-10-20",
      expiryDate: "2024-10-20",
      status: "Verified",
      co2Amount: "39,500",
      verifier: "Gold Standard",
    },
  ]

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Verified":
        return "bg-blue-100 text-blue-800"
      case "Expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Certificates</h1>
          <p className="text-gray-600 mt-2">Manage carbon offset certificates</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <FileCheck className="w-4 h-4 mr-2" />
          Generate Certificate
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Certificates</CardTitle>
            <FileCheck className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">89</div>
            <p className="text-xs text-gray-500">+12 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Certificates</CardTitle>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">76</div>
            <p className="text-xs text-gray-500">85% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Expiring Soon</CardTitle>
            <Calendar className="w-5 h-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">8</div>
            <p className="text-xs text-gray-500">Next 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total CO₂ Certified</CardTitle>
            <div className="text-green-600 font-bold">tCO₂e</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1.2M</div>
            <p className="text-xs text-gray-500">Lifetime total</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Certificates</CardTitle>
              <CardDescription>{filteredCertificates.length} certificates found</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search certificates..."
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
                <TableHead>Certificate ID</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>CO₂ Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-medium">{cert.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{cert.projectName}</div>
                      <div className="text-sm text-gray-500">{cert.projectId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{cert.certificateType}</Badge>
                  </TableCell>
                  <TableCell>{cert.issueDate}</TableCell>
                  <TableCell>{cert.expiryDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(cert.status)}>{cert.status}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{cert.co2Amount} tCO₂e</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Certificate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileCheck className="w-4 h-4 mr-2" />
                          Verify Status
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
