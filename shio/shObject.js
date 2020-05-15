'use strict'
function ShObject() {
}

ShObject.prototype.navigation = function (siteName, isHome) {
    return [
        {
            "id": "123",
            "name": "Folder1",
        },
        {
            "id": "456",
            "name": "Folder2",
        }
    ];
};

ShObject.prototype.generateFolderLink = function (folderId) {
    return "link123";
};

module.exports = ShObject;