import { OSSupplyDTO } from "../types/OSSupplyDTO";
import { OSPlantDTO } from "../types/OSPlantDTO";
import { OSProductionDTO } from "../types/OSProductionDTO";
import { OSFertigationDTO } from "../types/OSFertigationDTO";
import { OSHeaderDTO } from "../types/OSHeaderDTO";
import { AxiosResponse } from "axios";
import { Either } from "fp-ts/lib/Either";
import { AppError } from "@/src/error/AppError";

export interface SincronizationRepository {
    getOSHeader(): Promise<AxiosResponse<OSHeaderDTO[]>>;
    getOSPlant(): Promise<Either<AppError, AxiosResponse<OSPlantDTO[]>>>;
    getOSProduction(): Promise<Either<AppError, AxiosResponse<OSProductionDTO[]>>>;
    getOSSupply(): Promise<Either<AppError, AxiosResponse<OSSupplyDTO[]>>>;
    getOSFertigation(): Promise<Either<AppError, AxiosResponse<OSFertigationDTO[]>>>;
    sendOSPlant(osPlant: Record<string, OSPlantDTO>): Promise<void>;
    sendOSProduction(osProduction: Record<string, OSProductionDTO>): Promise<void>;
    sendOSSupply(osSupply: Record<string, OSSupplyDTO>): Promise<void>;
    sendOSFertigation(osFertigation: Record<string, OSFertigationDTO>): Promise<void>;
    filterOS(os: Record<string, OSFertigationDTO | OSPlantDTO | OSProductionDTO | OSSupplyDTO>, type: OSHeaderDTO['type']): Record<string, OSFertigationDTO | OSPlantDTO | OSProductionDTO | OSSupplyDTO>;
    sincronization(): Promise<void>;
}
