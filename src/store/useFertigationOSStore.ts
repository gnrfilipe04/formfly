
import { OSFertigationDTO } from "@/src/domain/types/OSFertigationDTO";
import { persist } from "zustand/middleware";
import { create } from "zustand";

interface State {
    orders: Record<string, OSFertigationDTO>
    osInEdit: OSFertigationDTO | null,
}

interface Actions {
    setOrders: (value: Record<string, OSFertigationDTO>) => void
    getOrders: () => OSFertigationDTO[]
}

export const useFertigationOSStore = create<State & Actions>()(
    persist(
      (set, get) => ({
        orders: {},
        osInEdit: null,
        setOrders(value) {
            set({ orders: value})
        },    
        getOrders() {
            return Object.values(get().orders)
        },
      }),
      {
        name: 'os-fertigation-store',
      }
    )
  )