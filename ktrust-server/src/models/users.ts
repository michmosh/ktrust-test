import mongoose from 'mongoose';
interface IUser {
    name :String,
    email:String,
    password: String,
    admin : Boolean,
    auth?:string
}
const usersSchema = new mongoose.Schema<IUser>({
    admin: {
        type :Boolean,
        default : false
    },
    name: {
        type:String,
        required : true,
    },
    email: {
        type :String,
        unique: true,
        required : true
    },
    password : {
        type :String,
        required : true
    }

})
const User = mongoose.model('User', usersSchema,'users')

export  {User, IUser}