
import { OSFertigationDTO } from "@/src/domain/types/OSFertigationDTO";
import { OSHeaderDTO } from "@/src/domain/types/OSHeaderDTO";
import { createJSONStorage, persist } from "zustand/middleware";
import { OSPlantDTO } from "@/src/domain/types/OSPlantDTO";
import { OSProductionDTO } from "@/src/domain/types/OSProductionDTO";
import { OSSupplyDTO } from "@/src/domain/types/OSSupplyDTO";
import { create } from "zustand";
import uuid from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface State {
    osList: Record<string, OSFertigationDTO | OSPlantDTO | OSProductionDTO | OSSupplyDTO>
    osInEdit: OSFertigationDTO | OSPlantDTO | OSProductionDTO | OSSupplyDTO | null,
}

interface Actions {
    createOS: (type: OSHeaderDTO['type']) => void,
}

export const useOSStore = create<State & Actions>()(
    persist(
      (set, get) => ({
        osList: {},
        osInEdit: null,
        createOS: (type: OSHeaderDTO['type']) => {
          const header: OSHeaderDTO = {
            id: uuid.v4(),
            title: "",
            description: "",
            type,
            createdAt: new Date().toISOString(),
            updatedAt: null,
          }

          switch(type) {
            case 'fertigation':
              const fertigationOS: OSFertigationDTO = {
                header,
                locale: "",
                quantity: 0,
              } 

              const osListWithFertigation = Object.assign({}, get().osList, { [header.id]: fertigationOS })

              set({ osList: osListWithFertigation, })
              break
            case 'plant':
              const plantOS: OSPlantDTO = {
                header,
                locale: "",
                quantity: 0,
                type: "muda",
              } 
              const osListWithPlant = Object.assign({}, get().osList, { [header.id]: plantOS })

              set({ osList: osListWithPlant, })
              break
            case 'production':
              const productionOS: OSProductionDTO = {
                header,
                type: "muda",
                date: new Date(),
                locale: "",
                quantity: 0,
                equipment: "",
              } 

              const osListWithProduction = Object.assign({}, get().osList, { [header.id]: productionOS })

              set({ osList: osListWithProduction, })
              break
            case 'supply':
              const supplyOS: OSSupplyDTO = {
                header,
                date: new Date(),
                locale: "",
                quantity: 0,
                internalCode: false,
              }
              const osListWithSupply = Object.assign({}, get().osList, { [header.id]: supplyOS })

              set({ osList: osListWithSupply, })
              break
          }
        }
      }),
      {
        name: 'os-store',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )