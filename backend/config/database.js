const mongoose = require('mongoose');

const connectDatabase = () => {
    return mongoose.connect(process.env.DB_LOCAL_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true
    });
};

module.exports = connectDatabase;