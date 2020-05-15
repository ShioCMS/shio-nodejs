'use strict'
const express = require('express');
const app = express();
const port = 3000;
const shContentObj = require('./shio/shContent');
const shObject = require('./shio/shObject');

app.use(express.static('public'))

app.get('/', async (req, res) => {
    var pageLayoutName = 'VIGLET_HOME_LAYOUT';
    var PageLayout = require('./template/pageLayout/' + pageLayoutName.toLowerCase() + '/' + pageLayoutName.toLowerCase());
    var pageLayout = new PageLayout();
    var html = await pageLayout.render(shContentObj.getContent(), shObject);
    res.send(html);
});

app.listen(port, () => console.log(`http://localhost:${port}`));