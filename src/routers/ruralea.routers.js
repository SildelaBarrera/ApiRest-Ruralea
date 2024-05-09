const {Router} = require ("express")
const router = Router();
const usersCtrl = require("../controller/usuario.controller")
const reservaCtrl = require("../controller/reserva.controller")
const eventoCtrl = require("../controller/evento.controller")

router.post("/login", usersCtrl.postLogin);

router.post("/registro", usersCtrl.postUserRegistro);

router.get("/misReservas", reservaCtrl.getReservas);

router.get("/actividades", eventoCtrl.getActividades);

//router.get("/actividades", eventoCtrl.getAllActividades); 
        
// router.put("/usuario", usersCtrl.putUser);
        
// router.delete("/usuario", usersCtrl.deleteUser); 

module.exports = router;


