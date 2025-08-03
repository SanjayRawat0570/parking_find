// "use client"
// import { useState } from "react"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Search, MapPin, Car, Bike, Zap, Navigation, Clock, User, Calendar, Sun, Moon, Menu, X } from "lucide-react"

// interface ParkingSlot {
//   id: string
//   slotNumber: string
//   type: "2-wheeler" | "4-wheeler" | "EV"
//   distance: string
//   isAvailable: boolean
//   price: number
//   location: string
//   coordinates: { lat: number; lng: number }
// }

// const parkingSlots: ParkingSlot[] = [
//   {
//     id: "1",
//     slotNumber: "A-101",
//     type: "4-wheeler",
//     distance: "0.2 km",
//     isAvailable: true,
//     price: 50,
//     location: "Mall Parking",
//     coordinates: { lat: 28.6139, lng: 77.209 },
//   },
//   {
//     id: "2",
//     slotNumber: "B-205",
//     type: "2-wheeler",
//     distance: "0.3 km",
//     isAvailable: true,
//     price: 20,
//     location: "Street Side",
//     coordinates: { lat: 28.6129, lng: 77.208 },
//   },
//   {
//     id: "3",
//     slotNumber: "C-301",
//     type: "EV",
//     distance: "0.5 km",
//     isAvailable: false,
//     price: 80,
//     location: "EV Station",
//     coordinates: { lat: 28.6149, lng: 77.21 },
//   },
//   {
//     id: "4",
//     slotNumber: "A-102",
//     type: "4-wheeler",
//     distance: "0.2 km",
//     isAvailable: true,
//     price: 50,
//     location: "Mall Parking",
//     coordinates: { lat: 28.6135, lng: 77.2085 },
//   },
//   {
//     id: "5",
//     slotNumber: "D-401",
//     type: "2-wheeler",
//     distance: "0.7 km",
//     isAvailable: true,
//     price: 15,
//     location: "Office Complex",
//     coordinates: { lat: 28.6159, lng: 77.211 },
//   },
//   {
//     id: "6",
//     slotNumber: "E-501",
//     type: "EV",
//     distance: "0.8 km",
//     isAvailable: true,
//     price: 75,
//     location: "Shopping Center",
//     coordinates: { lat: 28.6119, lng: 77.207 },
//   },
// ]

// interface UserParkingAppProps {
//   user: { name: string; email: string; accountType: "user" | "admin" }
//   onLogout: () => void
//   isDarkMode: boolean
//   toggleTheme: () => void
// }

// export default function UserParkingApp({ user, onLogout, isDarkMode, toggleTheme }: UserParkingAppProps) {
//   const [searchLocation, setSearchLocation] = useState("")
//   const [selectedFilter, setSelectedFilter] = useState<string>("all")
//   const [filteredSlots, setFilteredSlots] = useState(parkingSlots)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null)

//   const handleFilterChange = (filter: string) => {
//     setSelectedFilter(filter)
//     if (filter === "all") {
//       setFilteredSlots(parkingSlots)
//     } else {
//       setFilteredSlots(parkingSlots.filter((slot) => slot.type === filter))
//     }
//   }

//   const getVehicleIcon = (type: string) => {
//     switch (type) {
//       case "4-wheeler":
//         return <Car className="h-5 w-5 text-blue-500" />
//       case "2-wheeler":
//         return <Bike className="h-5 w-5 text-green-500" />
//       case "EV":
//         return <Zap className="h-5 w-5 text-yellow-500" />
//       default:
//         return <Car className="h-5 w-5" />
//     }
//   }

//   const handleReserveSlot = (slotId: string) => {
//     // Simulate reservation logic
//     alert(`Slot ${slotId} reserved successfully!`)
//   }

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
//       {/* Navbar */}
//       <nav
//         className={`shadow-sm border-b sticky top-0 z-50 transition-colors ${
//           isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex items-center">
//               <h1 className={`text-2xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>SmartPark</h1>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-4">
//               <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
//                 <Search className="w-4 h-4 mr-2" />
//                 Find Parking
//               </Button>
//               <Button
//                 variant="ghost"
//                 className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-blue-600"}`}
//               >
//                 <Calendar className="w-4 h-4 mr-2" />
//                 My Bookings
//               </Button>

//               {/* Theme Toggle */}
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={toggleTheme}
//                 className={`${
//                   isDarkMode
//                     ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
//                     : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
//               </Button>

