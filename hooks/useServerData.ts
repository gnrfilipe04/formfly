import { OSFertigationDTO } from "@/domain/types/OSFertigationDTO"
import { leftAlert } from "@/utils/helpers"
import { AxiosError, AxiosResponse } from "axios"
import { Either, fold } from "fp-ts/lib/Either"
import { ZodError } from "zod"
import R from 'ramda'

type UseServerDataProps<D> = {
    get: () => Promise<Either<AxiosError, AxiosResponse<OSFertigationDTO[]>>>
    set: (data: D) => void
    validate: (data: D) => Either<ZodError, D>
}

export function useServerData<D>(props: UseServerDataProps<D>) {
    const trigger = R.pipeWith(R.andThen)([
        props.get,
        fold(
            (error: AxiosError) => leftAlert('Falha ao carregar dados do servidor', error.message, error),
            (response: AxiosResponse<D>) => R.identity(response.data)
        ),
        props.validate,
        fold(
            (error: ZodError) => leftAlert('Recebendo dados inesperados do servidor', error.errors[0].message, error),
            (data: D) => props.set(data)
        ),
    ])

    return { trigger }
}