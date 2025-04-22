import { OSSupplyDTO } from "../types/OSSupplyDTO";
import { OSPlantDTO } from "../types/OSPlantDTO";
import { OSProductionDTO } from "../types/OSProductionDTO";
import { OSFertigationDTO } from "../types/OSFertigationDTO";
import { OSHeaderDTO } from "../types/OSHeaderDTO";
import { AxiosError, AxiosResponse } from "axios";
import { Either } from "fp-ts/lib/Either";

export interface SincronizationRepository {
    getOSHeader(): Promise<AxiosResponse<OSHeaderDTO[]>>;
    getOSPlant(): Promise<OSPlantDTO[]>;
    getOSProduction(): Promise<OSProductionDTO[]>;
    getOSSupply(): Promise<OSSupplyDTO[]>;
    getOSFertigation(url:string): Promise<AxiosResponse<OSFertigationDTO[]>>;
    sendOSPlant(osPlant: Record<string, OSPlantDTO>): Promise<void>;
    sendOSProduction(osProduction: Record<string, OSProductionDTO>): Promise<void>;
    sendOSSupply(osSupply: Record<string, OSSupplyDTO>): Promise<void>;
    sendOSFertigation(osFertigation: Record<string, OSFertigationDTO>): Promise<void>;
    filterOS(os: Record<string, OSFertigationDTO | OSPlantDTO | OSProductionDTO | OSSupplyDTO>, type: OSHeaderDTO['type']): Record<string, OSFertigationDTO | OSPlantDTO | OSProductionDTO | OSSupplyDTO>;
    sincronization(): Promise<void>;
}
