'use strict'
const express = require('express');
const app = express();
const port = 3000;
const Viglet_home_layout = require('./template/pageLayout/viglet_home_layout/viglet_home_layout');
const handlebars = require('express-handlebars');
const shContentObj = require('./shio/shContent');
const shObject = require('./shio/shObject');

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'planB',
    partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static('public'))

app.get('/', async (req, res) => {
    var viglet_home_layout = new Viglet_home_layout();
    var html = await viglet_home_layout.render(shContentObj.getContent(), shObject);
    res.send(html);
});

app.listen(port, () => console.log(`http://localhost:${port}`));