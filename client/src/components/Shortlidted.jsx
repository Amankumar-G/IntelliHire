// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
// import { motion } from 'framer-motion';

// const COLORS = {
//   hr: '#10b981',       // green
//   tech: '#3b82f6',     // blue
//   business: '#f59e0b', // yellow
//   finalBg: '#1f2937',  // gray (for remaining)
// };


// const FinalPieChart = ({ scores }) => {
//   const data = [
//     { name: 'HR', value: scores.hrScore, color: COLORS.hr },
//     { name: 'Tech', value: scores.techScore, color: COLORS.tech },
//     { name: 'Business', value: scores.businessScore, color: COLORS.business },
//   ];

//   return (
//     <div className="flex flex-col items-center mt-10">
//       <PieChart width={300} height={300}>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           outerRadius={100}
//           dataKey="value"
//           label={({ name, value }) => `${name}: ${value}%`}
//         >
//           {data.map((entry, index) => (
//             <Cell key={`final-cell-${index}`} fill={entry.color} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//       <p className="text-white font-semibold mt-4">Combined Performance Breakdown</p>
//     </div>
//   );
// };


// const ScorePieChart = ({ label, score, colorPair }) => {
//   const data = [
//     { name: label, value: score },
//     { name: 'Remaining', value: 100 - score },
//   ];

//   return (
//     <div className="flex flex-col items-center">
//       <PieChart width={200} height={200}>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           outerRadius={80}
//           fill={colorPair[0]}
//           dataKey="value"
//           label={({ name, value }) => `${value}%`}
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={colorPair[index]} />
//           ))}
//         </Pie>
//         <Tooltip />
//       </PieChart>
//       <p className="text-white font-semibold mt-2">{label}</p>
//     </div>
//   );
// };

// const Shortlisted = () => {
//   const { state } = useLocation();
//   const { pdfName } = state || {};
//   const [data, setData] = useState({
//     "name": "John Doe",
//     "email": "john@example.com",
//     "experience": 5,
//     "hrScore": 75,
//     "techScore": 82,
//     "businessScore": 70,
//     "finalDecisionScore": 76
//   }
//   );

//   useEffect(() => {
//     const fetchCandidateData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/candidate/${pdfName}`);
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error('Error fetching candidate data:', error);
//       }
//     };

//     if (pdfName) {
//       fetchCandidateData();
//     }
//   }, [pdfName]);

//   if (!data) return <p className="text-white text-center mt-10">Loading candidate data...</p>;

//   const decisionText = data.finalDecisionScore >= 70 ? 'Selected' : 'Rejected';

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-10">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="max-w-6xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg"
//       >
//         <h2 className="text-3xl font-bold mb-2">{data.name}</h2>
//         <p className="text-gray-400"><strong>Email:</strong> {data.email}</p>
//         <p className="text-gray-400 mb-6"><strong>Experience:</strong> {data.experience} years</p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
//   <ScorePieChart label="HR Score" score={data.hrScore} colorPair={[COLORS.hr, COLORS.finalBg]} />
//   <ScorePieChart label="Tech Score" score={data.techScore} colorPair={[COLORS.tech, COLORS.finalBg]} />
//   <ScorePieChart label="Business Score" score={data.businessScore} colorPair={[COLORS.business, COLORS.finalBg]} />
// </div>

// <FinalPieChart scores={data} />

// <div className="text-center mt-10">
//   <h3 className="text-2xl font-semibold mb-2">Final Verdict</h3>
//   <p
//     className={`text-3xl font-bold ${
//       decisionText === 'Selected' ? 'text-green-400' : 'text-red-400'
//     }`}
//   >
//     {decisionText}
//   </p>
//   <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
//     {
//       decisionText === 'Selected'
//         ? "The candidate has demonstrated strong overall performance across HR, Technical, and Business evaluations, making them a suitable fit for the role."
//         : "The candidate did not meet the required threshold across one or more evaluation areas, indicating room for improvement."
//     }
//   </p>
// </div>

//       </motion.div>
//     </div>
//   );
// };

