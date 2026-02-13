import { Err, Result } from "@/src/libs/apiUtils";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { TCreateUserInput } from "../../domain/entities/User/User";
import { User } from "../../domain/entities/User/User";
import { Logger } from "@/src/architecture/infraestructure/logger/logger";

export async function createUser(userRepository: IUserRepository, data: TCreateUserInput): Promise<Result<User>> {

    try {
        const response = await userRepository.create(data);
        
        if (!response.success) {
            Logger.error(
                { layer: 'USE_CASE', context: 'createUser' },
                'Repository returned error',
                response.error
            );
            return response;
        }
        
        return response;
    } catch (error) {
        
        Logger.error(
            { layer: 'USE_CASE', context: 'createUser' },
            'Unexpected error in createUser',
            error
        );
        
        return Err(error instanceof Error ? error.message : 'Unknown error');
    }
}
