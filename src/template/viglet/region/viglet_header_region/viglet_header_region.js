'use strict'
var Handlebars = require('handlebars');
async function render(shContent, shObject, html) {
    var template = Handlebars.compile(html);
    var navigation = await shObject.navigation("Viglet", true);
    var forEach = Array.prototype.forEachAsync;
    var currentFolder = new String(shContent.system.id);
    var folders = [];
    for (const shFolder of navigation) {
        var folderId = new String(shFolder.id);
        var isCurrentFolder = false;
        if (!currentFolder.localeCompare(folderId)) {
            isCurrentFolder = true;
        }
        var folder = {
            "name": shFolder.name
            , "link": await shObject.generateFolderLink(shFolder.id)
            , "current": isCurrentFolder
        }
        folders.push(folder);
    };
    var html = template(folders);
    return html;
}
module.exports.render = render;