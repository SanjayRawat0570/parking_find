"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Search,
  MapPin,
  Car,
  Bike,
  Zap,
  Navigation,
  Clock,
  Bell,
  X,
  DollarSign,
  Calendar,
  QrCode,
  RefreshCw,
  Sun,
  Moon,
  LogOut,
} from "lucide-react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { UserSidebar } from "@/components/user-sidebar"
import { redirect } from "next/navigation"

interface ParkingSlot {
  id: string
  slotNumber: string
  type: "2-wheeler" | "4-wheeler" | "EV"
  distance: string
  isAvailable: boolean
  isReserved: boolean // New state for reserved slots
  price: number
  location: string
  coordinates: { lat: number; lng: number }
}

interface Reservation {
  id: string
  slotId: string
  slotNumber: string
  location: string
  startTime: string
  endTime: string
  status: "upcoming" | "active" | "completed" | "cancelled"
}

interface Notification {
  id: string
  type: "booking" | "reminder" | "offer" | "alert"
  message: string
  timestamp: string
  read: boolean
}

const parkingSlots: ParkingSlot[] = [
  {
    id: "1",
    slotNumber: "A-101",
    type: "4-wheeler",
    distance: "0.2 km",
    isAvailable: true,
    isReserved: false,
    price: 50,
    location: "Mall Parking",
    coordinates: { lat: 28.6139, lng: 77.209 },
  },
  {
    id: "2",
    slotNumber: "B-205",
    type: "2-wheeler",
    distance: "0.3 km",
    isAvailable: true,
    isReserved: false,
    price: 20,
    location: "Street Side",
    coordinates: { lat: 28.6129, lng: 77.208 },
  },
  {
    id: "3",
    slotNumber: "C-301",
    type: "EV",
    distance: "0.5 km",
    isAvailable: false,
    isReserved: true, // Example of a reserved slot
    price: 80,
    location: "EV Station",
    coordinates: { lat: 28.6149, lng: 77.21 },
  },
  {
    id: "4",
    slotNumber: "A-102",
    type: "4-wheeler",
    distance: "0.2 km",
    isAvailable: true,
    isReserved: false,
    price: 50,
    location: "Mall Parking",
    coordinates: { lat: 28.6135, lng: 77.2085 },
  },
  {
    id: "5",
    slotNumber: "D-401",
    type: "2-wheeler",
    distance: "0.7 km",
    isAvailable: true,
    isReserved: false,
    price: 15,
    location: "Office Complex",
    coordinates: { lat: 28.6159, lng: 77.211 },
  },
  {
    id: "6",
    slotNumber: "E-501",
    type: "EV",
    distance: "0.8 km",
    isAvailable: true,
    isReserved: false,
    price: 75,
    location: "Shopping Center",
    coordinates: { lat: 28.6119, lng: 77.207 },
  },
]

const userReservations: Reservation[] = [
  {
    id: "res1",
    slotId: "1",
    slotNumber: "A-101",
    location: "Mall Parking",
    startTime: "2024-08-03 10:00 AM",
    endTime: "2024-08-03 12:00 PM",
    status: "upcoming",
  },
  {
    id: "res2",
    slotId: "5",
    slotNumber: "D-401",
    location: "Office Complex",
    startTime: "2024-07-28 09:00 AM",
    endTime: "2024-07-28 10:00 AM",
    status: "completed",
  },
  {
    id: "res3",
    slotId: "3",
    slotNumber: "C-301",
    location: "EV Station",
    startTime: "2024-08-05 03:00 PM",
    endTime: "2024-08-05 05:00 PM",
    status: "upcoming",
  },
]

const userNotifications: Notification[] = [
  {
    id: "notif1",
    type: "booking",
    message: "Your booking for slot A-101 on Aug 3rd is confirmed!",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "notif2",
    type: "reminder",
    message: "Reminder: Your booking for slot C-301 is tomorrow at 3 PM.",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: "notif3",
    type: "offer",
    message: "Special offer: Get 20% off your next booking!",
    timestamp: "3 days ago",
    read: true,
  },
]

interface UserData {
  name: string
  email: string
  accountType: "user" | "admin"
}

