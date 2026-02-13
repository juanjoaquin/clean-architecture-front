'use server';

import { Err, Result } from "@/src/libs/apiUtils";
import { TCreateUserInput, User } from "../../core/domain/entities/User/User";
import { Logger } from "../../infraestructure/logger/logger";
import { UserRepository } from "../../infraestructure/repositories/user.repository";
import { UserController } from "../../controllers/user.controller";

export async function createUserAction(data: TCreateUserInput): Promise<Result<User>> {
    try {
        const userRepository = new UserRepository();
        const userController = new UserController(userRepository);
        const response = await userController.createUser(data);

        if (!response.success) {
            Logger.error(
                { layer: 'ACTION', context: 'createUserAction' },
                'Controller returned error',
                response.error
            );
            return response;
        }

        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        Logger.error(
            { layer: 'ACTION', context: 'createUserAction' },
            'Unexpected error in createUserAction',
            error
        );
        return Err(error instanceof Error ? error.message : 'Unknown error');
    }

}