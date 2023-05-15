import  RabbitMQClient from '../../infrastructure/rabbitmq/client.ts'
import {
    generateUserCredentials,
    checkUserCredentials,
    findUserByEmail
} from '../../adapters/database/mongoose/repositories/authentication.repo.ts'


import {
    registerUser_UseCase,
    findUserByMail_useCase,
} from '../../usecases/index.ts'

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
    RabbitMQClient,
    useCases,
    repositories
};
