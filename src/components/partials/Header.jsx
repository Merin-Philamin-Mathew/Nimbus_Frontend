import { useEffect, useState } from "react"
import LocationSearch from "../utils/LocationSearch"
import { Cloud, Menu, X, User, Sun, Moon, MapPin } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/userSlice";


function Header({currentLocation, searchLocation}) {
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
    console.log('logged out triggered');
    dispatch(logoutUser())
    setIsDropdownOpen(false)
    console.log('logged out....')
  };
  
  return (
    <header className="bg-gradient-to-b from-teal-800 to-teal-700 text-white shadow-lg">
      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <Cloud className="h-8 w-8" />
            <span className="text-xl font-bold">Nimbus</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <LocationSearch searchLocation={searchLocation} />

            {/* Weather Units Toggle */}
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-400/20">
              <button className="text-sm font-medium hover:text-blue-200">°C</button>
              <span>|</span>
              <button className="text-sm font-medium hover:text-blue-200">°F</button>
            </div>

            {/* Theme Toggle
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-blue-400/20">
              {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button> */}

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
                  <div className="absolute right-0 mt-2 w-36 z-50 bg-white text-red-600 shadow-sm rounded-md ">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:animate-pulse"
                    >
                      Logout
                    </button>
                  </div>
                )}

              </div>
            ) : (
              <button
                className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-white text-sky-600 hover:bg-blue-50 transition-colors"
                onClick={() => navigate('/login')}
              >
                <User className="h-4 w-4" />
                <span className="font-medium">Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-blue-400/20" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600/95 backdrop-blur-sm">
          <div className="px-4 pt-2 pb-4 space-y-3">
            {/* Mobile Search */}
            <div className="pt-2 pb-3">
              <LocationSearch searchLocation={searchLocation} />
            </div>

            {/* Mobile Weather Units */}
            <div className="flex justify-center space-x-8 py-2 border-t border-blue-400/20">
              <button className="text-sm font-medium hover:text-blue-200">°C</button>
              <button className="text-sm font-medium hover:text-blue-200">°F</button>
            </div>

            {/* Mobile Theme Toggle */}
            <div className="flex justify-center py-2 border-t border-blue-400/20">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-blue-400/20"
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

            {/* Mobile Login */}
            <div className="py-2 border-t border-blue-400/20">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-colors"
                onClick={() => navigate('/login')} 
              >
                <User className="h-4 w-4" />
                <span className="font-medium">Login</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Current Location Bar */}
      <div className="bg-amber-700/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center space-x-2 h-10 text-sm">
            <MapPin className="h-4 w-4" />
            <span>Current Location:</span>
            <span className="font-medium">{currentLocation}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

