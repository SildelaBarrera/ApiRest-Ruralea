
function getStart(request, response)
{
    let respuesta = {error: true, codigo: 200, mensaje: 'Punto de inicio'};
    response.send(respuesta);
}

module.exports = {getStart}