var db = require("../models");
var sequelize = require("sequelize");

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
    // console.log(req)
    // console.log("redirected here!")
    // console.log("Object.keys(req): ", Object.keys(req));
  
    if(req.user !== undefined  ){
      db.Stocks.findAll({

        where: sequelize.where(
          sequelize.literal('user_id'),
          '=',
          req.user.id
        )
      }).then(function(dbStocks) {
        // var hbsObject = {
        //   examples: dbStocks
        // };
        // console.log("hbsObject: " + JSON.stringify(hbsObject));
        console.log("Object.keys(dbStocks): ", Object.keys(dbStocks));
        res.render("index", { stocks: dbStocks });
        // location.reload();
        // return res.redirect("/");
      });
    }else{

      db.Stocks.findAll({
        where: {
          user_id: {
            $eq: null
          }
      }
      }).then(function(dbStocks) {
        // var hbsObject = {
        //   examples: dbStocks
        // };
        // console.log("hbsObject: " + JSON.stringify(hbsObject));
        console.log("Object.keys(dbStocks): ", Object.keys(dbStocks));
        res.render("index", { stocks: dbStocks });
        // location.reload();
        // return res.redirect("/");
      });
    }

   
  });

  app.get("/stockpage", function(req, res) {
    console.log("CHHHUUUURRRRRRRP")
    db.Stocks.findAll({


    }).then(function(dbStocks) {
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

