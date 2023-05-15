import registerUser from "./registerUser";
import loginUser from "./loginUser";


export = (dependencies: any) => {
    return {
        registerUser: registerUser(dependencies),
        loginUser: loginUser(dependencies)
    };
};