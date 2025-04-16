import { OSPlantDTO } from "@/domain/entities/OSPlant";
import { OSProductionDTO } from "@/domain/entities/OSProduction";
import { OSSupplyDTO } from "@/domain/entities/OSSupply";
import { OSFertigationDTO } from "@/domain/types/OSFertigationDTO";
import { OSHeaderDTO } from "@/domain/types/OSHeaderDTO";
import { AxiosResponse } from "axios";


export interface DatabaseOrdersDataSource {
    getOSHeader(): Promise<AxiosResponse<OSHeaderDTO[]>>;
    getOSPlant(): Promise<OSPlantDTO[]>;
    getOSProduction(): Promise<OSProductionDTO[]>;
    getOSSupply(): Promise<OSSupplyDTO[]>;
    getOSFertigation(): Promise<OSFertigationDTO[]>;
    sendOSPlant(osPlant: Record<string, OSPlantDTO>): Promise<void>;
    sendOSProduction(osProduction: Record<string, OSProductionDTO>): Promise<void>;
    sendOSSupply(osSupply: Record<string, OSSupplyDTO>): Promise<void>;
    sendOSFertigation(osFertigation: Record<string, OSFertigationDTO>): Promise<void>;
    sincronization(): Promise<void>;
}
