"use client"

import { useState, useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Globe, AlertCircle, LogIn, UserPlus, RefreshCw } from "lucide-react"
import axios from "axios"
import { Dashboard } from "@/components/dashboard"

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      if (res.status === 200 && (res.data.role !== "Viewer" && res.data.role !== "")) {
        localStorage.setItem("userEmail", email);
        onLoginSuccess?.(); // Notify parent App
      } 
      else if (res.status === 200 && (res.data.role === "Viewer" || res.data.role === "")) {
        setError("Not Authorized");
      } else {
        setError("Invalid email or password");
      }
    } 
    catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  const handleClearAndRefresh = () => {
    console.log("LoginPage: Clearing all storage and refreshing page.")
    localStorage.clear()
    setEmail("")
    setPassword("")
    sessionStorage.clear()
    window.location.reload()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md border-none shadow-lg">
        {" "}
        {/* Removed border */}
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SABZA</h1>
              <p className="text-sm text-gray-500">Carbon Admin Panel</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@sabza.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                disabled={loading}
                className="w-full border-gray-300" // Kept a subtle border for input
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                disabled={loading}
                className="w-full border-gray-300" // Kept a subtle border for input
              />
            </div>
            

            {error && (
              <div className="flex items-center gap-2 p-3 text-red-700 bg-red-50 border-red-200 rounded-md">
                {" "}
                {/* Removed border */}
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleLogin} disabled={loading}>
                <LogIn className="w-4 h-4 mr-2" />
                {loading ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Redirecting...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <button onClick={handleClearAndRefresh} className="underline hover:text-gray-700 mt-1">
                Clear all data and retry
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
