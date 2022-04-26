const fs = require('fs');

class Contenedor {
    constructor(path) {
        this.contenedor = [];
        this.path = path;
    }


    save(obj) {
        try {
            this.contenedor = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }
        catch (err) {
            console.log('Error leyendo el archivo', err.message);
        }
        obj.ID = this.contenedor.length + 1;
        this.contenedor.push(obj);

        const data = JSON.stringify(this.contenedor, '\t');

        try {
            fs.writeFileSync(this.path, data);
        }
        catch (err) {
            console.log('Error de escritura', err.message);
        }
        return obj.ID;
    }

    getById(num) {
        try {
            this.contenedor = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }
        catch (err) {
            console.log('Error leyendo el archivo', err.message);
        }


        const valor = this.contenedor.findIndex(element => {
            return element.ID == num
        })
        if (valor < 0)
            return null
        else{
            
            return this.contenedor[valor];
        }
    }

    getAll() {
        try {
            this.contenedor = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }
        catch (err) {
            console.log('Error leyendo el archivo', err.message);
        }
        return this.contenedor;
    }

    deleteById(num) {
        try {
            this.contenedor = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }
        catch (err) {
            console.log('Error leyendo el archivo', err.message);
        }

        const valor = this.contenedor.findIndex(element => {
            return element.ID == num
        })

        if (valor >= 0) {
            this.contenedor.splice(valor, 1);
            const data = JSON.stringify(this.contenedor);
            fs.writeFileSync(this.path,data)
        }
    }

    deleteAll() {
        try {
            fs.unlinkSync(this.path);
            this.contenedor.splice(0, this.contenedor.length);
        }
        catch (err) {
            console.log('Error borrando el archivo', err.message);
        }
    }
}

const productos = new Contenedor('contenedor.txt');
module.exports = productos
