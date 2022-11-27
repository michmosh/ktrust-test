import session from 'express-session';
import { IUser, User } from '../models/users';
const auth = async (req:any , res:any, next:any) =>{
    console.log(' in auth middleware' )
    if(req.headers.authorization){
        const base64Credentialsuth = req.headers.authorization.split(" ")[1];
        console.log(base64Credentialsuth)
        const credentials = Buffer.from(base64Credentialsuth, 'base64').toString();
        const [email , password] = credentials.split(":") ;
        const user: IUser = await User.findOne({email , password})
        console.log("ADMIN " + user.admin)
        if(user){
            next();
        }else{
            res.status(401)
            res.send('UNAUTHORIZED')
        } 
    }
    
}

const adminAuth = async (req:any , res:any, next:any) =>{
    console.log(' in adminAuth middleware' )
    const base64Credentialsuth = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentialsuth, 'base64').toString();
    const [email , password] = credentials.split(":") ;
    const user: IUser = await User.findOne({email , password})
    if(user && user.admin){
        console.log("ADMIN " + user.admin)
        next();
    }else{
        res.status(401)
        res.send('UNAUTHORIZED')
    } 
}

export  {auth, adminAuth}