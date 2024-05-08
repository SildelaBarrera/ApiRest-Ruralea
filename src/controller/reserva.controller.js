const {connection} = require('../database')


const getReservas = async (request, response) =>
    {
        try{
            let params = [request.query.id_usuario]
            let sql = "SELECT * FROM evento JOIN reserva ON (evento.id_evento = reserva.id_evento ) WHERE reserva.id_usuario = ?";
            let [result] = await connection.promise().query(sql, params )   
            if( result.length == 0){
                respuesta = {error: true, codigo: 200, mensaje: 'No tienes reservas'}
            }
            else{ 
                respuesta = {error: false, codigo: 200, mensaje: 'Aqui estan tus reservas', datoEventos: result}
                
            }
            response.send(respuesta)
        }
        catch(error){
            console.log(error);
        } 
    }

    module.exports = {getReservas}