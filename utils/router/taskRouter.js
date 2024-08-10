const {Router}=require("express");
const { addTask, getTasks } = require("../controller/taskController");
const { protect } = require("../middleware/auth");

const router=Router();

router.post("/add",protect ,addTask);
router.get("/all",protect, getTasks);



module.exports=router