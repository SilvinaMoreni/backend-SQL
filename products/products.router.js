const express = require('express')
const { postProductController, getProductByIdController, deleteProductByIdController, getAllProducts, putProductByIdController } = require('./products.controller')

const productRouter = express.Router()

/* /api/products */

/* 

Get all :
Post crear producto: /
Put Actualizar producto: /
Delete Eliminar un producto: /
Get by id : /:pid

*/


/* 
TODO: Agregar el middleware de verificacion de token
*/

productRouter.get('/', getAllProducts)
productRouter.post('/', postProductController)
productRouter.put('/:pid', putProductByIdController)
productRouter.delete('/:pid', deleteProductByIdController)
productRouter.get('/:pid', getProductByIdController)


module.exports = {productRouter}