import { AppError } from "@/src/error/AppError";
import { OSPlantDTO } from "../entities/OSPlant";
import { SincronizationRepository } from "../repositories/SincronizationRepository";
import { Either, left, right } from "fp-ts/lib/Either";
import R from 'ramda'

export class GetOSPlantUseCase {
    constructor(
        private repository: SincronizationRepository,
    ) {}

    async execute(): Promise<Either<AppError, Record<string, OSPlantDTO>>> {
        try {
            const eitherResult = await this.repository.getOSPlant()

            if(eitherResult._tag === 'Left') return eitherResult

            const record: Record<string, OSPlantDTO> = R.indexBy(
                (item: OSPlantDTO) => item.header.id,
                eitherResult.right.data
              );

            return right(record)
        }catch(e){
            return left(e as AppError)
        }

    }
}