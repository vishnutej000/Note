import React, { useState } from "react"
import { MdClose } from "react-icons/md"
import TagInput from "../../components/Input/TagInput "
import axios from "axios"
import { toast } from "react-toastify"

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "")
  const [content, setContent] = useState(noteData?.content || "")
  const [tags, setTags] = useState(noteData?.tags || [])
  const [error, setError] = useState(null)

  const editNote = async () => {
    const noteId = noteData._id

    try {
      const res = await axios.post(
        "http://localhost:3000/api/note/edit/" + noteId,
        { title, content, tags },
        { withCredentials: true }
      )

      if (res.data.success === false) {
        setError(res.data.message)
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)
      getAllNotes()
      onClose()
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      setError(error.response?.data?.message || error.message)
    }
  }

  const addNewNote = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/note/add",
        { title, content, tags },
        { withCredentials: true }
      )

      if (res.data.success === false) {
        setError(res.data.message)
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)
      getAllNotes()
      onClose()
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      setError(error.response?.data?.message || error.message)
    }
  }

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title")
      return
    }

    if (!content) {
      setError("Please enter the content")
      return
    }

    setError("")

    if (type === "edit") {
      editNote()
    } else {
      addNewNote()
    }
  }

  return (
    <div className="relative w-full max-w-full sm:max-w-xl lg:max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <button
        className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={onClose}
      >
        <MdClose className="text-xl text-gray-600 hover:text-gray-900" />
      </button>

      <div className="space-y-4">
        <div>
          <label 
            htmlFor="title" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full text-xl text-gray-900 border-b-2 border-blue-500 focus:outline-none focus:border-blue-600 pb-2 transition-colors duration-300"
            placeholder="Your title here..."
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          <label 
            htmlFor="content" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            className="w-full text-base text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 transition-all duration-300"
            placeholder="Write your notes here..."
            rows={10}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>

        <div>
          <label 
            htmlFor="tags" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tags
          </label>
          <TagInput 
            tags={tags} 
            setTags={setTags} 
            className="w-full"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {error}
          </p>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
          onClick={handleAddNote}
        >
          {type === "edit" ? "Update Note" : "Add Note"}
        </button>
      </div>
    </div>
  )
}

export default AddEditNotes