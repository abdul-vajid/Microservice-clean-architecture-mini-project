import { User } from "../entities/user.entities";

export const saveUserData_useCase = (dependencies: any) => {
    const {
        repositories
    } = dependencies;

    if (!repositories)
        throw new Error("Repositories dependencie is missing");

    const execute = async ({ userId, fullname, email, phoneNumber, city, country }: User) => {
        const user = new User({
            userId,
            fullname,
            email,
            phoneNumber,
            city,
            country,
        });
        return await repositories.createUser(user);
    };
    return {
        execute,
    };
};