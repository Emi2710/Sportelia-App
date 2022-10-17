const { Router } = require('express');

const { 
        login, 
        logout, 
        getPersonnalData, 
     } = require('../controllers/structure');

const { validationMiddleware } = require('../middlewares/validation-middleware');
const { structureLoginValidation } = require('../validators/auth');
const router = Router()

router.post('/structure/login', structureLoginValidation, validationMiddleware, login)

router.get('/structure/:id', getPersonnalData);


module.exports = router;