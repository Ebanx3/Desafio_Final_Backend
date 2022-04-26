const express = require('express');
const router = express.Router();
const {Carrito} = require('../controllers/carritoController');
const {v4:uuidv4} = require('uuid')

//Almacena los carritos creados
const CarritoCreados = [];

//Busca si hay un carrito en CarritosCreados con el id que recibe y retorna 1 y borra el carrito o retorna 0
function DeleteCarritoByID(id){
    const index = CarritoCreados.findIndex(carr => carr.carrito.id == id);
    if (index >= 0){
        CarritoCreados[index].Delete();
        CarritoCreados.splice(index,1);
        return 1;
    }
    else{
        return 0;
    }
}


const Productos = [
    {
    id: uuidv4(),
    timestamp: Date.now(),
    nombre: 'Lapiz',
    descripcion: 'Lapiz de carbón negro',
    codigo: uuidv4(),
    fotoUrl: 'https:quiensabe',
    precio: 40,
    stock: 200
    },
    {
    id: uuidv4(),
    timestamp: Date.now(),
    nombre: 'Goma',
    descripcion: 'una simple goma',
    codigo: uuidv4(),
    fotoUrl: 'https:quienasdasdsabe',
    precio: 30,
    stock: 200
    },
    {
    id: uuidv4(),
    timestamp: Date.now(),
    nombre: 'Regla',
    descripcion: 'Una regla algo flexible',
    codigo: uuidv4(),
    fotoUrl: 'hasdasdasdasd',
    precio: 50,
    stock: 200
    }
]

//Desplego en consola los ids de productos para poder copiar y pegar en postman xD
for(let p of Productos){
    console.log(`Id de ${p.nombre} : ${p.id}`);
}

router.post('/', (req,res)=>{
   const carrito = new Carrito('carrito.txt');  
   CarritoCreados.push(carrito);
   console.log(CarritoCreados);
   const idCarrito = carrito.GetID();
   for(let p of Productos){
    console.log(`Id de ${p.nombre} : ${p.id}`);
}
   res.json({
       ID_Carrito_Creado: idCarrito
   });
});

router.delete('/:id', (req,res)=>{
    const idParam = req.params.id;
    const deleted = DeleteCarritoByID(idParam);
    console.log(CarritoCreados);
    if(deleted == 0){
        res.status(404).json({
            msg:'No existe un carrito con el id buscado'
        })
    }
    res.status(200).json({
        msg: 'Carrito eliminado'
    })
});


router.get('/:id/productos',(req,res)=>{
    const idParam = req.params.id;
    const index = CarritoCreados.findIndex(carr => carr.carrito.id == idParam);

    if(index < 0){
        res.status(404).json({
            msg:'No existe un carrito con el id buscado'
        })
    }

    res.status(200).json({
        Productos: CarritoCreados[index].GetProducts()
    })
})

//Va a trabajar en el último carrito creado
router.post('/:id/productos',(req,res)=>{
    const idParams = req.params.id;

    //Va a buscar un producto en el array Productos definido arriba con el id recibido y lo agrega al ultimo carrito
    const index = Productos.findIndex(producto => producto.id == idParams);
    if (index < 0){
        res.status(404).json({
            msg:'No existe un producto con el id buscado'
        })
    }

    CarritoCreados[CarritoCreados.length - 1].Add(Productos[index],5);
    res.status(200).json({
        msg: 'Producto agregado al carrito'
    });

});

router.delete('/:id/productos/:id_prod',(req,res)=>{
    const idCarrito = req.params.id;
    const idProducto = req.params.id_prod;
    
    const indexCarrito = CarritoCreados.findIndex(carr => carr.carrito.id == idCarrito);
    if(indexCarrito < 0){
        res.status(400).json({
            msg:'No existe un carrito con el id buscado'
        })
    }

    const indexProducto = Productos.findIndex(producto => producto.id == idProducto);
    if(indexProducto < 0){
        res.status(400).json({
            msg:'No existe un producto con el id buscado'
        })
    }

    CarritoCreados[indexCarrito].DeleteProductByID(idProducto);
    res.status(200).json({
        msg:'Producto eliminado'
    })
})

module.exports = router;