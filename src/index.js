'use strict'
import { ShServer } from '@viglet/shio'

const express = require('express');
var urllib = require('urllib');
const app = express();
const shioDebug = require('debug')('shio:http')
const propertiesReader = require('properties-reader');
const properties = propertiesReader('./shio.properties');
const port = properties.get('app.port');
const endpoint = properties.get('app.shio.endpoint');
const fileServer = properties.get('app.shio.file.server');
const shServer = new ShServer(endpoint);

app.use(express.static('public'))

app.use(async function (req, res, next) {
    var url = req.originalUrl;
    var urlArray = url.split("/");
    var context = urlArray[1];
    if (context === 'store') {

        urllib.request(fileServer + url, function (err, data, response) {
            if (err) {
                throw err; // you need to handle error
            }
            console.log(response.statusCode);
            console.log(response.headers);
            // data is Buffer instance
            res.send(data);
        });
    }
    else {
        var html = await shServer.getPage(req.originalUrl, res);
        shioDebug(html);
        res.send(html);

    }
});
app.listen(port, () => console.log(`http://localhost:${port}`));