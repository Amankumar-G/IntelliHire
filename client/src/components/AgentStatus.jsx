import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from "react-router-dom";

const getStatusChip = (status) => {
  if (status.includes('score')) {
    return (
      <Chip
        label={status}
        sx={{
          background: 'linear-gradient(to right, #10b981, #059669)',
          color: '#f0fdf4',
          fontWeight: 600,
          fontSize: '0.75rem',
          px: 1.5,
          py: 0.5,
          borderRadius: '999px',
        }}
      />
    );
  } else if (status === 'in process') {
    return (
      <Chip
        label="In Process"
        sx={{
          backgroundColor: '#3b82f6',
          color: '#eff6ff',
          fontWeight: 600,
          fontSize: '0.75rem',
          px: 1.5,
          py: 0.5,
          borderRadius: '999px',
        }}
      />
    );
  } else {
    return (
      <Chip
        label="Pending"
        sx={{
          backgroundColor: '#6b7280',
          color: '#e5e7eb',
          fontWeight: 600,
          fontSize: '0.75rem',
          px: 1.5,
          py: 0.5,
          borderRadius: '999px',
        }}
      />
    );
  }
};

export default function AgentStatus() {
  const [showJD, setShowJD] = useState(false);
  const [candidateData, setCandidateData] = useState([]);
  const location = useLocation();
  const { title, description ,id} = location.state || {};
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    // Replace the URL below with your actual backend endpoint
    axios.get(`${API_BASE_URL}/candidate/${id}`)
      .then(response => {
        setCandidateData(response.data);
      })
      .catch(error => {
        console.error('Error fetching candidate data:', error);
      });
  }, []);


  const handleCreateAndAnalyze = async () => {
    try {
      // Second: Send that ID for analysis
      const analyzeResponse = await axios.get(`${API_BASE_URL}/analyzeJobPosting/${id}`);
  
      console.log('Analysis result:', analyzeResponse.data);
      // You can update the UI or navigate to another screen here
    } catch (error) {
      console.error('Error in creating or analyzing job posting:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-950 text-white p-6">
      {/* Job Card */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto p-8 bg-gray-800 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-white mb-2">
          Job Title: <span className="text-[#90caf9]">{title}</span>
        </h2>

        <div className="flex items-center justify-between mb-3 mt-4">
          <p className="text-gray-300 font-medium cursor-pointer" onClick={() => setShowJD(!showJD)}>Show More...</p>
          <IconButton onClick={() => setShowJD(!showJD)} className="text-white" sx={{ color: 'white', fontWeight: 'bold' }}>
            {showJD ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </div>

        <Collapse in={showJD}>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
           {description}
          </p>
        </Collapse>

        <Button
          variant="outlined"
          className="mt-6 rounded-lg normal-case px-6 py-2 font-medium !border-blue-500 !text-blue-600 hover:!bg-blue-600 hover:!text-white shadow-md transition-all duration-300 transform hover:scale-105"
          style={{ borderWidth: '2px' }}
          onClick={handleCreateAndAnalyze}
        >
          Analyze All CVs
        </Button>
      </motion.div>

      {/* Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="max-w-5xl mx-auto mt-10 p-6 bg-gray-800 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700"
      >
        <h3 className="text-2xl font-semibold mb-4 text-white">CV Analysis Status</h3>

        <TableContainer
          component={Paper}
          className="rounded-lg"
          sx={{ backgroundColor: '#111827' }}
        >
          <Table>
            <TableHead>
              <TableRow style={{ background: '#1f2937' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>PDF</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Candidate</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>HR Agent</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tech Agent</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Business Agent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidateData.map((row, index) => (
                <TableRow
                  key={index}
                  className="transition-all duration-300 hover:bg-gray-700 cursor-pointer"
                  onClick={() => navigate(`/ShortListedCandidate/${row.id}`, { state: row })}
                >
                  <TableCell sx={{ color: 'white', fontWeight: 'semibold' }}>{row.pdfName}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'semibold' }}>{row.candidateName}</TableCell>
                  <TableCell>{getStatusChip(row.hrStatus)}</TableCell>
                  <TableCell>{getStatusChip(row.techStatus)}</TableCell>
                  <TableCell>{getStatusChip(row.businessStatus)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </div>
  );
}
