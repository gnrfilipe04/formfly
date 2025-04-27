
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FertigationNoteDTO } from "../domain/types/FertigationNoteDTO";
import { PlantNoteDTO } from "../domain/types/PlantNoteDTO";
import { ProductionNoteDTO } from "../domain/types/ProductionNoteDTO";
import { SuppyNoteDTO } from "../domain/types/SupplyNoteDTO";

interface State {
  filter: string
  notes: Record<string, FertigationNoteDTO | PlantNoteDTO | ProductionNoteDTO | SuppyNoteDTO>
}

interface Actions {
  setFilter: (value: string) => void
  unionNotes: (
    fertigationNotes: Record<string, FertigationNoteDTO>, 
    plantNotes: Record<string, PlantNoteDTO>, 
    productionNotes: Record<string, ProductionNoteDTO>, 
    supplyNotes: Record<string, SuppyNoteDTO>
) => Record<string, FertigationNoteDTO | PlantNoteDTO | ProductionNoteDTO | SuppyNoteDTO>
  getNotes: (filter?: string) => FertigationNoteDTO[] | PlantNoteDTO[] | ProductionNoteDTO[] | SuppyNoteDTO[]
  setNotes: (value:Record<string, FertigationNoteDTO | PlantNoteDTO | ProductionNoteDTO | SuppyNoteDTO>) => void
}

export const useNoteStore = create<State & Actions>()(
    persist(
      (set, get) => ({
        notes: {},
        filter: '',
        setFilter(value) {
          set({ filter: value })
        },
        setNotes(value) {
          set({ notes: value})
        },
        getNotes() {
          return Object.values(get().notes).filter((note) => note.order.header.title.includes(get().filter))
        },
        unionNotes(fertigationNotes, plantNotes, productionNotes, supplyNotes) {
          const notes: Record<string, FertigationNoteDTO | PlantNoteDTO | ProductionNoteDTO | SuppyNoteDTO> = Object.assign(
            {}, 
            fertigationNotes, 
            plantNotes, 
            productionNotes, 
            supplyNotes
          )
      
          return notes
        }
      }),
      {
        name: 'os-store',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )