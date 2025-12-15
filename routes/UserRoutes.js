import express from 'express'
import UserModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken'
import Protect from '../middleware/Auth.js';

const routes = express.Router()

routes.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    if(!email || !password || !name) return res.status(401).json({message : 'Fields are requierd'})

    try {
        const IsExist = await UserModel.findOne({email})

        if(IsExist){
            return res.status(401).json({message : 'User already exist'})
        }
        
        const NewUser = await UserModel.create({name, email, password})

        const token = GenerateToken(NewUser._id)

        await NewUser.save()
        
        return res.status(200).json({message : 'User register successfully', name, email, password, token : token})

    } catch (error) {
        return res.status(500).json({message : 'Server side error'})      
    }
})

routes.post('/login', async (req, res) => {
    const {email,password} = req.body;
    
    if(!email || !password) return res.status(401).json({message : 'Fields are requierd'})

    try {
        const User = await UserModel.findOne({email});

        if(!User){
            return res.status(401).json({message : 'User are not registered! please sign up'})
        }

        const isPasswordMatch = await User.matchPassword(password)

        if(!isPasswordMatch){
            return res.status(401).json({message : 'Password are not matched. Please try again'})
        }

        return res.status(200).json({message : 'Login success', user : User})
    } catch (error) {
        return res.status(500).json({message : 'Server side error'})
    }
})

routes.get('/get_user', async (req,res) => {
    const {_id} = req.body
    try {
        const findUser = await UserModel.findById({_id})
        return res.status(200).json({message : 'User details', user_details : findUser})
    } catch (error) {
        return res.status(500).json({message: 'Server side error'})
    }
})

const GenerateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN, {expiresIn : '30d'})
}

export default routes