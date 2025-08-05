"use client"
import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { ProjectsManager } from "@/components/projects-manager"
import { ProjectForm } from "@/components/project-form"
import { Analytics } from "@/components/analytics"
import { Settings } from "@/components/settings"
import { Certificates } from "@/components/certificates"
import { Users } from "@/components/users"
import { UserForm } from "@/components/user-form"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [editingProject, setEditingProject] = useState(null)

  const handleEditProject = (project) => {
    setEditingProject(project)
    setActiveTab("project-form")
  }

  const handleNewProject = () => {
    setEditingProject(null)
    setActiveTab("project-form")
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "projects":
        return <ProjectsManager onEditProject={handleEditProject} onNewProject={handleNewProject} />
      case "project-form":
        return <ProjectForm project={editingProject} onBack={() => setActiveTab("projects")} />
      case "analytics":
        return <Analytics />
      case "certificates":
        return <Certificates />
      case "users":
        return <Users />
      case "user-form":
        return <UserForm user={editingProject} onBack={() => setActiveTab("users")} />
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
