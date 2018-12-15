//Instancia de los modulos a usar
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

//importing routes

const customerRoutes = require('./routes/customer.js');

const app = express();

//Express settings
//Se configura el puerto a utilizar
app.set('port',process.env.PORT||3000);
//Se especifica que motor de plantilla se utilizara
app.set('view engine','ejs');
//Se manda la direccion de la ubicacion de donde se ecuentran las vistas
app.set('views',path.join(__dirname,'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host:'localhost',
    user:'root',
    password:'mysql',
    port:3306,
    database:'crudnodejsmysql'
},'single'));

app.use(express.urlencoded({extended:false}));
//routes
app.use('/',customerRoutes);

//static files
app.use(express.static(path.join(__dirname,'public')));

//starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port 3000');
});