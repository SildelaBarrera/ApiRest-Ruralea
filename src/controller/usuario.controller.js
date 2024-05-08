
const {connection} = require("../database");

const postLogin = async (request, response) =>
    {
        try{
            let sql = "SELECT id_usuario, tipoUsuario, nombre, apellidos, email, foto, contraseña FROM usuario WHERE email= ?"
            let [result] = await connection.promise().query(sql, request.body.email)
            console.log(result[0]);
            
            if (result[0] != undefined){
                if (result[0].contraseña == request.body.contraseña){
                    respuesta = {error: false, codigo: 200, mensaje: 'Usuario logueado', dato: result[0]}
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
module.exports = {postLogin}