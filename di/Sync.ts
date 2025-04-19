import { GetOSFertigationUseCase } from "@/domain/useCases/GetOSFertigationUseCase";
import { GetOSHeaderUseCase } from "@/domain/useCases/GetOSHeaderUseCase";
import { GetOSPlantUseCase } from "@/domain/useCases/GetOSPlantUseCase";
import { DatabaseOrdersDataSourceImpl } from "@/infra/datasources/DatabaseOrdersDataSouceImpl";
import { SincronizationRepositoryImpl } from "@/infra/repositories/SincronizationRepositoryImpl";
import { api } from "@/services/api";

const dataSource = new DatabaseOrdersDataSourceImpl(api)
const repository = new SincronizationRepositoryImpl(dataSource)
const getOSHeaderUseCase = new GetOSHeaderUseCase(repository)
const getOSPlantUseCase = new GetOSPlantUseCase(repository)
const getOSFertigationUseCase = new GetOSFertigationUseCase(repository)

export {
    getOSHeaderUseCase,
    getOSPlantUseCase,
    getOSFertigationUseCase
}