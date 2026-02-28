"use client"

import "./globals.css";
import { NotesProvider } from "@/providers/notes";
import { CreateNoteModal } from "@/components/modal";
import { useState } from "react";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [showModal, setShowModal] = useState(false)

  return (
    <html lang="en">
    <body
      className={`antialiased`}
    >
    <NotesProvider>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="relative bg-gray-300 rounded p-4 flex items-center justify-between my-8">
          <h2 className="text-2xl">Notes</h2>
          <button
            onClick={() => setShowModal(true)}
            className="relative inline-flex items-center gap-x-1.5 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            New
          </button>
        </nav>

        {children}

        {showModal && (
          <CreateNoteModal
            onClose={() => {
              setShowModal(false)
            }}
            onCreated={() => {
              setShowModal(false)
            }}
          />
        )}
      </main>
    </NotesProvider>
    </body>
    </html>
  );
}
