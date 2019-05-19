var db = require("../models");
// console.log("Keys res: ", Object.keys(res));
module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Stocks.findAll({}).then(function(dbStocks) {
      res.json(dbStocks);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    var test = { ticker: req.body.text };
    db.Stocks.create(test).then(function(dbStocks) {
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
