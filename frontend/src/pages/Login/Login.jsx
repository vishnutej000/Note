import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaSun, FaMoon } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { useTheme } from "../../Theme/theme"; // Import the theme hook

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldStates, setFieldStates] = useState({
    email: { focused: false, hasValue: false },
    password: { focused: false, hasValue: false }
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Use the theme context instead of local state
  const { darkMode, toggleTheme, theme: currentTheme } = useTheme();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update field state for floating labels
    setFieldStates(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        hasValue: value.length > 0
      }
    }));
  };

  const handleFocus = (field) => {
    setFieldStates(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        focused: true
      }
    }));
  };

  const handleBlur = (field) => {
    setFieldStates(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        focused: false
      }
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!formData.password) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    try {
      dispatch(signInStart());
      
      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        { ...formData, rememberMe },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        throw new Error(res.data.message);
      }

      toast.success("Login successful!");
      dispatch(signInSuccess(res.data));
      navigate("/home");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      toast.error(errorMsg);
      dispatch(signInFailure(errorMsg));
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${currentTheme.bg} animate-gradientFlow`}>
      <div className="w-full max-w-md">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-64 overflow-hidden -z-10">
          <div className={`absolute -top-10 -left-10 w-40 h-40 rounded-full ${darkMode ? 'bg-[#6610f2]/10' : 'bg-indigo-300/20'} blur-xl`}></div>
          <div className={`absolute top-20 left-1/2 w-60 h-60 rounded-full ${darkMode ? 'bg-[#6610f2]/5' : 'bg-purple-300/20'} blur-xl`}></div>
          <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${darkMode ? 'bg-[#565449]/10' : 'bg-pink-300/20'} blur-xl`}></div>
        </div>
        
        <div className={`relative ${currentTheme.cardBg} backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border ${currentTheme.cardBorder} transition-all duration-300 hover:shadow-lg`}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`absolute top-4 right-4 p-2 rounded-full ${currentTheme.toggleBg} z-20 transition-all duration-300 hover:scale-110`}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? (
              <FaSun className={`${currentTheme.toggleIcon}`} size={18} />
            ) : (
              <FaMoon className={`${currentTheme.toggleIcon}`} size={18} />
            )}
          </button>
          
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${currentTheme.gradientHighlight}/10 rounded-bl-full -z-0`}></div>
          <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${currentTheme.gradientHighlight}/10 rounded-tr-full -z-0`}></div>
          
          <div className="relative z-10 px-6 py-8 sm:px-10">
            <div className="flex flex-col items-center mb-6">
              <div className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br ${currentTheme.primaryColor} rounded-2xl shadow-lg mb-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className={`text-3xl font-bold ${currentTheme.text} tracking-tight`}>
                Welcome Back
              </h2>
              <p className={currentTheme.secondaryText}>Sign in to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="relative group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`w-full px-4 py-3 ${currentTheme.inputBg} border-2 ${currentTheme.inputBorder} rounded-xl 
                             focus:outline-none focus:border-[#6610f2] focus:ring-2 focus:${currentTheme.highlight} transition-all duration-200 
                             shadow-sm placeholder-transparent group-hover:border-[#6610f2]/60 ${currentTheme.inputText}`}
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  placeholder="Email Address"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none 
                      ${fieldStates.email.focused || fieldStates.email.hasValue
                          ? `text-xs top-1.5 ${currentTheme.labelFocused} font-medium`
                          : `text-sm top-3.5 ${currentTheme.labelDefault}`}`}
                >
                  Email Address
                </label>
                <div className={`absolute left-0 top-full h-0.5 bg-gradient-to-r ${currentTheme.gradientHighlight} transition-all duration-300 w-0 group-hover:w-full origin-left`}></div>
              </div>

              {/* Password Field */}
              <div className="relative group">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className={`w-full px-4 py-3 ${currentTheme.inputBg} border-2 ${currentTheme.inputBorder} rounded-xl 
                             focus:outline-none focus:border-[#6610f2] focus:ring-2 focus:${currentTheme.highlight} transition-all duration-200 
                             shadow-sm placeholder-transparent pr-12 group-hover:border-[#6610f2]/60 ${currentTheme.inputText}`}
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none 
                      ${fieldStates.password.focused || fieldStates.password.hasValue
                          ? `text-xs top-1.5 ${currentTheme.labelFocused} font-medium`
                          : `text-sm top-3.5 ${currentTheme.labelDefault}`}`}
                >
                  Password
                </label>
                <button
                  type="button"
                  className={`absolute right-4 top-4 ${currentTheme.labelDefault} hover:text-[#6610f2] 
                             transition-all duration-200 hover:scale-110 focus:outline-none`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
                <div className={`absolute left-0 top-full h-0.5 bg-gradient-to-r ${currentTheme.gradientHighlight} transition-all duration-300 w-0 group-hover:w-full origin-left`}></div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 
                      ${rememberMe ? "bg-[#6610f2]" : darkMode ? "bg-[#565449]/50" : "bg-gray-300"}`}
                    aria-pressed={rememberMe}
                    aria-labelledby="remember-me"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 
                        ${rememberMe ? "translate-x-5" : "translate-x-1"}`}
                    />
                  </button>
                  <span id="remember-me" className={`ml-2 text-sm ${currentTheme.secondaryText} font-medium`}>Remember me</span>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#6610f2] hover:text-[#9668f5] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className={`${currentTheme.errorText} text-sm font-medium p-2.5 ${currentTheme.errorBg} rounded-lg border ${currentTheme.errorBorder} flex items-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl ${currentTheme.buttonText} font-medium bg-gradient-to-r ${currentTheme.primaryColor} 
                          hover:bg-gradient-to-r hover:${currentTheme.primaryColorHover} focus:ring-4 focus:ring-[#6610f2]/30 transition-all duration-300 
                          shadow-lg shadow-[#6610f2]/20 hover:shadow-[#6610f2]/30 transform hover:-translate-y-0.5 active:translate-y-0`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <ImSpinner8 className="animate-spin mr-2" size={20} />
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${currentTheme.divider}`} />
                </div>
                <div className="relative flex justify-center">
                  <span className={`px-3 ${currentTheme.cardBg} text-sm ${currentTheme.lightText} font-medium`}>
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <button
                  type="button"
                  className={`flex items-center justify-center py-2 px-4 border ${currentTheme.socialBorder} 
                             rounded-xl ${currentTheme.socialBg} transition-colors shadow-sm hover:shadow
                             ${currentTheme.secondaryText} hover:text-[#6610f2] group`}
                >
                  <FaGoogle className="text-red-500 mr-2 group-hover:scale-110 transition-transform duration-200" size={16} />
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button
                  type="button"
                  className={`flex items-center justify-center py-2 px-4 border ${currentTheme.socialBorder} 
                             rounded-xl ${currentTheme.socialBg} transition-colors shadow-sm hover:shadow
                             ${currentTheme.secondaryText} hover:text-[#6610f2] group`}
                >
                  <FaFacebook className="text-blue-600 mr-2 group-hover:scale-110 transition-transform duration-200" size={16} />
                  <span className="text-sm font-medium">Facebook</span>
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className={`mt-6 text-center text-sm ${currentTheme.lightText}`}>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-[#6610f2] hover:text-[#9668f5] transition-colors"
              >
                Sign up now
              </Link>
            </div>
          </div>
        </div>
        
        {/* Attribution */}
        <div className={`text-center text-xs ${darkMode ? 'text-[#d8cfbc]/50' : 'text-gray-400'} mt-3`}>
          © {new Date().getFullYear()} Vishnu Tej.
        </div>
      </div>
    </div>
  );
};

export default Login;