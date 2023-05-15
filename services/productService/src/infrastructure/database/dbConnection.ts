import { driverConnection } from "./driverConnection.ts";

class DatabaseConnection extends driverConnection {
    private static instance: DatabaseConnection;
    constructor() {
        const uri: string = process.env.DATABASE_URI ;
        super(uri as string);
    }

    public static getDbInstance() {
        if (!this.instance) {
            this.instance = new DatabaseConnection();
            this.instance.connectDriver();
        }

        return this.instance;
    }
}

export default DatabaseConnection.getDbInstance();
