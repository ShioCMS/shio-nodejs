const viglet_header_region = require('../../region/viglet_header_region/viglet_header_region');
var Handlebars = require('handlebars');
var fs = require('fs');

function render(shContent, shObject, html) {
    var template = Handlebars.compile(html);
    var html = template(shContent);
    return html;

}

function readPageLayout(filePath, shContent, shObject, callback) {
    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (!err) {
            viglet_header_region.render(shContent, shObject,
                function (htmlRegion) {
                    html = data.toString().replace("<div sh-region=\"VIGLET_HEADER_REGION\"></div>", htmlRegion);
                    callback(html)
                })
        } else {
            console.log(err);
        }
    });
}

exports.render = function (shContent, shObject, callback) {
    readPageLayout('./pageLayout/viglet_home_layout/viglet_home_layout.hbs', shContent, shObject,
        function (html) {
            callback(render(shContent, shObject, html));
        });


};