const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const config = require('config');

const SALTROUNDS =  config.get('saltRounds')


module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    // static async register(name, email, password){
    //   if ( await User.exists(email)){ return({error: 'email already taken' }) };
    //   let hashedPassword =  await bcrypt.hash(password, SALTROUNDS)
    //   let newUser = await User.create({name, email, password: hashedPassword})
    //   return newUser;
    // }
    
    static async register(name, email){
      if ( await User.exists(email)){ return({error: 'email already taken' }) };

      let newUser = await User.create({name, email, isAdmin:false})
      return newUser;
    }

    static async authenticate(email, password){
      const user = await User.findOne({where: {email: email}})
      if(!user) return {isAuthenticated:false, user:null, message:'User email not found'}

      const isAuthenticated = await bcrypt.compare(password, user.password)

      return {isAuthenticated, user, message: isAuthenticated ? '' : 'Wrong password'}
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
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};