import { DataSource } from "typeorm";

export class driverConnection {
  public static uri: string;

  constructor(uri: string) {
    driverConnection.uri = uri;
  }

  connectDriver() {
    const dataSource = new DataSource({
      type: "postgres",
      host: "product-db",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: process.env.POSTGRES_DB,
    });

    dataSource.initialize()
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((error) => {
        console.log(`Database connection failed: ${error}`);
      });
  }
}


