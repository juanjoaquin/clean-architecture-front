import { Result } from "@/src/libs/apiUtils";
import { TCreateUserInput, TUpdateUserInput, User } from "../entities/User/User";

export interface IUserRepository {
    getAll(): Promise<Result<User[]>>;
    getById(id: string): Promise<Result<User>>;
    create(data: TCreateUserInput): Promise<Result<User>>;
    update(data: TUpdateUserInput): Promise<Result<User>>;
}