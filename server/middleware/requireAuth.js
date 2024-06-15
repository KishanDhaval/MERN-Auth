const jwt = require('jsonwebtoken')
const userModel = require("../models/userModel")



const requireAuth = async(req, res, next) => {
  // varify authantication
  const { authorization } = req.headers //note that space needed in { authorization }

  if(!authorization){
    return res.status(401).json({error:"Authantication token required" })
  }

  const token = authorization.split(" ")[1]

  try{
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await userModel.findOne({_id}).select('_id')
        next()

  }catch(error){
        console.log(error);
        res.status(401).json({error : 'Requasted is not authorized'})
  }
};

module.exports= requireAuth;
