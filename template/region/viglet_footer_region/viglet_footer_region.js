'use strict'
var Handlebars = require('handlebars');
var fs = require('fs');

async function renderLogic(shContent, shObject, html) {
    var template = Handlebars.compile(html);
    var html = template(shContent);
    return html;

}

exports.render = render;

async function render(shContent, shObject) {
    var data = fs.readFileSync('./template/region/viglet_footer_region/viglet_footer_region.hbs', 'utf-8');
    return await renderLogic(shContent, shObject, data.toString());
};