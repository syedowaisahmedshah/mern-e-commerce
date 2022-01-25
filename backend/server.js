const app = require('./app');
const connectDatabase = require('./config/database');
const loadEnvironmentVariables = require('./config/environment');
const configureCloudinary = require('./config/cloudinary');

// Handle uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down due to uncaught exception`);
    process.exit(1);
});

loadEnvironmentVariables();

configureCloudinary();

connectDatabase().then((db) => {
    console.log(`Database connected successfully with host: ${db.connection.host}`);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
}); 

//Handle unhandled promise rejection
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down the serer due to handled Promise rejection`);
    server.close(() => {
        process.exit(1);
    });
});