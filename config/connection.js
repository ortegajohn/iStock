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

const mysql = require( 'mysql' );
var connection;

if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL)
}else{
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "istock_db"
  });

}

// connection.connect();

module.exports = connection;

