import { AxiosError, AxiosResponse } from "axios";
import { SincronizationRepository } from "../repositories/SincronizationRepository";
import { OSFertigationDTO } from "../types/OSFertigationDTO";
import { Either } from "fp-ts/lib/Either";

export class GetOSFertigationUseCase {
    constructor(
        private repository: SincronizationRepository,
    ) {}

    execute(): Promise<Either<AxiosError, AxiosResponse<OSFertigationDTO[]>>> {
        return this.repository.getOSFertigation();
    }
}