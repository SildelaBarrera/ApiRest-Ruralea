const {Router} = require ("express")
const router = Router();
const usersCtrl = require("../controller/usuario.controller")

router.post("/registro", usersCtrl.postUserRegistro);

// router.get("/usuario", usersCtrl.getBooks);

// router.get("/usuario/:name", usersCtrl.getUser2);
        
// router.post("/usuario", usersCtrl.postUser);
        
// router.put("/usuario", usersCtrl.putUser);
        
// router.delete("/usuario", usersCtrl.deleteUser); 

module.exports = router;


