import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./Theme/theme";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

// Separate component for the content that needs the theme
const AppContent = () => {
  // Get theme context
  const { theme, darkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme.bg} ${theme.patternOverlay}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ToastContainer 
          position="top-center"
          theme={darkMode ? "dark" : "light"}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;