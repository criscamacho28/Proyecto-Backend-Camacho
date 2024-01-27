import {Router} from  'express';
import { productManager } from '../index.js';

const productsRouter = Router();

//http://localhost:8080/products
productsRouter.get('/', async(req, res) => {
    try{ //Si sale BIEN
        const {limit} = req.query; //Desestructuro el obj query
        const products = await productManager.getProducts();
        if(limit){
            const limitedProducts = products.slice(0, limit);
            return res.json(limitedProducts);
        }
        return res.json(products);
        
    }catch(error){ //Si sale MAL
        console.log(error);
        res.send("Error al intentar recibir los productos");
    }
});

productsRouter.get('/:pid', async(req, res) => {
    const{pid} = req.params;
    try{
        const products = await productManager.getProductById(pid);
        res.json(products);
    }catch (error){
        console.log(error);
        res.send(`Error al intentar recibir el producto con id ${pid}`);
    }
});

productsRouter.post('/', async(req, res) =>{
    try {
        const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;
        const response = await productManager.addProduct({title, description, price, thumbnail, code, stock, status, category});
        res.json(response);
    }catch(error){
        console.log(error);
        res.send(`Error al intentar agregar el producto`);
    }
});

productsRouter.put('/:pid', async(req, res) =>{
    const {pid} = req.params; 
    try {
        const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;
        const response = await productManager.updateProduct(pid, {title, description, price, thumbnail, code, stock, status, category});
        res.json(response);
    }catch(error) {
        console.log(error);
        res.send(`Error al intentar editar el producto con id ${pid}`);
    }
});

productsRouter.delete('/:pid', async(req, res) => {
    const {pid} = req.params;
    try {
        await productManager.deleteProduct(pid);
        res.send('Producto eliminado exitosamente');
    } catch (error) {
        console.log(error);
        res.send(`Error al intentar eliminar el producto con id ${pid}`);
    }
});

export{productsRouter};