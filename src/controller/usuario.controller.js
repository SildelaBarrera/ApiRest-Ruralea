const {connection} = require('../database')

const postUserRegistro = async (request, response) =>
    {
        try{
            let params = [request.body.email]
            let sql = "SELECT email FROM usuario WHERE email = ?";
            let [result] = await connection.promise().query(sql, params )   
            if( result[0] != undefined){
                respuesta = {error: true, codigo: 200, message: 'El usuario ya existe'}
            }
            else{ 
                    let params = [request.body.tipoUsuario, request.body.nombre, request.body.apellidos, request.body. email, request.body.foto, request.body.contraseña]
                    let sql = "INSERT INTO usuario (tipoUsuario, nombre, apellidos, email, foto, contraseña) " +
                    "VALUES (?, ?, ?, ?, ?, ?)"
                
                    let[result] = await connection.promise().query(sql, params);
                    console.log(result);
                    respuesta = {error: false, codigo: 200, message: 'Usuario registrado correctamente.', dataUsuario: result[0]}
                    response.send(respuesta)
            }
            response.send(respuesta)
        }
        catch(error){
            console.log(error);
        }      
    }


    module.exports = {postUserRegistro}


