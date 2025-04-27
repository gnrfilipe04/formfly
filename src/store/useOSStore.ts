
import { OSFertigationDTO } from "@/src/domain/types/OSFertigationDTO";
import { createJSONStorage, persist } from "zustand/middleware";
import { OSPlantDTO } from "@/src/domain/types/OSPlantDTO";
import { OSProductionDTO } from "@/src/domain/types/OSProductionDTO";
import { OSSupplyDTO } from "@/src/domain/types/OSSupplyDTO";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface State {
  filter: string
  orders: Record<string, OSFertigationDTO | OSPlantDTO | OSProductionDTO | OSSupplyDTO>
}

interface Actions {
  setFilter: (value: string) => void
  getOrders: (filter?: string) => OSFertigationDTO[] | OSPlantDTO[] | OSProductionDTO[] | OSSupplyDTO[]
  setOrders: (value:Record<string, OSFertigationDTO | OSPlantDTO | OSProductionDTO | OSSupplyDTO>) => void
}

export const useOSStore = create<State & Actions>()(
    persist(
      (set, get) => ({
        orders: {},
        filter: '',
        setFilter(value) {
          set({ filter: value })
        },
        setOrders(value) {
          set({ orders: value})
        },
        getOrders() {
          return Object.values(get().orders).filter((order) => order.header.title.includes(get().filter))
        }
      }),
      {
        name: 'os-store',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )