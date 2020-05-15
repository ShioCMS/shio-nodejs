'use strict'
var Handlebars = require('handlebars');
var fs = require('fs');
function Region() {

}
Region.prototype.renderLogic = async function (shContent, shObject, html) {
    var template = Handlebars.compile(html);

    var navigation = shObject.navigation("Viglet", true);
    var forEach = Array.prototype.forEach;
    var currentFolder = new String(shContent.system.id);
    var folders = [];

    forEach.call(navigation, function (shFolder) {
        var folderId = new String(shFolder.id);

        var isCurrentFolder = false;

        if (!currentFolder.localeCompare(folderId)) {
            isCurrentFolder = true;
        }

        var folder = {
            "name": shFolder.name,
            "link": shObject.generateFolderLink(shFolder.id),
            "current": isCurrentFolder
        }

        folders.push(folder);
    });

    var html = template(folders);
    return html;

}
Region.prototype.render = async function (shContent, shObject) {
    var data = fs.readFileSync('./template/region/viglet_header_region/viglet_header_region.hbs', 'utf-8');
    return await this.renderLogic(shContent, shObject, data.toString());
};
module.exports = Region;

