"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
  Car,
  Bike,
  Plus,
  LogOut,
  LayoutDashboard,
  Search,
  Users,
  MapPin,
  Clock,
  Settings,
  Bell,
  Eye,
  Edit,
  Trash2,
  Sun,
  Moon,
  X,
  Menu,
  Download,
  Calendar,
  DollarSign,
  AlertTriangle,
  BarChart,
  User,
} from "lucide-react"
import { redirect } from "next/navigation"

interface ParkingSlot {
  id: string
  slotNumber: string
  type: "2-wheeler" | "4-wheeler"
  isAvailable: boolean
  location: string
  floor: string
  price: number
  lastUpdated: string
  occupiedBy?: string
  occupiedSince?: string
}

interface Reservation {
  id: string
  slotId: string
  slotNumber: string
  userName: string
  startTime: string
  endTime: string
  status: "active" | "completed" | "cancelled"
}

interface AppUser {
  id: string
  name: string
  email: string
  accountType: "user" | "admin"
  status: "active" | "inactive"
}

const initialSlots: ParkingSlot[] = [
  {
    id: "1",
    slotNumber: "A-101",
    type: "4-wheeler",
    isAvailable: true,
    location: "Mall Parking",
    floor: "Ground Floor",
    price: 50,
    lastUpdated: "2 mins ago",
  },
  {
    id: "2",
    slotNumber: "A-102",
    type: "4-wheeler",
    isAvailable: false,
    location: "Mall Parking",
    floor: "Ground Floor",
    price: 50,
    lastUpdated: "15 mins ago",
    occupiedBy: "John Doe",
    occupiedSince: "2 hours ago",
  },
  {
    id: "3",
    slotNumber: "B-201",
    type: "2-wheeler",
    isAvailable: true,
    location: "Street Side",
    floor: "Level 1",
    price: 20,
    lastUpdated: "5 mins ago",
  },
  {
    id: "4",
    slotNumber: "B-202",
    type: "2-wheeler",
    isAvailable: false,
    location: "Street Side",
    floor: "Level 1",
    price: 20,
    lastUpdated: "30 mins ago",
    occupiedBy: "Jane Smith",
    occupiedSince: "1 hour ago",
  },
  {
    id: "5",
    slotNumber: "C-301",
    type: "4-wheeler",
    isAvailable: true,
    location: "Office Complex",
    floor: "Level 2",
    price: 45,
    lastUpdated: "1 min ago",
  },
  {
    id: "6",
    slotNumber: "C-302",
    type: "4-wheeler",
    isAvailable: false,
    location: "Office Complex",
    floor: "Level 2",
    price: 45,
    lastUpdated: "45 mins ago",
    occupiedBy: "Mike Johnson",
    occupiedSince: "3 hours ago",
  },
  {
    id: "7",
    slotNumber: "D-401",
    type: "2-wheeler",
    isAvailable: true,
    location: "Shopping Center",
    floor: "Basement",
    price: 15,
    lastUpdated: "8 mins ago",
  },
  {
    id: "8",
    slotNumber: "D-402",
    type: "2-wheeler",
    isAvailable: true,
    location: "Shopping Center",
    floor: "Basement",
    price: 15,
    lastUpdated: "3 mins ago",
  },
]

const initialReservations: Reservation[] = [
  {
    id: "res1",
    slotId: "2",
    slotNumber: "A-102",
    userName: "John Doe",
    startTime: "2024-07-20 10:00 AM",
    endTime: "2024-07-20 12:00 PM",
    status: "active",
  },
  {
    id: "res2",
    slotId: "4",
    slotNumber: "B-202",
    userName: "Jane Smith",
    startTime: "2024-07-20 09:30 AM",
    endTime: "2024-07-20 10:30 AM",
    status: "completed",
  },
  {
    id: "res3",
    slotId: "6",
    slotNumber: "C-302",
    userName: "Mike Johnson",
    startTime: "2024-07-19 05:00 PM",
    endTime: "2024-07-19 08:00 PM",
    status: "active",
  },
]

const initialUsers: AppUser[] = [
  { id: "u1", name: "Alice Wonderland", email: "alice@example.com", accountType: "user", status: "active" },
  { id: "u2", name: "Bob The Builder", email: "bob@example.com", accountType: "admin", status: "active" },
  { id: "u3", name: "Charlie Chaplin", email: "charlie@example.com", accountType: "user", status: "inactive" },
]

