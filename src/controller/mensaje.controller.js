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

// const getChats = async (request, response) => {
//     try {
//         let sql;
//         let params;
//         let result;

//         if (request.query.tipoUsuario == 'Consumidor') {
//             params = [request.query.id_usuario1]
//             sql = "SELECT distinct chat.id_chat FROM chat JOIN evento ON (chat.id_usuario2 = evento.id_usuario) WHERE chat.id_usuario1 = ?"
//             console.log(params);
//             [result] = await connection.promise().query(sql, params);
//             respuesta = { error: false, codigo: 200, mensaje: 'Estos son los chats', datoChats: result }
//             console.log(respuesta.datoChats);
            
//         }
//         else if(request.query.tipoUsuario == 'Productor') {
//             params = [request.query.id_usuario2]
//             sql = "SELECT distinct chat.id_chat FROM chat JOIN evento ON (chat.id_usuario2 = evento.id_usuario) WHERE chat.id_usuario2 = ?"
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

const getChats = async (request, response) => {
    try {
        let sql;
        let params;
        let result;

        if (request.query.tipoUsuario == 'Consumidor') {
            params = [request.query.id_usuario1]
            sql = " SELECT distinct nombre, apellidos, evento.foto, chat.id_chat, titulo FROM chat JOIN usuario ON (chat.id_usuario2 = usuario.id_usuario) JOIN evento ON (evento.id_evento = chat.id_evento) WHERE chat.id_usuario1 = ? "
            console.log(params);
            [result] = await connection.promise().query(sql, params);
            respuesta = { error: false, codigo: 200, mensaje: 'Estos son los chats', datoChats: result }
            console.log(respuesta.datoChats);

        }
        else if(request.query.tipoUsuario == 'Productor') {
            params = [request.query.id_usuario2]
            sql = "SELECT distinct nombre, apellidos, evento.foto, chat.id_chat, titulo FROM chat JOIN usuario ON (chat.id_usuario1 = usuario.id_usuario) JOIN evento ON (evento.id_evento = chat.id_evento) WHERE chat.id_usuario2 = ? "
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

const getMensajes = async (request, response) => {
    try {
        let sql;
        let params;
        let result;
        let respuesta;

        if (request.query.id_usuario != null) {
            params = [request.query.id_chat]
            sql = "SELECT * FROM mensaje JOIN chat ON (mensaje.id_chat = chat.id_chat) JOIN usuario ON (usuario.id_usuario = mensaje.id_usuarioEmisor) WHERE mensaje.id_chat = ?"
            
            console.log(params);
            [result] = await connection.promise().query(sql, params);
            respuesta = { error: false, codigo: 200, mensaje: 'Estos son los mensajes del chat', datoMensajes: result }
            console.log(respuesta.datoMensajes)
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

// const postMensaje = async (request, response) => {
//     try {

//         let params = [request.body.mensaje, request.body.id_usuarioEmisor, request.body.id_chat];

//         let sql = "INSERT INTO mensaje (mensaje, id_usuarioEmisor, id_chat)" +
//             "VALUES (?, ?, ?)"

//         let [result] = await connection.promise().query(sql, params);
//         console.log("postMensaje", result);

//         respuesta = { error: false, codigo: 200, mensaje: 'Mensaje añadido correctamente.', datoMensaje: result }
//         response.send(respuesta);
//     }
//     catch (error) {
//         console.log(error);
//     }
// }
const postMensaje = async (request, response) => {
    try {
        let params = [request.body.mensaje, request.body.id_usuarioEmisor, request.body.id_chat];

        let sql = "INSERT INTO mensaje (mensaje, id_usuarioEmisor, id_chat) VALUES (?, ?, ?)";

        let [result] = await connection.promise().query(sql, params);
        console.log("postMensaje", result);

        let respuesta = { error: false, codigo: 200, mensaje: 'Mensaje añadido correctamente.', datoMensaje: result };
        response.send(respuesta);
    } catch (error) {
        console.log(error);
        response.status(500).send({ error: true, codigo: 500, mensaje: 'Error en el servidor.' });
    }
};
const postChat = async (request, response) => {
    try {
        let params = [request.body.id_usuario1, request.body.id_usuario2, request.body.id_evento];
        let existeChat = "SELECT * FROM chat WHERE id_usuario1 = ? AND id_usuario2 = ? AND id_evento = ?";

        let [resultExiste] = await connection.promise().query(existeChat, params);
        if (resultExiste.length > 0) {
            // Chat ya existe
            respuesta = { error: false, codigo: 200, mensaje: 'Chat ya existe.', datoChat: resultExiste[0] };
        } else {
            // Crear el chat
            let sql = "INSERT INTO chat (id_usuario1, id_usuario2, id_evento) VALUES (?, ?, ?)";
            let [result] = await connection.promise().query(sql, params);
            console.log(result);

            let nuevoChat = {
                id_chat: result.insertId,
                id_usuario1: request.body.id_usuario1,
                id_usuario2: request.body.id_usuario2,
                id_evento: request.body.id_evento
            };

            respuesta = { error: false, codigo: 200, mensaje: 'Chat creado correctamente.', datoChat: nuevoChat };
        }
        response.send(respuesta);
    } catch (error) {
        console.log(error);
        response.status(500).send({ error: true, codigo: 500, mensaje: 'Error en el servidor.' });
    }
};

// const postChat = async (request, response) => {
//     try {  
              
//         let params = [request.body.id_usuario1, request.body.id_usuario2, request.body.id_evento];
//         let existeChat = "SELECT * from chat WHERE id_usuario1 = ? AND id_usuario2 = ? AND id_evento = ?"
        
//         let [resultExiste] = await connection.promise().query(existeChat, params);
//         if (resultExiste.length > 0){
//             respuesta = { error: false, codigo: 200, mensaje: 'Chat ya existe.' }
//         } else {
//             let sql = "INSERT INTO chat (id_usuario1, id_usuario2, chat.id_evento)" +
//                 "VALUES (?, ?, ?)"
//             let [result] = await connection.promise().query(sql, params);
//             console.log(result);
//             respuesta = { error: false, codigo: 200, mensaje: 'Chat creado correctamente.' }
//         }
//         response.send(respuesta);
//     }
//     catch (error) { 
//         console.log(error);
//     }
// }

// const postChat = async (request, response) => {
//     try {
        
//         let params = [request.body.id_usuario1, request.body.id_usuario2, request.body.id_evento];
//         let sql = "INSERT INTO chat (id_usuario1, id_usuario2, chat.id_evento)" +
//             "VALUES (?, ?, ?)"
//         let [result] = await connection.promise().query(sql, params);
//         console.log(result);
//         respuesta = { error: false, codigo: 200, mensaje: 'Chat creado correctamente.', datoChat: result }
//         response.send(respuesta);
//     }
//     catch (error) { 
//         console.log(error);
//     }
// }

const deleteChat = async (request, response) => {
    try{
        let params = [request.query.id_chat]
        let sql = "DELETE FROM chat WHERE chat.id_chat = ?";
        let [result] = await connection.promise().query(sql, params)
        respuesta = { error: false, codigo: 200, mensaje: 'Chat borrado correctamente.', datoChats: result }
        response.send(respuesta)
    } 
    catch (error) { 
        console.log(error);
    }
}




module.exports = { getMensajes, postMensaje, postChat, getChats, deleteChat }

