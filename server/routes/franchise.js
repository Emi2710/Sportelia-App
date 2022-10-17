const { Router } = require('express');

const { registerStructure,
        login, 
        logout, 
        getPersonnalData, 
        updatePersonnalData, 
        getAllStructure, 
        getSpecificStructure, 
        updateSpecificStructure
     } = require('../controllers/franchise');

const { validationMiddleware } = require('../middlewares/validation-middleware');
const {  franchiseLoginValidation, structureRegisterValidation  } = require('../validators/auth');
const router = Router()

router.post('/franchise/:id/addStructure', structureRegisterValidation, validationMiddleware, registerStructure)
router.post('/franchise/login', franchiseLoginValidation, validationMiddleware, login)

router.get('/franchise/:id', getPersonnalData);
router.put('/franchise/:id', updatePersonnalData);

router.get('/structures', getAllStructure);
router.get('/franchise/structure/:id', getSpecificStructure);
router.put('/franchise/structure/:id', updateSpecificStructure);

module.exports = router;