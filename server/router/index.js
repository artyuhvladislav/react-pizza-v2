const Router = require('express').Router;
const { body } = require('express-validator');
const UserController = require('../controllers/userController');
const authMiddleWare = require('../middleWares/authMiddleWare');

const router = new Router();

router.post(
  '/registration',
  // body('email').isEmail(),
  // body('password').isLength({ min: 3, max: 12 }),
  UserController.registration,
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleWare, UserController.getUsers);

module.exports = router;
