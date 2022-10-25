const { check } = require('express-validator')
const db = require('../db')
const { compare } = require('bcryptjs')

//password
const password = check('password')
  .isLength({ min: 6, max: 15 })
  .withMessage('Le mot de passe doit contenir entre 6 et 15 charactères.')

//email
const email = check('email')
  .isEmail()
  .withMessage('Fournissez un email valide.')

//role
const isactive = check('isactive')


//check if franchise email exists
const franchiseEmailExists = check('email').custom(async (value) => {
  const { rows } = await db.query('SELECT * from franchise WHERE email = $1', [
    value,
  ])

  if (rows.length) {
    throw new Error('Cet email existe déjà.')
  }
})

//check if structure email exists
const structureEmailExists = check('email').custom(async (value) => {
  const { rows } = await db.query('SELECT * from structure WHERE email = $1', [
    value,
  ])

  if (rows.length) {
    throw new Error('Cet email existe déjà.')
  }
})


// client login validation
const clientLoginFieldsCheck = check('email').custom(async (value, { req }) => {
  const user = await db.query('SELECT * from client WHERE email = $1', [value])

  if (!user.rows.length) {
    throw new Error("Cet email n'existe pas")
  }

  //const validPassword = await compare(req.body.password, user.rows[0].password)

  if (req.body.password !== user.rows[0].password) {
    throw new Error('Mot de passe incorrect')
  }

  req.user = user.rows[0]
})


// franchise login validation
const franchiseLoginFieldsCheck = check('email').custom(async (value, { req }) => {
  const user = await db.query('SELECT * from franchise WHERE email = $1', [value])

  if (!user.rows.length) {
    throw new Error("Cet email n'existe pas")
  }

  const validPassword = await compare(req.body.password, user.rows[0].password)

  if (!validPassword) {
    throw new Error('Mot de passe incorrect')
  }

  if (!user.rows[0].isactive) {
    throw new Error('Vos droits pour accéder à cette application ont été désactivés')
  }

  req.user = user.rows[0]
})

// structure login validation
const structureLoginFieldsCheck = check('email').custom(async (value, { req }) => {
  const user = await db.query('SELECT * from structure WHERE email = $1', [value])

  if (!user.rows.length) {
    throw new Error("Cet email n'existe pas")
  }

  const validPassword = await compare(req.body.password, user.rows[0].password)

  if (!validPassword) {
    throw new Error('Mot de passe incorrect')
  }

  if (!user.rows[0].isactive) {
    throw new Error('Vos droits pour accéder à cette application ont été désactivés')
  }

  req.user = user.rows[0]
})




module.exports = {
  franchiseRegisterValidation: [email, password, franchiseEmailExists],
  structureRegisterValidation: [email, password, structureEmailExists],
  
  clientLoginValidation: [clientLoginFieldsCheck],
  franchiseLoginValidation: [franchiseLoginFieldsCheck],
  structureLoginValidation: [structureLoginFieldsCheck],

}