'use strict'
var Handlebars = require('handlebars');

async function render(shContent, shObject, html) {
    var template = Handlebars.compile(html);
    var html = template(shContent);
    return html;

}
module.exports.render = render;

