import { create } from 'zustand'
import { SuppyNoteDTO } from '../domain/types/SupplyNoteDTO'

type SupplyOSStore = {
    notes: Record<string, SuppyNoteDTO>
    setNewNote: (note: SuppyNoteDTO) => void
}

export const useSupplyOSStore = create<SupplyOSStore>((set) => ({
    notes: {},
    setNewNote: (note) => set((state) => ({
        notes: {
            ...state.notes,
            [note.id]: note
        }
    }))
})) 