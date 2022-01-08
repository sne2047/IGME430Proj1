//this one is pretty simple and doesn't need differ much between projects, for now
//if add more pages, need expand this
const fs = require('fs');//file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getCSS = (request, response) => {
    response.writeHead(200, {'Content-Type':'text/css'});
    response.write(css);
    response.end();
};

const getHomePage = (request, response) => {
    response.writeHead(200, {'Content-Type':'text/html'});
    response.write(index);
    response.end();
};

module.exports.getCSS = getCSS;
module.exports.getHomePage = getHomePage;