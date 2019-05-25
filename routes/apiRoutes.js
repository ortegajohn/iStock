var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Stocks.findAll({}).then(function(dbStocks) {
      res.json(dbStocks);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    var test = { 
      ticker: req.body.ticker, 
      price: 30,
      user_id: req.body.user_id };
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
