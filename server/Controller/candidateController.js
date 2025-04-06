import Candidate from "../Schema/Candidate.js";
import sendEmail from "../utils/sendEmail.js"; // Adjust the import path as necessary
import { Mail } from "../Agents/mailAgent.js";

const getAllCandidates = async (req, res) => {
  console.log("Fetching all candidates...");
  try {
    const candidates = await Candidate.find().select(
      "-__v -summary -embedding"
    ); // Exclude __v field from the response
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json(candidate);
  } catch (error) {
    console.error("Error fetching candidate:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findByIdAndDelete(id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCandidate = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, resume } = req.body; // Add other fields as needed

  try {
    const candidate = await Candidate.findByIdAndUpdate(
      id,
      { name, email, phone, resume },
      { new: true }
    );
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json(candidate);
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const mailCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Only return the specific fields
    const filteredData = {
      name: candidate.name,
      jobTitle: candidate.jobTitle,
      evaluation: {
        growthForecast: candidate.evaluation?.growthForecast,
        hrRationale: candidate.evaluation?.hrRationale,
        techRationale: candidate.evaluation?.techRationale,
        businessRationale: candidate.evaluation?.businessRationale,
        timeToProductivity: candidate.evaluation?.timeToProductivity,
        finalDecision: candidate.evaluation?.finalDecision,
        decisionRationale: candidate.evaluation?.decisionRationale,
        recommendedNextSteps: candidate.evaluation?.recommendedNextSteps,
      },
    };
    const { message } = await Mail(filteredData);
    const send_to = candidate.email; // Assuming candidate has an email field
    const subject = "Your Application Status";
    const sent_from = process.env.EMAIL_USER; // Your email address

    // await sendEmail(candidate.email, "Subject", "Email body");
    await sendEmail(subject, message.content, send_to, sent_from);
    res.status(200).json({ data: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email to candidate:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  getCandidate,
  updateCandidate,
  deleteCandidate,
  getAllCandidates,
  mailCandidate,
};
