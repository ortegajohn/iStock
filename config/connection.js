// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
// var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
// var sequelize = new Sequelize("test_db", "root", "root", {
//   host: "localhost",
//   port: 8889,
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });

// Exports the connection for other files to use
// module.exports = sequelize;

// const mysql = require( 'mysql' );
// var connection;

// if(process.env.JAWSDB_URL){
//   connection = mysql.createConnection(process.env.JAWSDB_URL)
// }else{
//   connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "istock_db"
//   });

// }

// // connection.connect();

// module.exports = connection;

// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "istock_db"
});

if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "wvulqmhjj9tbtc1w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "pqks3fbu1rbrezux",
    password: "wa6acr2zj591tcg5",
    database: "tvpmjxam28p9sez3"
  })
}

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;

