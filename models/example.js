module.exports = function(sequelize, DataTypes) {
  var Stocks = sequelize.define("Stocks", {
    ticker: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
<<<<<<< apiDataBranch
    open: DataTypes.FLOAT,
    percentChange: DataTypes.FLOAT,
    dayHigh: DataTypes.FLOAT,
    dayLow: DataTypes.FLOAT,
    marketCap: DataTypes.FLOAT,
=======
    user_id:DataTypes.FLOAT,
>>>>>>> master
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  return Stocks;
};
