var request = require('request');
var sequelize = require("sequelize");
require('dotenv').config();
var apiKey = process.env.comptoken;

var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    console.log("Keys req.user: ", Object.keys(req.user));
    console.log("req.user: ", req.user.id);
    db.Stocks.findAll({
      where: sequelize.where(
        sequelize.literal('user_id'),
        '=',
        req.user.id
      )

    }).then(function (dbStocks) {
      res.json(dbStocks);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res1) {
    var getURL = 'https://www.worldtradingdata.com/api/v1/stock?symbol=' + req.body.ticker + '&api_token=' + apiKey;

    if (req.user !== undefined) {
      request(getURL, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        var test = {
          ticker: req.body.ticker,
          name: body.data[0].name,
          price: parseFloat(body.data[0].price),
          open: parseFloat(body.data[0].price_open),
          user_id: parseInt(req.body.user_id),
          percentChange: parseFloat(body.data[0].change_pct),
          dayHigh: parseFloat(body.data[0].day_high),
          dayLow: parseFloat(body.data[0].day_low),
          marketCap: parseFloat(body.data[0].market_cap)
        };


        db.Stocks.create(test).then(function (dbStocks) {

          console.log("res1.json(test)")
          res1.json(test);

        });

      });
    } else {

      request(getURL, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        var test = {
          ticker: req.body.ticker,
          name: body.data[0].name,
          price: parseFloat(body.data[0].price),
          open: parseFloat(body.data[0].price_open),
          user_id: parseInt(req.body.user_id),
          percentChange: parseFloat(body.data[0].change_pct),
          dayHigh: parseFloat(body.data[0].day_high),
          dayLow: parseFloat(body.data[0].day_low),
          marketCap: parseFloat(body.data[0].market_cap)
        };

        // console.log("This is var test: " + JSON.stringify(test));

        db.Stocks.create(test).then(function (dbStocks) {
          res1.redirect('/');
        });

      });
    }


  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Stocks.destroy({ where: { id: req.params.id } 
    }).then(function (req1,res1) {
      console.log("DELETE Object.keys(dbStocks): ", Object.keys(req1));
      res.json(req1);
    });
  });
};