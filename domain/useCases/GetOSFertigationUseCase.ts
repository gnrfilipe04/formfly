import { AxiosError } from "axios";
import { SincronizationRepository } from "../repositories/SincronizationRepository";
import { OSFertigationDTO } from "../types/OSFertigationDTO";

export class GetOSFertigationUseCase {
    constructor(
        private repository: SincronizationRepository,
    ) {}

    async execute(): Promise<OSFertigationDTO[] | undefined> {
        try {
            const result = await this.repository.getOSFertigation(); 
            return result.data
        } catch (error: unknown) {
            const axiosError = error as AxiosError
            console.log(axiosError)
        }

    }
}