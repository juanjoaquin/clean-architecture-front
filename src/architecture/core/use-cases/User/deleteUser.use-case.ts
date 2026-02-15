import { Logger } from "@/src/architecture/infraestructure/logger/logger";
import { Err, Result } from "@/src/libs/apiUtils";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { updateTag } from "next/cache";


export async function deleteUser(userRepository: IUserRepository, id: string): Promise<Result<null>> {
    try {
        const response = await userRepository.delete(id);

        if (!response.success) {
            Logger.error(
                { layer: 'USE_CASE', context: 'deleteUser' },
                'Repository returned error',
                response.error
            );
        }

        return response;
    } catch (error) {
        Logger.error(
            { layer: 'USE_CASE', context: 'deleteUser' },
            'Unexpected error in deleteUser',
            error
        );

        return Err(
            error instanceof Error ? error.message : 'Unknown error'
        );
    }
}