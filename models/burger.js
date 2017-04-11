// Every burger belongs to a customer/creator.
// A customer/creator has many burgers.

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
      allowNull: false,
      required: true,
      validate: {
        not: /[^a-zA-Z\d\s:]/
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    classMethods: {
      associate: function(models) {
        // Foreign key to customer_id
        // Foreign key to user_id
        Burger.belongsTo(models.Customer, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Burger;
}
