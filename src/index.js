'use strict'
import { ShServer } from '@viglet/shio'
const request = require('request');
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
    var url = req.originalUrl;
    var urlArray = url.split("/");
    var context = urlArray[1];
    if (context === 'store') {
         var requestSettings = {
                url: "http://localhost:2710" + url,
                method: 'GET',
                encoding: null
            };

            await request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
    }
    else {
        var html = await shServer.getPage(req.originalUrl, res);
        shioDebug(html);
        res.send(html);    

    }
});
app.listen(port, () => console.log(`http://localhost:${port}`));