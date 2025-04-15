import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput ";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../Theme/theme";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);
  const [fieldStates, setFieldStates] = useState({
    title: { focused: false, hasValue: !!noteData?.title },
    content: { focused: false, hasValue: !!noteData?.content }
  });

  // Use the theme context instead of local state
  const { darkMode, toggleTheme, theme: currentTheme } = useTheme();

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setFieldStates(prev => ({
      ...prev,
      title: {
        ...prev.title,
        hasValue: value.length > 0
      }
    }));
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    setContent(value);
    setFieldStates(prev => ({
      ...prev,
      content: {
        ...prev.content,
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

  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const res = await axios.post(
        "https://note-219z.onrender.com/api/note/edit/" + noteId,
        { title, content, tags },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setError(error.response?.data?.message || error.message);
    }
  };

  const addNewNote = async () => {
    try {
      const res = await axios.post(
        "https://note-219z.onrender.com/note/add",
        { title, content, tags },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setError(error.response?.data?.message || error.message);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${currentTheme.bg} bg-opacity-80 backdrop-blur-sm z-50 animate-gradientFlow p-4`}>
      <div className="w-full max-w-lg">
        <div className={`relative ${currentTheme.cardBg} backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border ${currentTheme.cardBorder} transition-all duration-300 hover:shadow-${currentTheme.cardShadow}`}>
          
          
          {/* Close button */}
          <button
            className={`absolute top-4 right-4 p-2 rounded-full ${currentTheme.toggleBg} z-20 transition-all duration-300 hover:scale-110`}
            onClick={onClose}
          >
            <MdClose className={`${currentTheme.toggleIcon}`} size={16} />
          </button>
          
          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${currentTheme.gradientHighlight}/10 rounded-bl-full -z-0`}></div>
          <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${currentTheme.gradientHighlight}/10 rounded-tr-full -z-0`}></div>
          
          <div className="relative z-10 px-6 py-8">
            <div className="flex flex-col items-center mb-5">
              <div className={`w-12 h-12 flex items-center justify-center bg-gradient-to-br ${currentTheme.primaryColor} rounded-xl shadow-lg mb-3`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className={`text-2xl font-bold ${currentTheme.text} tracking-tight`}>
                {type === "edit" ? "Edit Note" : "Add New Note"}
              </h2>
            </div>

            <form className="space-y-4">
              {/* Title Field */}
              <div className="relative group">
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  className={`w-full px-4 py-3 ${currentTheme.inputBg} border-2 ${currentTheme.inputBorder} rounded-xl 
                             focus:outline-none ${currentTheme.inputFocus} focus:ring-2 focus:${currentTheme.highlight} transition-all duration-200 
                             shadow-sm placeholder-transparent group-hover:${currentTheme.inputHover} ${currentTheme.inputText}`}
                  value={title}
                  onChange={handleTitleChange}
                  onFocus={() => handleFocus("title")}
                  onBlur={() => handleBlur("title")}
                  placeholder="Note Title"
                />
                <label
                  htmlFor="title"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none 
                      ${fieldStates.title.focused || fieldStates.title.hasValue
                          ? `text-xs top-1.5 ${currentTheme.labelFocused} font-medium`
                          : `text-sm top-3.5 ${currentTheme.labelDefault}`}`}
                >
                  Note Title
                </label>
                <div className={`absolute left-0 top-full h-0.5 bg-gradient-to-r ${currentTheme.gradientHighlight} transition-all duration-300 w-0 group-hover:w-full origin-left`}></div>
              </div>

              {/* Content Field */}
              <div className="relative group">
                <textarea
                  id="content"
                  name="content"
                  required
                  className={`w-full px-4 py-3 ${currentTheme.inputBg} border-2 ${currentTheme.inputBorder} rounded-xl 
                             focus:outline-none ${currentTheme.inputFocus} focus:ring-2 focus:${currentTheme.highlight} transition-all duration-200 
                             shadow-sm placeholder-transparent group-hover:${currentTheme.inputHover} ${currentTheme.inputText}`}
                  value={content}
                  onChange={handleContentChange}
                  onFocus={() => handleFocus("content")}
                  onBlur={() => handleBlur("content")}
                  placeholder="Note Content"
                  rows={6}
                />
                <label
                  htmlFor="content"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none 
                      ${fieldStates.content.focused || fieldStates.content.hasValue
                          ? `text-xs top-1.5 ${currentTheme.labelFocused} font-medium`
                          : `text-sm top-3.5 ${currentTheme.labelDefault}`}`}
                >
                  Note Content
                </label>
                <div className={`absolute left-0 top-full h-0.5 bg-gradient-to-r ${currentTheme.gradientHighlight} transition-all duration-300 w-0 group-hover:w-full origin-left`}></div>
              </div>

              {/* Tags Field */}
              <div className="relative">
                <label 
                  htmlFor="tags" 
                  className={`block text-xs font-medium ${currentTheme.labelFocused} mb-1`}
                >
                  Tags
                </label>
                <TagInput 
                  tags={tags} 
                  setTags={setTags} 
                  className={`w-full border-2 ${currentTheme.inputBorder} rounded-xl overflow-hidden
                           focus-within:${currentTheme.inputFocus} focus-within:ring-2 focus-within:${currentTheme.highlight} 
                           hover:${currentTheme.inputHover} transition-all duration-200 ${currentTheme.inputBg}`}
                />
              </div>

              {error && (
                <div className={`${currentTheme.errorText} text-sm font-medium p-2.5 ${currentTheme.errorBg} rounded-lg border ${currentTheme.errorBorder} flex items-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  className={`mr-3 px-4 py-2 rounded-lg border ${currentTheme.inputBorder} ${currentTheme.secondaryText}
                            hover:bg-gray-100 dark:hover:bg-[#28282F] transition-colors duration-200`}
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddNote}
                  className={`px-5 py-2 rounded-lg ${currentTheme.buttonText} font-medium bg-gradient-to-r ${currentTheme.primaryColor} 
                          hover:${currentTheme.primaryColorHover} focus:ring-4 focus:ring-[#6610f2]/30 transition-all duration-300 
                          shadow-lg shadow-[#6610f2]/20 hover:shadow-[#6610f2]/30 transform hover:-translate-y-0.5 active:translate-y-0`}
                >
                  {type === "edit" ? "Update Note" : "Save Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditNotes;