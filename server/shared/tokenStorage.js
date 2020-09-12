
const tokenStorage = {
  storage: new Array,
  
  push: (value) => this.storage.push(value),
  
  delete: (value) => {
    this.storage = this.storage.filter((el) => el !== value)
  },

  find: (value) => {
    return this.storage.find((el) => el === value)
  }
  
}

exports.tokenStorage = tokenStorage