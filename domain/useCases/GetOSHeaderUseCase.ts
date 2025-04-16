import { AxiosError } from "axios";
import { SincronizationRepository } from "../repositories/SincronizationRepository";
import { OSHeaderDTO } from "../types/OSHeaderDTO";

export class GetOSHeaderUseCase {
    constructor(
        private repository: SincronizationRepository,
    ) {}

    async execute(): Promise<OSHeaderDTO[] | undefined> {
        try {
            const result = await this.repository.getOSHeader(); 
            return result.data
        } catch (error: unknown) {
            const axiosError = error as AxiosError
            console.log(axiosError)
        }

    }
}