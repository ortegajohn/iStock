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
  app.post("/api/saveticker", function(req, res) {
    var test = { 
      ticker: req.body.ticker, 
      price: 30,
      user_id: req.body.user_id
     };
    console.log(test);
    db.Stocks.create(test).then(function(dbStocks) {
      console.log("dbStocks: ", dbStocks[0]);
      res.json(dbStocks);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    console.log("req.params.id", req.params.id);
    db.Stocks.destroy({ where: { id: req.params.id } }).then(function(
      dbStocks
    ) {
      res.json(dbStocks);
    });
  });

};
