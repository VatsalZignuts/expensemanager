const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTEAPI";


const signup =  async (req,res) => {

    try{
        const { username , email , password } = req.body;

        const existingUser = await userModel.find({ email : email});
        //console.log(existingUser);

        if(existingUser.length != 0){
            return res.status(400).json({message : "user already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const result = await userModel.create({
            username : username,
            email : email,
            password : hashedPassword
        });

        const token = jwt.sign({email : result.email, id : result._id },SECRET_KEY);
        res.status(200).json({user : result, token : token});

    } catch(error){
        console.log(error);
        res.status(400).json ({ message : "somthing went to wrong"});
    }
}

const login = async (req,res) => {

    
    try {
        
        const { email , password } = req.body;
        
        const existingUser = await userModel.find({ email : email});

        if(!existingUser){
            return res.status(404).json({message : "user not found"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message : "Invalid crendatails"});
        }

        const token = jwt.sign({email : result.email, id : result._id });
        res.status(200).json({user : result, token : token});

    } catch(error){
        console.log(error);
        res.status(401).json ({ message : "somthing went to wrong"});
    }

}


module.exports = {login,signup};