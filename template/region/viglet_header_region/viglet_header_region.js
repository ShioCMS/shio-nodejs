var Handlebars = require('handlebars');
var fs = require('fs');

function render(shContent, shObject, html) {
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

function readRegion(filePath, callback) {
    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (!err) {
            html = data.toString();
            callback(html)
        } else {
            console.log(err);
        }
    });
}

exports.render = function (shContent, shObject, callback) {
    readRegion('./template/region/viglet_header_region/viglet_header_region.hbs',
        function (html) {
            callback(render(shContent, shObject, html));
        });


};