import { User } from "../entities/User/User";

export interface IUserRepository {
    getAll(): Promise<{ data: User[] | null; error: string | null }>;
    getById(id: string): Promise<{ data: User | null; error: string | null }>;
}