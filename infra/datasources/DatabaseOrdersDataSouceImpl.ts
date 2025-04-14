import { DatabaseOrdersDataSource } from "@/domain/datasources/DatabaseOrdersDataSouce";
import { OSPlantDTO } from "@/domain/entities/OSPlant";
import { OSProductionDTO } from "@/domain/entities/OSProduction";
import { OSSupplyDTO } from "@/domain/entities/OSSupply";
import { OSFertigationDTO } from "@/domain/types/OSFertigationDTO";
import { OSHeaderDTO } from "@/domain/types/OSHeaderDTO";
import axios from "axios";


export class DatabaseOrdersDataSourceImpl  implements DatabaseOrdersDataSource {
    private apiInstance = axios.create({
        baseURL: 'https://localhost:3333/'
    })

    getOSHeader(): Promise<OSHeaderDTO[]> {
        const mockHeader: OSHeaderDTO = {
            id: "1",
            title: "mockTeste", 
            type: 'production',
            description: 'Mock header for testing',
            createdAt: new Date(),
            updatedAt: null,
        }

        return Promise.resolve([mockHeader])
        
        // return this.apiInstance.get('header')
    }
    getOSPlant(): Promise<OSPlantDTO[]> {
        return this.apiInstance.get('plant')
    }
    getOSProduction(): Promise<OSProductionDTO[]> {
        return this.apiInstance.get('production')
    }
    getOSSupply(): Promise<OSSupplyDTO[]> {
        return this.apiInstance.get('supply')
    }
    getOSFertigation(): Promise<OSFertigationDTO[]> {
        return this.apiInstance.get('fertigation')
    }
    sendOSPlant(osPlant: Record<string, OSPlantDTO>): Promise<void> {
        return this.apiInstance.post('plant')
    }
    sendOSProduction(osProduction: Record<string, OSProductionDTO>): Promise<void> {
        return this.apiInstance.post('production')
    }
    sendOSSupply(osSupply: Record<string, OSSupplyDTO>): Promise<void> {
        return this.apiInstance.post('supply')
    }
    sendOSFertigation(osFertigation: Record<string, OSFertigationDTO>): Promise<void> {
        return this.apiInstance.post('fertigation')
    }
    sincronization(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}
