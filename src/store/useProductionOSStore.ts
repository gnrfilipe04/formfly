import { create } from 'zustand'
import { ProductionNoteDTO } from '../domain/types/ProductionNoteDTO'

type ProductionOSStore = {
    notes: Record<string, ProductionNoteDTO>
    setNewNote: (note: ProductionNoteDTO) => void
}

export const useProductionOSStore = create<ProductionOSStore>((set) => ({
    notes: {},
    setNewNote: (note) => set((state) => ({
        notes: {
            ...state.notes,
            [note.id]: note
        }
    }))
})) 