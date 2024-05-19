const { connection } = require('../database')

// const getUsuarios = async (request, response) => {
//     try {
//         if (request.query.id_usuario != null && request.query.tipoUsuario == 'Consumidor') {
//             let params = [request.query.tipoUsuario]
//             let sql = "SELECT * FROM usuario WHERE tipoUsuario != ? and "
//             let [result] = await connection.promise().query(sql, params)
//             respuesta = { error: false, codigo: 200, mensaje: 'Estos son los usuarios Productores', datoUsuarios: result }
//             console.log(result);
//         }
//         response.send(respuesta)
//     } catch (error) {
//         console.error("Error al reservar el evento", error);
//     }
// }

const getChats = async (request, response) => {
    try {
        let sql;
        let params;
        let result;

        if (request.query.tipoUsuario == 'Consumidor') {
            params = [request.query.id_usuario1]
            sql = "SELECT  distinct chat.id_chat FROM mensaje JOIN chat ON (mensaje.id_chat = chat.id_chat) JOIN usuario ON (usuario.id_usuario = mensaje.id_usuarioEmisor) WHERE chat.id_usuario1 = ?"
            console.log(params);
            [result] = await connection.promise().query(sql, params);
            respuesta = { error: false, codigo: 200, mensaje: 'Estos son los chats', datoChats: result }
            console.log(respuesta.datoChats);
            
        }
        else if(request.query.tipoUsuario == 'Productor') {
            params = [request.query.id_usuario2]
            sql = "SELECT distinct chat.id_chat FROM mensaje JOIN chat ON (mensaje.id_chat = chat.id_chat) JOIN usuario ON (usuario.id_usuario = mensaje.id_usuarioEmisor) WHERE chat.id_usuario2 = ?"
            console.log(params);
            [result] = await connection.promise().query(sql, params);            
            respuesta = { error: false, codigo: 200, mensaje: 'Estos son los chats', datoChats: result }
            console.log(respuesta.datoChats);
        } else{
            respuesta = { error: true, codigo: 200, mensaje: 'No hay chats'}
        }
        response.send(respuesta);
    }
    catch (error) {
        console.log(error);
    }
}

// const getMensaje = async (request, response) => {
//     try{
//         let sql;
//         let params;
//         let result;

//         if(request.query.chat != null){
//             sql= "SELECT mensaje FROM mensaje JOIN chat ON (chat = id_chat) WHERE chat = ?" 
//             params = [request.query.chat]
//             console.log(params);
//             [result] = await connection.promise().query(sql, params);
//             console.log(result)

//             respuesta = {error: false, codigo: 200, mensaje: 'Este es el mensaje', datoMensajes: result}  
//         }
//         else {
//             respuesta = {error: true, codigo: 200, mensaje: 'No hay mensajes'}  
//         }
//         response.send(result);     
//     }
//     catch(error){
//         console.log(error);
//     }
// }
const getMensajes = async (request, response) => {
    try {
        let sql;
        let params;
        let result;
        let respuesta;

        if (request.query.id_usuario != null) {
            params = [request.query.id_chat, request.query.id_usuario]
            sql = "SELECT * FROM mensaje JOIN chat ON (mensaje.id_chat = chat.id_chat) JOIN usuario ON (usuario.id_usuario = mensaje.id_usuarioEmisor) WHERE mensaje.id_chat = ?"
            
            console.log(params);
            [result] = await connection.promise().query(sql, params);
            console.log(result)

            respuesta = { error: false, codigo: 200, mensaje: 'Estos son los mensajes del chat', datoMensajes: result }
        }
        else {
            respuesta = { error: true, codigo: 200, mensaje: 'No hay mensajes' }
        }
        response.send(respuesta);
    }
    catch (error) {
        console.log(error);
    }
}

const postMensaje = async (request, response) => {
    try {

        let params = [request.body.mensaje, request.body.id_usuarioEmisor, request.body.id_chat];

        let sql = "INSERT INTO mensaje (mensaje, id_usuarioEmisor, id_chat)" +
            "VALUES (?, ?, ?)"

        let [result] = await connection.promise().query(sql, params);
        console.log("postMensaje", result);

        respuesta = { error: false, codigo: 200, mensaje: 'Mensaje añadido correctamente.', datoMensaje: result }
        response.send(respuesta);
    }
    catch (error) {
        console.log(error);
    }
}

const postChat = async (request, response) => {
    try {

        let params = [request.body.id_usuario1, request.body.id_usuario2];

        let sql = "INSERT INTO chat (id_usuario1, id_usuario2)" +
            "VALUES (?, ?)"

        let [result] = await connection.promise().query(sql, params);
        console.log(result);

        respuesta = { error: false, codigo: 200, mensaje: 'Chat creado correctamente.' }
        response.send(respuesta);
    }
    catch (error) { 
        console.log(error);
    }
}




module.exports = { getMensajes, postMensaje, postChat, getChats }

