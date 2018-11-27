// Users Model
module.exports = (sequelize, DataTypes) => {

  var Users = sequelize.define("users", {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING
  }, {
      // Model tableName will be the same as the model name instead of being pluralized
      freezeTableName: true
  })

  // Provide point for associations 
  Users.associate = models => {
     // No associations
  }

  return Users

} // module.exports