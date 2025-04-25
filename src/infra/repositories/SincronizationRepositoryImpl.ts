import { OSPlantDTO } from "@/src/domain/entities/OSPlant";
import { OSHeaderDTO } from "@/src/domain/types/OSHeaderDTO";
import { SincronizationRepository } from "@/src/domain/repositories/SincronizationRepository";
import { OSFertigationDTO } from "@/src/domain/types/OSFertigationDTO";
import { OSProductionDTO } from "@/src/domain/types/OSProductionDTO";
import { OSSupplyDTO } from "@/src/domain/types/OSSupplyDTO";
import { DatabaseOrdersDataSource } from "@/src/domain/datasources/DatabaseOrdersDataSouce";
import { AxiosError, AxiosResponse } from "axios";
import { Either, left, right } from "fp-ts/lib/Either";
import { AppError } from "@/src/error/AppError";

export class SincronizationRepositoryImpl implements SincronizationRepository {
    constructor(private dataSource: DatabaseOrdersDataSource) {}

    async getOSHeader(): Promise<AxiosResponse<OSHeaderDTO[]>> {

        try {
            return this.dataSource.getOSHeader();
        } catch (error) {
            throw error;
        }   
    }

    async getOSPlant(): Promise<OSPlantDTO[]> {
        try {
            return this.dataSource.getOSPlant();
        } catch (error) {
            throw error;
        }
    }

    async getOSProduction(): Promise<OSProductionDTO[]> {
        try {
            return this.dataSource.getOSProduction();
        } catch (error) {
            throw error;
        }
    }

    async getOSSupply(): Promise<OSSupplyDTO[]> {
        try {
            return this.dataSource.getOSSupply();
        } catch (error) {
            throw error;
        }
    }

    async getOSFertigation(): Promise<Either<AppError, AxiosResponse<OSFertigationDTO[]>>> {
        return this.dataSource.getOSFertigation()

    }

    async sendOSPlant(osPlant: Record<string, OSPlantDTO>): Promise<void> {
        try {
            return this.dataSource.sendOSPlant(osPlant);
        } catch (error) {
            throw error;
        }
    }

    async sendOSProduction(osProduction: Record<string, OSProductionDTO>): Promise<void> {
        try {
            return this.dataSource.sendOSProduction(osProduction);
        } catch (error) {
            throw error;
        }
    }

    async sendOSSupply(osSupply: Record<string, OSSupplyDTO>): Promise<void> {
        try {
            return this.dataSource.sendOSSupply(osSupply);
        } catch (error) {
            throw error;
        }
    }

    async sendOSFertigation(osFertigation: Record<string, OSFertigationDTO>): Promise<void> {
        try {
            return this.dataSource.sendOSFertigation(osFertigation);
        } catch (error) {
            throw error;
        }
    }

    filterOS(os: Record<string, OSFertigationDTO | OSPlantDTO | OSProductionDTO | OSSupplyDTO>, type: OSHeaderDTO['type']): Record<string, OSFertigationDTO | OSPlantDTO | OSProductionDTO | OSSupplyDTO> {
        try {
            const osEntries = Object.entries(os)
                .filter(([key, value]) => value.header.type === type)

            return Object.fromEntries(osEntries)
        } catch (error) {
            throw error;
        }
    }

    sincronization(): Promise<void> {
        try {
            return this.dataSource.sincronization();
        } catch (error) {   
            throw error
        }
    }
    
}