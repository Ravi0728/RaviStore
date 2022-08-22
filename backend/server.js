const app = require('./app');

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling unCaughtException -- when written something on app.js like console.log('something');
process.on("uncaughtException",(err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to uncaughtException`);
    process.exit(1);
})

//Config
dotenv.config({path: "backend/config/config.env"});

//Connection to database
connectDatabase();

const server =  app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

//Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to unhandle Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })
})