// export default Shortlisted;





// import React, { useEffect, useState } from 'react';
// import { PieChart, Pie, Cell, Tooltip } from 'recharts';
// import { motion } from 'framer-motion';

// const COLORS = ['#00C49F', '#FF8042', '#8884d8'];

// const CandidateAnalysis = ({ candidateId }) => {
//   const [data, setData] = useState({
//     "message": "Candidate evaluation completed and saved.",
//     "candidate": {
//         "name": "Aman__Resume",
//         "jobTitle": "Frontend iOS Developer – Swift & UI/UX Expert",
//         "email": "22itgal025@ldce.ac.in",
//         "summary": "*Summary of Aman Galoliya's Résumé\n\nEducation*  \n- Bachelor of Engineering (IT)  \n  - L.D College of Engineering  \n  - Duration: Sep 2022 - Sep 2026  \n  - CPI: 9.03  \n- H.S.C. Science  \n  - S.V.P School of Science  \n  - Duration: Apr 2020 - Mar 2022  \n  - Percentage: 83%  \n\n*Professional Experience*  \n- Vision-Hoster  \n  - Role: Developer  \n  - Duration: Nov 2024  \n  - Responsibilities: Developed a hosting service using Node.js, Docker, AWS ECS, and S3 for automating deployment of React, Vite, and Next.js projects; implemented reverse proxy for custom domain delivery.  \n- Nishabd Vani  \n  - Role: Developer  \n  - Duration: Oct 2024 - Nov 2024  \n  - Responsibilities: Developed and integrated machine learning models for personalized learning for deaf and mute students; managed server-side development and operational tasks using Docker.  \n\n*Key Skills & Technologies*  \n- DevOps Tools: Docker, AWS (S3, ECS, ECR)  \n- Version Control: Git, GitHub  \n- Programming Languages: Java, JavaScript  \n- Frameworks & Libraries: Node.js, Express.js, React  \n- Databases: MongoDB, MySQL  \n\n*Certifications & Training*  \n- Completed Career Essentials Course issued by Microsoft  \n\n*Projects & Contributions*  \n- AGRI-AI-CONNECT  \n  - Technologies: Node.js, Express.js, Render Hosting Service, MongoDB  \n  - Description: Developed an AI-powered app for farmers to market carbon footprints and diagnose plant diseases; won First Prize in Hackout'24 at DAIICT.  \n- Eco-Cred  \n  - Technologies: Node.js, Express.js, Gemini API, MongoDB  \n  - Description: Developed a carbon credit tracking system to calculate user credits and deliver personalized challenges.  \n- Qualified for Smart India Hackathon (SIH) 2023 and 2024 by winning GTU's internal hackathon.  \n\n*Awards & Achievements*  \n- Winner: First Prize in HackOut Competition at DAIICT for developing an AI-powered app for farmers.  \n- Selected to represent university in Smart India Hackathon (SIH) 2023 and 2024.  ",
//         "Shortlisted": false
//     },
//     "evaluation": {
//         "hrScore": 6,
//         "hrRationale": "Aman Galoliya's educational background in IT and his hands-on experience with development projects indicate a solid technical foundation. However, his experience primarily revolves around backend development and does not showcase direct proficiency in iOS development, Swift, or UI/UX design, which are critical for the role. While he has demonstrated creativity and problem-solving skills through his projects, the lack of specific experience in iOS frameworks and design tools may hinder his cultural alignment with a team that emphasizes creativity and detail-oriented work. Communication skills are not explicitly highlighted in his résumé, which raises concerns about his ability to collaborate effectively with UX/UI designers. Leadership potential is somewhat indicated through his project involvement, but there is no clear evidence of mentorship or conflict resolution experience. Emotional intelligence cannot be assessed from the résumé alone, as it lacks insights into self-awareness or empathy. Overall, while Aman shows promise, he may require additional training or experience to fully align with the expectations of this role.",
//         "culturalRedFlags": [
//             "Limited experience in iOS development and UI/UX design",
//             "Lack of explicit communication skills evidence"
//         ],
//         "diversityAssets": [
//             "Participation in hackathons and competitions",
//             "Experience in developing inclusive technology for diverse user needs"
//         ],
//         "techScore": 3,
//         "techRationale": "Aman Galoliya's profile indicates a strong foundation in programming and development, particularly with Node.js and React, but lacks the core skills required for the Frontend iOS Developer role. There is no mention of proficiency in Swift, SwiftUI, or UIKit, which are essential for this position. His experience with Docker and AWS is valuable but does not align with the specific requirements of iOS development. Additionally, while he has participated in hackathons and developed projects, these do not demonstrate the necessary experience in iOS application development or collaboration with UX/UI designers. The absence of relevant certifications or training in iOS development further diminishes his suitability for this role. Overall, while he shows potential in software development, he does not meet the technical requirements for a Frontend iOS Developer.",
//         "skillValidation": {
//             "verified": [],
//             "unverified": [
//                 "Proficient in Swift, SwiftUI, UIKit",
//                 "Hands-on experience with Figma, Sketch, or Adobe XD",
//                 "Familiarity with CoreData, Realm, or CloudKit",
//                 "Deep understanding of Auto Layout, Apple Design Guidelines, and accessibility standards"
//             ]
//         },
//         "techDebtRisk": "High risk due to lack of relevant iOS development experience and missing core technical skills for the role.",
//         "businessScore": 6,
//         "businessRationale": "Aman Galoliya demonstrates a solid foundation in software development with a focus on modern technologies, particularly in backend development and machine learning integration. However, the role of Frontend iOS Developer requires specific expertise in Swift, SwiftUI, and iOS frameworks, which Aman lacks. His experience in developing applications and collaborating on projects shows potential for operational excellence, but the absence of direct iOS experience may hinder immediate strategic impact. His background in DevOps and cloud services could contribute to operational efficiency in app deployment and management. Stakeholder value may be limited initially due to the learning curve associated with iOS development. Risk management capabilities are not clearly evidenced in his profile, which could be a concern in a rapidly evolving tech landscape. Overall, while Aman has potential, he may need time to adapt to the specific demands of the iOS ecosystem.",
//         "timeToProductivity": "3 months",
//         "growthForecast": {
//             "6mo": "Aman is expected to achieve basic proficiency in Swift and SwiftUI, contributing to minor projects and collaborating with design teams.",
//             "3yr": "With continued development and mentorship, Aman could transition into a mid-level developer role, potentially leading small projects and contributing to strategic initiatives."
//         },
//         "finalDecision": "REJECT",
//         "decisionRationale": "After a thorough evaluation of the candidate Aman Galoliya's profile, it is clear that he does not meet the essential requirements for the Frontend iOS Developer position. The HR analysis indicates a lack of direct experience in iOS development, particularly with Swift, SwiftUI, and UI/UX design, which are critical for this role. The technical analysis further corroborates this, scoring him a low 3 due to the absence of necessary skills and experience in iOS frameworks. While he has a solid foundation in backend development, this does not translate to the frontend iOS development expertise required. The business analysis suggests potential for growth, but the immediate strategic impact is limited due to the steep learning curve associated with iOS development. Given that the composite scores do not meet the threshold for approval, and considering the high risk factors associated with his lack of relevant experience, the decision is to reject the application. The candidate may benefit from further training in iOS development before reapplying for similar roles in the future.",
//         "scoreBreakdown": {
//             "hrScore": 6,
//             "techScore": 3,
//             "businessScore": 6,
//             "compositeScore": 5
//         },
//         "riskFactors": [
//             "High risk due to lack of relevant iOS development experience",
//             "Missing core technical skills for the role",
//             "Limited evidence of collaboration skills with design teams"
//         ],
//         "recommendedNextSteps": [
//             "Encourage Aman to pursue training or certifications in iOS development",
//             "Suggest gaining hands-on experience with Swift and SwiftUI through personal projects",
//             "Advise participation in iOS-focused hackathons or collaborative projects to build relevant skills"
//         ]
//     }
// });

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/candidate-analysis/${candidateId}`)
//       .then(res => res.json())
//       .then(json => setData(json))
//       .catch(err => console.error('Error:', err));
//   }, [candidateId]);

//   if (!data) return <p className="text-center text-gray-300">Loading...</p>;

//   const pieData = [
//     { name: 'HR', value: data.evaluation.hrScore },
//     { name: 'Tech', value: data.evaluation.techScore },
//     { name: 'Business', value: data.evaluation.businessScore }
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="p-6 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl shadow-2xl space-y-6"
//     >
//       <h2 className="text-3xl font-bold text-center text-white">Candidate Evaluation Summary</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="space-y-2">
//           <h3 className="text-xl font-semibold text-teal-400">Candidate Info</h3>
//           <p><strong className="text-gray-300">Name:</strong> {data.candidate.name}</p>
//           <p><strong className="text-gray-300">Email:</strong> {data.candidate.email}</p>
//           <p><strong className="text-gray-300">Job Title:</strong> {data.candidate.jobTitle}</p>
//         </div>

//         <div className="flex justify-center items-center">
//           <PieChart width={240} height={240}>
//             <Pie
//               data={pieData}
//               cx="50%"
//               cy="50%"
//               label
//               outerRadius={100}
//               dataKey="value"
//             >
//               {pieData.map((_, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff', borderRadius: '8px' }} />
//           </PieChart>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <h3 className="text-xl font-semibold text-pink-400">Final Decision</h3>
//         <p><strong className="text-gray-300">Decision:</strong> {data.evaluation.finalDecision}</p>
//         <p><strong className="text-gray-300">Reason:</strong> {data.evaluation.decisionRationale}</p>
//       </div>

//       <div className="space-y-4">
//         <h3 className="text-xl font-semibold text-purple-400">Agent Rationales</h3>
//         <p><strong className="text-gray-300">HR:</strong> {data.evaluation.hrRationale}</p>
//         <p><strong className="text-gray-300">Tech:</strong> {data.evaluation.techRationale}</p>
//         <p><strong className="text-gray-300">Business:</strong> {data.evaluation.businessRationale}</p>
//       </div>

//       <div className="space-y-2">
//         <h3 className="text-xl font-semibold text-yellow-400">Risk Factors</h3>
//         <ul className="list-disc list-inside text-gray-300">
//           {data.evaluation.riskFactors.map((risk, i) => (
//             <li key={i}>{risk}</li>
//           ))}
//         </ul>
//       </div>

//       <div className="space-y-2">
//         <h3 className="text-xl font-semibold text-green-400">Recommended Next Steps</h3>
//         <ul className="list-disc list-inside text-gray-300">
//           {data.evaluation.recommendedNextSteps.map((step, i) => (
//             <li key={i}>{step}</li>
//           ))}
//         </ul>
//       </div>
//     </motion.div>
//   );
// };

// export default CandidateAnalysis;





import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useParams, useLocation } from 'react-router-dom';

const COLORS = ['#00C49F', '#FF8042', '#8884d8'];

const CandidateAnalysis = ({ candidateId }) => {
  const [data, setData] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
const location = useLocation();
const rowData = location.state;

  useEffect(() => {
    fetch(`${API_BASE_URL}/candidate/${id}`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('Error:', err));
  }, [candidateId]);

  if (!data) return (
    <div className="relative min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
    <p className="text-center text-gray-300">Loading...</p>
    </div>);

  const pieData = [
    { name: 'HR', value: data.evaluation.hrScore },
    { name: 'Tech', value: data.evaluation.techScore },
    { name: 'Business', value: data.evaluation.businessScore }
  ];

  const barData = [
    {
      name: 'Scores',
      HR: data.evaluation.hrScore,
      Tech: data.evaluation.techScore,
      Business: data.evaluation.businessScore
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
          <p><strong className="text-gray-300">Name:</strong> {data.candidate.name}</p>
          <p><strong className="text-gray-300">Email:</strong> {data.candidate.email}</p>
          <p><strong className="text-gray-300">Job Title:</strong> {data.candidate.jobTitle}</p>
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
