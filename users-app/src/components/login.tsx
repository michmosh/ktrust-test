import React, {useState} from 'react';
import {  Paper, Button, TextField, Box, Snackbar } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const URL= 'http://localhost:8080/login'; 
const Login = function(){
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [showMessage, setMessage] = useState(false);
    const navigate = useNavigate();
    async function submitHandler(){
        axios.post(URL , {email:email , password:password}).then(res=>{
            if(res.status === 200){
                const user = res.data.user;
                user.auth = res.data.auth
                localStorage.setItem('user' , JSON.stringify(user))
                navigate('/users')
            }
            

        }).catch(err=>{
            if(err.response.status === 401) {
                setMessage(true)
                setTimeout(()=>{
                    setMessage(false)
                }, 2000)
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
                <h2> login form</h2>
            <TextField value={email} onChange={event => setEmail(event.target.value)} id="email" label="email" />
            <TextField value={password} onChange={event => setPassword(event.target.value)} id="password" label="password" />
            <Button variant="outlined" disabled={!email && !password } onClick={()=>submitHandler()} >LOGIN</Button>
            <Snackbar
            open={showMessage}
            message="WRONG EMAIL OR PASSWORD"
            />
        </Box>
       </Paper>
    )
}

export default Login