var request = require('request');
var sequelize = require("sequelize");
// var apiKey = process.env.apiKey;
// var apiKey = 'lIKhQVypBswwedWGj8P5cK6lkYekVwecEbUAO6lLGAYIZVoWcTRUZfSSC9Qa';
var apiKey = "NwKKaeNpI8lA9hVpjtqqdvqYWWqHf7EMegaRidS6DdgdwVja8b67OyCdH9n7";

var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Stocks.findAll({
      where: sequelize.where(
        sequelize.literal('user_id'),
        '=',
        req.user.id
      )
      
    }).then(function(dbStocks) {
      res.json(dbStocks);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res1) {
    var getURL = 'https://www.worldtradingdata.com/api/v1/stock?symbol=' + req.body.ticker + '&api_token=' + apiKey;
    request(getURL, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      // console.log("this is app.post");
      // console.log("req.body: " + JSON.stringify(req.body));
      // console.log("this is body: " + body);
      var myJSON = JSON.stringify(body);
      // console.log("my json: " + myJSON);
            var test = { ticker: req.body.ticker,
                  name: body.data[0].name,
                  price: parseFloat(body.data[0].price),
                  open: parseFloat(body.data[0].price_open),
                  percentChange: parseFloat(body.data[0].change_pct),
                  dayHigh: parseFloat(body.data[0].day_high),
                  dayLow: parseFloat(body.data[0].day_low),
                  marketCap: parseFloat(body.data[0].market_cap)
       };

      // console.log("This is var test: " + JSON.stringify(test));

      db.Stocks.create(test).then(function(dbStocks) {
        res1.redirect('/');
    });
    
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Stocks.destroy({ where: { id: req.params.id } }).then(function(
      dbStocks
    ) {
      res.json(dbStocks);
    });
  });
};