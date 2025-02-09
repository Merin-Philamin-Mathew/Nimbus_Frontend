import { useEffect, useState } from "react"
import LocationSearch from "../utils/LocationSearch"
import { Cloud, Menu, X, User, Sun, Moon, MapPin, Users } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/userSlice";
import { resetDetails } from "../../redux/weatherSlice";
import WeatherSubheader from "./SubHeader";

function Header({ searchLocation }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const { user } = useSelector((state) => state);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleTheme = () => setIsDarkMode(!isDarkMode)
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const navigate = useNavigate()
  const dispatch = useDispatch()
   
  const getInitial = () => {
    if (user?.user_details?.user?.email) {
      return user.user_details.user.email[0].toUpperCase();
    }
    return null;
  };

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(resetDetails())
    setIsDropdownOpen(false)
  };

  const handleUserManagement = () => {
    navigate('/user-management')
    setIsDropdownOpen(false)
  };
  
  return (
    <header className="bg-gradient-to-b from-teal-800 to-teal-700 text-white shadow-lg">
      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <Cloud className="h-8 w-8" />
            <span className="text-xl font-bold">Nimbus</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <LocationSearch searchLocation={searchLocation} />

            {/* Weather Units Toggle */}
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-400/20">
              <button className="text-sm font-medium hover:text-teal-200">°C</button>
              <span>|</span>
              <button className="text-sm font-medium hover:text-teal-200">°F</button>
            </div>

            {/* User Profile or Login */}
            {user ? (
              <div className="relative">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-sky-600 font-bold text-lg cursor-pointer"
                  onClick={toggleDropdown}
                >
                  {getInitial()}
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 z-50 bg-white rounded-md shadow-lg py-1">
                    {user?.user_details?.user?.is_staff && (
                      <button
                        onClick={handleUserManagement}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Users className="h-4 w-4" />
                        <span>User Management</span>
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-white text-sky-600 hover:bg-teal-50 transition-colors"
                onClick={() => navigate('/login')}
              >
                <User className="h-4 w-4" />
                <span className="font-medium">Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-teal-400/20" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-teal-600/95 backdrop-blur-sm">
          <div className="px-4 pt-2 pb-4 space-y-3">
            {/* Mobile Search */}
            <div className="pt-2 pb-3">
              <LocationSearch searchLocation={searchLocation} />
            </div>

            {/* Mobile Weather Units */}
            <div className="flex justify-center space-x-8 py-2 border-t border-teal-400/20">
              <button className="text-sm font-medium hover:text-teal-200">°C</button>
              <button className="text-sm font-medium hover:text-teal-200">°F</button>
            </div>

            {/* Mobile Theme Toggle */}
            <div className="flex justify-center py-2 border-t border-teal-400/20">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-teal-400/20"
              >
                {isDarkMode ? (
                  <>
                    <Moon className="h-5 w-5" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="h-5 w-5" />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile Login/User Options */}
            <div className="py-2 border-t border-teal-400/20">
              {user ? (
                <div className="space-y-2">
                  {user?.user_details?.user?.is_staff && (
                    <button 
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-white hover:bg-teal-400/20 transition-colors"
                      onClick={handleUserManagement}
                    >
                      <Users className="h-4 w-4" />
                      <span>User Management</span>
                    </button>
                  )}
                  <button
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-white text-red-600 hover:bg-red-50 transition-colors"
                    onClick={handleLogout}
                  >
                    <User className="h-4 w-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <button 
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-white text-teal-600 hover:bg-teal-50 transition-colors"
                  onClick={() => navigate('/login')}
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header