import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { GetAllUsersUseCase } from "../use-cases/User/getAll.use-case";
import { User } from "@/src/domain/entities/User/User";
import { GetUserByIdUseCase } from "../use-cases/User/getById.use-case";

export class UserController {
    private getAllUsersUseCase: GetAllUsersUseCase;
    private getUserByIdUseCase: GetUserByIdUseCase;

    constructor(userRepository: IUserRepository) {
        this.getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
        this.getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    }

    async getAllUsers(): Promise<{ data: User[] | null; error: string | null }> {
        try {
            const response = await this.getAllUsersUseCase.getAll();
            if (!response || !response.data) {
                throw new Error(response?.error || '[CONTROLLER] [getAllUsers] Error en getAllUsers: No data returned');
            }
            return response;
        } catch (error) {
            console.error('[CONTROLLER] [getAllUsers] Error en getAllUsers:', error);
            return {
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    async getUserById(id: string): Promise<{ data: User | null; error: string | null }> {
        try {
            const response = await this.getUserByIdUseCase.getUserById(id);
            if (!response || !response.data) {
                throw new Error(response?.error || '[CONTROLLER] [getUserById] Error en getUserById: No data returned');
            }
            return response;
        }
        catch (error) {
            console.error('[CONTROLLER] [getUserById] Error en getUserById:', error);
            return {
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }
}

