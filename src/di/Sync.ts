import { GetOSFertigationUseCase } from "@/src/domain/useCases/GetOSFertigationUseCase";
import { GetOSHeaderUseCase } from "@/src/domain/useCases/GetOSHeaderUseCase";
import { GetOSPlantUseCase } from "@/src/domain/useCases/GetOSPlantUseCase";
import { DatabaseOrdersDataSourceImpl } from "@/src/infra/datasources/DatabaseOrdersDataSouceImpl";
import { SincronizationRepositoryImpl } from "@/src/infra/repositories/SincronizationRepositoryImpl";
import { api } from "@/src/services/api";

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