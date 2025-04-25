import { OSPlantDTO } from "../entities/OSPlant";
import { SincronizationRepository } from "../repositories/SincronizationRepository";

export class GetOSPlantUseCase {
    constructor(
        private repository: SincronizationRepository,
    ) {}

    async execute(): Promise<OSPlantDTO[] | undefined> {
        try {
            return this.repository.getOSPlant(); 
        } catch (error) {
            //  TODO: implement error handler
            console.log(error)
        }

    }
}