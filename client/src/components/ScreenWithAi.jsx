import { Button, TextareaAutosize } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ScreenWithAi() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [cvFiles, setCvFiles] = useState([]);
  const [jobOpenings, setjobOpenings] = useState(1);
  const [step, setStep] = useState(1);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const navigate = useNavigate();

  const [jdUploaded, setJdUploaded] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [jdLoading, setJdLoading] = useState(false);
  const [cvLoading, setCvLoading] = useState(false);
  const [jdDone, setJdDone] = useState(false);
  const [cvDone, setCvDone] = useState(false);

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  useEffect(() => {
    if (step === 2 && step2Ref.current) {
      step2Ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (step === 3 && step3Ref.current) {
      step3Ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  useEffect(() => {
    if (jdDone && cvDone) {
      setTimeout(() => {
        // Go to next screen after short delay
        navigate("/AgentStatus", {
          state: {
            title,
            description,
          },
        });
        // window.location.href = "/shortlisted"; // Replace with your actual route
      }, 1000);
    }
  }, [jdDone, cvDone]);

  const handleJDSubmit = async () => {
    if (!description.trim() || !title.trim()) return;
    setJdLoading(true);

    // 👉 Show Step 3 immediately
    setStep(3);

    try {
      const response = await axios.post(`${API_BASE_URL}/job-description`, {
        title,
        description,
        jobOpenings,
      });

      if (response.status === 200 || response.status == 201) {
        setJdDone(true);
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload JDs.");
    } finally {
      setJdLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || cvFiles.length === 0) {
      alert("Please provide job title and upload at least one CV.");
      return;
    }

    const formData = new FormData();
    formData.append("jobTitle", title);
    cvFiles.forEach((file) => {
      formData.append("CVs", file);
    });
    // {{server}}/upload/many
    setCvLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/upload/many`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCvDone(true);
      setSubmit(true);
    } catch (error) {
      alert("Failed to upload CVs.");
    } finally {
      setCvLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-black opacity-50"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-4xl space-y-12"
      >
        {/* Step 1 */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700">
          <h1 className="text-3xl font-extrabold text-blue-500 dark:text-white text-center mb-6">
            AI-Powered Shortlisting
          </h1>
          <div className="text-lg text-gray-800 dark:text-gray-200 space-y-4">
            <p>Welcome! Follow these steps to get started:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Paste your Job Description and click "Upload Job Description"
                (minimum 20 words) and enter Job Title and number of candidates
                to shortlist.
              </li>
              <li>Upload multiple candidate CVs in PDF or DOCX format.</li>
              <li>Click "Let's Shortlist" to get the best candidates.</li>
            </ol>
            {step === 1 && (
              <Button
                variant="contained"
                className="!mt-6 !bg-blue-600 !text-white hover:!bg-blue-700"
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            )}
          </div>
        </div>

        {/* Step 2 */}
        {step >= 2 && (
          <div
            ref={step2Ref}
            className={`p-8 rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700 ${
              jdUploaded
                ? "bg-gray-200 dark:bg-gray-700 opacity-70 pointer-events-none"
                : "bg-white dark:bg-gray-800"
            }`}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Upload Job Description
            </h2>

            <input
              type="text"
              placeholder="Enter Job Title"
              className="w-full p-3 mb-4 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              disabled={jdUploaded}
            />

            <TextareaAutosize
              minRows={8}
              placeholder="Paste your job description here..."
              className="w-full p-4 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 resize-none"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              disabled={jdUploaded}
            />

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Number of candidates to shortlist:
              </label>
              <input
                type="number"
                min="1"
                max="100"
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={jobOpenings}
                onChange={(e) => setjobOpenings(parseInt(e.target.value))}
                disabled={jdUploaded}
              />
            </div>

            <Button
              variant="outlined"
              fullWidth
              className={`!mt-4 ${
                jdDone
                  ? "!bg-green-500 !text-white"
                  : getWordCount(description) < 20 || !title.trim()
                  ? "cursor-not-allowed !text-gray-400 border-gray-400"
                  : "!text-blue-500 border-blue-500 hover:!bg-blue-500 hover:!text-white"
              }`}
              onClick={handleJDSubmit}
              disabled={
                getWordCount(description) < 20 ||
                !title.trim() ||
                jdUploaded ||
                jdLoading ||
                jdDone
              }
            >
              {jdLoading
                ? "Uploading..."
                : jdDone
                ? "✓ Done"
                : "Upload Job Description"}
            </Button>
          </div>
        )}

        {/* Step 3 */}
        {step >= 3 && (
          <div
            ref={step3Ref}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Upload Multiple CVs
            </h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Upload className="w-5 h-5" />
                Upload CVs (PDF/DOCX)
              </label>
              <div className="flex items-center gap-4 border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800 transition">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  multiple
                  className={`block w-full text-sm cursor-pointer`}
                  onChange={(e) => setCvFiles(Array.from(e.target.files))}
                />
                <InsertDriveFileIcon className="text-gray-500 dark:text-gray-300" />
              </div>
              {cvFiles.length > 0 && (
                <ul className="text-sm text-gray-600 dark:text-gray-300 ml-2 list-disc list-inside">
                  {cvFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <motion.div
              whileHover={
                cvLoading || cvFiles.length === 0 || cvDone
                  ? {}
                  : { scale: 1.02 }
              }
              className="mt-8"
            >
              <Button
                variant="outlined"
                fullWidth
                className={`!mt-4 border-2 transition font-semibold tracking-wide text-lg
      ${
        cvDone
          ? "!border-green-500 !text-green-600 hover:!bg-green-500 hover:!text-white"
          : cvLoading || cvFiles.length === 0
          ? "cursor-not-allowed !border-gray-400 !text-gray-400 hover:!bg-transparent"
          : "!border-blue-500 !text-blue-600 hover:!bg-blue-600 hover:!text-white"
      }`}
                onClick={handleSubmit}
                disabled={cvLoading || cvFiles.length === 0 || cvDone}
              >
                {cvLoading
                  ? "Processing..."
                  : cvDone
                  ? "✓ Done"
                  : "Let's Shortlist"}
              </Button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ScreenWithAi;