export default function AdminDashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string; accountType: "user" | "admin" } | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [slots, setSlots] = useState<ParkingSlot[]>(initialSlots)
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations)
  const [appUsers, setAppUsers] = useState<AppUser[]>(initialUsers)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "2-wheeler" | "4-wheeler">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "available" | "occupied">("all")
  const [reservationFilterStatus, setReservationFilterStatus] = useState<"all" | "active" | "completed" | "cancelled">(
    "all",
  )
  const [userSearchTerm, setUserSearchTerm] = useState("")
  const [userFilterStatus, setUserFilterStatus] = useState<"all" | "active" | "inactive">("all")

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem("smartpark_theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    }

    // Load user data from localStorage
    const savedUser = localStorage.getItem("smartpark_user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        if (userData.accountType !== "admin") {
          redirect("/") // Redirect non-admin users
        }
        setUser(userData)
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error)
        localStorage.removeItem("smartpark_user") // Clear invalid data
        redirect("/")
      }
    } else {
      redirect("/") // Redirect if no user is logged in
    }
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("smartpark_user")
    redirect("/")
  }

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode
      if (newMode) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("smartpark_theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("smartpark_theme", "light")
      }
      return newMode
    })
  }

  const toggleSlotAvailability = (slotId: string) => {
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === slotId
          ? {
              ...slot,
              isAvailable: !slot.isAvailable,
              lastUpdated: "Just now",
              ...(slot.isAvailable
                ? {
                    occupiedBy: "Admin User",
                    occupiedSince: "Just now",
                  }
                : {
                    occupiedBy: undefined,
                    occupiedSince: undefined,
                  }),
            }
          : slot,
      ),
    )
  }

  const handleCancelReservation = (reservationId: string) => {
    setReservations((prev) => prev.map((res) => (res.id === reservationId ? { ...res, status: "cancelled" } : res)))
    alert(`Reservation ${reservationId} cancelled.`)
  }

  const handleToggleUserStatus = (userId: string) => {
    setAppUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u)),
    )
  }

  // Filtered data for display
  const filteredSlots = slots.filter((slot) => {
    const matchesSearch =
      slot.slotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slot.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || slot.type === filterType
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "available" && slot.isAvailable) ||
      (filterStatus === "occupied" && !slot.isAvailable)

    return matchesSearch && matchesType && matchesStatus
  })

  const filteredReservations = reservations.filter((res) => {
    const matchesStatus = reservationFilterStatus === "all" || res.status === reservationFilterStatus
    return matchesStatus
  })

  const filteredUsers = appUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) || u.email.includes(userSearchTerm.toLowerCase())
    const matchesStatus = userFilterStatus === "all" || u.status === userFilterStatus
    return matchesSearch && matchesStatus
  })

  const availableSlotsCount = slots.filter((slot) => slot.isAvailable).length
  const occupiedSlotsCount = slots.length - availableSlotsCount
  const activeReservationsCount = reservations.filter((res) => res.status === "active").length
  const totalRevenue = reservations.filter((res) => res.status === "completed").reduce((sum, res) => sum + 50, 0) // Simulate revenue per completed reservation

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading Admin Dashboard...</div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Navbar */}
      <nav
        className={`shadow-sm border-b sticky top-0 z-50 transition-colors ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className={`text-2xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>SmartPark</h1>
              <span className={`ml-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Admin</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                className={`${isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Slot
              </Button>
              <Button
                variant="ghost"
                className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Users className="w-4 h-4 mr-2" />
                Users
              </Button>
              <Button
                variant="ghost"
                className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className={`${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                className={`${isDarkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-700"}`}
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className={`${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden border-t px-4 py-3 ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}
          >
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" size="sm" className="justify-start">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Add Slot
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <Users className="w-4 h-4 mr-2" />
                Users
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" className="justify-start text-red-600" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Parking Management Dashboard
          </h2>
          <p className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Monitor and manage all parking slots, reservations, and users in real-time
          </p>
        </div>

        {/* Overview Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : ""}`}>Total Slots</CardTitle>
              <Car className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-muted-foreground"}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : ""}`}>{slots.length}</div>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-muted-foreground"}`}>
                Active parking spaces
              </p>
            </CardContent>
          </Card>

          <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : ""}`}>Available</CardTitle>
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{availableSlotsCount}</div>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-muted-foreground"}`}>Ready for booking</p>
            </CardContent>
          </Card>

          <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : ""}`}>Occupied</CardTitle>
              <div className="h-4 w-4 rounded-full bg-red-500"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{occupiedSlotsCount}</div>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-muted-foreground"}`}>Currently in use</p>
            </CardContent>
          </Card>

          <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : ""}`}>Revenue</CardTitle>
              <DollarSign className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-muted-foreground"}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : ""}`}>₹{totalRevenue}</div>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-muted-foreground"}`}>
                Total earnings from completed reservations
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Slot Monitoring & Management */}
        <Card className={`mb-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
          <CardHeader>
            <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
              <MapPin className="w-5 h-5 mr-2" />
              Slot Monitoring & Management
            </CardTitle>
            <div className="flex flex-col lg:flex-row gap-4 mt-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search by slot number or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 ${
                      isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""
                    }`}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className={`px-3 py-2 rounded-md border text-sm ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                  }`}
                >
                  <option value="all">All Types</option>
                  <option value="2-wheeler">2-Wheeler</option>
                  <option value="4-wheeler">4-Wheeler</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className={`px-3 py-2 rounded-md border text-sm ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                </select>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Slot
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSlots.map((slot) => (
                <Card
                  key={slot.id}
                  className={`hover:shadow-lg transition-shadow ${
                    isDarkMode ? "bg-gray-700 border-gray-600 hover:shadow-gray-900/20" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className={`text-lg font-semibold ${isDarkMode ? "text-white" : ""}`}>
                        {slot.slotNumber}
                      </CardTitle>
                      <Badge
                        variant={slot.isAvailable ? "default" : "destructive"}
                        className={slot.isAvailable ? "bg-green-500 hover:bg-green-600" : ""}
                      >
                        {slot.isAvailable ? "Available" : "Occupied"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      {slot.type === "4-wheeler" ? (
                        <Car className="h-5 w-5 text-blue-500" />
                      ) : (
                        <Bike className="h-5 w-5 text-green-500" />
                      )}
                      <span className={`text-sm font-medium capitalize ${isDarkMode ? "text-gray-200" : ""}`}>
                        {slot.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <div className="flex flex-col">
                        <span className={`text-sm ${isDarkMode ? "text-gray-200" : ""}`}>{slot.location}</span>
                        <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {slot.floor}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${isDarkMode ? "text-gray-200" : ""}`}>₹{slot.price}/hour</span>
                    </div>
                    {!slot.isAvailable && slot.occupiedBy && (
                      <div className={`text-xs p-2 rounded ${isDarkMode ? "bg-gray-600" : "bg-gray-50"}`}>
                        <div className={`font-medium ${isDarkMode ? "text-gray-200" : ""}`}>
                          Occupied by: {slot.occupiedBy}
                        </div>
                        <div className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          Since: {slot.occupiedSince}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Updated {slot.lastUpdated}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {slot.isAvailable ? "Set Occupied" : "Set Available"}
                      </span>
                      <Switch checked={slot.isAvailable} onCheckedChange={() => toggleSlotAvailability(slot.id)} />
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredSlots.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  No parking slots found
                </h3>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reservation Management */}
        <Card className={`mb-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
          <CardHeader>
            <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
              <Calendar className="w-5 h-5 mr-2" />
              Reservation Management
            </CardTitle>
            <div className="flex flex-wrap gap-3 mt-4">
              <select
                value={reservationFilterStatus}
                onChange={(e) => setReservationFilterStatus(e.target.value as any)}
                className={`px-3 py-2 rounded-md border text-sm ${
                  isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                }`}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Reservations
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}>
                  <tr>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Reservation ID
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Slot
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredReservations.length > 0 ? (
                    filteredReservations.map((res) => (
                      <tr key={res.id} className={isDarkMode ? "bg-gray-800" : "bg-white"}>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {res.id}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {res.slotNumber}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {res.userName}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {res.startTime} - {res.endTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Badge
                            variant={
                              res.status === "active"
                                ? "default"
                                : res.status === "completed"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              res.status === "active"
                                ? "bg-blue-500 hover:bg-blue-600"
                                : res.status === "completed"
                                  ? "bg-green-500 hover:bg-green-600"
                                  : ""
                            }
                          >
                            {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="outline" size="sm" className="mr-2 bg-transparent">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {res.status === "active" && (
                            <Button variant="destructive" size="sm" onClick={() => handleCancelReservation(res.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className={`px-6 py-4 text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        No reservations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card className={`mb-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
          <CardHeader>
            <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
              <Users className="w-5 h-5 mr-2" />
              User Management
            </CardTitle>
            <div className="flex flex-col lg:flex-row gap-4 mt-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search by name or email..."
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    className={`pl-10 ${
                      isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""
                    }`}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <select
                  value={userFilterStatus}
                  onChange={(e) => setUserFilterStatus(e.target.value as any)}
                  className={`px-3 py-2 rounded-md border text-sm ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Users
                </Button>
                <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New User
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}>
                  <tr>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => (
                      <tr key={u.id} className={isDarkMode ? "bg-gray-800" : "bg-white"}>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {u.name}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {u.email}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {u.accountType.charAt(0).toUpperCase() + u.accountType.slice(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Badge
                            variant={u.status === "active" ? "default" : "destructive"}
                            className={u.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}
                          >
                            {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="outline" size="sm" className="mr-2 bg-transparent">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="mr-2 bg-transparent">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleToggleUserStatus(u.id)}>
                            {u.status === "active" ? <Trash2 className="w-4 h-4" /> : <User className="w-4 h-4" />}
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className={`px-6 py-4 text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Policy Settings */}
        <Card className={`mb-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
          <CardHeader>
            <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
              <DollarSign className="w-5 h-5 mr-2" />
              Pricing & Policy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="defaultPrice" className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
                Default Hourly Price (₹)
              </Label>
              <Input
                id="defaultPrice"
                type="number"
                defaultValue="50"
                className={`mt-1 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200"}`}
              />
            </div>
            <div>
              <Label htmlFor="cancellationPolicy" className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
                Cancellation Policy
              </Label>
              <Input
                id="cancellationPolicy"
                defaultValue="Full refund if cancelled 1 hour before reservation."
                className={`mt-1 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200"}`}
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Save Settings</Button>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className={`mb-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
          <CardHeader>
            <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
              <AlertTriangle className="w-5 h-5 mr-2" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div
              className={`p-3 rounded-md flex items-center ${
                isDarkMode ? "bg-red-900/30 text-red-300" : "bg-red-50 text-red-700"
              }`}
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              <span>Critical: Server overload detected.</span>
            </div>
            <div
              className={`p-3 rounded-md flex items-center ${
                isDarkMode ? "bg-yellow-900/30 text-yellow-300" : "bg-yellow-50 text-yellow-700"
              }`}
            >
              <Bell className="w-5 h-5 mr-2" />
              <span>Warning: Low disk space on database server.</span>
            </div>
            <div
              className={`p-3 rounded-md flex items-center ${
                isDarkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-700"
              }`}
            >
              <Bell className="w-5 h-5 mr-2" />
              <span>Info: New software update available.</span>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Reports */}
        <Card className={`mb-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
          <CardHeader>
            <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
              <BarChart className="w-5 h-5 mr-2" />
              Analytics Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={`h-48 flex items-center justify-center rounded-md ${
                isDarkMode ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500"
              }`}
            >
              Placeholder for Revenue Chart
            </div>
            <div
              className={`h-48 flex items-center justify-center rounded-md ${
                isDarkMode ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500"
              }`}
            >
              Placeholder for Slot Usage Chart
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              View Full Reports
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className={`mb-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
          <CardHeader>
            <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
              <Settings className="w-5 h-5 mr-2" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="systemName" className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
                System Name
              </Label>
              <Input
                id="systemName"
                defaultValue="SmartPark Admin"
                className={`mt-1 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200"}`}
              />
            </div>
            <div>
              <Label htmlFor="adminEmail" className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
                Admin Contact Email
              </Label>
              <Input
                id="adminEmail"
                type="email"
                defaultValue="admin@smartpark.com"
                className={`mt-1 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200"}`}
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Save System Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
