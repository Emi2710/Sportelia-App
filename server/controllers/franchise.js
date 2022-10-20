const db = require('../db')
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken');
const { SECRET } = require('../constants');


// add structure
exports.registerStructure = async (req, res) => {
  const { name, email, password, address, phone, profile_pic, description, isActive } = req.body
  try {
    const hashedPassword = await hash(password, 10)
    const { id } = req.params;

    await db.query('insert into structure(name, email, password, address, phone, profile_pic, description, isactive, franchise_id) values ($1 , $2, $3, $4, $5, $6, $7, $8, $9)', [
      name,
      email,
      hashedPassword,
      address,
      phone,
      profile_pic,
      description,
      isActive,
      id
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

//franchise authentication

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


//get personnal info
exports.getPersonnalData = async(req, res) => {
    try {
        const { email } = req.params;
        const getPersonnalData = await db.query("SELECT * FROM franchise WHERE email = $1", [email])
        res.json(getPersonnalData.rows)
    } catch (error) {
        console.error(error.message);
    }
}

//update personnal info

exports.updatePersonnalData = async(req, res) => {
  try {
      const { id } = req.params;
      const { 
        name,
        email  } = req.body;

      const updatePersonnalData = await db.query("UPDATE franchise SET name = $1, email = $2 WHERE id = $3 ", [
        name,
        email,
        id
      ]);
      
      res.json("Vos informations ont bien été modifiées");
  } catch (error) {
      console.error(error.message)
  }
}

//get all structures
exports.getAllStructure = async(req, res) => {
    try {
        const getAllStructure = await db.query("SELECT * FROM structure")
        res.json(getAllStructure.rows)
    } catch (error) {
        console.error(error.message);
    }
}

//get specific structure
exports.getSpecificStructure = async(req, res) => {
    try {
        const { id } = req.params;
        const getSpecificStructure = await db.query("SELECT * FROM structure WHERE franchise_id = $1", [id])
        res.json(getSpecificStructure.rows)
    } catch (error) {
        console.error(error.message);
    }
}


//update specific structure
exports.updateSpecificStructure = async(req, res) => {
  try {
      const { id } = req.params;
      const { name, email, address, phone, profile_pic, description, isActive  } = req.body;
      const updateStructure = await db.query("UPDATE structure SET name = $1, email = $2, address = $3, phone = $4, profile_pic = $5, description = $6, isActive = $7 WHERE id = $8 ", [name, email, address, phone, profile_pic, description, isActive, id]);
      
      res.json("Les informations ont bien été modifiées");
  } catch (error) {
      console.error(error.message)
  }
}

