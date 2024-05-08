const {connection} = require('../database')

const postLogin = async (request, response) =>
    {
        try{
            let sql = "SELECT id_usuario, tipoUsuario, nombre, apellidos, email, foto, password FROM usuario WHERE email= ?"
            let [result] = await connection.promise().query(sql, request.body.email)
            console.log(result[0]);
            
            if (result[0] != undefined){
                if (result[0].contraseña == request.body.password){
                    respuesta = {error: false, codigo: 200, mensaje: 'Usuario logueado', datoUsuario: result[0]}
                }
                else{
                    respuesta = {error: true, codigo: 200, mensaje: 'Email o contraseña incorrecta'}
                }
            }
            else{
                respuesta = {error: true, codigo: 200, mensaje: 'Email o contraseña incorrecta'}
            }
            response.send(respuesta);
        }
        catch(error){
            console.log(error);
        }      
    }


const postUserRegistro = async (request, response) =>
    {
        try{
            let params = [request.body.email]
            let sql = "SELECT email FROM usuario WHERE email = ?";
            let [result] = await connection.promise().query(sql, params )   
            if( result[0] != undefined){
                respuesta = {error: true, codigo: 200, mensaje: 'El usuario ya existe'}
            }
            else{ 
                    let params = [request.body.tipoUsuario, request.body.nombre, request.body.apellidos, request.body. email, request.body.foto, request.body.password]
                    let sql = "INSERT INTO usuario (tipoUsuario, nombre, apellidos, email, foto, password) " +
                    "VALUES (?, ?, ?, ?, ?, ?)"
                
                    let[result] = await connection.promise().query(sql, params);
                    console.log(result);
                    respuesta = {error: false, codigo: 200, mensaje: 'Usuario registrado correctamente.', datoUsuario: result[0]}
                    response.send(respuesta)
            }
            response.send(respuesta)
        }
        catch(error){
            console.log(error);
        } 
    }

module.exports = {postLogin, postUserRegistro}


