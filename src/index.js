require('dotenv').config();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP || 'DEFAULT';

const express = require('express');
const app = express();

app.use(express.json({limit: '2mb'})) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const smartApi = require('./routes/smart-api');

app.use('/smartapi', smartApi);

app.get('/', (req, res) => res.send( `${APP_NAME} is READY`));

app.listen(PORT, () => {
    console.log(`${new Date().toISOString()} INFO_ ${APP_NAME} SYSTEM INDEX port ${PORT}`)
});