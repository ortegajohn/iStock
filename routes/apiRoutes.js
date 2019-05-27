var request = require('request');
var apiKey = 'lIKhQVypBswwedWGj8P5cK6lkYekVwecEbUAO6lLGAYIZVoWcTRUZfSSC9Qa';
var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Stocks.findAll({
      
    }).then(function(dbStocks) {
      res.json(dbStocks);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res1) {
    var getURL = 'https://www.worldtradingdata.com/api/v1/stock?symbol=' + req.body.ticker + '&api_token=' + apiKey;
    request(getURL, { json: true }, (err, res, body) => {

      if (err) { return console.log(err); }
      

            var test = { ticker: req.body.ticker,
                  name: body.data[0].name,
                  price: parseFloat(body.data[0].price),
                  open: parseFloat(body.data[0].price_open),
                  percentChange: parseFloat(body.data[0].change_pct),
                  dayHigh: parseFloat(body.data[0].day_high),
                  dayLow: parseFloat(body.data[0].day_low),
                  marketCap: parseFloat(body.data[0].market_cap)
       };

      console.log("This is var test: " + JSON.stringify(test));

      db.Stocks.create(test).then(function(dbStocks) {
        res1.json(dbStocks);
    });
    
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Stocks.destroy({
       where: { 
         id: req.params.id 
        } 
      }).then(function(dbStocks) {
      res.json(dbStocks);
    });
  });
};
