
import { OSFertigationDTO } from "@/src/domain/types/OSFertigationDTO";
import { createJSONStorage, persist } from "zustand/middleware";
import { OSPlantDTO } from "@/src/domain/types/OSPlantDTO";
import { OSProductionDTO } from "@/src/domain/types/OSProductionDTO";
import { OSSupplyDTO } from "@/src/domain/types/OSSupplyDTO";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface State {
  orders: Record<string, OSFertigationDTO | OSPlantDTO | OSProductionDTO | OSSupplyDTO>
}

interface Actions {
  setOrders: (value:Record<string, OSFertigationDTO | OSPlantDTO | OSProductionDTO | OSSupplyDTO>) => void
}

export const useOSStore = create<State & Actions>()(
    persist(
      (set, get) => ({
        orders: {},
        setOrders(value) {
          set({ orders: value})
      },
      }),
      {
        name: 'os-store',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )