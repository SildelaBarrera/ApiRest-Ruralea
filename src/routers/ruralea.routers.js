const {Router} = require ("express")
const router = Router();
const usersCtrl = require("../controller/usuario.controller")
const eventosCtrl = require("../controller/evento.controller")
const reservaCtrl = require("../controller/reserva.controller")
const mensajesCtrl = require("../controller/mensaje.controller")

router.post("/login", usersCtrl.postLogin);

router.post("/registro", usersCtrl.postUserRegistro);

router.get("/misEventos", eventosCtrl.getEventos);

router.post("/nuevoEvento", eventosCtrl.postEvento);

router.get("/actividades", eventosCtrl.getActividades);

router.get("/misReservas", reservaCtrl.reservarEvento); 
        
router.delete("/misReservas", reservaCtrl.borrarReserva);

router.delete("/misEventos", eventosCtrl.borrarEvento);
        
router.put("/misEventos", eventosCtrl.putEvento); 

router.put("/perfil", usersCtrl.putUsuario);

// router.get("/miChat", mensajesCtrl.getChats);

// router.post("/nuevoChat", mensajesCtrl.postChat);

// router.get("/chat", mensajesCtrl.getMensajes);

// router.post("/chat", mensajesCtrl.postMensaje);





module.exports = router;


