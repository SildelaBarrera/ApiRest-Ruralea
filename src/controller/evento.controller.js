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

module.exports = {getActividades}