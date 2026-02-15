import { Err, Result } from "@/src/libs/apiUtils";
import { TUpdateUserInput, User } from "../../domain/entities/User/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Logger } from "@/src/architecture/infraestructure/logger/logger";


export async function updateUser(userRepository: IUserRepository, data: TUpdateUserInput): Promise<Result<User>> {
    try {
        const response = await userRepository.update(data);

        if (!response.success) {
            Logger.error(
                { layer: 'USE_CASE', context: 'updateUser' },
                'Repository returned error',
                response.error
            );
        }

        return response;

    } catch (error) {
        Logger.error(
            { layer: 'USE_CASE', context: 'updateUser' },
            'Unexpected error in updateUser',
            error
        );
        return Err(error instanceof Error ? error.message : 'Unknown error');
    }

}