const { Router } = require("express");
const router = Router();

const appController = require('../controller/app.controller')
const usersController = require('../controller/users.controller')
const authTokenController = require('../controller/auth.controller')
const notFoundController = require('../controller/404.controller')

router.get('/', appController.appStatus)
router.post('/signup', usersController.signUp);
router.post('/login', usersController.signIn);
router.post('/logout', usersController.signOut);
// router.post('/token', authTokenController.createToken);

router.get('/user', authTokenController.isLoggedIn, usersController.getUser);
router.get('/users',  authTokenController.isLoggedIn, usersController.getUsers);
router.post('/user', usersController.addUser);


router.use(notFoundController.notFound);



module.exports = router;