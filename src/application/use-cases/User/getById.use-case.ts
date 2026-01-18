import { User } from "@/src/domain/entities/User/User";
import { IUserRepository } from "@/src/domain/repositories/IUserRepository";

export class GetUserByIdUseCase {
    constructor(private userRepository: IUserRepository) {}

    async getUserById(id: string): Promise<{ data: User | null; error: string | null }> {
        try {
            const response = await this.userRepository.getById(id);
            if (!response || !response.data) {
                throw new Error(response?.error || '[USE CASE] [getUserById] Error en getUserById: No data returned');
            }
            return response;
        } catch (error) {
            console.error('[USE CASE] [getUserById] Error en getUserById:', error);
            return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
        }
    }

}