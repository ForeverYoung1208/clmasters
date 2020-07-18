// seqelize stuff
const { DataTypes, Model, UUIDV1 } = require('sequelize');

class User extends Model{};

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue:UUIDV1,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      DataTypes: DataTypes.STRING
    }

  },{
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
  }
)

await User.sync();


