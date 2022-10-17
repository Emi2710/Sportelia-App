const db = require('../db')
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken');
const { SECRET } = require('../constants');


// add franchise
exports.registerFranchise = async (req, res) => {
  const { name, email, password, profile_pic, description, isActive } = req.body
  try {
    const hashedPassword = await hash(password, 10)

    await db.query('insert into franchise(name, email, password, profile_pic, description, isactive) values ($1 , $2, $3, $4, $5, $6)', [
      name,
      email,
      hashedPassword,
      profile_pic,
      description,
      isActive
    ])

    return res.status(201).json({
      success: true,
      message: 'Inscription réalisée avec succès',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

//client authentication

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


//get personnal info
exports.getPersonnalData = async(req, res) => {
    try {
        const { id } = req.params;
        const getPersonnalData = await db.query("SELECT * FROM client WHERE id = $1", [id])
        res.json(getPersonnalData.rows[0])
    } catch (error) {
        console.error(error.message);
    }
}

//update personnal info

exports.updatePersonnalData = async(req, res) => {
  try {
      const { id } = req.params;
      const { name, email  } = req.body;
      const updatePersonnalData = await db.query("UPDATE client SET name = $1, email = $2 WHERE id = $3 ", [name, email, id]);
      
      res.json("Vos informations ont bien été modifiées");
  } catch (error) {
      console.error(error.message)
  }
}

//get all franchises
exports.getAllFranchise = async(req, res) => {
    try {
        const getAllFranchise = await db.query("SELECT * FROM franchise")
        res.json(getAllFranchise.rows)
    } catch (error) {
        console.error(error.message);
    }
}

//get specific franchise
exports.getSpecificFranchise = async(req, res) => {
    try {
        const { id } = req.params;
        const getSpecificFranchise = await db.query("SELECT * FROM franchise WHERE id = $1", [id])
        res.json(getSpecificFranchise.rows[0])
    } catch (error) {
        console.error(error.message);
    }
}


//update specific franchise
exports.updateSpecificFranchise = async(req, res) => {
  try {
      const { id } = req.params;
      const { name, email, profile_pic, description, isActive  } = req.body;
      const updatePersonnalData = await db.query("UPDATE franchise SET name = $1, email = $2, profile_pic = $3, description = $4, isActive = $5 WHERE id = $6 ", [name, email, profile_pic, description, isActive, id]);
      
      res.json("Les informations ont bien été modifiées");
  } catch (error) {
      console.error(error.message)
  }
}

