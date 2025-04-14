import { GetOSHeaderUseCase } from "@/domain/useCases/GetOSHeaderUseCase";
import { GetOSPlantUseCase } from "@/domain/useCases/GetOSPlantUseCase";
import { DatabaseOrdersDataSourceImpl } from "@/infra/datasources/DatabaseOrdersDataSouceImpl";
import { SincronizationRepositoryImpl } from "@/infra/repositories/SincronizationRepositoryImpl";

const dataSource = new DatabaseOrdersDataSourceImpl()
const repository = new SincronizationRepositoryImpl(dataSource)
const getOSHeaderUseCase = new GetOSHeaderUseCase(repository)
const getOSPlantUseCase = new GetOSPlantUseCase(repository)

export {
    getOSHeaderUseCase,
    getOSPlantUseCase
}