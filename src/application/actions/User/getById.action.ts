'use server';

import { UserRepository } from "@/src/infraestructure/repositories/user.repository";
import { UserController } from "../../controllers/UserController";

export async function getUserByIdAction(id: string) {
    try {
        const userRepository = new UserRepository();
        const userController = new UserController(userRepository);
        return await userController.getUserById(id);
    } catch (error) {
        console.error('[ACTION] [getUserByIdAction] Error en getUserByIdAction:', error);
        return { data: null, error: error instanceof Error ? error : new Error('Unknown error'), status: 500 };
    }
}