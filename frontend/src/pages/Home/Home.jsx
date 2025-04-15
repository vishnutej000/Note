import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSun, FaMoon, FaSearch, FaTimes, FaUser, FaSignOutAlt, FaThumbtack } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import AddEditNotes from "./AddEditNotes";
import { useTheme } from "../../Theme/theme"; 

// Ensure react-modal is configured
Modal.setAppElement('#root');

// NoteCard Component
const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  const { theme, darkMode } = useTheme();

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Truncate content for preview
  const truncateContent = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
  };

  return (
    <div className={`${theme.noteBg} rounded-xl ${theme.cardBorder} border overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:${theme.cardShadow} backdrop-blur-sm relative group`}>
      <div 
        className={`absolute top-2 right-2 p-1 rounded-full cursor-pointer transition-all duration-200 ${isPinned ? theme.pinned : theme.icon} hover:scale-110`}
        onClick={onPinNote}
        title={isPinned ? "Unpin note" : "Pin note"}
      >
        <FaThumbtack className={`${isPinned ? "" : "opacity-50"} ${isPinned ? "" : "transform -rotate-45"}`} />
      </div>
      
      <div className="p-5">
        <h3 className={`text-lg font-semibold ${theme.text} mb-2 pr-6`}>{title}</h3>
        <p className={`text-sm ${theme.secondaryText} mb-4 line-clamp-3`}>{truncateContent(content)}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags && tags.map((tag, index) => (
            <span key={index} className={`text-xs ${theme.tag} px-2 py-1 rounded-full`}>
              {tag}
            </span>
          ))}
        </div>
        
        <div className={`flex items-center justify-between border-t pt-3 ${theme.divider}`}>
          <div className={`text-xs ${theme.secondaryText}`}>
            {formattedDate}
          </div>
          
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={onPinNote} className={`p-1 rounded-full ${theme.icon} transition-colors`}>
              <FaThumbtack className={`${isPinned ? "" : "transform -rotate-45"}`} />
            </button>
            <button onClick={onEdit} className={`p-1 rounded-full ${theme.icon} transition-colors`}>
              <svg xmlns="https://www.flaticon.com/free-icon/writing_1001371" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button onClick={onDelete} className={`p-1 rounded-full ${theme.icon} transition-colors`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// EmptyCard Component
const EmptyCard = ({ imgSrc, message }) => {
  const { theme } = useTheme();

  return (
    <div className={`${theme.cardBg} rounded-xl border ${theme.cardBorder} p-8 text-center max-w-md mx-auto backdrop-blur-sm`}>
      <img src={imgSrc} alt="Empty state" className="w-48 h-48 object-contain mx-auto mb-6" />
      <p className={`${theme.secondaryText} text-lg`}>{message}</p>
    </div>
  );
};

// User Avatar Component
const UserAvatar = ({ userInfo }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const handleLogout = async () => {
    try {
      // Make API call to logout
      await axios.get("https://note-219z.onrender.com/api/auth/signout", {
        withCredentials: true,
      });
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };
  
  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };
  
  // Get full name or username
  const getDisplayName = () => {
    if (userInfo?.firstName && userInfo?.lastName) {
      return `${userInfo.firstName} ${userInfo.lastName}`;
    }
    return userInfo?.username || "User";
  };
  
  return (
    <div className="relative">
      <div 
        className="flex items-center cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${theme.primaryColor} flex items-center justify-center`}>
          <span className="text-white font-medium">
            {getInitials(getDisplayName())}
          </span>
        </div>
        <div className="ml-2 hidden sm:block">
          <div className={`${theme.text} font-medium`}>{getDisplayName()}</div>
          <div className={`${theme.secondaryText} text-xs`}>{userInfo?.email || "user@example.com"}</div>
        </div>
        <svg 
          className={`ml-2 h-5 w-5 ${theme.secondaryText} transform transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {/* Dropdown menu */}
      {dropdownOpen && (
        <div 
          className={`absolute right-0 mt-2 w-48 py-2 ${theme.cardBg} rounded-lg shadow-xl border ${theme.cardBorder} z-50`}
        >
          <div className={`px-4 py-2 border-b ${theme.divider}`}>
            <div className={`${theme.text} font-medium`}>{getDisplayName()}</div>
            <div className={`${theme.secondaryText} text-xs truncate`}>{userInfo?.email || "user@example.com"}</div>
          </div>
          <button 
            onClick={handleLogout}
            className={`w-full text-left px-4 py-2 hover:${theme.cardBg === 'bg-white/80' ? 'bg-gray-50' : 'bg-[#24242C]'} ${theme.secondaryText} font-medium flex items-center transition-colors`}
          >
            <FaSignOutAlt className={`mr-2 ${theme.lightText}`} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

// Navbar Component
const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { theme, darkMode, toggleTheme } = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      onSearchNote(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    handleClearSearch();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gradient-to-br from-[#1A1A21]/90 to-[#0D0D11]/90' : 'bg-gradient-to-br from-white/90 to-indigo-50/80'} backdrop-blur-lg border-b ${theme.divider} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${theme.primaryColor} flex items-center justify-center mr-3`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className={`text-xl font-bold ${theme.text}`}>Notes</h1>
        </div>

        <div className="flex-1 max-w-xl mx-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search notes..."
              className={`w-full py-2 px-4 pr-10 rounded-xl border ${theme.inputBg} ${theme.inputBorder} ${theme.inputText} focus:outline-none ${theme.inputFocus} focus:ring-2 focus:ring-[#6610f2]/20 transition-all duration-200`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
              {isSearching && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className={`p-1 rounded-full ${theme.lightText} hover:text-[#6610f2] transition-colors`}
                >
                  <FaTimes size={16} />
                </button>
              )}
              <button
                type="submit"
                className={`p-1 rounded-full ${theme.lightText} hover:text-[#6610f2] transition-colors`}
              >
                <FaSearch size={16} />
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme.toggleBg} transition-all duration-300 hover:scale-110`}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? (
              <FaSun className={theme.toggleIcon} size={18} />
            ) : (
              <FaMoon className={theme.toggleIcon} size={18} />
            )}
          </button>
          
          {userInfo && <UserAvatar userInfo={userInfo} />}
        </div>
      </div>
    </header>
  );
};

// Main Home Component
const Home = () => {
  const { currentUser, loading, errorDispatch } = useSelector(
    (state) => state.user
  );

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { theme, darkMode, globalStyles } = useTheme();

  const navigate = useNavigate();

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  useEffect(() => {
    if (currentUser === null || !currentUser) {
      navigate("/login");
    } else {
      setUserInfo(currentUser?.rest);
      getAllNotes();
    }
  }, [currentUser, navigate]);

  // get all notes
  const getAllNotes = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://note-219z.onrender.com/api/note/all", {
        withCredentials: true,
      });

      if (res.data.success === false) {
        console.log(res.data);
        return;
      }

      setAllNotes(res.data.notes);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch notes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const res = await axios.delete(
       "http://note-219z.onrender.com/api/note/delete/" + noteId,
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const res = await axios.get("http://note-219z.onrender.com/api/note/search", {
        params: { query },
        withCredentials: true,
      });

      if (res.data.success === false) {
        console.log(res.data.message);
        toast.error(res.data.message);
        return;
      }

      setIsSearch(true);
      setAllNotes(res.data.notes);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {
      const res = await axios.put(
        "http://note-219z.onrender.com/api/note/update-note-pinned/" + noteId,
        { isPinned: !noteData.isPinned },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        console.log(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={`relative min-h-screen ${theme.bg} animate-homeGradientFlow`}>
      {/* Decorative pattern overlay */}
      <div className={`fixed inset-0 ${theme.patternOverlay} bg-repeat opacity-20 pointer-events-none`}></div>
      
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="pt-24 px-4 pb-10 relative z-10">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
              <ImSpinner8 
                className={`animate-spin mb-4 ${darkMode ? 'text-[#6610f2]' : 'text-indigo-600'}`} 
                size={40} 
              />
              <p className={`${theme.secondaryText} text-lg`}>
                Loading your notes...
              </p>
            </div>
          ) : allNotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Display pinned notes first */}
              {allNotes
                .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
                .map((note) => (
                <NoteCard
                  key={note._id}
                  title={note.title}
                  date={note.createdAt}
                  content={note.content}
                  tags={note.tags}
                  isPinned={note.isPinned}
                  onEdit={() => handleEdit(note)}
                  onDelete={() => deleteNote(note)}
                  onPinNote={() => updateIsPinned(note)}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-[calc(100vh-200px)]">
              <EmptyCard
                imgSrc={
                  isSearch
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtakcQoMFXwFwnlochk9fQSBkNYkO5rSyY9A&s"
                    : "https://t4.ftcdn.net/jpg/11/34/16/21/360_F_1134162113_3S3sbsqwhHA4w1yTpUSz9ohHJ4mztkGf.jpg"
                }
                message={
                  isSearch
                    ? "Oops! No Notes found matching your search"
                    : `Ready to capture your ideas? Click the 'Add' button to start noting down your thoughts, inspiration and reminders. Let's get started!`
                }
              />
            </div>
          )}
        </div>

        <button
          className={`fixed right-6 bottom-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r ${theme.primaryColor} ${theme.buttonText} shadow-xl hover:${theme.primaryColorHover} transition-all duration-300 ease-in-out transform hover:scale-110`}
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          <MdAdd className="text-2xl" />
        </button>
      </div>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{
          overlay: {
            backgroundColor: darkMode ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.5)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
          },
          content: {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
            maxWidth: '500px',
            width: '90%',
            padding: '0',
            borderRadius: '12px',
            border: darkMode ? '1px solid rgba(86, 84, 73, 0.3)' : '1px solid rgba(229, 231, 235, 1)',
            background: darkMode ? '#1A1A21' : 'white',
            boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 6px rgba(0,0,0,0.1)',
            overflow: 'visible'
          }
        }}
      >
        <AddEditNotes
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
          darkMode={darkMode}
        />
      </Modal>

      {/* Global theme styles are now handled by ThemeProvider */}
    </div>
  );
};

export default Home;