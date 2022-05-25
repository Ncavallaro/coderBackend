const express = require('express');
const app = express();
const fs = require('fs');

class Contenedor {

  id = 1;

  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  async save(objeto) {
    objeto['id'] = this.id;
    this.id++;
    const contenido = JSON.parse(await fs.promises.readFile(this.nombreArchivo));
    contenido.push(objeto);
    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenido));
  }

  async getById(idNumber) {
    try {
      const contenidoCrudo = await fs.promises.readFile(this.nombreArchivo);
      const contenido = JSON.parse(contenidoCrudo);
      contenido.forEach(element => {
        if(element.id== idNumber){
          console.log(element);
          return element;
        } else {
          return null;
        }
      });
      //return contenido;
    } catch (error) {
      console.log('Error en getById: ', error);
      return [];
    }
  }

  async getAll() {
    try {
      const contenidoCrudo = await fs.promises.readFile(this.nombreArchivo);
      const contenido = JSON.parse(contenidoCrudo);
      return contenido;
    } catch (error) {
      console.log('Error en getAll: ', error);
      return [];
    }
  }

  async deleteById(idNumber) {
    try {
      const contenidoCrudo = await fs.promises.readFile(this.nombreArchivo);
      const contenido = JSON.parse(contenidoCrudo);
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenido.slice(idNumber)));
    } catch (error) {
      console.log('Error en deleteById: ', error);
      return [];
    }
  }

  async deleteAll() {
    try {
      const contenidoCrudo = await fs.promises.readFile(this.nombreArchivo);
      const contenido = JSON.parse(contenidoCrudo);
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenido.splice(0, -1)));
    } catch (error) {
      console.log('Error en deleteAll: ', error);
      return [];
    }
  }
}

/*const ejecutarProductos = async () => {
  const productos = new Contenedor('productos.txt');
  await productos.save({title: 'Cif Antigrasa', price: 28.86, thumbnail: 'random_string'});
  console.log(productos.getAll());
  return await productos.getAll();
  //console.log(await productos.getAll());
  //console.log(await productos.getById(2))
  //console.log(await productos.deleteAll())
  //console.log(await productos.deleteById(2))
}*/

const productos = new Contenedor('productos.txt');

app.get('/productos', (req, res, next) => {
    res.send(productos.getAll());
  });
  
  app.get('/productoRamdom', (req, res, next) => {
    res.send();
  });
  
  app.listen(8080, () => {
    console.log('Servidor levantado!');
  });
