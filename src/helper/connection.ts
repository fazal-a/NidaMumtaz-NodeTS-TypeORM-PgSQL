import {createConnection} from "typeorm";
import User from "../entities/User";
import Post from "../entities/Post";


export default createConnection({
    host: "localhost",
    type: "postgres",
    database: 'nidaMumtazNodeTest',
    port: 5432,
    username: 'postgres',
    password: '1234',
    entities: [User, Post],
    synchronize: true,
    logging: true,
}).then(connection => {
    console.log("Connected to PostgreSQL database");
    return connection;
}).catch(error => {
    console.error("Error connecting to PostgreSQL database:", error);
    throw error;
});