import { IUserRepository } from "@/src/architecture/core/domain/repositories/IUserRepository";
import { TCreateUserInput, TUpdateUserInput, User } from "@/src/architecture/core/domain/entities/User/User";
import { Logger } from "@/src/architecture/infraestructure/logger/logger";
import { Err, Result } from "@/src/libs/apiUtils";
import { getAllUsers } from "../core/use-cases/User/getAllUsers.use-case";
import { getUserById } from "../core/use-cases/User/getUserByID.use-case";
import { createUser } from "../core/use-cases/User/createUser.use-case";
import { updateUser } from "../core/use-cases/User/updateUser.use-case";
import { deleteUser } from "../core/use-cases/User/deleteUser.use-case";

export class UserController {
    constructor(private userRepository: IUserRepository) { }

    async getAllUsers(): Promise<Result<User[]>> {
        try {
            const result = await getAllUsers(this.userRepository);
            if (!result.success) {
                Logger.error(
                    { layer: '[CONTROLLER]', context: 'user.controller.GetAllUsers' },
                    '[CONTROLLER] [ERROR] Failed to get users',
                    result.error
                )
            }
            return result
        } catch (error) {
            Logger.error(
                { layer: 'CONTROLLER', context: 'user.controller.GetAllUsers' },
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

            return result;
        } catch (error) {
			
            throw error;

        }
    }

    async createUser(data: TCreateUserInput): Promise<Result<User>> {
        try {
            const response = await createUser(this.userRepository, data);
            if (!response.success) {
                Logger.error(
                    { layer: '[CONTROLLER]', context: 'user.controller.CreateUser' },
                    '[CONTROLLER] [ERROR] Failed to create user',
                    response.error
                )
            }
            return response;
        }
        catch (error) {
            Logger.error(
                { layer: 'CONTROLLER', context: 'user.controller.CreateUser' },
                'Unexpected error',
                error
            );
            return Err(
                error instanceof Error ? error.message : 'Unknown error'
            );
        }
    }

    async updateUser(data: TUpdateUserInput): Promise<Result<User>> {
        try {
            const response = await updateUser(this.userRepository, data);
            
            if (!response.success) {
                Logger.error(
                    { layer: '[CONTROLLER]', context: 'user.controller.UpdateUser' },
                    '[CONTROLLER] [ERROR] Failed to update user',
                    response.error
                )
            }

            return response;
        } catch (error) {
            Logger.error(
                { layer: 'CONTROLLER', context: 'updateUser' },
                'Unexpected error',
                error
            );
            return Err(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    async deleteUser(id: string): Promise<Result<null>> {
        try {
            const response = await deleteUser(this.userRepository, id);
            
            if (!response.success) {
                Logger.error(
                    { layer: '[CONTROLLER]', context: 'user.controller.DeleteUser' },
                    '[CONTROLLER] [ERROR] Failed to delete user',
                    response.error
                )
            }

            return response;
        }
        catch (error) {
            Logger.error(
                { layer: 'CONTROLLER', context: 'user.controller.DeleteUser' },
                'Unexpected error',
                error
            );
            return Err(error instanceof Error ? error.message : 'Unknown error');
        }
    }
}

