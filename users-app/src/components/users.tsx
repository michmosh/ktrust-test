import React, {useState, useEffect} from 'react';
import { TableRow, TableHead, Paper,TableContainer, Table, TableBody,TableCell, Button, Snackbar, Grid } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddUser from './addUser';
import { IUser } from '../interfaces/IUser';
import { authheaders } from '../helpers/authHeaders';
const URL= 'http://localhost:8080/users'; 

async function fetchData(url: string){
    const response = await axios.get( url, {headers:authheaders()});
    return response;
}


const Users = function(){
    const [users , setUsers] = useState<IUser[]>([])
    const [user , setUser] = useState<IUser>();
    const [showMessage, setMessage] = useState(false);
    const navigate = useNavigate();
    const deleteHandler = async (user: IUser)=>{
        await axios.delete(`${URL}/${user.email}`,{headers:authheaders()})
        await fetchData(URL).then(res=>{
            setUsers(res.data)
        })
    }

    
    useEffect( ()=>{
        const getStorageUser = ()=>{
            const storageUser = localStorage.getItem('user')
            if(storageUser){
                try {
                    const user = JSON.parse(storageUser)
                    if(user) return setUser(user)
                } catch (error) {
                    console.log(error)
                }
            }
            return navigate('/login')
        }
        getStorageUser()
        fetchData(URL).then(res=>{
            setUsers(res.data)
        })
    },[])

    const userAdded = ()=>{
        fetchData(URL).then(res=>{
            setUsers(res.data)
        })
    }

    const userExistErr = ()=>{
        setMessage(true)
                setTimeout(()=>{
                    setMessage(false)
                }, 2000)
    }
    return (
        <Grid container spacing={2}>
         <Grid item xs={8}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                {
                    user?.admin ? <TableCell align="right">ACTION</TableCell> : null
                }
            </TableRow>
            </TableHead>
            <TableBody>
            {users.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                {
                    user?.admin && !row.admin ? <TableCell align="right"><Button variant="outlined" onClick={()=>deleteHandler(row)} >DELETE</Button></TableCell> : null 
                }
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </Grid>
        {
            user?.admin? 
            <Grid item xs={4} >
             <AddUser userAdded={userAdded} userExistErr={userExistErr}/>
            </Grid>
            :
            null
        }
       
        <Snackbar
            open={showMessage}
            message="USER EMAIL EXISTS"
            />
             </Grid>
    )
}

export default Users