'use strict'
const fs = require('fs');
const cheerio = require('cheerio');
const Promise = require('promise');
const Region = require('./shRegion');

var pageLayoutName = "";
function PageLayout(_pageLayoutName) {
    pageLayoutName = _pageLayoutName.toLowerCase();
}

PageLayout.prototype.readPageLayout = async function (filePath, shContent, shObject) {
    var data = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(data.toString());

    var promises = [];
    var cheerioEach = async function () {
        var shRegion = $(this);
        var regionName = shRegion.attr("sh-region");
        var region = new Region(regionName);
        var html = await region.render(shContent, shObject);
        shRegion.html(html);
        promises.push(html);
    }
    $('[sh-region]').each(cheerioEach);

    await Promise.all(promises);
    return $.html();

}

PageLayout.prototype.render = async function (shContent, shObject) {
    var html = await this.readPageLayout('./src/template/pageLayout/' + pageLayoutName + '/' + pageLayoutName + '.hbs', shContent, shObject);
    var pageLayoutJS = require('../template/pageLayout/' + pageLayoutName + '/' + pageLayoutName);
    return pageLayoutJS.render(shContent, shObject, html);
};

module.exports = PageLayout;

