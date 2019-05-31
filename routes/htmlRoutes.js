var db = require("../models");

module.exports = function(app) {
  // // hmtl route to display homepage (index.html)
  // app.get("/", function(req, res) {
  //   res.render("index");
  // });

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
    console.log("redirected here!")
    db.Stocks.findAll({}).then(function(dbStocks) {
      // var hbsObject = {
      //   examples: dbStocks
      // };
      // console.log("hbsObject: " + JSON.stringify(hbsObject));
      console.log(Object.keys(dbStocks));
      res.render("index", { stocks: dbStocks });
      // location.reload();
      // return res.redirect("/");
    });
  });

  app.get("/stockpage", function(req, res) {
    console.log("CHHHUUUURRRRRRRP")
    db.Stocks.findAll({}).then(function(dbStocks) {
      // var hbsObject = {
      //   examples: dbStocks
      // };
      // console.log("hbsObject: " + JSON.stringify(hbsObject));
      // console.log("Test:",dbStocks)
      
      // res.render("index", { stocks: dbStocks });
      // location.reload();
       res.redirect("/");
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
};

