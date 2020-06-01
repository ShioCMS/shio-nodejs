'use strict'
import { ShServer } from '@viglet/shio'

const express = require('express');
var urllib = require('urllib');
const app = express();
const shioDebug = require('debug')('shio:http')
const shServer = new ShServer();

app.use(express.static('public'))

app.use(async function (req, res, next) {
    var url = req.originalUrl;
    var urlArray = url.split("/");
    var context = urlArray[1];
    if (context === 'store') {
        urllib.request(shServer.getFileServer() + url, function (err, data, response) {
            if (err) {
                throw err;
            }
            res.send(data);
        });
    }
    else {
        var html = await shServer.getPage(req.originalUrl);
        shioDebug(html);
        res.send(html);

    }
});
app.listen(shServer.getAppPort(), () => console.log(`http://localhost:${shServer.getAppPort()}`));