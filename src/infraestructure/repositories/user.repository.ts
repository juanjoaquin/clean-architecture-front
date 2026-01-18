import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { HttpClient } from "../htttp/httpClient";
import { API_CONFIG } from "../htttp/apiConfig";
import { User } from "@/src/domain/entities/User/User";

// Tipo para la respuesta del backend (formato Go)
interface BackendUserResponse {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    Course: any | null;
}

interface BackendApiResponse<T> {
    message: string;
    status: number;
    data: T;
}

export class UserRepository implements IUserRepository {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient(API_CONFIG.userService || '');
    }

    async getAll(): Promise<{ data: User[] | null; error: string | null }> {
        try {
            // El backend devuelve { message, status, data }
            const response = await this.httpClient.get<BackendApiResponse<BackendUserResponse[]>>('/users');
            
            if (response.error) {
                return { data: null, error: response.error };
            }

            if (!response.data || !response.data.data) {
                return { data: null, error: 'No data received from API' };
            }

            // Transformar de formato backend (snake_case) a formato dominio (camelCase)
            const users: User[] = response.data.data.map((backendUser) => ({
                id: backendUser.id,
                firstName: backendUser.first_name,
                lastName: backendUser.last_name,
                email: backendUser.email,
                phone: backendUser.phone,
            }));

            return { data: users, error: null };
        } catch (error) {
            console.error('[REPOSITORY] [getAll] Error:', error);
            return {
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }

    async getById(id: string): Promise<{ data: User | null; error: string | null }> {
        try {
            const response = await this.httpClient.get<BackendApiResponse<BackendUserResponse>>(`/users/${id}`);
            if (response.error) {
                return { data: null, error: response.error };
            }

            if (!response.data || !response.data.data) {
                return { data: null, error: 'No data received from API' };
            }
            
            const user: User = {
                id: response.data.data.id,
                firstName: response.data.data.first_name,
                lastName: response.data.data.last_name,
                email: response.data.data.email,
                phone: response.data.data.phone,
            }

            return { data: user, error: null };
        } catch (error) {
            console.error('[REPOSITORY] [getById] Error:', error);
            return { data: null, error: error instanceof Error ? error.message : 'Unknown error occurred' };
        }
    }
}