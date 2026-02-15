'use server';

import { Err, Result } from "@/src/libs/apiUtils";
import { Logger } from "../../infraestructure/logger/logger";
import { UserRepository } from "../../infraestructure/repositories/user.repository";
import { UserController } from "../../controllers/user.controller";
import { updateTag } from "next/cache";


export async function deleteUserAction(id: string): Promise<Result<null>> {
    try {
        const userRepository = new UserRepository();
        const userController = new UserController(userRepository);
        const response = await userController.deleteUser(id);

        if (!response.success) {
            Logger.error(
                { layer: 'ACTION', context: 'deleteUserAction' },
                'Controller returned error',
                response.error
            );
        }

        updateTag(`users-${id}`);

        return response;
    }
    catch (error) {
        Logger.error(
            { layer: 'ACTION', context: 'deleteUserAction' },
            'Unexpected error',
            error
        );

        return Err(error instanceof Error ? error.message : 'Unknown error');
    }
}