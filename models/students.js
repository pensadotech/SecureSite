// Students Model
module.exports = (sequelize, DataTypes) => {

  var Students = sequelize.define("students", {
      name: DataTypes.STRING,
      email: DataTypes.STRING
  }, {
      // Model tableName will be the same as the model name instead of being pluralized
      freezeTableName: true
  })

  // Provide point for associations 
  Students.associate = models => {
     // No associations
  }

  return Students

} // module.exports