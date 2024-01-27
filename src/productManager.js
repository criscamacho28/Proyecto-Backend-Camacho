import{promises as fs} from 'fs' //Para el files system
import{v4 as uuidv4} from 'uuid' //Para los id aleatorios

export class ProductManager{ 
    constructor(){
        this.path = 'products.json'; //para el archivo
        this.products = []; //arr para los productos
    }

    addProduct = async ({title, description, price, thumbnail, code, stock, status, category}) => {
        const id = uuidv4(); //guardo un id aleatoriamente
        //al nuevo producto le agregamos un id
        let newProduct = {id, title, description, price, thumbnail, code, stock, status, category};
        
        this.products = await this.getProducts();
        this.products.push(newProduct); //y lo guardo en el arr
    
        await fs.writeFile(this.path, JSON.stringify(this.products)); //y se guarda en el archivo
        
        return newProduct; //para ver en el nodemon
    }

    getProducts = async () => {
        const response = await fs.readFile(this.path, 'utf8');
        const responseJSON = JSON.parse(response); //La respuesta la paso a json

        return responseJSON;
    }

    getProductById = async (id) => {
        const response = await this.getProducts();

        const product = response.find(product => product.id == id);
        if(product){ //Si existe el producto
            return product;
        }else{
            console.log("Producto no encontrado");
        }
    }

    updateProduct = async (id, {...data}) =>{
        const products = await this.getProducts(); //Obtengo todos los productos del archivo
        const index = products.findIndex(product => product.id == id); //Si existe un id igual al que recibo por parametro
        if(index != -1){ //Si encontro el id del producto
            products[index] = {id, ...data} //Lo edito
            await fs.writeFile(this.path, JSON.stringify(products));
            return products[index];
        }else{
            console.log("Producto no encontrado");
        }
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts(); //Obtengo todos los productos del archivo
        const index = products.findIndex(product => product.id == id); //Si existe un id igual al que recibo por parametro
        if(index != -1){
            products.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(products));
        }else{
            console.log("Prodcuto no encontrado");
        }
    }
} 
