const APP_NAME = process.env.APP || 'DEFAULT';

const express = require('express');
const router = express.Router();

const { SmartApi } = require('../services/smart-api');
const smartApi = new SmartApi();

router.use((req, res, next) => {
    console.log(`${new Date().toISOString()} DEBUG ${APP_NAME} SYSTEM ROUTE /smartapi${req.path}`);
    next();
});

router.get('/dispatch/:id', (req, res) => {
    smartApi.dispatchEvent(
        req.params.id,
        req.body,
        (flag) => {
            if (flag) res.send('SUCCESS')
            else res.send('FAIL')
        }
    )
});

router.get('/state/:id', (req, res) => {
    res.send(req.path)
});

router.get('/', (req, res) => {
    res.send("smartApi service ")
});

router.all('*', (req, res) => res.redirect('/'))

module.exports = router;