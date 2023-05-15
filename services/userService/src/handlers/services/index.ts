import saveUserData from "./saveUserData";


export = (dependencies: any) => {
    if (!dependencies) {
        console.log('>>> >>> Debug log 1 : !Dependencies');
    }
    return {
        saveUserData: saveUserData(dependencies)
    };
};