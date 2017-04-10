module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
     id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  // },
  // {
  //   classMethods: {
  //     associate: function(models) {
  //       // Foreign key to customer_id

  //     }
  //   }
  });
  return Burger;
}
