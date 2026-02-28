"use client"

import { Note } from "@/types/note";
import { useState } from "react";
import { useNotes } from "@/providers/notes";

const ListWrapper = ({ children }) => {
  return <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {children}
  </ul>
}

const NoteCard = ({ note, onDelete, removing }: { note: Note, onDelete: { id: number }, removing?: boolean }) => {
  return (
    <div
      className={`bg-gray-200 rounded p-4 relative transition-all duration-500 ease-in-out ${removing ? "opacity-0 -translate-y-4 max-h-0 p-0 m-0" : "opacity-100 max-h-96"}`}>
      <div>
        <h1 className="text-xl font-bold">{note.title}</h1>
      </div>
      <div className="mt-4">
        <p>{note.content}</p>
      </div>
      <div>
        <p>Created: {new Date(note.created_at).toLocaleString()}</p>
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  )
}

const SkeletonNoteCard = () => {
  return (
    <div className="bg-gray-200 rounded p-4 animate-pulse">
      <div>
        <div className="h-6 w-1/3 bg-gray-300 rounded"/>
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-4 w-full bg-gray-300 rounded"/>
        <div className="h-4 w-5/6 bg-gray-300 rounded"/>
      </div>

      <div className="mt-4">
        <div className="h-3 w-1/4 bg-gray-300 rounded"/>
      </div>
    </div>
  )
}

export default function ListNotesPage() {
  const { notes, loading, error, deleteNote } = useNotes()
  const [removingIds, setRemovingIds] = useState<number[]>([])

  const handleDelete = async (id: number) => {
    setRemovingIds((prev) => [...prev, id])

    setTimeout(async () => {
      try {
        await deleteNote(id)
        setRemovingIds((prev) => prev.filter((rid) => rid !== rid))
      } catch (err) {
        alert(err?.message || "Failed to delete")
        setRemovingIds((prev) => prev.filter((rid) => rid !== rid))
      }
    }, 500)
  }

  if (loading) {
    return (
      <ListWrapper>
        {Array.from({ length: 9 }).map((_, i) => (
          <li
            key={i}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-sm"
          >
            <SkeletonNoteCard/>
          </li>
        ))}
      </ListWrapper>
    )
  }

  if (error) {
    return <h2>Unable to get notes : ${error}</h2>
  }

  return (
    <div>
      <ListWrapper>
        {notes?.map(note => (
          <li key={note.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-sm ">
            <NoteCard note={note} onDelete={handleDelete} removing={removingIds.includes(note.id)}/>
          </li>
        ))}
      </ListWrapper>
    </div>
  )
}
