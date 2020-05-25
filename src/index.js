'use strict'
import { ShServer } from '@viglet/shio'
const express = require('express');

const app = express();
const shioDebug = require('debug')('shio:http')
const propertiesReader = require('properties-reader');
const properties = propertiesReader('./shio.properties');
const port = properties.get('main.app.port');
const endpoint = properties.get('main.app.shio.endpoint');
const shServer = new ShServer(endpoint);

app.use(express.static('public'))

app.use(async function (req, res, next) {
    var html = await shServer.getPage(req.originalUrl);
    shioDebug(html);
    res.send(html);    
    return next();
});
app.listen(port, () => console.log(`http://localhost:${port}`));