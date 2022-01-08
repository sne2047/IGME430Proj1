//a lot of this is again, copied over from earlier assignments
//and just adapted as I retype it.
//this stuff doesn't vary much between projects anyways.

//outside stuff to include
const http = require('http');
const url = require('url');
const query = require('querystring');
//import our other handlers
const responseHandler = require('./dataResponses.js');
const htmlHandler = require('./htmlResponses.js');

//set up our port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

//url parse object goes here. Empty till page structure gets set up.
const urlStruct = {
    get:{
        "/style.css" : htmlHandler.getCSS,
        "/getCards" :responseHandler.getCards,
        "/shuffleDeck":responseHandler.shuffleCards,
        "/drawHand":responseHandler.drawHand,
        "/" : htmlHandler.getHomePage,
        other: responseHandler.notFound
    },
    post:{
        other: responseHandler.notFound
    }
}

//and our function to actually handle requests
const onRequest = (request, response) => {
    console.log(request.url);//mostly just for debugging purpouses

    //parse out url parameters
    const parsedUrl = url.parse(request.url);
    const params = query.parse(parsedUrl.query);
    const acceptedTypes = request.headers.accept.split(',');
    let type = 'application/json';
    if(acceptedTypes[0] === 'text/xml' ){
        type = 'text/xml';
    }

    //and call two more specialized methods for get and post
    if(request.method === 'POST'){
        handlePost(request, response, parsedUrl, type);
    }
    else{
        handleGet(request, response, parsedUrl, type);
    }
};

//specialized method to handle post
const handlePost = (request, response, parsedUrl, type) => {
    if(urlStruct.post[parsedUrl.pathname]){
        //if there is a post option matching given path
        const res = response;
        const body = [];

        //if upload errors, throw a bad request and send it back.
        request.on('error', (err) => {
            console.dir(err);
            res.statusCode = 400;
            res.end();
        });

        //this bit, on data, is for each byte of incoming data
        request.on('data', (chunk) => {
            body.push(chunk);
        });

        //aaaand on the end of the upload stream
        request.on('end', () => {
            //take byte array and turn to string values
            const bodyString = Buffer.concat(body).toString();
            
            //parse string into an object from x-www-form-urlencoded data
            const bodyParams = query.parse(bodyString);
            //and pass it back to where it goes
            urlStruct.post[parsedUrl.pathname](request, res, bodyParams, type);
        });
    }
    else{
        urlStruct.post.other(request, response, params, type);
    }
};

//and to handle get requests 
const handleGet = (request, response, parsedUrl, type) => {
    //just route to the page
    if(urlStruct.get[parsedUrl.pathname]){
        urlStruct.get[parsedUrl.pathname](request, response, parsedUrl, type);
    }
    else{
        urlStruct.get.other(request, response, parsedUrl, type);       
    }
};

//call an init function for data responses
responseHandler.deckInit();

//and finally, set up the server
http.createServer(onRequest).listen(port);

//and a console log for debugging n stufff
console.log(`Listening on 127.0.0.0:${port}`);