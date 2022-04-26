//Primera entrega del proyecto final --- Curso Backend --- Esteban dos Santos Mello

const express = require('express');
const path = require('path');
const port = 8080;
const app = express();
const router = require('./routes/index');


app.listen(port,()=>{console.log('Server up, listening at port ',port)});
app.on('error',(err)=>{console.log('Error',err)});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.use('/api',router);
app.use((req,res)=>{
    res.status(404).json({
        msg :'Ruta no encontrada'
    })
})