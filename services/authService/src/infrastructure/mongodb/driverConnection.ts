import mongoose from "mongoose";

export class MongooseConnection {
  public static uri: string;

  constructor(uri: string) {
    MongooseConnection.uri = uri;
  }

  connectMongoDB() {
    mongoose.set("strictQuery", false);

    mongoose.connect(MongooseConnection.uri)
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((error) => {
        console.log(`Database connection failed: ${error}`);
      });
  }
}
