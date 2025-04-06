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
  Typography,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

// Demo Data
const demoCandidates = [
  {
    id: "1",
    name: "Aarav Patel",
    email: "aarav.patel@email.com",
    jobRole: "Frontend Developer",
    matchScore: 88,
    interviewStatus: "Pending",
  },
  {
    id: "2",
    name: "Meera Sharma",
    email: "meera.sharma@email.com",
    jobRole: "Business Analyst",
    matchScore: 91,
    interviewStatus: "Pending",
  },
  {
    id: "3",
    name: "Rohan Desai",
    email: "rohan.desai@email.com",
    jobRole: "Backend Developer",
    matchScore: 84,
    interviewStatus: "Pending",
  },
];

// MUI Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1f2937", // Tailwind gray-800
    },
    text: {
      primary: "#ffffff",
    },
  },
});

const InterviewScreen = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCandidates(demoCandidates);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMail = (candidateId) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId ? { ...c, interviewStatus: "Mail Sent" } : c
      )
    );
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
          <p className="text-gray-400 text-lg">Candidates who passed initial screening</p>
        </motion.div>

        <div className="mt-10 rounded-xl mx-20 overflow-hidden shadow-2xl">
          <TableContainer component={Paper} className="bg-gray-900">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-800">
                  <TableCell className="text-white font-semibold">Name</TableCell>
                  <TableCell className="text-white font-semibold">Email</TableCell>
                  <TableCell className="text-white font-semibold">Job Role</TableCell>
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
                    <TableCell className="text-white">{candidate.name}</TableCell>
                    <TableCell className="text-white">{candidate.email}</TableCell>
                    <TableCell className="text-white">{candidate.jobRole}</TableCell>
                    <TableCell className="text-white">{candidate.matchScore}%</TableCell>
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
      </div>
    </ThemeProvider>
  );
};

export default InterviewScreen;
