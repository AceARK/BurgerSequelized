module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
     id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  // },
  // {
  //   classMethods: {
      //   associate: function(models) {
      //     // User has many Player data
      //     User.hasMany(models.Player);
      //   }
      // }
  });
  return Customer;
}
