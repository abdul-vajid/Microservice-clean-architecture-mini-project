export const findUserByMail_useCase = (dependencies: any) => {
    const {
        repositories
    } = dependencies;

    if (!repositories)
        throw new Error("Repositories dependencie is missing");

    const execute = ({ email }: { email: string }) => {
        return repositories.findUserByEmail(email)
    };
    return {
        execute,
    };
};