import { useEffect } from "react"
import { HeaderSearchBarOptions } from '@react-navigation/elements';
import { useServerData } from "@/src/hooks/useServerData"
import { useOSStore } from "@/src/store/useOSStore"
import { useNavigation } from "expo-router"
import { getOSFertigationUseCase, getOSPlantUseCase } from "@/src/di/Sync"
import { z } from "zod"
import { OSFertigation } from "@/src/domain/entities/OSFertigation"
import R from 'ramda'
import { fold } from "fp-ts/lib/Either";
import { OSPlant } from "../../entities/OSPlant";

export function useOrdersController() {
    const navigation = useNavigation()

    const osStore = useOSStore()

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

    const searchBarOptions: HeaderSearchBarOptions = {
        cancelButtonText: 'Cancelar',
        placeholder: 'Pesquisar',
        onChangeText: (e) => osStore.setFilter(e.nativeEvent.text)
    }

    const loading = [loadingPlant, loadingFertigation].some(R.identity)

    const trigger = R.pipeWith(R.andThen)([
        triggerPlant,
        triggerFertigation,
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