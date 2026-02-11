import { Err, Result } from "@/src/libs/apiUtils";
import { User } from "../../core/domain/entities/User/User";
import { Logger } from "../../infraestructure/logger/logger";
import { UserController } from "../../controllers/user.controller";
import { UserRepository } from "../../infraestructure/repositories/user.repository";

export async function getAllUsersAction(): Promise<Result<User[]>> {
    try {
        const userRepository = new UserRepository();
        const userController = new UserController(userRepository);

        const result = await userController.getAllUsers();

        if (!result.success) {
            Logger.error(
                { layer: '[CONTROLLER]', context: 'user.controller.GetAllUsers' },
                '[USE-CASE] [ERROR] Failed to get users',
                result.error
            )
        }

        return result

    } catch (error) {
        Logger.error(
            { layer: '[ACTION]', context: 'getAllUsers.action' },
            'Unexpected error in getAllUsers',
            error
        );

        return Err(
            error instanceof Error ? error.message : 'Unknown error'
        );
    }
}