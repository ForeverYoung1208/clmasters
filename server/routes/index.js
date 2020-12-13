import fs from 'fs'
import path from 'path'

const routes = {}
const basename = path.basename(import.meta.url)
const __dirname = path.dirname(import.meta.url).slice(7)  // throw out 'file://'


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(async (file) => {
    
    const route = await import(path.join(__dirname, file))
    const name = file.split('.')[0]
    console.log('[>>>>>>>>>>>route]', route)
    routes[name] = route.default
    
  })


export { routes }
