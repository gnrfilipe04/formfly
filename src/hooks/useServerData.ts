import { leftAlert } from "@/src/utils/helpers"
import { AxiosError } from "axios"
import { Either, fold } from "fp-ts/lib/Either"
import { ZodSchema } from "zod"
import R from 'ramda'
import { useState } from "react"
import { AppError } from "../error/AppError"

type UseServerDataProps<D> = {
    get: () => Promise<Either<AppError, D>>
    set: (data: D) => void
    validateSchema: ZodSchema
}

export function useServerData<D>(props: UseServerDataProps<D>) {

    const [ loading, setLoading ] = useState(false)
  
    const handleLoading = (value: boolean) => 
        Promise.resolve(setLoading(value)) //Return a promise because the pipeWith with AndThen

    const handleError = (error: AppError) => {

        if(error.cause instanceof AxiosError){
            return leftAlert(error.message, `${error.cause}`, error)
        } else {
            return leftAlert(error.message, `${error.cause.errors[0].message}`, error)
        }
    }

    const trigger = R.pipeWith(R.andThen)([
        () => handleLoading(true),
        props.get,
        fold( handleError, props.set ),
        () => handleLoading(false),
    ])

    return { trigger, loading }
}