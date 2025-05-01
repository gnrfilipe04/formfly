import { AppError } from "@/src/error/AppError";
import { OSPlantDTO } from "../entities/OSPlant";
import { SincronizationRepository } from "../repositories/SincronizationRepository";
import { Either, left, right } from "fp-ts/lib/Either";
import R from 'ramda'
import { OSProductionDTO } from "../entities/OSProduction";

export class GetOSProductionUseCase {
    constructor(
        private repository: SincronizationRepository,
    ) {}

    async execute(): Promise<Either<AppError, Record<string, OSProductionDTO>>> {
        try {
            const eitherResult = await this.repository.getOSProduction()

            if(eitherResult._tag === 'Left') return eitherResult

            const record: Record<string, OSProductionDTO> = R.indexBy(
                (item: OSProductionDTO) => item.header.id,
                eitherResult.right.data
              );

            return right(record)
        }catch(e){
            return left(e as AppError)
        }

    }
}