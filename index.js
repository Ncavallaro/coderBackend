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

const productosTxt = new Contenedor('productos.txt');

app.get('/productos', (req, res) => {
    const getProducts = async () => {
      const products = await productosTxt.getAll();
      res.send(products);
    };
    getProducts();
  });
  
  app.get('/productoRamdom', (req, res, ) => {
    const getProducts = async () => {
      const products = await productosTxt.getAll();
      const numberRandom = Math.floor((Math.random() * (products.length)));
      res.send(products[numberRandom]);
    };
    getProducts();
  });
  
  app.listen(8080, () => {
    console.log('Servidor levantado!');
  });
