const APP = process.env.APP || 'DEFAULT';
const DEFAULT_CHANNEL = process.env.DEFAULT_CHANNEL || 'smartapi-events';
const AMQP_URI = process.env.AMQP_URI || 'amqp://localhost:5672';

const amqplib = require('amqplib');

class SmartApi {
    mqo;
    dbo;

    constructor() {
        amqplib.connect(AMQP_URI)
            .then((conn) => {
                console.log(`${new Date().toISOString()} INFO_ ${APP} SMARTA AMQPU connected`);
                this.mqo = conn;
            })
            .catch(err => console.log(`${new Date().toISOString()} WARN_ ${APP} SMARTA INIT0 bootstrap failed`))
    }

    dispatchEvent(action, body, callback) {
        let allowedActions = ['login', 'refresh', 'profile', 'logout', 'getdata', 'getltpdata', 'gettradebook', 
                            'placeorder', 'modifyorder', 'cancelorder', 'getholding', 'getposition'];

        if (allowedActions.includes(action)) {
            this.pushToQueue({ action: action, payload: body }, flag => flag ? callback(true) : callback(false))
        }
        else {
            console.log(`${new Date().toISOString()} WARN_ ${APP} SMARTA DISPA ${action} not found`);
            callback(false);
        }
    }

    pushToQueue(payload, callback) {
        console.log(`${new Date().toISOString()} DEBUG ${APP} SMARTA DISPA pushq ${JSON.stringify(payload)}`);
        this.mqo.createChannel()
            .then(ch => {
                ch.assertQueue(DEFAULT_CHANNEL)
                ch.sendToQueue(DEFAULT_CHANNEL, Buffer.from(JSON.stringify(payload)))
                //console.log(`${new Date().toISOString()} INFO_ ${APP} SMARTA AMQPU message sent`);
                
                callback(true);
            })
            .catch(err => {
                console.log(`${new Date().toISOString()} WARN_ ${APP} SMARTA AMQPU failed ${err}`);
                callback(false)
            })
    }
}

module.exports = {
    SmartApi
}