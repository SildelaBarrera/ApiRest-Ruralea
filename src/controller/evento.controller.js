const {connection} = require('../database')

const getActividades = async (request, response) => {
    try {
        let respuesta;
        let params;
        let sql;

        if (request.query.provincia != "") {
            params = [request.query.categoria, request.query.provincia];
            sql = "SELECT * FROM evento WHERE categoria = ? AND provincia = ?";
            let [result] = await connection.promise().query(sql, params);
            if (result[0] == null) {
                respuesta = { error: true, codigo: 200, mensaje: 'No hay actividades' };
            } else {
                respuesta = { error: false, codigo: 200, mensaje: 'Estas son las reservas', datoEventos: result };
            }
        } else if (request.query.provincia == "" && request.query.categoria == 'Ver todas las actividades' || request.query.categoria == "" || request.query.categoria == 'Elige una categoria') {
            sql = "SELECT * FROM evento";
            let [result] = await connection.promise().query(sql);
            respuesta = { error: false, codigo: 200, mensaje: 'Todas las actividades', datoEventos: result };
        }

        response.send(respuesta);
    } catch (error) {
        console.log(error);
    }
}

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
                request.body.provincia, request.body.aforo, request.body.precio, request.body.descripcion, request.body.foto, request.body.id_evento];
            
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

const putEvento = async (request, response) =>
{
    try{
        let params =[request.body.id_evento, request.body.id_usuario]
        let sql = "SELECT * FROM evento WHERE id_evento = ? AND id_usuario = ?"
        let [result] = await connection.promise().query(sql, params)
        console.log[result]
        console.log[result[0]]
        
        if(result[0] != undefined){
            if (request.body.titulo == ""){
                request.body.titulo = undefined;
            }
            if (request.body.categoria == null){
                request.body.categoria = undefined;
            }
            if (request.body.fecha == ""){
                request.body.fecha = undefined;
            }
            if (request.body.municipio == ""){
                request.body.municipio= undefined;
            }
            if (request.body.provincia == ""){
                request.body.provincia = undefined;
            }
            if (request.body.aforo == ""){
                request.body.aforo = undefined;
            }
            if (request.body.precio == ""){
                request.body.precio = undefined;
            }
            if (request.body.descripcion == ""){
                request.body.descripcion = undefined;
            }
            if (request.body.foto == ""){
                request.body.foto = undefined;
            }
            
            let params = [request.body.titulo, request.body.categoria, request.body.fecha, request.body.municipio, 
                request.body.provincia, request.body.aforo, request.body.precio, request.body.descripcion, request.body.foto, request.body.id_evento
                ]
            let sql = "UPDATE evento SET titulo = COALESCE(?, titulo), categoria = COALESCE(?, categoria), fecha = COALESCE(?, fecha), municipio = COALESCE(?, municipio),  "
             +  "provincia = COALESCE(?, provincia), aforo = COALESCE(?, aforo), precio = COALESCE(?, precio), descripcion = COALESCE(?, descripcion), foto = COALESCE(?, foto) WHERE id_evento = ?";

            let[result] = await connection.promise().query(sql, params);
            console.log(result)
            respuesta = {error: false, codigo: 200, mensaje: 'Evento editado correctamente.'}
            response.send(respuesta); 
            
        }
        else{
            respuesta = {error: true, codigo: 200, mensaje: 'No existe el evento.'}
        }
        response.send(respuesta); 
    }
    catch(error){
        console.log(error);
    }
}
    module.exports = {getEventos, postEvento, getActividades, putEvento}
