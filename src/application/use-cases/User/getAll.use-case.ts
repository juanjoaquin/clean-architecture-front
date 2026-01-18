import { User } from "@/src/domain/entities/User/User";
import { IUserRepository } from "@/src/domain/repositories/IUserRepository";

export class GetAllUsersUseCase {
    constructor(private userRepository: IUserRepository) {}

    async getAll(): Promise<{ data: User[] | null; error: string | null }> {
        try {
            const response = await this.userRepository.getAll();
            if (!response || !response.data) {
                throw new Error(response?.error || '[USE CASE] [getAllUsers] Error en getAllUsers: No data returned');
            }
            return response;
        } catch (error) {
            console.error('[USE CASE] [getAllUsers] Error en getAllUsers:', error);
            return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
        }
    }

}