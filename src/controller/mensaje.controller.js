const {connection} = require('../database')

// const getChats = async (request, response) => {
//     try{
//         let sql;
//         let params;
//         let result;

//         if(request.query.id_usuario1 != null){
//             sql= "SELECT id_chat FROM chat WHERE id_usuario1 = ?" 
//             params = [request.query.id_usuario1]
//             console.log(params);
//             [result] = await connection.promise().query(sql, params);
//             console.log(result)

//             respuesta = {error: false, codigo: 200, mensaje: 'Estos son los chats', datoChats: result}  
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
// const getChats = async (request, response) => {
//     try {
//         let sql;
//         let params;
//         let result;

//         if (request.query.tipoUsuario == 'Consumidor') {
//             params = [request.query.id_usuario1]
//             sql = " SELECT distinct nombre, apellidos, chat.id_chat FROM mensaje JOIN chat ON (mensaje.id_chat = chat.id_chat) JOIN usuario ON (chat.id_usuario2 = usuario.id_usuario)  WHERE chat.id_usuario = ?"
//             console.log(params);
//             [result] = await connection.promise().query(sql, params);
//             respuesta = { error: false, codigo: 200, mensaje: 'Estos son los chats', datoChats: result }
//             console.log(respuesta.datoChats);

//         }
//         else if(request.query.tipoUsuario == 'Productor') {
//             params = [request.query.id_usuario2]
//             sql = "SELECT distinct nombre, apellidos, chat.id_chat FROM mensaje JOIN chat ON (mensaje.id_chat = chat.id_chat) JOIN usuario ON (chat.id_usuario1 = usuario.id_usuario) WHERE chat.id_usuario2 = ? "
//             console.log(params);
//             [result] = await connection.promise().query(sql, params);
//             respuesta = { error: false, codigo: 200, mensaje: 'Estos son los chats', datoChats: result }
//             console.log(respuesta.datoChats);
//         } else{
//             respuesta = { error: true, codigo: 200, mensaje: 'No hay chats'}
//         }
//         response.send(respuesta);
//     }
//     catch (error) {
//         console.log(error);
//     }
// }
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
// const getMensajes = async (request, response) => {
//     try{
//         let sql;
//         let params;
//         let result;

//         if(request.query.id_chat != null){
//             sql= "SELECT mensaje, id_usuarioEmisor FROM mensaje JOIN chat ON (chat.id_chat = mensaje.id_chat) WHERE chat.id_chat = ?" 
//             params = [request.query.id_chat]
//             console.log(params);
//             [result] = await connection.promise().query(sql, params);

//             respuesta = {error: false, codigo: 200, mensaje: 'Estos son los mensajes del chat', result}

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

// const postMensaje = async (request, response) =>
//     {
//         try{
            
//             let params = [request.body.mensaje, request.body.id_usuarioEmisor, request.body.chat];
            
//             let sql = "INSERT INTO mensaje (mensaje, id_usuarioEmisor, chat)" +
//             "VALUES (?, ?, ?)"
    
//             let[result] = await connection.promise().query(sql, params);
//             console.log("postMensaje", result);

//             respuesta = {error: false, codigo: 200, mensaje: 'Mensaje añadido correctamente.'}
//             response.send(respuesta); 
//         }
//         catch(error){
//             console.log(error);
//         }      
//     }

// const postChat = async (request, response) =>
//     {
//         try{
            
//             let params = [request.body.id_usuario1, request.body.id_usuario2];
            
//             let sql = "INSERT INTO chat (id_usuario1, id_usuario2)" +
//             "VALUES (?, ?)"
    
//             let[result] = await connection.promise().query(sql, params);
//             console.log(result);

//             respuesta = {error: false, codigo: 200, mensaje: 'Chat creado correctamente.'}
//             response.send(respuesta); 
//         }
//         catch(error){
//             console.log(error);
//         }      
//     }



// module.exports = {getMensajes, postMensaje, postChat, getChats}