var request = require('request');
var apiKey = 'lIKhQVypBswwedWGj8P5cK6lkYekVwecEbUAO6lLGAYIZVoWcTRUZfSSC9Qa';
var db = require("../models");
var sequelize = require("sequelize");
module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {

    console.log("req.user: ", req.user.id);
    console.log("Keys req.user: ", Object.keys(req.user));
    var test = { 
      // ticker: req.body.ticker, 
      // price: 30,
      user_id: req.user.id
     };
     console.log("AAAAAAAAAAAAAAtest: ",test.user_id)
    db.Stocks.findAll({
      limit: 7,
      where: sequelize.where(
        sequelize.literal('user_id'),
        '=',
        req.user.id
    )

    }).then(function(dbStocks) {
      if(dbStocks.length > 0){
        console.log("dbStocks: ",dbStocks);
        console.log("Keys dbStocks: ", Object.keys(dbStocks));
        console.log("dbStocks.length: ", dbStocks.length);
        console.log("dbStocks[0]: ", dbStocks[0].dataValues);
        console.log("Keys dbStocks: ", Object.keys(dbStocks[0].dataValues));
        var countfromdb = Object.keys(dbStocks)
        var fromdb = []
        console.log("countfromdb.length: ",countfromdb.length)
        for(var i =0; i<countfromdb.length;i++){
          fromdb[i] = dbStocks[i]
        }
        // console.log("fromdb: ",fromdb)
        res.json(fromdb);
        // res.json(dbStocks[0].dataValues);

      }

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

 //   console.log("req.params.id", req.params.id);
 //   db.Stocks.destroy({ where: { id: req.params.id } }).then(function(
  //    dbStocks
  //  ) {

      res.json(dbStocks);
    });
  });

};
