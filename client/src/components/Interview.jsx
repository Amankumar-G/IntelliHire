import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useJobID } from "../context/JobIdContext";
import axios from "axios";

// MUI Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1f2937",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

const InterviewScreen = () => {
  const [candidates, setCandidates] = useState([]);
  const { jobIdcurr } = useJobID();
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    console.log(jobIdcurr);
    if (!jobIdcurr) {
      setError("No job ID selected. Please go back and select a job.");
      return;
    }
  // /candidate/shortlisted/
    axios
      .get(`${API_BASE_URL}/candidate/shortlisted/${jobIdcurr}`)
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch candidates:", err);
        setError(err.response.data.message);
      });
  }, [jobIdcurr]);

  const handleSendMail = (candidateId) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId ? { ...c, interviewStatus: "Mail Sent" } : c
      )
    );

    // Optional: send mail via backend
    axios
      .post(`${API_BASE_URL}/sendInterviewMail`, { candidateId })
      .then((res) => console.log(res.data.message))
      .catch((err) => console.error("Error sending mail:", err));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white px-24 py-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Interview Shortlist
          </h1>
          <p className="text-gray-400 text-lg">
            Candidates who passed initial screening
          </p>
        </motion.div>

        {error ? (
          <p className="text-red-400 mt-10 text-center">{error}</p>
        ) : (
          <div className="mt-10 rounded-xl mx-20 overflow-hidden shadow-2xl">
            <TableContainer component={Paper} className="bg-gray-900">
              <Table>
                <TableHead>
                  <TableRow className="bg-gray-800">
                    <TableCell className="text-white font-semibold">Name</TableCell>
                    <TableCell className="text-white font-semibold">PDF</TableCell>
                    <TableCell className="text-white font-semibold">Email</TableCell>
                    {/* <TableCell className="text-white font-semibold">Job</TableCell> */}
                    <TableCell className="text-white font-semibold">Match Score</TableCell>
                    <TableCell className="text-white font-semibold">Status</TableCell>
                    <TableCell className="text-white font-semibold">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {candidates.map((candidate, index) => (
                    <motion.tr
                      key={candidate.id}
                      className="hover:bg-gray-800 transition duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TableCell className="text-white">{candidate.candidateName}</TableCell>
                      <TableCell className="text-white">{candidate.pdfName}</TableCell>
                      <TableCell className="text-white">{candidate.email}</TableCell>
                      <TableCell className="text-white">{candidate.finalScore}%</TableCell>
                      <TableCell className="text-white">{candidate.interviewStatus}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          className="bg-blue-600 hover:bg-blue-700 transition-all rounded-lg"
                          onClick={() => handleSendMail(candidate.id)}
                          disabled={candidate.interviewStatus === "Mail Sent"}
                        >
                          Send Mail
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default InterviewScreen;