//               {/* User Menu */}
//               <div className="flex items-center space-x-2">
//                 <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
//                   Welcome, {user?.name}
//                 </span>
//                 <Button variant="outline" onClick={onLogout}>
//                   <User className="w-4 h-4 mr-2" />
//                   Logout
//                 </Button>
//               </div>
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden flex items-center space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={toggleTheme}
//                 className={`${
//                   isDarkMode
//                     ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
//                     : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
//               </Button>
//               <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//                 {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div
//             className={`md:hidden border-t px-4 py-3 ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}
//           >
//             <div className="flex flex-col space-y-2">
//               <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 justify-start">
//                 <Search className="w-4 h-4 mr-2" />
//                 Find Parking
//               </Button>
//               <Button variant="ghost" size="sm" className="justify-start">
//                 <Calendar className="w-4 h-4 mr-2" />
//                 My Bookings
//               </Button>
//               <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
//                 <p className={`text-sm mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
//                   Welcome, {user?.name}
//                 </p>
//                 <Button variant="outline" size="sm" onClick={onLogout} className="justify-start bg-transparent">
//                   <User className="w-4 h-4 mr-2" />
//                   Logout
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-6">
//           <h2 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
//             Find Parking Near You
//           </h2>
//           <p className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
//             Discover available parking slots in real-time
//           </p>
//         </div>

//         {/* Search Section */}
//         <Card className={`mb-6 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
//           <CardContent className="p-6">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                   <Input
//                     placeholder="Enter your location or address"
//                     value={searchLocation}
//                     onChange={(e) => setSearchLocation(e.target.value)}
//                     className={`pl-10 h-12 ${
//                       isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""
//                     }`}
//                   />
//                 </div>
//               </div>
//               <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8">
//                 <Search className="w-5 h-5 mr-2" />
//                 Search
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Filter Options */}
//         <div className="mb-6">
//           <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? "text-white" : ""}`}>Vehicle Type</h3>
//           <div className="flex flex-wrap gap-3">
//             <Button
//               variant={selectedFilter === "all" ? "default" : "outline"}
//               onClick={() => handleFilterChange("all")}
//               className="flex items-center"
//             >
//               All Types
//             </Button>
//             <Button
//               variant={selectedFilter === "2-wheeler" ? "default" : "outline"}
//               onClick={() => handleFilterChange("2-wheeler")}
//               className="flex items-center"
//             >
//               <Bike className="w-4 h-4 mr-2" />
//               2-Wheeler
//             </Button>
//             <Button
//               variant={selectedFilter === "4-wheeler" ? "default" : "outline"}
//               onClick={() => handleFilterChange("4-wheeler")}
//               className="flex items-center"
//             >
//               <Car className="w-4 h-4 mr-2" />
//               4-Wheeler
//             </Button>
//             <Button
//               variant={selectedFilter === "EV" ? "default" : "outline"}
//               onClick={() => handleFilterChange("EV")}
//               className="flex items-center"
//             >
//               <Zap className="w-4 h-4 mr-2" />
//               EV Charging
//             </Button>
//           </div>
//         </div>

//         {/* Interactive Map Section */}
//         <Card className={`mb-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
//           <CardHeader>
//             <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
//               <Navigation className="w-5 h-5 mr-2" />
//               Live Parking Map
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div
//               className={`rounded-lg h-64 sm:h-80 relative overflow-hidden ${
//                 isDarkMode ? "bg-gray-700" : "bg-gray-100"
//               }`}
//             >
//               {/* Simulated Map Interface */}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-center">
//                   <MapPin className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
//                   <p className={`text-lg font-medium mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-500"}`}>
//                     Interactive Map
//                   </p>
//                   <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
//                     Real-time parking availability visualization
//                   </p>
//                 </div>
//               </div>

//               {/* Simulated Map Markers */}
//               <div className="absolute top-4 left-4">
//                 <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
//                   Available: {filteredSlots.filter((slot) => slot.isAvailable).length}
//                 </div>
//               </div>
//               <div className="absolute top-4 right-4">
//                 <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
//                   Occupied: {filteredSlots.filter((slot) => !slot.isAvailable).length}
//                 </div>
//               </div>

//               {/* Simulated Parking Markers */}
//               {filteredSlots.slice(0, 4).map((slot, index) => (
//                 <div
//                   key={slot.id}
//                   className={`absolute w-6 h-6 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
//                     slot.isAvailable ? "bg-green-500" : "bg-red-500"
//                   }`}
//                   style={{
//                     left: `${20 + index * 20}%`,
//                     top: `${30 + (index % 2) * 40}%`,
//                   }}
//                   onClick={() => setSelectedSlot(slot)}
//                 >
//                   <div className="w-full h-full flex items-center justify-center">
//                     {slot.type === "4-wheeler" ? (
//                       <Car className="w-3 h-3 text-white" />
//                     ) : slot.type === "2-wheeler" ? (
//                       <Bike className="w-3 h-3 text-white" />
//                     ) : (
//                       <Zap className="w-3 h-3 text-white" />
//                     )}
//                   </div>
//                 </div>
//               ))}

