import { createContext, useState, useEffect, useContext } from "react";

// Create a context for theme management
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check system preference for dark mode on initial load and stored preference
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      setDarkMode(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // Light and dark theme configurations
  const theme = {
    // Light Theme
    light: {
      // Background styles
      bg: "bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50",
      patternOverlay: "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAgNS4yNUEyNC43NSAyNC43NSAwIDExNS4yNSAzMCAyNC43OCAyNC43OCAwIDAxMzAgNS4yNW0wLTUuMjVhMzAgMzAgMCAxMDAgNjAgMzAgMzAgMCAwMDAtNjB6IiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]",
      
      // Card styles
      cardBg: "bg-white/80",
      cardBorder: "border-white/50",
      cardShadow: "shadow-lg shadow-[#6610f2]/10",
      
      // Input styles
      inputBg: "bg-white/70",
      inputBorder: "border-gray-200",
      inputText: "text-gray-800",
      inputFocus: "focus:border-[#6610f2]",
      inputHover: "hover:border-[#6610f2]/60",
      
      // Text colors
      text: "text-gray-800",
      secondaryText: "text-gray-600",
      lightText: "text-gray-500",
      labelDefault: "text-gray-500",
      labelFocused: "text-indigo-600",
      
      // Button and highlight colors
      primaryColor: "from-indigo-600 to-purple-600",
      primaryColorHover: "from-indigo-700 to-purple-700",
      buttonText: "text-white",
      highlight: "ring-indigo-200/50",
      gradientHighlight: "from-indigo-500 to-purple-500",
      
      // Dividers and borders
      divider: "border-gray-200",
      
      // Social login buttons
      socialBg: "bg-white hover:bg-gray-50",
      socialBorder: "border-gray-200",
      
      // Toggle theme button
      toggleIcon: "text-yellow-500",
      toggleBg: "bg-indigo-100",
      
      // Note card specific
      noteBg: "bg-gradient-to-br from-white to-indigo-50/30",
      tag: "bg-indigo-50 text-indigo-600",
      pinned: "text-indigo-600",
      icon: "text-gray-500 hover:text-indigo-600",
      
      // Error styles
      errorBg: "bg-red-50",
      errorBorder: "border-red-100",
      errorText: "text-red-500",
      
      // Modal styles
      modalOverlay: "bg-black/50",
      modalContent: "bg-white border-gray-200"
    },
    
    // Dark Theme
    dark: {
      // Background styles
      bg: "bg-gradient-to-b from-[#0D0D11] via-[#141419] to-[#1A1A21]",
      patternOverlay: "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAgNS4yNUEyNC43NSAyNC43NSAwIDExNS4yNSAzMCAyNC43OCAyNC43OCAwIDAxMzAgNS4yNW0wLTUuMjVhMzAgMzAgMCAxMDAgNjAgMzAgMzAgMCAwMDAtNjB6IiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]",
      
      // Card styles
      cardBg: "bg-[#1A1A21]/90",
      cardBorder: "border-[#565449]/30",
      cardShadow: "shadow-lg shadow-[#6610f2]/20",
      
      // Input styles
      inputBg: "bg-[#24242C]",
      inputBorder: "border-[#565449]/30",
      inputText: "text-[#d8cfbc]",
      inputFocus: "focus:border-[#6610f2]",
      inputHover: "hover:border-[#6610f2]/60",
      
      // Text colors
      text: "text-[#fffbf4]",
      secondaryText: "text-[#d8cfbc]",
      lightText: "text-[#d8cfbc]/70",
      labelDefault: "text-[#d8cfbc]/70",
      labelFocused: "text-[#6610f2]",
      
      // Button and highlight colors
      primaryColor: "from-[#6610f2] to-[#9668f5]",
      primaryColorHover: "from-[#6610f2] to-[#7d42f8]",
      buttonText: "text-[#fffbf4]",
      highlight: "ring-[#6610f2]/20",
      gradientHighlight: "from-[#6610f2] to-[#9668f5]",
      
      // Dividers and borders
      divider: "border-[#565449]/30",
      
      // Social login buttons
      socialBg: "bg-[#24242C] hover:bg-[#28282F]",
      socialBorder: "border-[#565449]/30",
      
      // Toggle theme button
      toggleIcon: "text-[#fffbf4]",
      toggleBg: "bg-[#28282F]",
      
      // Note card specific
      noteBg: "bg-gradient-to-br from-[#24242C] to-[#1e1e24]",
      tag: "bg-[#1A1A21] text-[#6610f2]",
      pinned: "text-[#6610f2]",
      icon: "text-[#d8cfbc]/70 hover:text-[#6610f2]",
      
      // Error styles
      errorBg: "bg-[#2c1515]",
      errorBorder: "border-[#ff6b6b]/30", 
      errorText: "text-[#ff6b6b]",
      
      // Modal styles
      modalOverlay: "bg-[#000000]/75",
      modalContent: "bg-[#1A1A21] border-[#565449]/30"
    }
  };

  // Get current theme based on darkMode state
  const currentTheme = darkMode ? theme.dark : theme.light;

  // Global CSS styles for animated backgrounds and transitions
  const globalStyles = `
    /* Animated background gradient */
    @keyframes gradientFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradientFlow {
      background-size: 200% 200%;
      animation: gradientFlow 15s ease infinite;
    }
    
    /* Home page gradient animation */
    @keyframes homeGradientFlow {
      0% { background-position: 0% 0%; }
      50% { background-position: 100% 100%; }
      100% { background-position: 0% 0%; }
    }
    .animate-homeGradientFlow {
      background-size: 400% 400%;
      animation: homeGradientFlow 30s ease infinite;
    }
    
    /* Customize autofill */
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0px 1000px ${darkMode ? '#24242C' : 'white'} inset;
      -webkit-text-fill-color: ${darkMode ? '#d8cfbc' : '#333'};
      transition: background-color 5000s ease-in-out 0s;
    }
    
    /* Line clamp for note content */
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    /* Float animation for cards */
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
      100% { transform: translateY(0px); }
    }
    
    /* Pulse animation for pinned icon */
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    
    .animate-pulse-pin {
      animation: pulse 2s infinite;
    }
  `;

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
        theme: currentTheme,
        globalStyles
      }}
    >
      {/* Global styles */}
      <style jsx="true">{globalStyles}</style>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};