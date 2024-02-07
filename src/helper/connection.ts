import {createConnection} from "typeorm";
import {User} from "../entities/User";


export default createConnection({
    host: "localhost",
    type: "postgres",
    database: 'nidaMumtazNodeTest',
    port: 5432,
    username: 'postgres',
    password: '1234',
    entities: [User],
    synchronize: true,
    logging: true,
}).then(connection => {
    console.log("Connected to the PostgreSQL database");
    return connection;
}).catch(error => {
    console.error("Error connecting to the PostgreSQL database:", error);
    throw error;
});