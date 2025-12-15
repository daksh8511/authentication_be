import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js'

const Protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authentication.split(' ')[1]

        const decode = jwt.verify(token, process.env.JWT_TOKEN)

        req.user = await UserModel.findById(decode?.id).select('-password')

        next()
    }
    else{
        return res.status(500).json({message : 'Failed to generate token'})
    }
}

export default Protect