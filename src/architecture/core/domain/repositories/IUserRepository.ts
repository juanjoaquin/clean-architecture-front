import { Result } from "@/src/libs/apiUtils";
import { User } from "../entities/User/User";

export interface IUserRepository {
    getAll(): Promise<Result<User[]>>;
    getById(id: string): Promise<Result<User>>;
}