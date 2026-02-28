import { Note } from "@/types/note";

let API_URL: string = ""

const getApiUrl = async(): Promise<string> => {
  if (!API_URL) {
    const res = await fetch("/config")
    if (!res.ok) throw new Error("Cannot fetch API configuration")
    const data = await res.json()
    API_URL = data.API_URL
  }

  return API_URL
}

export const getNotes = async (): Promise<Note[]> => {
  await getApiUrl()

  const res = await fetch(`${API_URL}/notes`)
  if (!res.ok) throw new Error("Unable to fetch notes")
  return res.json()
}

export const createNote = async (note: { title: string, content: string }): Promise<Note> => {
  await getApiUrl()

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
  await getApiUrl()

  const res = await fetch(`${API_URL}/notes/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Cannot delete note")
}
