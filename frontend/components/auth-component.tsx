"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, User, Car, Moon, Sun } from "lucide-react"

interface AuthComponentProps {
  onLogin: (userData: { name: string; email: string; accountType: "user" | "admin" }) => void
  isDarkMode: boolean
  toggleTheme: () => void
}

export default function AuthComponent({ onLogin, isDarkMode, toggleTheme }: AuthComponentProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [registrationStep, setRegistrationStep] = useState<"chooseType" | "fillForm">("chooseType") // New state for registration flow
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "user" as "user" | "admin", // Default to user, will be set by buttons
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleChooseAccountType = (type: "user" | "admin") => {
    setFormData((prev) => ({ ...prev, accountType: type }))
    setRegistrationStep("fillForm")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    // Simulate authentication/registration
    const userData = {
      name: formData.name || formData.email.split("@")[0],
      email: formData.email,
      accountType: formData.accountType,
    }

    onLogin(userData)
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setRegistrationStep("chooseType") // Reset registration step when switching modes
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "user",
    })
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-100"
      } flex items-center justify-center p-4`}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              isDarkMode ? "bg-blue-500" : "bg-blue-600"
            }`}
          >
            <Car className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>SmartPark</h1>
          <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Find and reserve parking spots instantly</p>
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className={`${
              isDarkMode
                ? "bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            } transition-colors`}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Auth Card */}
        <Card
          className={`shadow-2xl border-0 backdrop-blur-sm ${
            isDarkMode ? "bg-gray-800/90 border-gray-700" : "bg-white/80"
          }`}
        >
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className={`text-2xl font-bold text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {isLogin ? "Login to SmartPark" : "Join SmartPark"}
            </CardTitle>
            <p className={`text-center text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {isLogin ? "Welcome back! Sign in to find parking spots" : "Create your account to get started"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Conditional rendering for registration steps */}
            {!isLogin && registrationStep === "chooseType" ? (
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold text-center ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  Who are you?
                </h3>
                <Button
                  onClick={() => handleChooseAccountType("user")}
                  className={`w-full h-12 font-medium transition-colors ${
                    isDarkMode ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  Register as User
                </Button>
                <Button
                  onClick={() => handleChooseAccountType("admin")}
                  variant="outline"
                  className={`w-full h-12 font-medium transition-colors ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-200"
                      : "border-gray-300 hover:bg-gray-50 bg-transparent"
                  }`}
                >
                  Register as Admin
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label
                        htmlFor="fullName"
                        className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
                      >
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="fullName"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required={!isLogin}
                          className={`pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                              : "bg-white text-gray-900"
                          }`}
                        />
                      </div>
                    </div>
                    {/* Display chosen account type, not a selectable input */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="accountTypeDisplay"
                        className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
                      >
                        Account Type
                      </Label>
                      <Input
                        id="accountTypeDisplay"
                        value={formData.accountType.charAt(0).toUpperCase() + formData.accountType.slice(1)}
                        readOnly
                        className={`h-12 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-200 text-gray-900"
                        }`}
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white text-gray-900"
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={isLogin ? "Enter your password" : "Create a password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className={`pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white text-gray-900"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required={!isLogin}
                        className={`pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white text-gray-900"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      className={`text-sm hover:underline transition-colors ${
                        isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                      }`}
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  className={`w-full h-12 font-medium transition-colors ${
                    isDarkMode ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isLogin
                    ? "Login"
                    : `Create ${formData.accountType.charAt(0).toUpperCase() + formData.accountType.slice(1)} Account`}
                </Button>
              </form>
            )}

            <div className="text-center">
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className={`font-medium hover:underline ${
                    isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2">
          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            By continuing, you agree to our{" "}
            <button className={`hover:underline ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
              Terms of Service
            </button>
            {" and "}
            <button className={`hover:underline ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
              Privacy Policy
            </button>
          </p>
          <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
            © 2024 SmartPark. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
