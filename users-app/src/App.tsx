import React from 'react';
import { Box, CssBaseline, Paper, Typography, ThemeProvider, Button, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme } from "@mui/material/styles";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Users from './components/users'
import Login from './components/login';
const theme = createTheme({
  palette: {
    primary: {
      light: "#63b8ff",
      main: "#0989e3",
      dark: "#005db0",
      contrastText: "#000",
    },
    secondary: {
      main: "#4db6ac",
      light: "#82e9de",
      dark: "#00867d",
      contrastText: "#000",
    },
  },
});



function App() {
  const navigate = useNavigate();
  const logoutHandler = ()=>{
  localStorage.removeItem('user')
  navigate('/login');
}
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            USERS
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Button variant="outlined" color="inherit"  onClick={()=>logoutHandler()} >logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
      
        <Paper
          elevation={3}
          sx={{ padding: "1rem", backgroundColor: "primary.dark" }}
        >
            <Routes>
            
           <Route path="*" element={<Navigate to="/users" />}/>
           <Route path="/users" element={<Users />}/>
           <Route path="/login" element={<Login/>} />
           </Routes>
        </Paper>
    </ThemeProvider>
  );
}

export default App;
