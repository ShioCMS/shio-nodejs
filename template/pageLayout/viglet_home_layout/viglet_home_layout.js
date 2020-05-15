'use strict'
const Viglet_header_region = require('../../region/viglet_header_region/viglet_header_region');
const viglet_footer_region = require('../../region/viglet_footer_region/viglet_footer_region');
const Promise = require('promise');
const Handlebars = require('handlebars');
const fs = require('fs');
const cheerio = require('cheerio');

function Layout() {

}

Layout.prototype.readPageLayout = async function (filePath, shContent, shObject) {
    var data = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(data.toString());
    $('[sh-region]').each(function () {

        var shRegion = $(this);
        var regioName = shRegion.attr("sh-region").toLowerCase();
        if (regioName === "viglet_header_region") {
            async () => {
                var viglet_header_region = new Viglet_header_region();
                var regionHTML = await viglet_header_region.render(shContent, shObject);
                shRegion.html(regionHTML);
            };
        }
        else if (regioName === "viglet_footer_region") {
            async () => {
                var regionHTML = await viglet_footer_region.render(shContent, shObject);
                shRegion.html(regionHTML);
            };
        }
    });

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
