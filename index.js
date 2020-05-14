const express = require('express');
const app = express();
const port = 3000;
const viglet_home_layout = require('./pageLayout/viglet_home_layout/viglet_home_layout');
const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'planB',
    partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(viglet_home_layout.render());
});

app.listen(port, () => console.log(`App listening to port ${port}`));