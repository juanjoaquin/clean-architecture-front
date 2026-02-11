import { Result, Err } from "@/src/libs/apiUtils";
import { User } from "../../domain/entities/User/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Logger } from "@/src/architecture/infraestructure/logger/logger";

export async function getAllUsers(userRepository: IUserRepository): Promise<Result<User[]>> {
    try {
        const response = await userRepository.getAll();
        
        if (!response.success) {
            Logger.error(
                { layer: 'USE_CASE', context: 'getAllUsers' },
                'Repository returned error',
                response.error
            );
        }
        
        return response;
        
    } catch (error) {
        Logger.error(
            { layer: 'USE_CASE', context: 'getAllUsers' },
            'Unexpected error in getAllUsers',
            error
        );
        
        return Err(
            error instanceof Error ? error.message : 'Unknown error'
        );
    }
}