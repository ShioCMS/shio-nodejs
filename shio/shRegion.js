'use strict'
var fs = require('fs');
var regionName = "";
function Region(_regionName) {
    regionName = _regionName.toLowerCase();
}

Region.prototype.render = async function (shContent, shObject) {
    var html = fs.readFileSync('./template/region/' + regionName + '/' + regionName + '.hbs', 'utf-8').toString();
    var regionJS = require('../template/region/' + regionName + '/' + regionName);
    return regionJS.render(shContent, shObject, html);
};

module.exports = Region;

