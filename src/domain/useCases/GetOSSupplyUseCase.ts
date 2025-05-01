import { AppError } from "@/src/error/AppError";
import { OSPlantDTO } from "../entities/OSPlant";
import { SincronizationRepository } from "../repositories/SincronizationRepository";
import { Either, left, right } from "fp-ts/lib/Either";
import R from 'ramda'
import { OSProductionDTO } from "../entities/OSProduction";
import { OSSupplyDTO } from "../entities/OSSupply";

export class GetOSSupplyUseCase {
    constructor(
        private repository: SincronizationRepository,
    ) {}

    async execute(): Promise<Either<AppError, Record<string, OSSupplyDTO>>> {
        try {
            const eitherResult = await this.repository.getOSSupply()

            if(eitherResult._tag === 'Left') return eitherResult

            const record: Record<string, OSSupplyDTO> = R.indexBy(
                (item: OSSupplyDTO) => item.header.id,
                eitherResult.right.data
              );

            return right(record)
        }catch(e){
            return left(e as AppError)
        }

    }
}