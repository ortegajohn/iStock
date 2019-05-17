var db = require("../models");

module.exports = function(app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Stocks.findAll({}).then(function(dbStocks) {
  //     console.log("dbStocks[0]: ", dbStocks[0]);
  //     console.log("dbStocks[0].dataValues: ", dbStocks[0].dataValues);
  //     console.log("Keys", Object.keys(dbStocks[0]));
  //     var send = dbStocks[0].dataValues;
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: send
  //     });
  //   });
  // });

  app.get("/", function(req, res) {
    db.Stocks.findAll({}).then(function(dbStocks) {
      var hbsObject = {
        msg: "Welcome!",
        examples: dbStocks
      };
      // console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Stocks.findOne({ where: { id: req.params.id } }).then(function(
      dbStocks
    ) {
      res.render("Stocks", {
        example: dbStocks
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
