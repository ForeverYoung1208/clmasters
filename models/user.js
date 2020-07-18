const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const config = require('config');

const SALTROUNDS =  config.get('saltRounds')


module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static async register(name, email, password){
      if ( await User.exists(email)){ return(false) };

      let hashedPassword =  await bcrypt.hash(password, SALTROUNDS)

      let newUser = await User.create({name, email, password: hashedPassword})
      return newUser;
    }

    static async authenticate(email, password){
      const user = await User.findOne({where: {email: email}})
      if(!user) return false

      const { same } = await bcrypt.compare(password, user.hashedPassword)
      if(!same) return false
      return user
    }    

    static async exists(email){
      const user = await User.findOne({where: {email: email}})
      return (!!user)
    }
   
    static associate(models) {
      // The `models/index` file will call this method automatically.
      // define association here
    }
  };

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};