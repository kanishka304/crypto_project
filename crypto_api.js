var Request = require("request");
var colors = require('colors');

module.exports = {

   

    getcryptovaluesusd: function (amount,token) {
    

     Request.post({
            "headers": { "content-type": "application/json" },
            "url": "https://min-api.cryptocompare.com/data/pricemulti",
            "body": JSON.stringify({
            "fsyms": token,
            "tsyms": "USD",
            "api_key": "591614fbcdebd67e80a739291875e20ce960326a65e6ffc839e611a13eda96d7"
        })
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        
        let USD_Value = Number(JSON.parse(body)[token]["USD"])
        Value_is_USD = Number(amount) * USD_Value


        console.log("\nToken : ".red + token )
        console.log("Actual amount : ".yellow + amount)
        console.log("Amount in USD : ".cyan + Value_is_USD + "\n")


    }); 

    }
   
  };