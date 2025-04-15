import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  signInSuccess,
  signoutFailure,
  signoutStart,
} from "../redux/user/userSlice";
import axios from "axios";
import { FaSearch, FaTimes, FaUserCircle, FaSignOutAlt, FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check system preference for dark mode on initial load
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const onLogout = async () => {
    try {
      dispatch(signoutStart());

      const res = await axios.get("http://note-219z.onrender.com/api/auth/signout", {
        withCredentials: true,
      });

      if (res.data.success === false) {
        dispatch(signoutFailure(res.data.message));
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      dispatch(signInSuccess());
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      dispatch(signoutFailure(error.message));
    }
  };

  // Theme-based styles and colors
  const theme = {
    // Light Theme
    light: {
      bg: "bg-white",
      navBg: "bg-white/80",
      searchBg: "bg-gray-100/70",
      searchBorder: "border-gray-200",
      searchText: "text-gray-800",
      searchPlaceholder: "text-gray-500",
      searchFocusBorder: "border-indigo-600",
      searchFocusRing: "ring-indigo-200/50",
      primaryColor: "from-indigo-600 to-purple-600",
      primaryColorHover: "from-indigo-700 to-purple-700",
      primaryText: "text-white",
      secondaryText: "text-gray-600",
      lightText: "text-gray-500",
      iconColor: "text-indigo-600",
      iconHover: "text-indigo-700",
      brandText: "text-gray-800",
      brandTextHover: "text-indigo-600",
      dropdownBg: "bg-white",
      dropdownShadow: "shadow-lg",
      dropdownBorder: "border-gray-200",
      dropdownHover: "hover:bg-gray-50",
      toggleIcon: "text-yellow-500",
      toggleBg: "bg-indigo-100"
    },
    // Dark Theme
    dark: {
      bg: "bg-[#0D0D11]",
      navBg: "bg-[#1A1A21]/90",
      searchBg: "bg-[#24242C]",
      searchBorder: "border-[#565449]/30",
      searchText: "text-[#d8cfbc]",
      searchPlaceholder: "text-[#d8cfbc]/70",
      searchFocusBorder: "border-[#6610f2]",
      searchFocusRing: "ring-[#6610f2]/20",
      primaryColor: "from-[#6610f2] to-[#9668f5]",
      primaryColorHover: "from-[#6610f2] to-[#7d42f8]",
      primaryText: "text-[#fffbf4]",
      secondaryText: "text-[#d8cfbc]",
      lightText: "text-[#d8cfbc]/70",
      iconColor: "text-[#6610f2]",
      iconHover: "text-[#9668f5]",
      brandText: "text-[#fffbf4]",
      brandTextHover: "text-[#6610f2]",
      dropdownBg: "bg-[#24242C]",
      dropdownShadow: "shadow-xl shadow-[#000]/20",
      dropdownBorder: "border-[#565449]/30",
      dropdownHover: "hover:bg-[#28282F]",
      toggleIcon: "text-[#fffbf4]",
      toggleBg: "bg-[#28282F]"
    }
  };

  // Select the current theme based on state
  const currentTheme = darkMode ? theme.dark : theme.light;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${currentTheme.navBg} backdrop-blur-md shadow-md border-b ${darkMode ? 'border-[#565449]/30' : 'border-gray-200'} transition-all duration-300`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link 
          to={"/"} 
          className="flex items-center space-x-2 group"
        >
          <div className={`w-10 h-10 flex items-center justify-center bg-gradient-to-br ${currentTheme.primaryColor} rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-white"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <span className={`text-xl font-semibold ${currentTheme.brandText} group-hover:${currentTheme.brandTextHover} transition-colors`}>
            Notes
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-grow mx-8 max-w-2xl relative group">
          <div className={`relative ${searchFocused ? 'ring-2 ' + currentTheme.searchFocusRing : ''} transition-all duration-300 rounded-xl overflow-hidden`}>
            <input
              type="text"
              placeholder="Search notes..."
              className={`w-full py-2.5 px-4 ${currentTheme.searchBg} border-2 ${searchFocused ? currentTheme.searchFocusBorder : currentTheme.searchBorder} 
                rounded-xl pr-12 focus:outline-none transition-all duration-200 ${currentTheme.searchText} placeholder-${currentTheme.searchPlaceholder}`}
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className="absolute right-0 top-0 h-full flex items-center pr-2">
              {searchQuery ? (
                <button
                  onClick={onClearSearch}
                  className={`p-1.5 mr-1 rounded-full hover:bg-gray-200/70 dark:hover:bg-[#565449]/30 transition-colors ${currentTheme.iconColor}`}
                >
                  <FaTimes size={16} />
                </button>
              ) : null}
              <button
                onClick={handleSearch}
                className={`p-1.5 rounded-full hover:bg-gray-200/70 dark:hover:bg-[#565449]/30 transition-colors ${currentTheme.iconColor}`}
              >
                <FaSearch size={16} />
              </button>
            </div>
          </div>
          <div className={`absolute left-0 top-full h-0.5 bg-gradient-to-r ${currentTheme.primaryColor} transition-all duration-300 w-0 group-hover:w-full origin-left`}></div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${currentTheme.toggleBg} transition-all duration-300 hover:scale-110`}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? (
              <FaSun className={`${currentTheme.toggleIcon}`} size={18} />
            ) : (
              <FaMoon className={`${currentTheme.toggleIcon}`} size={18} />
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center space-x-2 group py-2 px-3 rounded-xl hover:bg-gray-100/70 dark:hover:bg-[#28282F] transition-colors`}
            >
              {userInfo && userInfo.profilePicture ? (
                <img
                  src={userInfo.profilePicture}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-indigo-100 dark:border-[#565449]/30 shadow-sm object-cover"
                />
              ) : (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br ${currentTheme.primaryColor}`}>
                  <FaUserCircle size={20} className="text-white" />
                </div>
              )}
              <div className="hidden md:block text-left">
                <p className={`text-sm font-medium ${currentTheme.secondaryText} max-w-[120px] truncate`}>
                  {userInfo ? userInfo.username : "Guest"}
                </p>
                <p className={`text-xs ${currentTheme.lightText}`}>
                  {userInfo ? userInfo.email : "Sign in"}
                </p>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''} ${currentTheme.lightText}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                className={`absolute right-0 mt-2 w-48 rounded-xl ${currentTheme.dropdownBg} ${currentTheme.dropdownShadow} border ${currentTheme.dropdownBorder} overflow-hidden z-50 transform origin-top-right transition-all duration-200`}
              >
                <div className="py-1">
                  <Link
                    to="/profile"
                    className={`flex items-center px-4 py-2 ${currentTheme.secondaryText} ${currentTheme.dropdownHover} transition-colors`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className={`flex items-center px-4 py-2 ${currentTheme.secondaryText} ${currentTheme.dropdownHover} transition-colors`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </Link>
                  <div className="border-t border-gray-200 dark:border-[#565449]/30 my-1"></div>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onLogout();
                    }}
                    className={`flex items-center w-full text-left px-4 py-2 ${currentTheme.secondaryText} hover:text-red-500 ${currentTheme.dropdownHover} transition-colors`}
                  >
                    <FaSignOutAlt className="h-5 w-5 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Gradient Line */}
      <div className={`h-0.5 w-full bg-gradient-to-r ${currentTheme.primaryColor}`}></div>
    </nav>
  );
};

export default Navbar;