import { MongooseConnection } from "./driverConnection.ts";

class MongoDbConnection extends MongooseConnection {
    private static instance: MongoDbConnection;
    constructor() {
        const uri: string = process.env.MONGO_URI ;
        super(uri as string);
    }

    public static getDbInstance() {
        if (!this.instance) {
            this.instance = new MongoDbConnection();
            this.instance.connectMongoDB();
        }

        return this.instance;
    }
}

export default MongoDbConnection.getDbInstance();
