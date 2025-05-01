import { DatabaseOrdersDataSource } from "@/src/domain/datasources/DatabaseOrdersDataSouce";
import { OSFertigation } from "@/src/domain/entities/OSFertigation";
import { OSPlant, OSPlantDTO } from "@/src/domain/entities/OSPlant";
import { OSProductionDTO } from "@/src/domain/entities/OSProduction";
import { OSSupplyDTO } from "@/src/domain/entities/OSSupply";
import { OSFertigationDTO } from "@/src/domain/types/OSFertigationDTO";
import { OSHeaderDTO } from "@/src/domain/types/OSHeaderDTO";
import { AppError } from "@/src/error/AppError";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Either, left, right } from "fp-ts/lib/Either";
import z from 'zod'

export class DatabaseOrdersDataSourceImpl  implements DatabaseOrdersDataSource {

    constructor(private apiInstance: AxiosInstance){}

    async getOSHeader(): Promise<AxiosResponse<OSHeaderDTO[]>> {
        return await this.apiInstance.get('os_header')
    }
    async getOSPlant(): Promise<Either<AppError, AxiosResponse<OSPlantDTO[]>>> {
        try {
            const response = await this.apiInstance.get<OSPlantDTO[]>('os_plant');
            const parsed = z.array(OSPlant).safeParse(response.data);

            if (!parsed.success) {
                return left(AppError.fromZod(parsed.error));
            }

            return right({ ...response, data: response.data });
        } catch (error) {
            return left(AppError.fromAxios(error as AxiosError));
        }
    }
    async getOSProduction(): Promise<Either<AppError, AxiosResponse<OSProductionDTO[]>>> {
        return this.apiInstance.get('production')
    }
    async getOSSupply(): Promise<Either<AppError, AxiosResponse<OSSupplyDTO[]>>> {
        return this.apiInstance.get('supply')
    }
    async getOSFertigation(): Promise<Either<AppError, AxiosResponse<OSFertigationDTO[]>>> {
        try {
            const response = await this.apiInstance.get<OSFertigationDTO[]>('os_fertigation');
            const parsed = z.array(OSFertigation).safeParse(response.data);

            if (!parsed.success) {
                return left(AppError.fromZod(parsed.error));
            }

            return right({ ...response, data: response.data });

        }catch(e){
            return left(AppError.fromAxios(e as AxiosError));
        }
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
