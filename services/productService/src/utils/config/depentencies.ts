import RabbitMQClient from '../../infrastructure/rabbitmq/client.ts'
import {
    createProduct
} from '../../adapters/database/typeorm/repositories/product.repo.ts'


import {
    addProduct_UseCase
} from '../../usecases/addProduct.useCase.ts'

const useCases: any = {
    addProduct_UseCase
};

const repositories: any = {
    createProduct
};

export = {
    RabbitMQClient,
    useCases,
    repositories
};
