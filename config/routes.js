const createController = require('../controllers/createController.js')
const homeController = require('../controllers/homeController.js')


module.exports = (app) => {
    app.use(homeController)
    app.use("/add/animal",createController)
}