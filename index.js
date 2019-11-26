const inquirer = require('inquirer');
const csv = require('csv-parser');
const fs = require('fs');
const Request = require("request");

const arrayteamscore = [];

fs.createReadStream('transactions.csv')
  .pipe(csv())
  .on('data', (row) => {
    arrayteamscore.push(row);
  })
  .on('end', () => {
  });


  



   let getvaluepertoken = function (){

    const result = arrayteamscore.reduce((a, {token, amount}) => {
        a[token] = a[token] || {token, amount: 0}
        a[token].amount += Number(amount)
        return a
      }, {})

      Object.values(result).forEach(function(data) {
        var amount = data.amount;
        var token = data.token;
        getcryptovaluesusd(amount,token);
    });
      
    
  }






  let openlist = function (){

        inquirer
        .prompt([
        {
            type: 'rawlist',
            name: 'optionlist',
            message: 'Choose Your Option from Bellow List - ',
            choices: ['Get latest portfolio value per token in USD', 
                      'Pass token to get latest portfolio value for that token',
                      'Get portfolio value per token for a given date',
                      'Get portfolio value by date and token'],
        },
        ])
        .then(answers => {
            
            if (answers.optionlist === 'Get latest portfolio value per token in USD') {

                    getvaluepertoken()
            }
            if (answers.optionlist === 2) {
                
            }
            if (answers.optionlist === 3) {
                
            }
            if (answers.optionlist === 4) {
                
            }
        });

  }







  let getcryptovaluesusd = function (amount,token){

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

        //console.log("Token Amount : " + token + " : " + amount)
        let USD_Value = Number(JSON.parse(body)[token]["USD"])
        //console.log("USD Value : " + USD_Value)
        let Value_is_USD = Number(amount) * USD_Value
        //console.log("Final Value : " + Value_is_USD)
        return console.log(Value_is_USD)
       

    });  
  }



  openlist();