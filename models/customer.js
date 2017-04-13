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
      allowNull: false,
      required: true,
      validate: {
        not: /[^a-zA-Z\d\s:]/,
        notEmpty: true
      } 
    }
  },
  {
    classMethods: {
        associate: function(models) {
          // Customer/creator has many Burgers
          Customer.hasMany(models.Burger);
        }
      }
  });
  return Customer;
}
