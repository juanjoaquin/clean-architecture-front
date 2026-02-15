'use server';

import { Err, Result } from "@/src/libs/apiUtils";
import { TUpdateUserInput, User } from "../../core/domain/entities/User/User";
import { Logger } from "../../infraestructure/logger/logger";
import { UserRepository } from "../../infraestructure/repositories/user.repository";
import { UserController } from "../../controllers/user.controller";


export async function updateUserAction(data: TUpdateUserInput): Promise<Result<User>> {
    try {
        const userRepository = new UserRepository();
        const userController = new UserController(userRepository);
        const response = await userController.updateUser(data);

        if (!response.success) {
            Logger.error(
                { layer: 'ACTION', context: 'updateUserAction' },
                'Controller returned error',
                response.error
            );
        }

        return response;
    } catch (error) {
        Logger.error(
            { layer: 'ACTION', context: 'updateUserAction' },
            'Unexpected error in updateUserAction',
            error
        );
        return Err(error instanceof Error ? error.message : 'Unknown error');
    }
}