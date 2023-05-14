import {
    generateUserCredentials,
    checkUserCredentials
} from '../api/database/mongoose/repositories/authentication.repo.ts'


import {

} from '../app/usecases/authentication/registerUser.useCase.ts'


const useCases: any = {

};

const repositories: any = {
    generateUserCredentials,
    checkUserCredentials
};

export = {
    useCases,
    repositories,
};
