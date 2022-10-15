const { Router } = require('express');

const { login, logout } = require('../controllers/client');
const { validationMiddleware } = require('../middlewares/validation-middleware');
const { clientLoginValidation } = require('../validators/auth');
const router = Router()

router.post('/client/login', clientLoginValidation, validationMiddleware, login)
router.get('/client/logout', logout)



module.exports = router;