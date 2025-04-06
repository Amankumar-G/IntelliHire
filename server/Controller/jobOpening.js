import Job from '../Schema/Job.js';

const getAllJobOpenings = async (req, res) => {
  console.log("Fetching all job openings...");
  try {
    const jobs = await Job.find().select("-__v -summary -embedding -description"); // Exclude __v field from the response
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching job openings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getJobOpening = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
        return res.status(404).json({ message: "Job opening not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error("Error fetching job opening:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    }

const deleteJobOpening = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findByIdAndDelete(id);
        if (!job) {
            return res.status(404).json({ message: "Job opening not found" });
        }
        res.status(200).json({ message: "Job opening deleted successfully" });
    } catch (error) {
        console.error("Error deleting job opening:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }  
}
const updateJobOpening = async (req, res) => {
    const { id } = req.params;
    const { title, description, location, salary } = req.body; // Add other fields as needed

    try {
        const job = await Job.findByIdAndUpdate(id, { title, description, location, salary }, { new: true });
        if (!job) {
            return res.status(404).json({ message: "Job opening not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error("Error updating job opening:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export { getJobOpening, updateJobOpening, deleteJobOpening, getAllJobOpenings };