import { OSPlantDTO } from "@/src/domain/entities/OSPlant";
import { OSProductionDTO } from "@/src/domain/entities/OSProduction";
import { OSSupplyDTO } from "@/src/domain/entities/OSSupply";
import { OSFertigationDTO } from "@/src/domain/types/OSFertigationDTO";
import { OSHeaderDTO } from "@/src/domain/types/OSHeaderDTO";
import { AppError } from "@/src/error/AppError";
import { AxiosResponse } from "axios";
import { Either } from 'fp-ts/lib/Either'

export interface DatabaseOrdersDataSource {
    getOSHeader(): Promise<AxiosResponse<OSHeaderDTO[]>>;
    getOSPlant(): Promise<Either<AppError, AxiosResponse<OSPlantDTO[]>>>;
    getOSProduction(): Promise<Either<AppError, AxiosResponse<OSProductionDTO[]>>>;
    getOSSupply(): Promise<Either<AppError, AxiosResponse<OSSupplyDTO[]>>>;
    getOSFertigation(): Promise<Either<AppError, AxiosResponse<OSFertigationDTO[]>>>;
    sendOSPlant(osPlant: Record<string, OSPlantDTO>): Promise<void>;
    sendOSProduction(osProduction: Record<string, OSProductionDTO>): Promise<void>;
    sendOSSupply(osSupply: Record<string, OSSupplyDTO>): Promise<void>;
    sendOSFertigation(osFertigation: Record<string, OSFertigationDTO>): Promise<void>;
    sincronization(): Promise<void>;
}
