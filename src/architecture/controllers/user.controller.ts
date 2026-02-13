import { IUserRepository } from "@/src/architecture/core/domain/repositories/IUserRepository";
import { TCreateUserInput, User } from "@/src/architecture/core/domain/entities/User/User";
import { Logger } from "@/src/architecture/infraestructure/logger/logger";
import { Err, Result } from "@/src/libs/apiUtils";
import { getAllUsers } from "../core/use-cases/User/getAllUsers.use-case";
import { getUserById } from "../core/use-cases/User/getUserByID.use-case";
import { createUser } from "../core/use-cases/User/createUser.use-case";

export class UserController {
    constructor(private userRepository: IUserRepository) {}

    async getAllUsers(): Promise<Result<User[]>> {
        try {
            const result = await getAllUsers(this.userRepository);
            if (!result.success) {
                Logger.error(
                    { layer: '[CONTROLLER]', context: 'user.controller.GetAllUsers' },
                    '[USE-CASE] [ERROR] Failed to get users',
                    result.error
                )
            }
            return result
        } catch (error) {
            Logger.error(
                { layer: 'USE_CASE', context: 'GetAllUsersUseCase' },
                'Unexpected error',
                error
            );

            return Err(
                error instanceof Error ? error.message : 'Unknown error'
            );
        }
    }

    async getUserByID(id: string): Promise<Result<User>> {
        try {
            const result = await getUserById(id, this.userRepository);
            if (!result.success) {
                Logger.error(
                    { layer: '[CONTROLLER]', context: 'user.controller.GetUserByID' },
                    '[USE-CASE] [ERROR] Failed to get user',
                    result.error
                )
            }
            return result;
        } catch (error) {
            Logger.error(
                { layer: 'USE_CASE', context: 'GetUserByIDUseCase' },
                'Unexpected error',
                error
            );
            return Err(
                error instanceof Error ? error.message : 'Unknown error'
            );
        }
    }

    async createUser(data: TCreateUserInput): Promise<Result<User>> {
        try {
            const response = await createUser(this.userRepository, data);
            if (!response.success) {
                Logger.error(
                    { layer: '[CONTROLLER]', context: 'user.controller.CreateUser' },
                    '[USE-CASE] [ERROR] Failed to create user',
                    response.error
                )
            }
            return response;
        }
        catch (error) {
            Logger.error(
                { layer: 'USE_CASE', context: 'GetUserByIDUseCase' },
                'Unexpected error',
                error
            );
            return Err(
                error instanceof Error ? error.message : 'Unknown error'
            );
        }
    }



}

