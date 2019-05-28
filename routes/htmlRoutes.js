var db = require("../models");

module.exports = function(app) {
  // hmtl route to display homepage (index.html)
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/stockpage", function(req, res) {
    res.render("indexstock");
  });

  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  app.get("/", function(req, res) {
    db.Stocks.findAll({}).then(function(dbStocks) {
      var hbsObject = {
        examples: dbStocks
      };
      console.log(hbsObject);
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

  app.get("api/stockpage", function(req, res) {
    res.render("indexstock");;
  });
};
