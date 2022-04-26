const express = require('express');
const productos = require('../controllers/contProdController');
const router = express.Router();
const productosController = require('../controllers/contProdController');

let admin = true;

function AutenticacionMiddleware(req,res,next){
    if(!admin){
        res.status(401).json({
            Error: 'No autorizado'
        })
    }
    next();
}

router.get('/',(req,res)=>{
    const productos = productosController.getAll();

    if(productos.length == 0){
        res.status(404).json({
            Error:'No hay productos cargados'
        })
    }

    res.json({
        Productos:productos
    })
});

router.get('/:id',(req,res)=>{
    const idParam = parseInt(req.params.id);

    if(isNaN(idParam)){
        res.status(400).json({
            Error: 'Parámetro id recibido no es númerico'
        });
    }
    const producto = productosController.getById(idParam);
    if(producto==null){
        res.status(404).json({
            Error:'No existe un producto con el id que buscas'
        });
    }
    res.json({
        Producto:producto
    });
});

router.post('/',AutenticacionMiddleware,(req,res)=>{
    const body = req.body;
    if(!body.nombre || !body.precio || !body.thumbnail || typeof body.nombre != 'string' || typeof body.precio != 'number' || typeof body.thumbnail != 'string'){
        return res.status(400).json({
            error: 'Debes ingresar un nombre(string), precio(number) y thumbnail(string) para el producto'
        });
    }
    productosController.save(body);
    res.status(200).json({
        Mensaje:'Producto agregado correctamente'
    })
});

router.put('/:id',AutenticacionMiddleware,(req,res)=>{
    const idParam = req.params.id;
    const body = req.body;

    const producto = productosController.getById(idParam);

    if(producto == null){
        return res.status(400).json({
            error: 'No existe producto con el id buscado'
        })
    }

    if(!body.nombre || !body.precio || !body.thumbnail || typeof body.nombre != 'string' || typeof body.precio != 'number' || typeof body.thumbnail != 'string'){
        return res.status(400).json({
            error: 'Debes ingresar un nombre(string), precio(number) y thumbnail(string) para el producto'
        });
    }

    const productoAnterior = {
        nombre:producto.nombre,
        precio:producto.precio,
        thumbnail:producto.thumbnail
    }

    producto.nombre = body.nombre;
    producto.precio = body.precio;
    producto.thumbnail = body.thumbnail;
//tengo que seguir acá :D
    const data = JSON.stringify(contenedor.contenedor);
    fs.writeFileSync('contenedor.txt', data);
    res.status(200).json({
        Id: idBuscado,
        ProductoAnterior:productoAnterior,
        NuevosValores:body
    })
});

router.delete('/:id',AutenticacionMiddleware,(req,res)=>{
    const idParam = req.params.id;

    if(productosController.getById(idParam) == null){
        return res.status(400).json({
            error: 'No existe producto con el id buscado'
        })
    }
    
    productosController.deleteById(idParam);
    res.json({
        Msg: ' Elemento borrado'
    })

});


module.exports = router;