import express from "express";
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB'

require('dotenv').config()
var cors = require('cors')
let app= express();
app.use(cors({origin:true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

viewEngine(app);
initWebRoutes(app);

connectDB()

let port = process.env.PORT || 3001;
app.listen(port, ()=> {
    console.log('running on the port '+ port)
});