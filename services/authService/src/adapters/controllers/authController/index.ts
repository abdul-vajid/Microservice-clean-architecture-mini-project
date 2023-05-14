import registerUser from "./registerUser";


export = (dependencies: any) => {
    return {
        registerUser: registerUser(dependencies),
    };
};