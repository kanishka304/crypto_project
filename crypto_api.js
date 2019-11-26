var Request = require("request");


const add = function(x, y){

    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "https://min-api.cryptocompare.com/data/pricemulti",
        "body": JSON.stringify({
            "fsyms": "ETH,BTC",
            "tsyms": "USD",
            "api_key": "591614fbcdebd67e80a739291875e20ce960326a65e6ffc839e611a13eda96d7"
        })
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
            return console.dir(JSON.parse(body));
    });
}

module.exports ={
    add:add
}