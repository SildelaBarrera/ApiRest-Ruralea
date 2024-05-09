const {Router} = require ("express")
const router = Router();
const usersCtrl = require("../controller/usuario.controller")
const eventosCtrl = require("../controller/evento.controller")
const reservaCtrl = require("../controller/reserva.controller")


router.post("/login", usersCtrl.postLogin);

router.post("/registro", usersCtrl.postUserRegistro);

router.get("/misEventos", eventosCtrl.getEventos);

router.post("/nuevoEvento", eventosCtrl.postEvento);

router.get("/actividades", eventosCtrl.getActividades);

//router.get("/actividades", eventoCtrl.getAllActividades); 
        
// router.put("/usuario", usersCtrl.putUser);
        
// router.delete("/usuario", usersCtrl.deleteUser); 

module.exports = router;


