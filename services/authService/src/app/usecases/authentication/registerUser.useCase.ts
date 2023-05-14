import { User } from "../../entities/auth.entity.ts";
import { userData } from "../../interfaces/auth.interface.ts"

export const registerUser_UseCase = (dependencies: any) => {
    const {
       repositories
    } = dependencies;

    if (!repositories)
        throw new Error("Repositories dependencie is missing");

    const execute = ({ email, password }: userData) => {
        const user = new User({
            email,
            password
        });
        console.log('Debug 2', email, password);
        console.log('Debug 3', user);
        return repositories.generateUserCredentials(user)
    };
    return {
        execute,
    };
};