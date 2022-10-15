const { sign } = require('jsonwebtoken');
const { SECRET } = require('../constants');


exports.login = async (req, res) => {
  let user = req.user

  let payload = {
    id: user.user_id,
    email: user.email,
  }

  
  try {
    const token = await sign(payload, SECRET)
       
    return res.status(200).cookie('token', token, { httpOnly: true }).json(
      {
      success: true,
      info: 'Connexion réalisée avec succès',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}