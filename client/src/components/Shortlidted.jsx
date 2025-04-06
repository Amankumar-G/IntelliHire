import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useParams, useLocation,useNavigate } from 'react-router-dom';
import axios from "axios";

const COLORS = ['#00C49F', '#FF8042', '#8884d8'];

const CandidateAnalysis = () => {
  const [data, setData] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
const location = useLocation();
const rowData = location.state||{};
const navigate = useNavigate();

const [error, setError] = useState(null);

useEffect(() => {
  if (!rowData?.id) {
    navigate('/AgentStatus');
    return;
  }
  axios.get(`${API_BASE_URL}/candidate/${rowData.id}`)
    .then(res => {
      console.log(res.data)
      setData(res.data)})
    .catch(err => {
      console.error('Error:', err);
      setError("Failed to load candidate data.");
    });
}, []);

if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

if (!data) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
      <p className="text-center text-gray-300">Loading...</p>
    </div>
  );
}

if (!data.evaluation ) {
  console.warn("Incomplete data:", data);
  return <div className="text-center mt-10 text-gray-300">Incomplete data received.</div>;
}


  const pieData = [
    { name: 'HR', value: data.evaluation.scoreBreakdown.hrScore },
    { name: 'Tech', value: data.evaluation.scoreBreakdown.techScore },
    { name: 'Business', value: data.evaluation.scoreBreakdown.businessScore }
  ];

  const barData = [
    {
      name: 'Scores',
      HR: data.evaluation.scoreBreakdown.hrScore,
      Tech: data.evaluation.scoreBreakdown.techScore,
      Business: data.evaluation.scoreBreakdown.businessScore
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 w-full max-w-4xl space-y-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700"
    >
      <h2 className="text-3xl font-bold text-center text-white">Candidate Evaluation Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-teal-400">Candidate Info</h3>
          <p><strong className="text-gray-300">Name:</strong> {data.name}</p>
          <p><strong className="text-gray-300">Email:</strong> {data.email}</p>
          <p><strong className="text-gray-300">Job Title:</strong> {data.jobTitle}</p>
        </div>

        <div className="flex justify-center items-center">
          <PieChart width={240} height={240}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              label
              outerRadius={100}
              dataKey="value"
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff', borderRadius: '8px' }} />
          </PieChart>
        </div>
      </div>

      {/* Bar Graph */}
      <div>
        <h3 className="text-xl font-semibold text-cyan-400 text-center mb-4">Agent Score Comparison</h3>
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="HR" fill="#00C49F" />
              <Bar dataKey="Tech" fill="#FF8042" />
              <Bar dataKey="Business" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Final Decision */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-pink-400">Final Decision</h3>
        <p><strong className="text-gray-300">Decision:</strong> {data.evaluation.finalDecision}</p>
        <p><strong className="text-gray-300">Reason:</strong> {data.evaluation.decisionRationale}</p>
      </div>

      {/* Rationales */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-purple-400">Agent Rationales</h3>
        <p><strong className="text-gray-300">HR:</strong> {data.evaluation.hrRationale}</p>
        <p><strong className="text-gray-300">Tech:</strong> {data.evaluation.techRationale}</p>
        <p><strong className="text-gray-300">Business:</strong> {data.evaluation.businessRationale}</p>
      </div>

      {/* Risks */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-yellow-400">Risk Factors</h3>
        <ul className="list-disc list-inside text-gray-300">
          {data.evaluation.riskFactors.map((risk, i) => (
            <li key={i}>{risk}</li>
          ))}
        </ul>
      </div>

      {/* Suggestions */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-green-400">Recommended Next Steps</h3>
        <ul className="list-disc list-inside text-gray-300">
          {data.evaluation.recommendedNextSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>
    </motion.div>
    </div>
  );
};

export default CandidateAnalysis;
