var Handlebars = require('handlebars'),
    fs = require('fs');

var info = {
    title: 'practical node.js',
    author: '@azat_co',
    tags: ['express', 'node', 'javascript']
}
info.body = process.argv[2];
var _html = "";
fs.readFile('./pageLayout/viglet_home_layout/viglet_home_layout.hbs', 'utf-8', function (err, data) {
    if (!err) {
        // make the buffer into a string
        var html = data.toString();
        shContent = "shContent";

var template = Handlebars.compile(html);
var html = template(shContent);
_html = html;
       
    } else {
        console.log(err);
    }
});

// this will be called after the file is read
function renderToString(source, shContent) {
    var template = Handlebars.compile(source);
    var outputString = template(shContent);
    return outputString;
}


var data = [{ id: 1, name: "one" }, { id: 2, name: "two" }];

function render () {
    return _html;
}
exports.render = function () {
    return render();
  };