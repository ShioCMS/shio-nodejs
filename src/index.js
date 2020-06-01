'use strict'
import { ShServer } from '@viglet/shio'
import express from 'express';
import urllib from 'urllib';

const app = express();
const shServer = new ShServer();
const shioDebug = require('debug')('shio:http')

app.use(express.static('public'))

app.use(async function (req, res) {
    let url = req.originalUrl;    
    let context = url.split("/")[1];

    if (context === 'store') {
        urllib.request(shServer.getFileServer() + url, function (err, data) {
            if (err) throw err;

            res.send(data);
        });
    }
    else {
        var html = await shServer.getPage(url);
        shioDebug(html);
        res.send(html);
    }
});

app.listen(shServer.getAppPort(), () => console.log(`http://localhost:${shServer.getAppPort()}`));