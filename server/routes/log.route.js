const LogController = require('../controllers/log.controller')

module.exports = (app) => {
    app.get('/api/logs', LogController.getAll)
    app.post('/api/logs/new', LogController.createOne)
    app.get('/api/logs/:id', LogController.getOne)
    app.put('/api/logs/:id/edit', LogController.updateOne)
    app.delete('/api/logs/:id/delete', LogController.deleteOne)
}
