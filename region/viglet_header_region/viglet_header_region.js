var Handlebars = require('handlebars'),
    fs = require('fs');

var _html = "";
fs.readFile('./region/viglet_header_region/viglet_header_region.hbs', 'utf-8', function (err, data) {
    if (!err) {
        var html = data.toString();
        shContent = {
            system: {
                "id": "id",
            }
        }

        navigationObject = [
            {
                "id": "123",
                "name": "Folder1",
            },
            {
                "id": "456",
                "name": "Folder2",
            }
        ]
        var template = Handlebars.compile(html);

        // var navigation = shObject.navigation("Viglet", true);
        var navigation = navigationObject;
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
                // "link": shObject.generateFolderLink(shFolder.id),
                "link": "link123",
                "current": isCurrentFolder
            }

            folders.push(folder);
        });

        var html = template(folders);
        _html = html;
    } else {
        console.log(err);
    }
});

function render() {
    return _html;
}
exports.render = function () {
    return render();
};