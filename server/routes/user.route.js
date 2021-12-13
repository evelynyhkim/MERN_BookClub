const UserController = require('../controllers/user.controller')

module.exports = (app) => {
    app.get('/api/users', UserController.getAll)
    app.post('/api/users/new', UserController.signUp)
    app.post('/api/signin', UserController.signIn)
    app.get('/api/signout', UserController.signOut)
    app.put('/api/users/:id/edit', UserController.updateOne)
    app.delete('/api/users/:id/delete', UserController.deleteOne)
}
