import { OSPlantDTO } from "../entities/OSPlant";
import { SincronizationRepository } from "../repositories/SincronizationRepository";
import { OSHeaderDTO } from "../types/OSHeaderDTO";

export class GetOSHeaderUseCase {
    constructor(
        private repository: SincronizationRepository,
    ) {}

    async execute(): Promise<OSHeaderDTO[] | undefined> {
        try {
            return this.repository.getOSHeader(); 
        } catch (error) {
            //  TODO: implement error handler
            console.log(error)
        }

    }
}