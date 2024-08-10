const {Router}=require("express");
const { registerUser, login, logOut } = require("../controller/userController");

const router=Router();
router.post("/register",registerUser);
router.post("/login",login);
router.post("/logout",logOut);


module.exports=router