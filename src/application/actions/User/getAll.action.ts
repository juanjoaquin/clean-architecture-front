'use server';

import { UserRepository } from "@/src/infraestructure/repositories/user.repository";
import { UserController } from "../../controllers/UserController";

export async function getAllUsersAction() {
    try {
        // Instanciar las capas
        const userRepository = new UserRepository();
        const userController = new UserController(userRepository);

        // Ejecutar a través del Controller
        return await userController.getAllUsers();
    } catch (error) {
        console.error('[ACTION] [getAllUsersAction] Error en getAllUsersAction:', error);
        return {
            data: null,
            error: error instanceof Error ? error : new Error('Unknown error'),
            status: 500
        };
    }
}   