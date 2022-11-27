import { Box, Button, Paper, TextField } from '@mui/material';
import React, {useState} from 'react';
import axios from 'axios'
import { authheaders } from '../helpers/authHeaders';
const URL= 'http://localhost:8080/users';

type IProps = {
    userAdded: ()=> void, 
    userExistErr :()=> void
}

const AddUser : React.FC<IProps> = (props)=>{
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [name, setName] = useState('');
    const submitHandler = async ()=>{
        await axios.post(URL , {email,password,name},{headers:authheaders()}).then(res=>{
            console.log(res)
            if(res.status === 200){
                props.userAdded();
                setEmail('');
                setPassword('');
                setName('');
            } 
        }).catch(err=>{
            console.log(err)
            if(err.response.status === 403){
                props.userExistErr()
            }
        })
    }
    return (
        <Paper>
           
            <Box 
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap="1rem"
            padding="1rem">
            <h2>Add User</h2>
            <TextField value={email} onChange={event => setEmail(event.target.value)} id="email" label="email" />
            <TextField value={password} onChange={event => setPassword(event.target.value)} id="password" label="password" />
            <TextField value={name} onChange={event => setName(event.target.value)} id="name" label="name" /> 
            <Button variant="outlined" disabled={!email || !password || !name} onClick={()=>submitHandler()} >ADD USER</Button>
        </Box>
        </Paper>
    )
} 

export default AddUser;