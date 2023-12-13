const router = require("express").Router();
const jobController = require("../controllers/jobController");
const {
  verifyToken,
  verifyAndAuthorization,
} = require("../middleware/verifyToken");

router.post("/", verifyToken, jobController.createJob);

router.put("/:id", verifyToken, jobController.updateJob);

router.delete("/:id", verifyToken, jobController.deleteJob);

router.get("/:id", verifyToken, jobController.getJob);

router.get("/", verifyToken, jobController.getAllJobs);

module.exports = router;