//               {/* Map Controls */}
//               <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
//                 <Button size="sm" variant="outline" className="bg-white">
//                   +
//                 </Button>
//                 <Button size="sm" variant="outline" className="bg-white">
//                   -
//                 </Button>
//               </div>
//             </div>

//             {/* Selected Slot Info */}
//             {selectedSlot && (
//               <div
//                 className={`mt-4 p-4 rounded-lg border ${
//                   isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
//                 }`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h4 className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
//                       Slot {selectedSlot.slotNumber}
//                     </h4>
//                     <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
//                       {selectedSlot.location} • {selectedSlot.distance} away
//                     </p>
//                     <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
//                       ₹{selectedSlot.price}/hour
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Badge
//                       variant={selectedSlot.isAvailable ? "default" : "destructive"}
//                       className={selectedSlot.isAvailable ? "bg-green-500 hover:bg-green-600" : ""}
//                     >
//                       {selectedSlot.isAvailable ? "Available" : "Occupied"}
//                     </Badge>
//                     {selectedSlot.isAvailable && (
//                       <Button size="sm" onClick={() => handleReserveSlot(selectedSlot.id)}>
//                         Reserve
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Results Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h3 className={`text-xl font-semibold ${isDarkMode ? "text-white" : ""}`}>
//             Available Parking Slots ({filteredSlots.filter((slot) => slot.isAvailable).length})
//           </h3>
//           <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Sorted by distance</div>
//         </div>

//         {/* Parking Slots Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredSlots.map((slot) => (
//             <Card
//               key={slot.id}
//               className={`hover:shadow-lg transition-shadow ${
//                 isDarkMode ? "bg-gray-800 border-gray-700 hover:shadow-gray-900/20" : ""
//               }`}
//             >
//               <CardHeader className="pb-3">
//                 <div className="flex items-center justify-between">
//                   <CardTitle className={`text-lg font-semibold ${isDarkMode ? "text-white" : ""}`}>
//                     Slot {slot.slotNumber}
//                   </CardTitle>
//                   <Badge
//                     variant={slot.isAvailable ? "default" : "destructive"}
//                     className={slot.isAvailable ? "bg-green-500 hover:bg-green-600" : ""}
//                   >
//                     {slot.isAvailable ? "Available" : "Occupied"}
//                   </Badge>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {/* Vehicle Type */}
//                 <div className="flex items-center space-x-2">
//                   {getVehicleIcon(slot.type)}
//                   <span className={`text-sm font-medium capitalize ${isDarkMode ? "text-gray-200" : ""}`}>
//                     {slot.type === "EV" ? "EV Charging" : slot.type}
//                   </span>
//                 </div>

//                 {/* Location */}
//                 <div className="flex items-center space-x-2">
//                   <MapPin className="h-4 w-4 text-gray-400" />
//                   <span className={`text-sm ${isDarkMode ? "text-gray-200" : ""}`}>{slot.location}</span>
//                 </div>

//                 {/* Distance */}
//                 <div className="flex items-center space-x-2">
//                   <Navigation className="h-4 w-4 text-gray-400" />
//                   <span className={`text-sm ${isDarkMode ? "text-gray-200" : ""}`}>{slot.distance} away</span>
//                 </div>

//                 {/* Price */}
//                 <div className="flex items-center space-x-2">
//                   <Clock className="h-4 w-4 text-gray-400" />
//                   <span className={`text-sm ${isDarkMode ? "text-gray-200" : ""}`}>₹{slot.price}/hour</span>
//                 </div>

//                 {/* Reserve Button */}
//                 <Button
//                   className="w-full"
//                   disabled={!slot.isAvailable}
//                   variant={slot.isAvailable ? "default" : "secondary"}
//                   onClick={() => handleReserveSlot(slot.id)}
//                 >
//                   {slot.isAvailable ? "Reserve Now" : "Not Available"}
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* No Results */}
//         {filteredSlots.length === 0 && (
//           <div className="text-center py-12">
//             <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
//               No parking slots found
//             </h3>
//             <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
//               Try adjusting your filters or search in a different location
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
