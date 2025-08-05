

import { cn } from "@/lib/utils"
import { LayoutDashboard, Leaf, BarChart3, Settings, FileText, Users, Globe } from "lucide-react"



const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: Leaf },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "certificates", label: "Certificates", icon: FileText },
  { id: "users", label: "Users", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
]

export function Sidebar({ activeTab, onTabChange }) {
  return (
    <div className="w-64 bg-white shadow-lg border-r">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
         <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
  <img src="/logo.jpg" alt="Logo" className="w-6 h-6 object-contain" />
</div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">SABZA</h1>
            <p className="text-sm text-gray-500">Carbon Admin</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                    activeTab === item.id
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
