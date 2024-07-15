const { query } = require("../config/connection.sql")


const editarProducto = async (pid, producto) => {
    const { titulo, descripcion, stock, precio, codigo } = producto;
    try {
      const consultaString = 'UPDATE productos SET titulo = ?, descripcion = ?, stock = ?, precio = ?, codigo = ? WHERE id = ?';
      const valores = [titulo, descripcion, stock, precio, codigo, pid]; // pid needs to be included in the array
      const resultado = await query(consultaString, valores);
  
      if (resultado.affectedRows === 0) {
        throw { status: 404, message: 'PRODUCTO CON ID ' + pid + ' NO ENCONTRADO' };
      }
      
      return resultado;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      } else {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.', error };
      }
    }
  }
const insertarProducto = async ({titulo, descripcion, precio, stock, codigo}) => {
    try{
        const consultaString = 'INSERT INTO productos (titulo, descripcion, stock, precio, codigo) VALUES (?,?,?,?,?)'
        const valores = [titulo, descripcion, stock, precio, codigo]
        const resultado = await query(consultaString, valores)
        return resultado.insertId
    }
    catch(error){
        throw {status:500, message: 'Error interno en el servidor'}
    }
}

const seleccionarProductoPorId = async (pid) =>{
    try{
        const consultaString = 'SELECT * FROM productos WHERE id = ?'
        const resultado = await query(consultaString, [pid])

        if(resultado.length === 0){
            throw {status: 404, message: 'Producto con id ' + pid + ' no encontrado'}
        }
        else{
            return resultado[0]
        }
        
    }
    catch(error){

        if(error.status === 404){
            throw error
        }
        else{
            throw {status:500, message: 'Error interno en el servidor'}
        }
        
    }
}

const deleteProductoPorId = async(pid) =>{
    try{
        const consultaString = 'DELETE FROM productos WHERE id = ?'
        const resultado = await query(consultaString, [pid])
       
        if(resultado.length === 0){
            throw {status: 404, message: 'Producto con id ' + pid + ' no existe'}
        }
        else{
            return {status: 200, message: 'Producto con id ' + pid + ' eliminado correctamente'}
        }     
    }
    catch(error){
        
        if(error.status === 404){
            throw error
        }
        else{ 
            throw {status:500, message: 'Error interno en el servidor'}           
        }      
    }
}

const seleccionarProductos = async () =>{
    try{
        const consultaString = 'SELECT * FROM productos'
        const productos = await query(consultaString)
        return productos
    }
    catch(error){
        if(error.status){
            throw error
        }
        else{
            throw {status:500, message: 'Error interno en el servidor'}
        }
    }
}


module.exports = { insertarProducto, seleccionarProductoPorId, deleteProductoPorId, seleccionarProductos, editarProducto}