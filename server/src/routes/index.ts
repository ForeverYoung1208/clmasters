import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { Iroutes } from "../../typings/routes"

const routes: Iroutes = {}

const basename = path.basename(__filename)

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && (/\.(j|t)s$/.test (file.slice(-3)) )
    )
  })
  .forEach((file: string) => {
    const route = require (path.join(__dirname, file)) as Router
    const name = file.split('.')[0]
    routes[name] = route
  })

// module.exports = routes
// export { routes }
export default routes
