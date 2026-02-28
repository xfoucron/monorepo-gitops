import { Note } from "@/types/note";

export const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export const getNotes = async (): Promise<Note[]> => {
  const res = await fetch(`${API_URL}/notes`)
  if (!res.ok) throw new Error("Unable to fetch notes")
  return res.json()
}

export const createNote = async (note: { title: string, content: string }): Promise<Note> => {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({note: note})
  })
  if (!res.ok) {
    let errorMessage = "Cannot persist note"

    try {
      const data = await res.json()
      if (Array.isArray(data)) errorMessage = data.join(", ")
    } catch {}
    throw new Error(errorMessage)
  }
  return res.json()
}

export const destroyNote = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/notes/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Cannot delete note")
}
