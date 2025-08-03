"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import AuthComponent from "@/components/auth-component"

interface ParkingSlot {
  id: string
  type: "2-wheeler" | "4-wheeler" | "EV"
  floor: string
  status: "available" | "occupied"
  location: string
}

interface UserData {
  name: string
  email: string
  accountType: "user" | "admin"
}

export default function HomePage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch parking slots from Flask API
  // const fetchSlots = async () => {
  //   try {
  //     const res = await fetch("http://localhost:5000/admin/slots") // Replace if deployed
  //     const data = await res.json()
  //     setParkingSlots(data)
  //   } catch (err) {
  //     console.error("❌ Failed to fetch slots:", err)
  //   }
  // }

  // Handle initial setup
  useEffect(() => {
    const savedTheme = localStorage.getItem("smartpark_theme")
    setIsDarkMode(savedTheme === "dark")
    document.documentElement.classList.toggle("dark", savedTheme === "dark")

    const savedUser = localStorage.getItem("smartpark_user")
    if (savedUser) {
      try {
        const userData: UserData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        console.error("❌ Invalid user data in localStorage", error)
        localStorage.removeItem("smartpark_user")
      }
    }

    // fetchSlots()
    setIsLoading(false)
  }, [])

  const handleLogin = (userData: UserData) => {
    setUser(userData)
    localStorage.setItem("smartpark_user", JSON.stringify(userData))
    if (userData.accountType === "admin") {
      redirect("/admin/dashboard")
    } else {
      redirect("/user/dashboard")
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const nextTheme = !prev
      localStorage.setItem("smartpark_theme", nextTheme ? "dark" : "light")
      document.documentElement.classList.toggle("dark", nextTheme)
      return nextTheme
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg text-gray-600">Loading SmartPark...</span>
      </div>
    )
  }

  if (!user) {
    return <AuthComponent onLogin={handleLogin} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
  }

  if (user.accountType === "admin") {
    redirect("/admin/dashboard")
  } else if (user.accountType === "user") {
    redirect("/user/dashboard")
  }

  // Optional fallback if redirect doesn't work
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium text-gray-700">Something went wrong. Please try refreshing.</p>
    </div>
  )
}

