const {connection} = require('../database')

const getEventos = async (request,response) =>
    {
        try{
            let sql;
            let params;

            if( request.query.id_usuario != null){
                sql= "SELECT * FROM evento WHERE id_usuario = ?" 
                params = [request.query.id_usuario]
                console.log(params);
                let [result] = await connection.promise().query(sql, params);
                        
                if (result.length >= 1){
                    respuesta = {error: false, codigo: 200, mensaje: "Estos son los eventos", datoEventos: result};
                    console.log(respuesta.datoEventos)    
                }else {
                    respuesta = {error: false, codigo: 200, mensaje: "No hay eventos"};    
                }
            }
            response.send(respuesta);     
        
        }
        catch(error){
            console.log(error);
        }
    }


const postEvento = async (request, response) =>
    {
        try{
            
            let params = [request.body.titulo, request.body.categoria, request.body.fecha, request.body.municipio, 
                request.body.provincia, request.body.aforo, request.body.precio, request.body.descripcion, request.body.foto, request.body.id];
                console.log(params);
            
            let sql = "INSERT INTO evento (titulo, categoria, fecha, municipio, provincia, aforo, precio, descripcion, foto, id_usuario)" +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    
            let[result] = await connection.promise().query(sql, params);
            console.log(result);

            respuesta = {error: false, codigo: 200, mensaje: 'Evento añadido correctamente.'}
            response.send(respuesta); 
        }
        catch(error){
            console.log(error);
        }      
    }
    module.exports = {getEventos, postEvento}