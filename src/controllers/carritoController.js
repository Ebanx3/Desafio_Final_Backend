const { v4: uuidv4 }= require('uuid');
const fs = require('fs');

class Carrito{
    constructor(path){
        this.path=path;
        this.carrito = {
            id : uuidv4(),
            timestamp : Date.now(),
            productos : []
        }
    }

    GetID(){
        return this.carrito.id;
    }

    Add(producto,cant){
        try {
            this.carrito = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }
        catch (err) {
            console.log('Error leyendo el archivo', err.message);
        }
        
        const indice = this.carrito.productos.findIndex(prod => prod.id == producto.id);
        if (cant > producto.stock) //COMPRUEBA SI LA CANTIDAD QUE DESEAS AGREGAR AL CARRITO ES MAYOR A LA DEL STOCK DISPONIBLE, AGREGA TODO EL STOCK DISPONIBLE
            cant = producto.stock
            
        if (indice == -1){
            this.carrito.productos.push(producto);
            this.carrito.productos[this.carrito.productos.length - 1].stock = cant;
        }
        else{
            this.carrito.productos[indice].stock += cant;
        }
        this.carrito.timestamp = new Date();

        const data = JSON.stringify(this.carrito,null,'\t');
        try {
            fs.writeFileSync(this.path, data);
        }
        catch (err) {
            console.log('Error de escritura', err.message);
        }
        return producto.id;
    }

    Delete(){
        try {
            this.carrito = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }
        catch (err) {
            console.log('Error leyendo el archivo', err.message);
        }
        this.carrito.productos.splice(0,this.carrito.productos.length);
        
        try {
            fs.unlinkSync(this.path);
        }
        catch (err) {
            console.log('Error de escritura', err.message);
        }
        delete this.path;
        delete this.carrito;
    }

    GetProducts(){
        try {
            this.carrito = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }
        catch (err) {
            console.log('Error leyendo el archivo', err.message);
        }
        return this.carrito.productos;
    }

    DeleteProductByID(id){
        try {
            this.carrito = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }
        catch (err) {
            console.log('Error leyendo el archivo', err.message);
        }
        const index = this.carrito.productos.findIndex(prod => prod.id == id); 

        if(index >= 0){
            this.carrito.productos.splice(index,1);
        }
        const data = JSON.stringify(this.carrito,null,'\t');
        try {
            fs.writeFileSync(this.path, data);
        }
        catch (err) {
            console.log('Error de escritura', err.message);
        }

    }
}

// const carritoPrueba = new Carrito('carrito.txt');
// console.log(carritoPrueba);
// const productoPrueba={
//     id: uuidv4(),
//     timestamp: Date.now(),
//     nombre: 'Lapiz',
//     descripcion: 'Lapiz de carbón negro',
//     codigo: uuidv4(),
//     fotoUrl: 'https:quiensabe',
//     precio: 40,
//     stock: 200
// }
// const productoPrueba1={
//     id: uuidv4(),
//     timestamp: Date.now(),
//     nombre: 'Goma',
//     descripcion: 'una simple goma',
//     codigo: uuidv4(),
//     fotoUrl: 'https:quienasdasdsabe',
//     precio: 30,
//     stock: 200
// }
// const productoPrueba2={
//     id: uuidv4(),
//     timestamp: Date.now(),
//     nombre: 'Regla',
//     descripcion: 'Una regla algo flexible',
//     codigo: uuidv4(),
//     fotoUrl: 'hasdasdasdasd',
//     precio: 50,
//     stock: 200
// }
// carritoPrueba.Add(productoPrueba,20);
// carritoPrueba.Add(productoPrueba1,20);
// carritoPrueba.Add(productoPrueba2,20);
// console.log(carritoPrueba);
// console.log(carritoPrueba.GetID());

// console.log(carritoPrueba.GetProducts());
// const IDproducto = carritoPrueba.GetProducts()[2].id;
// console.log(`Id de producto a eliminar ${IDproducto}`);
// carritoPrueba.DeleteByID(IDproducto);
// console.log(carritoPrueba.GetProducts());
// carritoPrueba.Delete();
// console.log('Carrito borrado?',carritoPrueba)
 
module.exports = {Carrito}