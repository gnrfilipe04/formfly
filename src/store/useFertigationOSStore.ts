
import { OSFertigationDTO } from "@/src/domain/types/OSFertigationDTO";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FertigationNoteDTO } from "../domain/types/FertigationNoteDTO";

interface State {
    orders: Record<string, OSFertigationDTO>
    notes: Record<string, FertigationNoteDTO>
    osInEdit: OSFertigationDTO | null,
}

interface Actions {
    setOrders: (value: Record<string, OSFertigationDTO>) => void
    setNotes: (value: Record<string, FertigationNoteDTO>) => void
    getOrders: () => OSFertigationDTO[]
    getNotes: () => FertigationNoteDTO[]
    setNewNote: (value: FertigationNoteDTO) => void
}

export const useFertigationOSStore = create<State & Actions>()(
    persist(
      (set, get) => ({
        orders: {},
        osInEdit: null,
        notes: {},
        setNewNote(value) {
            const newNote = { [value.id]: value }
            const notes = get().notes
            set({ notes: Object.assign(notes, newNote) })
        },
        setNotes(value) {
          set({ notes: value })
        },
        setOrders(value) {
            set({ orders: value})
        },
        getNotes() {
            return Object.values(get().notes)
        },    
        getOrders() {
            return Object.values(get().orders)
        },
      }),
      {
        name: 'os-fertigation-store',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )