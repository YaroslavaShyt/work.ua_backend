const Job = require("../models/vacancyModel");

module.exports = {
  createJob: async (req, res) => {
    const newJob = new Job(req.body);
    try {
      const savedJob = await newJob.save();
      const { __v, createdAt, updatedAt, ...newJobInfo } = savedJob._doc;

      res.status(200).json(newJobInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateJob: async (req, res) => {
    try {
      const UpdateJob = await Job.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json({ UpdateJob }); // ...others });
    } catch {
      res.status(500).json("Some error occured");
    }
  },

  deleteJob: async (req, res) => {
    //  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
    //  } catch (error) {
    //    res.status(404).json({ success: false, error: error });
    //  }
  },

  getJob: async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      const { password, __v, createdAt, updatedAt, ...jobData } = job._doc;
      res.status(200).json(jobData);
    } catch (error) {
      res.status(404).json({ success: false, error: error });
    }
  },
  // does not work
  getAllJobs: async (req, res) => {
    try {
      const query = req.query.searchString; // Отримання параметра запиту
      let jobs;
      console.log(query);
      if (query) {
        // Якщо є користувацький запит, шукаємо вакансії за цим запитом
        jobs = await Job.find({
          $or: [
            { title: { $regex: new RegExp(query, "i") } }, // Пошук по назві вакансії (ігнорує регістр)
            { description: { $regex: new RegExp(query, "i") } }, // Пошук по опису вакансії (ігнорує регістр)
            // Додавайте інші поля, які ви хочете враховувати в пошуку
          ],
        });
      } else {
        // Якщо користувацький запит не вказано, отримуємо всі вакансії
        jobs = await Job.find();
      }

      console.log(jobs);
      res.status(200).json(jobs);
    } catch (error) {
      res.status(404).json({ success: false, error: error });
    }
  },
};
