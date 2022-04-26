const { v4: uuidv4 }= require('uuid');

class Producto{
    constructor(nombre,descripcion,fotoUrl,precio,stock){
        this.id=uuidv4();
        this.timestamp = Date.now();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = uuidv4(); 
        this.fotoUrl=fotoUrl;
        this.precio = precio;
        this.stock = stock;
    }


}