import { create } from 'zustand'
import { PlantNoteDTO } from '../domain/types/PlantNoteDTO'

type PlantOSStore = {
    notes: Record<string, PlantNoteDTO>
    setNewNote: (note: PlantNoteDTO) => void
}

export const usePlantOSStore = create<PlantOSStore>((set, get) => ({
    notes: {},
    setNewNote(value) {
        const newNote = { [value.id]: value }
        const notes = get().notes
        set({ notes: Object.assign(notes, newNote) })
    },
    getNotes() {
        return Object.values(get().notes)
    },
})) 