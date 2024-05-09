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
                console.log(result);
                        
                if (result.length >= 1){
                    respuesta = {error: false, codigo: 200, mensaje: "Estos son los eventos", dataEventos: result};    
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
    
    module.exports = {getEventos}