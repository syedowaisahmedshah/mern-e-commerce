const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors');
const cors = require('cors');
const product = require('./routes/product');
const auth = require('./routes/auth');
const user = require('./routes/user');
const order = require('./routes/order');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUploader = require('express-fileupload');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUploader());
app.use(cookieParser());

app.use('/api/v1', product);
app.use('/api/v1', auth);
app.use('/api/v1', user);
app.use('/api/v1', order);

app.use(errorMiddleware);

module.exports = app;