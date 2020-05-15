'use strict'
const Promise = require('promise');
const Handlebars = require('handlebars');
const fs = require('fs');
const cheerio = require('cheerio');
const Region = require('../../../shio/shRegion');

function Layout() {

}

Layout.prototype.readPageLayout = async function (filePath, shContent, shObject) {
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

Layout.prototype.renderLogic = async function (shContent, shObject, html) {
    var template = Handlebars.compile(html);
    var html = template(shContent);
    return html;
}

Layout.prototype.render = async function (shContent, shObject) {
    var html = await this.readPageLayout('./template/pageLayout/viglet_home_layout/viglet_home_layout.hbs', shContent, shObject);
    return this.renderLogic(shContent, shObject, html);
};

module.exports = Layout;
