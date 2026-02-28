"use client"

import { Note } from "@/types/note";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { createNote, destroyNote, getNotes } from "@/services/notes";

type NotesContextType = {
  notes: Note[]
  error: string
  loading: boolean
  addNote: (note: { title: string, content: string }) => Promise<void>
  deleteNote: (id: number) => Promise<void>
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await getNotes()

        if (!data) {
          setError("Unable to get notes")
        } else {
          setNotes(data)
        }
      } catch (err: unknown) {
        const error = err as Error
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadNotes()
  }, [])

  const addNote = async (note: { title: string, content: string }) => {
    setError("")

    try {
      const newNote = await createNote(note)
      setNotes((prev) => [newNote, ...prev])
    } catch (err: unknown) {
      throw err as Error
    }
  }

  const deleteNote = async (id: number) => {
    setError("")

    try {
      await destroyNote(id)
      setNotes((prev) => prev.filter((n) => n.id !== id))
    } catch (err: unknown) {
      const error = err as Error
      setError(error.message || "Failed to delete note")
      throw error
    }
  }

  return (
    <NotesContext.Provider value={{ notes, loading, error, addNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  )
}

export const useNotes = () => {
  const context = useContext(NotesContext)
  if (!context) throw new Error("useNotes must be used within NotesProvider")
  return context
}
