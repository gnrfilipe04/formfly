import { AxiosError } from "axios";
import { SincronizationRepository } from "../repositories/SincronizationRepository";
import { OSFertigationDTO } from "../types/OSFertigationDTO";
import { Either, left, right } from "fp-ts/lib/Either";
import R from 'ramda'
import { AppError } from "@/src/error/AppError";

export class GetOSFertigationUseCase {
    constructor(
        private repository: SincronizationRepository,
    ) {}

    async execute(): Promise<Either<AppError, Record<string, OSFertigationDTO>>> {
        try {
            const eitherResult = await this.repository.getOSFertigation()

            if(eitherResult._tag === 'Left') return eitherResult

            const record: Record<string, OSFertigationDTO> = R.indexBy(
                (item: OSFertigationDTO) => item.header.id,
                eitherResult.right.data
              );

            return right(record)
        }catch(e){
            return left(e as AppError)
        }
    }
}