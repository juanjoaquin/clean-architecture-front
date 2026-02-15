import { IUserRepository } from "@/src/architecture/core/domain/repositories/IUserRepository";
import { HttpClient } from "../htttp/httpClient";
import { API_CONFIG } from "../htttp/apiConfig";
import { TCreateUserInput, TUpdateUserInput, User } from "@/src/architecture/core/domain/entities/User/User";
import { Result } from "@/src/libs/apiUtils";
import { BackendUser, UserMapper } from "../dtos/UserResponse";

// Tipo para la respuesta del backend (formato Go)


export class UserRepository implements IUserRepository {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient(API_CONFIG.userService || '');
    }

    async getAll(): Promise<Result<User[]>> {
        const response = await this.httpClient.get<BackendUser[]>('users', {
            next: {
                tags: ['users']
            }
        })

        if (!response.success) {
            return response; // TS sabe que acá NO hay data
        }

        const users = response.data.map(UserMapper.fromBackend);

        return {
            success: true,
            data: users
        };

    }

    async getById(id: string): Promise<Result<User>> {
        const response = await this.httpClient.get<BackendUser>(`users/${id}`, {
            next: {
                tags: ['users']
            }
        });

        if (!response.success) {
            return response;
        }
        const user = UserMapper.fromBackend(response.data);
        
        return {
            success: true,
            data: user
        };
    }

    async create(data: TCreateUserInput): Promise<Result<User>> {
        return await this.httpClient.post<User>('users', data, {
            next: {
                tags: ['users']
            }
        });
    }

    async update(data: TUpdateUserInput): Promise<Result<User>> {
        // Mapea los datos al formato del backend
        const backendData = UserMapper.toBackendUpdate(data);

        
        // Envía PATCH con el ID en la URL
        const response = await this.httpClient.patch<BackendUser>(
            `users/${data.id}`, // 👈 ID en la URL
            backendData,         // 👈 Datos mapeados (sin el id)
            {
                next: {
                    tags: ['users', `users-${data.id}`]
                }
            }
        );

    
        if (!response.success) {
            return response;
        }
    
        // Mapea la respuesta del backend a tu entidad de dominio
        const user = UserMapper.fromBackend(response.data);

        
        return {
            success: true,
            data: user
        };
    }
}