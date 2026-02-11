import { User } from "../../core/domain/entities/User/User";

export interface BackendUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    Course: any | null;
}

export class UserMapper {
    static fromBackend(backend: BackendUser): User {
        return {
            id: backend.id,
            firstName: backend.first_name || "",        // maneja vacío o undefined
            lastName: backend.last_name || "",
            email: backend.email || "",
            phone: backend.phone || "",
            // si User tiene más campos o es una class con constructor:
            // return User.create({ ... })
        };
    }
}