import  express from "express";
import { Request, Response} from "express";
import {User , IUser} from '../models/users';
import mongoose from 'mongoose';
import {auth, adminAuth} from '../middleware/auth';
const router = express.Router();

router.post('/login', async (req :Request, res: Response )=>{
    console.log('POST LOGIN')
    const email = req.body.email; 
    const password = req.body.password;
    const user = await User.findOne({email,password})
    
    if(user){
       const auth = await Buffer.from(user.email + ':' + user.password).toString('base64')
        user.password = '';
        return res.send({user,auth})
    }
    
    res.status(401);
    return res.send('UN AUTHORIZED') 

})

router.get('/users' , auth,async (req :Request, res: Response)=>{
    console.log('GET users')
    try {
        const users = await User.find({}); 
        return res.send(users)
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
});

router.post('/users',adminAuth ,async (req :Request, res: Response)=>{
    console.log('POST users' , req.body)
    try {
        const user = new User<IUser>({
            name:req.body.name,
            email:req.body.email, 
            password :req.body.password,
            admin: false
        })
        await user.save()
        return res.send(user.email)
    } catch (error) {
       console.log(error);
       res.status(403)
       return res.send(error) 
    }
})

router.delete('/users/:email', adminAuth  ,async (req :Request, res: Response)=>{
    console.log('DELETE user' , req.params.email)
    try {
        await User.deleteOne({email:req.params.email})
        return res.send('user deleted')
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
})

export {router as router}