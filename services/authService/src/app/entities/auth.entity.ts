import { userData } from '../interfaces/auth.interface.ts'

export class User {
    email: string;
    password: string;

    constructor({ email, password }: userData) {
        this.email = email;
        this.password = password;
    }
}
