export interface IUserData {
    email: string;
    password: string;
}

export class User {
    email: string;
    password: string;

    constructor({ email, password }: IUserData) {
        this.email = email;
        this.password = password;
    }
}
