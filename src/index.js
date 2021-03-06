'use strict'
import { ShPageLayout, ShObject, shContent} from '@viglet/shio'
const express = require('express');

const app = express();
const shioDebug = require('debug')('shio:http')
const propertiesReader = require('properties-reader');
const properties = propertiesReader('./shio.properties');
const port = properties.get('main.app.port');


app.use(express.static('public'))

app.use(async function (req, res, next) {
    var url = req.originalUrl;
    var urlArray = url.split("/");
    var context = urlArray[1];
    var siteName = urlArray[2];
    var format = urlArray[3];
    var locale = urlArray[4];
    var objectPath = "/" + urlArray.slice(5, urlArray.length).join("/");

    shioDebug("context: " + context);
    shioDebug("siteName: " + siteName);
    shioDebug("format: " + format);
    shioDebug("locale: " + locale);
    shioDebug("objectPath: " + objectPath);

    var pageLayoutName = 'VIGLET_HOME_LAYOUT';
    var pageLayout = new ShPageLayout(pageLayoutName);
    var shObject = new ShObject();
    var html = await pageLayout.render(shContent, shObject);
    console.log(html);
    res.send(html);    
    return next();
});
app.listen(port, () => console.log(`http://localhost:${port}`));