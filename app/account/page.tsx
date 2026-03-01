"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BottomNav } from "@/components/bottom-nav"
import { ArrowLeft, User, Mail, Phone, MapPin, Lock, LogOut, Edit, Save, X } from "lucide-react"
import Link from "next/link"

export default function Account() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Oak Street, Springfield, IL 62701",
  })
  const [editedInfo, setEditedInfo] = useState(userInfo)

  const handleSave = () => {
    setUserInfo(editedInfo)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedInfo(userInfo)
    setIsEditing(false)
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleLogout = async () => {
    try {
      const api = (await import("@/lib/api")).default
      await api.post("/client/auth/logout", {})
    } catch (e) {
      console.error("Logout failed", e)
    } finally {
      localStorage.removeItem("hydrosync-client-user")
      window.location.href = "/"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold">Account Settings</h1>
            <p className="text-sm text-gray-600">Manage your profile and preferences</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Picture */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{userInfo.name}</h3>
                <p className="text-sm text-gray-600">HydroSync Customer</p>
                <p className="text-xs text-gray-500">Member since March 2023</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={editedInfo.name}
                  onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>{userInfo.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={editedInfo.email}
                  onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{userInfo.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={editedInfo.phone}
                  onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{userInfo.phone}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Service Address</Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={editedInfo.address}
                  onChange={(e) => setEditedInfo({ ...editedInfo, address: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{userInfo.address}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Lock className="h-4 w-4 mr-2" />
              Change Password
            </Button>
            <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md">
              <p className="font-medium mb-1">Two-Factor Authentication</p>
              <p>Add an extra layer of security to your account</p>
              <Button variant="link" className="p-0 h-auto text-blue-600">
                Enable 2FA
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Choose how you want to be notified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive bills and alerts via email</p>
              </div>
              <Button variant="outline" size="sm">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-600">Get urgent alerts via text message</p>
              </div>
              <Button variant="outline" size="sm">
                Disabled
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Download Account Data
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card>
          <CardContent className="pt-6">
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
