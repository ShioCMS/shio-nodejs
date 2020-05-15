'use strict'
const express = require('express');
const app = express();
const port = 3000;
const shContentObj = require('./shio/shContent');
const ShObject = require('./shio/shObject');
const PageLayout = require('./shio/shPageLayout');

app.use(express.static('public'))

app.get('/', async (req, res) => {
    var pageLayoutName = 'VIGLET_HOME_LAYOUT';
    var pageLayout = new PageLayout(pageLayoutName);
    var shObject =  new ShObject();
    var html = await pageLayout.render(shContentObj.getContent(), shObject);
    res.send(html);
});

app.listen(port, () => console.log(`http://localhost:${port}`));