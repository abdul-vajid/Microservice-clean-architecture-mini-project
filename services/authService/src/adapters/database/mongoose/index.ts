import authSchema from './schemas/auth.schema.ts';
import {
    generateUserCredentials,
    checkUserCredentials
} from './repositories/authentication.repo.ts'

const schemas: any = {
    authSchema,
};

const repositories: any = {
    generateUserCredentials,
    checkUserCredentials
}

export {
    schemas,
    repositories
}