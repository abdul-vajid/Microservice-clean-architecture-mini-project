export interface IUserData {
    userId: string;
    fullname: string;
    email: string;
    phoneNumber: number;
    city: string;
    country: string;

}

export class User {
    fullname: string;
    email: string;
    phoneNumber: number;
    city: string;
    country: string;
    userId: string;

    constructor({userId, fullname, email, phoneNumber, city, country }: IUserData) {
        this.userId = userId;
        this.fullname = fullname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.country = country;
    }
}

