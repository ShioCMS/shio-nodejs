'use strict'
var Handlebars = require('handlebars');
var fs = require('fs');
function Region() {

}
Region.prototype.renderLogic = async function (shContent, shObject, html) {
    var template = Handlebars.compile(html);
    var html = template(shContent);
    return html;

}
Region.prototype.render = async function (shContent, shObject) {
    var data = fs.readFileSync('./template/region/viglet_footer_region/viglet_footer_region.hbs', 'utf-8');
    return await this.renderLogic(shContent, shObject, data.toString());
};
module.exports = Region;

