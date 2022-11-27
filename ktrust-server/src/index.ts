// const express = require( "express" );
import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes/routes';
import mongoose, { ConnectOptions } from 'mongoose'; 
import cors from 'cors';
const app = express();
const port = 8080; // default port to listen
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origin:'*'}))
mongoose.connect('mongodb://127.0.0.1:27017/ktrust' , (err)=>{
        console.log(err)
    })

app.use(router);
app.get( "/", ( req: any, res:any ) => {
    // res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );