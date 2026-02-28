"use client"

import { FormEvent, useState } from "react";
import { Note } from "@/types/note";
import { useNotes } from "@/providers/notes";

type Props = {
  onClose: () => void
  onCreated: (note: Note) => void
}

export const CreateNoteModal = ({ onClose }: Props) => {
  const { addNote } = useNotes()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      await addNote({ title, content })
      onClose()
    } catch (err: unknown) {
      const error = err as Error
      setError(error.message || "Failed to create note")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
        <h3 className="text-lg font-semibold mb-4">Create Note</h3>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            required
          />

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded p-2"
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-3 py-2 rounded bg-blue-500 text-white"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
