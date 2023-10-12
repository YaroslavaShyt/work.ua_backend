const router = require("express").Router();
const jobController = require("../controllers/jobController");
const {
  verifyToken,
  verifyAndAuthorization,
} = require("../middleware/verifyToken");

router.post("/", jobController.createJob);

router.put("/:id", jobController.updateJob);

router.delete("/:id", jobController.deleteJob);

router.get("/:id", jobController.getJob);

router.get("/all/", jobController.getAllJobs);

module.exports = router;
