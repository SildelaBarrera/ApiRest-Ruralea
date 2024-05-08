const {Router} = require ("express")
const router = Router();
const usersCtrl = require("../controller/usuario.controller")


router.post("/login", usersCtrl.postLogin);

router.post("/registro", usersCtrl.postUserRegistro);

// router.get("/", usersCtrl.getStart);

// router.get("/usuario", usersCtrl.getBooks);

// router.get("/usuario/:name", usersCtrl.getUser2);
        
// router.put("/usuario", usersCtrl.putUser);
        
// router.delete("/usuario", usersCtrl.deleteUser); 

module.exports = router;


