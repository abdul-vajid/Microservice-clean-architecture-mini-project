import RabbitMQClient from '../../infrastructure/rabbitmq/client.ts'
import {
    createUser
} from '../../adapters/database/mongoose/repositories/user.repo.ts'


import {
    saveUserData_useCase
} from '../../usecases/index.ts'

const useCases: any = {
    saveUserData_useCase
};

const repositories: any = {
    createUser
};

export = {
    repositories,
    useCases,
    RabbitMQClient
};
