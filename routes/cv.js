const router = require("express").Router();
const cvController = require("../controllers/cvController");

router.post("/createCV", cvController.createCV);

router.post("/updateCV", cvController.updateCV);

router.get("/getCV", cvController.getCV);

router.get("/getAllCV", cvController.getAllCVs);

router.delete("/deleteCV", cvController.deleteCV);

module.exports = router;
