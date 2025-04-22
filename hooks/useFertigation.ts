import { getOSFertigationUseCase } from '@/di/Sync'
import { OSFertigation } from '@/domain/entities/OSFertigation'
import { IGetError } from '@/domain/types/IGetError'
import { OSFertigationDTO } from '@/domain/types/OSFertigationDTO'
import { useHomeReducers } from '@/reducers/home'
import { api } from '@/services/api'
import { Alert } from 'react-native'
import useSWRMutation from 'swr/mutation'
import z from 'zod'

const FertigationSchema = z.array(OSFertigation)

const fetcher = async (url: string): Promise<OSFertigationDTO[]> => {
    const response = await api.get(url)
    const validation = FertigationSchema.safeParse(response.data)
    if (!validation.success) {
      throw validation.error
    }
  
    return response.data
}
  
export function useFertigation(){
    const { 
        fertigationDispatch, 
        fertigationState
     } = useHomeReducers()

    const handleError = (error: unknown): IGetError => {
        if (error instanceof z.ZodError) {
            const zodErrors = error.issues
            
            return {
                type: 'ValidationError',
                title: 'Erro ao carregar dados de fertirrigação',
                message: `Formato de dados inválido \n${zodErrors[0].path[1]} - ${zodErrors[0].message}`,
                details: error.errors
            }
        }
        
        if (error instanceof Error) {
            return {
                type: 'NetworkError',
                title: 'Erro ao carregar dados do servidor', 
                message: error.message
            }
        }

        return {
            type: 'UnknownError',
            title: 'Erro desconhecido',
            message: 'An unexpected error occurred'
        }
    }

    const getOrders = useSWRMutation('os_fertigation', fetcher, {
        onError: (error) => {
            const errors = handleError(error)
            return Alert.alert(errors.title, errors.message)
        },
        onSuccess: (data) => {
            fertigationDispatch({
                type: 'SET',
                payload: data
            })
        }
    })

    return {
        getOrders,
        data: fertigationState.osFertigationList
    }
}