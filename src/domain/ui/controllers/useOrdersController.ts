import { useEffect } from "react"
import { HeaderSearchBarOptions } from '@react-navigation/elements';
import { useServerData } from "@/src/hooks/useServerData"
import { useOSStore } from "@/src/store/useOSStore"
import { useNavigation } from "expo-router"
import { getOSFertigationUseCase, getOSPlantUseCase, getOSProductionUseCase, getOSSupplyUseCase } from "@/src/di/Sync"
import { z } from "zod"
import { OSFertigation } from "@/src/domain/entities/OSFertigation"
import R from 'ramda'
import { fold } from "fp-ts/lib/Either";
import { OSPlant } from "../../entities/OSPlant";
import { OSProduction } from "../../entities/OSProduction";
import { OSSupply } from "../../entities/OSSupply";

export function useOrdersController() {
    const navigation = useNavigation()

    const osStore = useOSStore()

    const searchBarOptions: HeaderSearchBarOptions = {
        cancelButtonText: 'Cancelar',
        placeholder: 'Pesquisar',
        onChangeText: (e) => osStore.setFilter(e.nativeEvent.text)
    }

    const { trigger: triggerFertigation, loading: loadingFertigation } = useServerData<typeof osStore.orders>({
        get: () => getOSFertigationUseCase.execute(),
        set: osStore.mergeOrders,
        validateSchema: z.record(z.string(), OSFertigation)
    })

    const { trigger: triggerPlant, loading: loadingPlant } = useServerData<typeof osStore.orders>({
        get: () => getOSPlantUseCase.execute(),
        set: osStore.mergeOrders,
        validateSchema: z.record(z.string(), OSPlant)
    })

    const { trigger: triggerProduction, loading: loadingProduction } = useServerData<typeof osStore.orders>({
        get: () => getOSProductionUseCase.execute(),
        set: osStore.mergeOrders,
        validateSchema: z.record(z.string(), OSProduction)
    })

    const { trigger: triggerSupply, loading: loadingSupply } = useServerData<typeof osStore.orders>({
        get: () => getOSSupplyUseCase.execute(),
        set: osStore.mergeOrders,
        validateSchema: z.record(z.string(), OSSupply)
    })

    const loading = [loadingPlant, loadingFertigation, loadingProduction, loadingSupply].some(R.identity)

    const trigger = R.pipeWith(R.andThen)([
        triggerPlant,
        triggerFertigation,
        triggerProduction,
        triggerSupply,
        fold( R.identity, R.identity ),
    ])

    useEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: searchBarOptions
        })
    }, [navigation])

    useEffect(() => {
        trigger()
    }, [])

    return {
        loading,
        trigger,
        osStore
    }

}