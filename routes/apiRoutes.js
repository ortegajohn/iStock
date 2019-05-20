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
    db.Stocks.create(req.body).then(function(dbStocks) {
      res.json(dbStocks);
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
