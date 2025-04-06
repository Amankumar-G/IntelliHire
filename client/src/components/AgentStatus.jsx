import React, { useState } from 'react';
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
import { useLocation ,useNavigate} from "react-router-dom";

const mockData = [
  {
    pdfName: 'cv_john_doe.pdf',
    candidateName: 'John Doe',
    hrStatus: 'score: 75%',
    techStatus: 'in process',
    businessStatus: 'pending',
  },
  {
    pdfName: 'cv_jane_smith.pdf',
    candidateName: 'Jane Smith',
    hrStatus: 'score: 85%',
    techStatus: 'score: 92%',
    businessStatus: 'score: 80%',
  },
  {
    pdfName: 'cv_alan_kumar.pdf',
    candidateName: 'Alan Kumar',
    hrStatus: 'pending',
    techStatus: 'pending',
    businessStatus: 'pending',
  },
];

const getStatusChip = (status) => {
  if (status.includes('score')) {
    return (
      <Chip
        label={status}
        sx={{
          background: 'linear-gradient(to right, #10b981, #059669)', // green gradient
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
          backgroundColor: '#3b82f6', // blue-500
          color: '#eff6ff', // blue-50
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
          backgroundColor: '#6b7280', // gray-500
          color: '#e5e7eb', // gray-200
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
  const location = useLocation();
  const { jobTitle, jobDescription } = location.state || {};
  const navigate = useNavigate();


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
          Job Title: <span className="text-[#90caf9]">{jobTitle}</span>
        </h2>

        <div className="flex items-center justify-between mb-3 mt-4">
          <p className="text-gray-300 font-medium cursor-pointer" onClick={() => setShowJD(!showJD)}>Show More...</p>
          <IconButton onClick={() => setShowJD(!showJD)} className="text-white" sx={{ color: 'white', fontWeight: 'bold' }}>
            {showJD ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </div>

        <Collapse in={showJD}>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
           {jobDescription}
          </p>
        </Collapse>

        <Button
  variant="outlined"
  className="mt-6 rounded-lg normal-case px-6 py-2 font-medium !border-blue-500 !text-blue-600 hover:!bg-blue-600 hover:!text-white shadow-md transition-all duration-300 transform hover:scale-105"
  style={{
    borderWidth: '2px',
  }}
 
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
          sx={{ backgroundColor: '#111827' }} // Tailwind gray-900
        >
          <Table>
            <TableHead>
              <TableRow style={{ background: '#1f2937' }}> {/* gray-800 */}
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} >PDF</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Candidate</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>HR Agent</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tech Agent</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Business Agent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((row, index) => (
                <TableRow
                key={index}
                className="transition-all duration-300 hover:bg-gray-700 cursor-pointer"
                onClick={() => navigate('/ShortListedCandidate', { state: row })}
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