export default function UserDashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [searchLocation, setSearchLocation] = useState("")
  const [priceFilter, setPriceFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  // const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>([])
  const [filteredSlots, setFilteredSlots] = useState<ParkingSlot[]>(parkingSlots)
  const [notifications, setNotifications] = useState<Notification[]>(userNotifications)

  //  function fetchSlots(){
  //    fetch("http://localhost:5000/admin/slots")
  //      .then((res) => res.json())
  //      .then((data) => {
  //        setParkingSlots(data)
  //        setFilteredSlots(data)
  //      })
  //      .catch((err) => console.error("❌ Failed to fetch slots:", err))
  //  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("smartpark_theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    }

    const savedUser = localStorage.getItem("smartpark_user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        if (userData.accountType !== "user") {
          redirect(userData.accountType === "admin" ? "/admin/dashboard" : "/")
        }
        setUser(userData)
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error)
        localStorage.removeItem("smartpark_user")
        redirect("/")
      }
    } else {
      redirect("/")
    }
    setIsLoading(false)


  }, [])

  useEffect(() => {
    const currentFilteredSlots = parkingSlots.filter((slot) => {
      const matchesLocation = searchLocation ? slot.location.toLowerCase().includes(searchLocation.toLowerCase()) : true
      const matchesType = typeFilter === "all" || slot.type === typeFilter
      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "low" && slot.price <= 30) ||
        (priceFilter === "medium" && slot.price > 30 && slot.price <= 60) ||
        (priceFilter === "high" && slot.price > 60)
      return matchesLocation && matchesType && matchesPrice
    })
    setFilteredSlots(currentFilteredSlots)
  }, [searchLocation, priceFilter, typeFilter])

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

  const getSlotStatusBadge = (slot: ParkingSlot) => {
    if (!slot.isAvailable) {
      return (
        <Badge variant="destructive" className="bg-red-500">
          Occupied
        </Badge>
      )
    }
    if (slot.isReserved) {
      return (
        <Badge variant="default" className="bg-yellow-500">
          Reserved
        </Badge>
      )
    }
    return (
      <Badge variant="default" className="bg-green-500">
        Available
      </Badge>
    )
  }

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "4-wheeler":
        return <Car className="h-5 w-5 text-blue-500" />
      case "2-wheeler":
        return <Bike className="h-5 w-5 text-green-500" />
      case "EV":
        return <Zap className="h-5 w-5 text-yellow-500" />
      default:
        return <Car className="h-5 w-5" />
    }
  }

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading User Dashboard...</div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <UserSidebar user={user} onLogout={handleLogout} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <SidebarInset>
        {/* Top Navigation Bar */}
        <nav
          className={`shadow-sm border-b sticky top-0 z-50 transition-colors ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <SidebarTrigger className="-ml-1 md:hidden" /> {/* Mobile sidebar trigger */}
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>SmartPark</h1>
              </div>

              {/* Desktop User Menu & Theme Toggle */}
              <div className="hidden md:flex items-center space-x-4">
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
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <Badge className="ml-1 bg-red-500 text-white">{notifications.filter((n) => !n.read).length}</Badge>
                  )}
                </Button>
                <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Welcome, {user?.name}</div>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              User Dashboard
            </h2>
            <p className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Your personalized overview of parking and reservations
            </p>
          </div>

          {/* Search Bar with Filters */}
          <Card className={`mb-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
            <CardHeader>
              <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
                <Search className="w-5 h-5 mr-2" />
                Find Parking
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search by area or address"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className={`pl-10 h-12 ${
                        isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""
                      }`}
                    />
                  </div>
                </div>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className={`px-3 py-2 rounded-md border text-sm ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                  }`}
                >
                  <option value="all">All Prices</option>
                  <option value="low">₹0-30</option>
                  <option value="medium">₹31-60</option>
                  <option value="high">₹61+</option>
                </select>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className={`px-3 py-2 rounded-md border text-sm ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                  }`}
                >
                  <option value="all">All Types</option>
                  <option value="2-wheeler">2-Wheeler</option>
                  <option value="4-wheeler">4-Wheeler</option>
                  <option value="EV">EV Charging</option>
                </select>
                {/* Add more filters like "Covered" if needed */}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Slot Availability Grid */}
          <Card className={`mb-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
            <CardHeader>
              <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
                <MapPin className="w-5 h-5 mr-2" />
                Live Parking Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSlots.length > 0 ? (
                  filteredSlots.map((slot) => (
                    <Card
                      key={slot.id}
                      className={`hover:shadow-lg transition-shadow ${
                        isDarkMode ? "bg-gray-700 border-gray-600 hover:shadow-gray-900/20" : ""
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className={`text-lg font-semibold ${isDarkMode ? "text-white" : ""}`}>
                            Slot {slot.slotNumber}
                          </CardTitle>
                          {getSlotStatusBadge(slot)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                          {getVehicleIcon(slot.type)}
                          <span className={`text-sm font-medium capitalize ${isDarkMode ? "text-gray-200" : ""}`}>
                            {slot.type === "EV" ? "EV Charging" : slot.type}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className={`text-sm ${isDarkMode ? "text-gray-200" : ""}`}>{slot.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Navigation className="h-4 w-4 text-gray-400" />
                          <span className={`text-sm ${isDarkMode ? "text-gray-200" : ""}`}>{slot.distance} away</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className={`text-sm ${isDarkMode ? "text-gray-200" : ""}`}>₹{slot.price}/hour</span>
                        </div>
                        <Button
                          className="w-full"
                          disabled={!slot.isAvailable || slot.isReserved}
                          variant={slot.isAvailable && !slot.isReserved ? "default" : "secondary"}
                        >
                          {slot.isAvailable && !slot.isReserved ? "Reserve Now" : "Not Available"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      No parking slots found
                    </h3>
                    <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Try adjusting your filters or search in a different location
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* My Reservations Section */}
          <Card className={`mb-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
            <CardHeader>
              <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
                <Calendar className="w-5 h-5 mr-2" />
                My Reservations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userReservations.length > 0 ? (
                  userReservations.map((res) => (
                    <Card
                      key={res.id}
                      className={`hover:shadow-lg transition-shadow ${
                        isDarkMode ? "bg-gray-700 border-gray-600 hover:shadow-gray-900/20" : ""
                      }`}
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                            Slot {res.slotNumber} - {res.location}
                          </h4>
                          <Badge
                            variant={
                              res.status === "upcoming"
                                ? "default"
                                : res.status === "active"
                                  ? "default"
                                  : res.status === "completed"
                                    ? "secondary"
                                    : "destructive"
                            }
                            className={
                              res.status === "upcoming"
                                ? "bg-blue-500 hover:bg-blue-600"
                                : res.status === "active"
                                  ? "bg-green-500 hover:bg-green-600"
                                  : ""
                            }
                          >
                            {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                          </Badge>
                        </div>
                        <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          <Clock className="inline-block h-4 w-4 mr-1 align-text-bottom" />
                          {res.startTime} - {res.endTime}
                        </div>
                        <div className="flex space-x-2 pt-2">
                          {res.status === "upcoming" && (
                            <>
                              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                                <RefreshCw className="w-3 h-3 mr-1" />
                                Reschedule
                              </Button>
                              <Button variant="destructive" size="sm" className="flex-1">
                                <X className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                            </>
                          )}
                          <Button variant="default" size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <QrCode className="w-3 h-3 mr-1" />
                            View QR
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      No upcoming reservations
                    </h3>
                    <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Book a slot to see your reservations here!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notifications Panel */}
          <Card className={`mb-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
            <CardHeader>
              <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-md flex items-center justify-between ${
                      notif.read
                        ? isDarkMode
                          ? "bg-gray-700/50 text-gray-400"
                          : "bg-gray-100 text-gray-500"
                        : isDarkMode
                          ? "bg-blue-900/30 text-blue-300"
                          : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      <span>{notif.message}</span>
                    </div>
                    {!notif.read && (
                      <Button variant="ghost" size="sm" onClick={() => handleMarkNotificationRead(notif.id)}>
                        Mark as Read
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>No new notifications.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer
          className={`border-t p-4 text-center ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
        >
          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            By continuing, you agree to our{" "}
            <a href="#" className={`hover:underline ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className={`hover:underline ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
              Privacy Policy
            </a>
          </p>
          <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
            © 2024 SmartPark. All rights reserved.
          </p>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
