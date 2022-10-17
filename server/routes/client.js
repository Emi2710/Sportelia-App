const { Router } = require('express');

const { registerFranchise,
        login, 
        logout, 
        getPersonnalData, 
        updatePersonnalData, 
        getAllFranchise, 
        getSpecificFranchise, 
        updateSpecificFranchise
     } = require('../controllers/client');

const { validationMiddleware } = require('../middlewares/validation-middleware');
const {  clientLoginValidation, franchiseRegisterValidation  } = require('../validators/auth');
const router = Router()

router.post('/client/addFranchise', franchiseRegisterValidation, validationMiddleware, registerFranchise)
router.post('/client/login', clientLoginValidation, validationMiddleware, login)
router.get('/logout', logout);

router.get('/client/:email', getPersonnalData);
router.put('/client/:id', updatePersonnalData);

router.get('/franchises', getAllFranchise);
router.get('/client/franchise/:id', getSpecificFranchise);
router.put('/client/franchise/:id', updateSpecificFranchise);

module.exports = router;