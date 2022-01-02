const connectDatabase = require('../config/database');
const seedProducts = require('./product/seeder')
const loadEnvironmentVariables = require('../config/environment');

loadEnvironmentVariables();

connectDatabase().then(async (db) => {
    try {
        console.log('data seeding started');
        await seedProducts(db);
        console.log('data seeding finished successfully');
    } catch (error) {
        console.log('data seeding failed');
        console.log(error.message);
    } finally {
        process.exit();
    }
});