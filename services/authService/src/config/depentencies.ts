import {
    generateUserCredentials,
    checkUserCredentials,
    findUserByEmail
} from '../adapters/database/mongoose/repositories/authentication.repo.ts'


import {
    registerUser_UseCase,
    findUserByMail_useCase,
} from '../app/usecases/index.ts'


const useCases: any = {
    registerUser_UseCase,
    findUserByMail_useCase
};

const repositories: any = {
    generateUserCredentials,
    checkUserCredentials,
    findUserByEmail
};

export = {
    useCases,
    repositories,
};
