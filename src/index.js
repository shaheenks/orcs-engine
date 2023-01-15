require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP || 'DEFAULT';

app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/ping', (req, res) => res.send('pong'));

app.listen(PORT, () => {
    console.log(`${new Date().toISOString()} INFO_ ${APP_NAME} SYSTEM INDEX PORT ${PORT}`)
});