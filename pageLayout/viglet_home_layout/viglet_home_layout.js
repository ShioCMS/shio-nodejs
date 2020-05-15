const viglet_header_region = require('../../region/viglet_header_region/viglet_header_region');
var Handlebars = require('handlebars'),
    fs = require('fs');

var _html = "";
fs.readFile('./pageLayout/viglet_home_layout/viglet_home_layout.hbs', 'utf-8', function (err, data) {
    if (!err) {
        var html = data.toString();
        shContent = "shContent";

        var template = Handlebars.compile(html);
        var html = template(shContent);
        _html = html.replace("<div sh-region=\"VIGLET_HEADER_REGION\"></div>",viglet_header_region.render());

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