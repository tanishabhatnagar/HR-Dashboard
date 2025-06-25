'use client'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import CreateUserModal from './CreateUserModal'

export default function Navbar() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <header className="w-full bg-[#FCFCFC] p-4 shadow flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">HR Dashboard</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#2563eb] text-white px-4 py-2 rounded-xl hover:bg-[#1d4ed8] transition text-sm flex items-center gap-2"
        >
          <PlusCircle size={18} />
          Create User
        </button>
      </header>

      {showModal && (
        <CreateUserModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onUserCreated={() => {}}
        />
      )}
    </>
  )
}
