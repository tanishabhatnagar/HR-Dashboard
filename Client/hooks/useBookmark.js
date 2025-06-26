'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const BookmarkContext = createContext()

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([])
  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookmarkedUsers') || '[]')
    setBookmarks(stored)
  }, [])

  useEffect(() => {
    localStorage.setItem('bookmarkedUsers', JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = (user) => {
    if (!bookmarks.find((u) => u.id === user.id)) {
      setBookmarks([...bookmarks, user])
    }
  }

  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter((user) => user.id !== id))
  }

  const isBookmarked = (id) => {
    return bookmarks.some((user) => user.id === id)
  }

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}
    >
      {children}
    </BookmarkContext.Provider>
  )
}

export function useBookmarks() {
  return useContext(BookmarkContext)
}
