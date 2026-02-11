import { Err, Result } from "@/src/libs/apiUtils";
import { User } from "../../core/domain/entities/User/User";
import { Logger } from "../../infraestructure/logger/logger";
import { UserRepository } from "../../infraestructure/repositories/user.repository";
import { UserController } from "../../controllers/user.controller";


export async function getUserByIDAction(id: string): Promise<Result<User>> {
    try {
        const userRepository = new UserRepository();
        const userController = new UserController(userRepository);

        const result = await userController.getUserByID(id);

        if (!result.success) {
            Logger.error(
                { layer: '[CONTROLLER]', context: 'user.controller.GetUserByID' },
                '[USE-CASE] [ERROR] Failed to get user',
                result.error
            )
        }
        return result;
        
    } catch (error) {
        Logger.error(
            { layer: '[ACTION]', context: 'getUserByID.action' },
            'Unexpected error in getUserByID',
            error
        );
        return Err(error instanceof Error ? error.message : 'Unknown error');
    }

}