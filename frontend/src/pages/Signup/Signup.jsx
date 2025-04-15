import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaSun, FaMoon } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { useTheme } from "../../Theme/theme"; // Make sure the import path is correct

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [fieldStates, setFieldStates] = useState({
    username: { focused: false, hasValue: false },
    email: { focused: false, hasValue: false },
    password: { focused: false, hasValue: false },
    confirmPassword: { focused: false, hasValue: false }
  });

  // Use theme context
  const { darkMode, toggleTheme, theme: currentTheme } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (!formData.username.trim()) {
      setError("Username is required");
      setIsLoading(false);
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError("You must accept the Terms of Service and Privacy Policy");
      setIsLoading(false);
      return;
    }

    try {
      dispatch(signInStart());
      
      const res = await axios.post(
        "https://note-219z.onrender.com/api/auth/signup",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password
        },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        throw new Error(res.data.message);
      }

      toast.success("Sign up successful!");
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

  // Safely access theme classes with fallbacks to prevent undefined errors
  const getThemeClass = (propertyPath) => {
    const properties = propertyPath.split('.');
    let value = currentTheme;
    
    for (const prop of properties) {
      if (value && value[prop]) {
        value = value[prop];
      } else {
        // Fallbacks for essential classes if the theme object structure is not as expected
        if (propertyPath === 'bg') return 'bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50';
        if (propertyPath === 'cardBg') return 'bg-white/80';
        if (propertyPath === 'cardBorder') return 'border-white/50';
        if (propertyPath === 'text') return 'text-gray-800';
        if (propertyPath === 'secondaryText') return 'text-gray-600';
        if (propertyPath === 'lightText') return 'text-gray-500';
        if (propertyPath === 'inputBg') return 'bg-white/70';
        if (propertyPath === 'inputBorder') return 'border-gray-200';
        if (propertyPath === 'inputText') return 'text-gray-800';
        if (propertyPath === 'labelDefault') return 'text-gray-500';
        if (propertyPath === 'labelFocused') return 'text-indigo-600';
        if (propertyPath === 'primaryColor') return 'from-indigo-600 to-purple-600';
        if (propertyPath === 'buttonText') return 'text-white';
        if (propertyPath === 'primaryColorHover') return 'from-indigo-700 to-purple-700';
        if (propertyPath === 'gradientHighlight') return 'from-indigo-500 to-purple-500';
        if (propertyPath === 'divider') return 'border-gray-200';
        if (propertyPath === 'socialBg') return 'bg-white hover:bg-gray-50';
        if (propertyPath === 'socialBorder') return 'border-gray-200';
        if (propertyPath === 'toggleBg') return 'bg-indigo-100';
        if (propertyPath === 'toggleIcon') return 'text-yellow-500';
        if (propertyPath === 'errorText') return 'text-red-500';
        if (propertyPath === 'errorBg') return 'bg-red-50';
        if (propertyPath === 'errorBorder') return 'border-red-100';
        if (propertyPath === 'highlight') return 'ring-indigo-200/50';
        if (propertyPath === 'inputFocus') return 'focus:border-indigo-600';
        if (propertyPath === 'inputHover') return 'hover:border-indigo-600/60';
        return '';
      }
    }
    return value || '';
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${getThemeClass('bg')} animate-gradientFlow`}>
      <div className="w-full max-w-md">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-64 overflow-hidden -z-10">
          <div className={`absolute -top-10 -left-10 w-40 h-40 rounded-full ${darkMode ? 'bg-[#6610f2]/10' : 'bg-indigo-300/20'} blur-xl`}></div>
          <div className={`absolute top-20 left-1/2 w-60 h-60 rounded-full ${darkMode ? 'bg-[#6610f2]/5' : 'bg-purple-300/20'} blur-xl`}></div>
          <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${darkMode ? 'bg-[#565449]/10' : 'bg-pink-300/20'} blur-xl`}></div>
        </div>
        
        <div className={`relative ${getThemeClass('cardBg')} backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border ${getThemeClass('cardBorder')} transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}>
          
          
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getThemeClass('gradientHighlight')}/10 rounded-bl-full -z-0`}></div>
          <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${getThemeClass('gradientHighlight')}/10 rounded-tr-full -z-0`}></div>
          
          <div className="relative z-10 px-6 py-8 sm:px-10">
            <div className="flex flex-col items-center mb-6">
              <div className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br ${getThemeClass('primaryColor')} rounded-2xl shadow-lg mb-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
              </div>
              <h2 className={`text-3xl font-bold ${getThemeClass('text')} tracking-tight`}>
                Create Account
              </h2>
              <p className={getThemeClass('secondaryText')}>Sign up to get started</p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Username Field */}
              <div className="relative group">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className={`w-full px-4 py-3 ${getThemeClass('inputBg')} border-2 ${getThemeClass('inputBorder')} rounded-xl 
                             focus:outline-none ${getThemeClass('inputFocus')} focus:ring-2 focus:ring-indigo-200/50 transition-all duration-200 
                             shadow-sm placeholder-transparent group-hover:border-indigo-600/60 ${getThemeClass('inputText')}`}
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => handleFocus("username")}
                  onBlur={() => handleBlur("username")}
                  placeholder="Username"
                />
                <label
                  htmlFor="username"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none 
                      ${fieldStates.username.focused || fieldStates.username.hasValue
                          ? `text-xs top-1.5 ${getThemeClass('labelFocused')} font-medium`
                          : `text-sm top-3.5 ${getThemeClass('labelDefault')}`}`}
                >
                  Username
                </label>
                <div className={`absolute left-0 top-full h-0.5 bg-gradient-to-r ${getThemeClass('gradientHighlight')} transition-all duration-300 w-0 group-hover:w-full origin-left`}></div>
              </div>

              {/* Email Field */}
              <div className="relative group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`w-full px-4 py-3 ${getThemeClass('inputBg')} border-2 ${getThemeClass('inputBorder')} rounded-xl 
                             focus:outline-none ${getThemeClass('inputFocus')} focus:ring-2 focus:ring-indigo-200/50 transition-all duration-200 
                             shadow-sm placeholder-transparent group-hover:border-indigo-600/60 ${getThemeClass('inputText')}`}
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
                          ? `text-xs top-1.5 ${getThemeClass('labelFocused')} font-medium`
                          : `text-sm top-3.5 ${getThemeClass('labelDefault')}`}`}
                >
                  Email Address
                </label>
                <div className={`absolute left-0 top-full h-0.5 bg-gradient-to-r ${getThemeClass('gradientHighlight')} transition-all duration-300 w-0 group-hover:w-full origin-left`}></div>
              </div>

              {/* Password Field */}
              <div className="relative group">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className={`w-full px-4 py-3 ${getThemeClass('inputBg')} border-2 ${getThemeClass('inputBorder')} rounded-xl 
                             focus:outline-none ${getThemeClass('inputFocus')} focus:ring-2 focus:ring-indigo-200/50 transition-all duration-200 
                             shadow-sm placeholder-transparent pr-12 group-hover:border-indigo-600/60 ${getThemeClass('inputText')}`}
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
                          ? `text-xs top-1.5 ${getThemeClass('labelFocused')} font-medium`
                          : `text-sm top-3.5 ${getThemeClass('labelDefault')}`}`}
                >
                  Password
                </label>
                <button
                  type="button"
                  className={`absolute right-4 top-4 ${getThemeClass('labelDefault')} hover:text-[#6610f2] 
                             transition-all duration-200 hover:scale-110 focus:outline-none`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
                <div className={`absolute left-0 top-full h-0.5 bg-gradient-to-r ${getThemeClass('gradientHighlight')} transition-all duration-300 w-0 group-hover:w-full origin-left`}></div>
              </div>

              {/* Confirm Password Field */}
              <div className="relative group">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className={`w-full px-4 py-3 ${getThemeClass('inputBg')} border-2 ${getThemeClass('inputBorder')} rounded-xl 
                             focus:outline-none ${getThemeClass('inputFocus')} focus:ring-2 focus:ring-indigo-200/50 transition-all duration-200 
                             shadow-sm placeholder-transparent pr-12 group-hover:border-indigo-600/60 ${getThemeClass('inputText')}`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => handleFocus("confirmPassword")}
                  onBlur={() => handleBlur("confirmPassword")}
                  placeholder="Confirm Password"
                />
                <label
                  htmlFor="confirmPassword"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none 
                      ${fieldStates.confirmPassword.focused || fieldStates.confirmPassword.hasValue
                          ? `text-xs top-1.5 ${getThemeClass('labelFocused')} font-medium`
                          : `text-sm top-3.5 ${getThemeClass('labelDefault')}`}`}
                >
                  Confirm Password
                </label>
                <button
                  type="button"
                  className={`absolute right-4 top-4 ${getThemeClass('labelDefault')} hover:text-[#6610f2] 
                             transition-all duration-200 hover:scale-110 focus:outline-none`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
                <div className={`absolute left-0 top-full h-0.5 bg-gradient-to-r ${getThemeClass('gradientHighlight')} transition-all duration-300 w-0 group-hover:w-full origin-left`}></div>
              </div>

              {/* Terms and Conditions */}
              <div className="pt-2">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setAcceptTerms(!acceptTerms)}
                    className={`relative inline-flex h-5 w-5 items-center justify-center rounded transition-colors duration-300 
                      border-2 ${acceptTerms ? "bg-[#6610f2] border-[#6610f2]" : darkMode ? "bg-transparent border-[#565449]/50" : "bg-transparent border-gray-300"}`}
                    aria-pressed={acceptTerms}
                    aria-labelledby="accept-terms"
                  >
                    {acceptTerms && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <span id="accept-terms" className={`ml-2 text-sm ${getThemeClass('secondaryText')}`}>
                    I agree to the <Link to="/terms" className="font-medium text-[#6610f2] hover:text-[#9668f5] transition-colors">Terms of Service</Link> and <Link to="/privacy" className="font-medium text-[#6610f2] hover:text-[#9668f5] transition-colors">Privacy Policy</Link>
                  </span>
                </div>
              </div>

              {error && (
                <div className={`${getThemeClass('errorText')} text-sm font-medium p-2.5 ${getThemeClass('errorBg')} rounded-lg border ${getThemeClass('errorBorder')} flex items-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl ${getThemeClass('buttonText')} font-medium bg-gradient-to-r ${getThemeClass('primaryColor')} 
                          hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-[#6610f2]/30 transition-all duration-300 
                          shadow-lg shadow-[#6610f2]/20 hover:shadow-[#6610f2]/30 transform hover:-translate-y-0.5 active:translate-y-0 mt-2`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <ImSpinner8 className="animate-spin mr-2" size={20} />
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${getThemeClass('divider')}`} />
                </div>
                <div className="relative flex justify-center">
                  <span className={`px-3 ${getThemeClass('cardBg')} text-sm ${getThemeClass('lightText')} font-medium`}>
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <button
                  type="button"
                  className={`flex items-center justify-center py-2 px-4 border ${getThemeClass('socialBorder')} 
                             rounded-xl ${getThemeClass('socialBg')} transition-colors shadow-sm hover:shadow
                             ${getThemeClass('secondaryText')} hover:text-[#6610f2] group`}
                >
                  <FaGoogle className="text-red-500 mr-2 group-hover:scale-110 transition-transform duration-200" size={16} />
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button
                  type="button"
                  className={`flex items-center justify-center py-2 px-4 border ${getThemeClass('socialBorder')} 
                             rounded-xl ${getThemeClass('socialBg')} transition-colors shadow-sm hover:shadow
                             ${getThemeClass('secondaryText')} hover:text-[#6610f2] group`}
                >
                  <FaFacebook className="text-blue-600 mr-2 group-hover:scale-110 transition-transform duration-200" size={16} />
                  <span className="text-sm font-medium">Facebook</span>
                </button>
              </div>
            </div>

            {/* Login Link */}
            <div className={`mt-6 text-center text-sm ${getThemeClass('lightText')}`}>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#6610f2] hover:text-[#9668f5] transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
        
        {/* Attribution */}
        <div className={`text-center text-xs ${darkMode ? 'text-[#d8cfbc]/50' : 'text-gray-400'} mt-3`}>
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>

      {/* Add keyframes for animations inline */}
      <style jsx="true">{`
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
        /* Customize autofill */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px ${darkMode ? '#24242C' : 'white'} inset;
          -webkit-text-fill-color: ${darkMode ? '#d8cfbc' : '#333'};
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}; 

export default SignUp;