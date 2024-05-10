const {connection} = require('../database')



    const reservarEvento = async (request, response) => 
        {             
        try{
          // Insertar los datos en la tabla de reservas
          if(request.query.id_usuario != null && request.query.id_evento != null){
            let params = [request.query.id_usuario, request.query.id_evento]
            let sql = "INSERT INTO reserva (id_usuario, id_evento) VALUES (?, ?)";
            let [result] = await connection.promise().query(sql, params)
            } else {
            params = [request.query.id_usuario]
            sql = "SELECT * FROM evento JOIN reserva ON (evento.id_evento = reserva.id_evento) WHERE reserva.id_usuario = ?";
            [result] = await connection.promise().query(sql, params)
            respuesta = {error: false, codigo: 200, mensaje: 'Aqui estan tus reservas', datoEventos: result}  
            console.log(result);
            }
            response.send(respuesta)       
          
        } catch (error){
          console.error("Error al reservar el evento", error);          
        }
      };

    const borrarReserva = async (request, response) =>{             
        try{                          
            let params = [request.query.id_usuario, request.query.id_evento]
            let sql = "DELETE FROM reserva WHERE reserva.id_usuario = ? AND reserva.id_evento = ?";
            [result] = await connection.promise().query(sql, params)
            if(result.affectedRows == 0){
                respuesta = {error: true, codigo: 200, mensaje: 'No existe la actividad'}
            } else { 
            
            respuesta = {error: false, codigo: 200, mensaje: 'Actividad borrada correctamente', datoEventos: result}
            console.log(result);
            }
            response.send(respuesta)
        } catch (error){
            console.error("no existe la actividad", error);  
        }            
    };

    
    module.exports = {reservarEvento, borrarReserva}