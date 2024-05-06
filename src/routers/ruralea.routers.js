const {Router} = require ("express")
const router = Router();
const usersCtrl = require("../controller/usuario.controller")

router.get("/", usersCtrl.getStart);

router.get("/usuario", usersCtrl.getUser);

router.get("/usuario/:name", usersCtrl.getUser2);
        
router.post("/usuario", usersCtrl.postUser);
        
router.put("/usuario", usersCtrl.putUser);
        
router.delete("/usuario", usersCtrl.deleteUser); 

module.exports = router;


