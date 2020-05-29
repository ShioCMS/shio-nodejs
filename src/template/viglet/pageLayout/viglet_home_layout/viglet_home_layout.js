const Handlebars = require('handlebars');

    var template = Handlebars.compile(html);
    html = template(shContent);
    html;
