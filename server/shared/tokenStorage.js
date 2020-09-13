
class TokenStorage {
   
  constructor() {
    this.storage = new Array
  }
  
  push(value){
    this.storage.push(value)
  }
  
  delete(value){
    this.storage = this.storage.filter((el) => el !== value)
  }

  find(value){
    return this.storage.find((el) => el === value)  ///el or undefined
  } 
  
}

module.exports = TokenStorage