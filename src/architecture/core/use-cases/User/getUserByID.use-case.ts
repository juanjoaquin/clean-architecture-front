import { Err, Result } from "@/src/libs/apiUtils";
import { User } from "../../domain/entities/User/User";
import { Logger } from "@/src/architecture/infraestructure/logger/logger";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export async function getUserById(id: string, userRepository: IUserRepository): Promise<Result<User>> {
    try {
        const response = await userRepository.getById(id);
        if (!response.success) {
            if (response.code !== 'NOT_FOUND') {
                Logger.error(
                    { layer: 'USE_CASE', context: 'getUserById' },
                    'Repository returned error',
                    response.error
                );
            }
            return response;
        }
        return response;
    } catch (error) {
        Logger.error(
            { layer: 'USE_CASE', context: 'getUserById' },
            'Unexpected error in getUserById',
            error
        );
        return Err(error instanceof Error ? error.message : 'Unknown error');
    }
}