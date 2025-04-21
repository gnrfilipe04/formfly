import { OSFertigationDTO } from "@/domain/types/OSFertigationDTO"
import { leftAlert } from "@/utils/helpers"
import { AxiosError, AxiosResponse } from "axios"
import { Either, fold, left, right } from "fp-ts/lib/Either"
import { ZodError, ZodSchema } from "zod"
import R from 'ramda'
import z from 'zod'

type UseServerDataProps<D> = {
    get: () => Promise<Either<AxiosError, AxiosResponse<OSFertigationDTO[]>>>
    set: (data: D) => void
    validateSchema: ZodSchema
}

export function useServerData<D>(props: UseServerDataProps<D>) {
  
    const formatValidate = (data: D): Either<ZodError, D> => {
  
      const zodValidation = z.array(props.validateSchema).safeParse(data)
  
      return zodValidation.success ? right(data) : left(zodValidation.error)
  
    }

    const trigger = R.pipeWith(R.andThen)([
        props.get,
        fold(
            (error: AxiosError) => leftAlert('Falha ao carregar dados do servidor', error.message, error),
            (response: AxiosResponse<D>) => R.identity(response.data)
        ),
        formatValidate,
        fold(
            (error: ZodError) => leftAlert('Recebendo dados inesperados do servidor', error.errors[0].message, error),
            (data: D) => props.set(data)
        ),
    ])

    return { trigger }
}