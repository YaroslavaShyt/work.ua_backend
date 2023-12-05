const CV = require("../models/cvModel");

module.exports = {
  createCV: async (req, res) => {
    console.log("in function");
    const newCV = new CV(req.body);
    console.log(req.body);
    try {
      const savedCV = await newCV.save();
      //const { __v, createdAt, updatedAt, ...newCVInfo } = savedCV._doc;

      res.status(200).json({
        success: true,
        statuscode: 200,
        data: { message: "CV created." },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        statuscode: 500,
        data: { message: error.message },
      });
    }
  },

  updateCV: async (req, res) => {
    try {
      console.log(req.body.id);
      const isCVInDB = await CV.findById(req.body.id);
      if (isCVInDB) {
        const UpdateCV = await CV.findByIdAndUpdate(
          req.body.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        res.status(200).json({
          success: true,
          statuscode: 200,
          data: { message: "CV updated." },
        }); // ...others });
      } else {
        res.status(500).json({
          success: false,
          statuscode: 500,
          data: { message: "Could not find this CV." },
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        statuscode: 500,
        data: { message: error.message },
      });
    }
  },

  deleteCV: async (req, res) => {
    try {
      const isCVInDB = await CV.findById(req.body.id);
      //console.log(isCVInDB);
      if (isCVInDB) {
        await CV.findByIdAndDelete(req.body.id);

        res.status(200).json({
          success: true,
          statuscode: 200,
          data: { message: "CV deleted." },
        });
      } else {
        res.status(404).json({
          success: false,
          statuscode: 404,
          data: { message: "Could not find CV with this ID." },
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({ success: false, statuscode: 404, error: error.message });
    }
  },

  getCV: async (req, res) => {
    try {
      const cv = await CV.findById(req.body.id);
      if (cv) {
        const { password, __v, createdAt, updatedAt, ...cvData } = cv._doc;
        res.status(200).json({
          success: true,
          statuscode: 200,
          data: { message: "Got CV.", data: cvData },
        });
      } else {
        res.status(404).json({
          success: false,
          statuscode: 404,
          error: "No CV with this ID.",
        });
      }
    } catch (error) {
      res
        .status(404)
        .json({ success: false, statuscode: 404, error: error.message });
    }
  },

  getAllCVs: async (req, res) => {
    let cvs;
    try {
      console.log("in fun");
      //console.log(req.body.data.conditions);
      if (req.body) {
        // console.log("here");
        cvs = await CV.find(req.body);
      } else {
        //  console.log("there");
        cvs = await CV.find();
      }
      console.log(cvs);
      if (cvs) {
        res.status(200).json({
          success: true,
          statuscode: 200,
          data: cvs,
        });
      } else {
        res.status(404).json({
          success: false,
          statuscode: 404,
          data: { data: cvs, message: "Could not find CVs." },
        });
      }
    } catch (error) {
      res
        .status(404)
        .json({ success: false, statuscode: 404, error: error.message });
    }
  },
};
