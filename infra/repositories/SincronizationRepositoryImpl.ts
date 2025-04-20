import { OSPlantDTO } from "@/domain/entities/OSPlant";
import { OSHeaderDTO } from "@/domain/types/OSHeaderDTO";
import { SincronizationRepository } from "@/domain/repositories/SincronizationRepository";
import { OSFertigationDTO } from "@/domain/types/OSFertigationDTO";
import { OSProductionDTO } from "@/domain/types/OSProductionDTO";
import { OSSupplyDTO } from "@/domain/types/OSSupplyDTO";
import { DatabaseOrdersDataSource } from "@/domain/datasources/DatabaseOrdersDataSouce";
import { AxiosError, AxiosResponse } from "axios";
import { Either, left, right } from "fp-ts/lib/Either";

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

    async getOSFertigation(): Promise<Either<AxiosError, AxiosResponse<OSFertigationDTO[]>>> {
        try {
            const promise = await this.dataSource.getOSFertigation()
            return right(promise)
        } catch (error) {
            return left(error as AxiosError)
        }

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