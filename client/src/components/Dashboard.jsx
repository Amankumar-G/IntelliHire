import { motion } from "framer-motion";
import { Sparkles, Users, Brain, CalendarCheck, Layers3 } from "lucide-react";

const agents = [
  {
    title: "JD Summarizer Agent",
    icon: Sparkles,
    description: "Reads job descriptions and extracts skills, experience, and responsibilities."
  },
  {
    title: "CV Extractor Agent",
    icon: Users,
    description: "Extracts key candidate information like education, skills, experience, and certifications."
  },
  {
    title: "Evaluation Agents",
    icon: Brain,
    description: "Multiple agents evaluate different aspects like communication, technical fit, and business alignment."
  },
  {
    title: "Final Decision Agent",
    icon: Layers3,
    description: "Aggregates evaluation scores and ranks candidates for final shortlisting."
  },
  {
    title: "Interview Scheduler",
    icon: CalendarCheck,
    description: "Schedules and sends personalized interview emails to shortlisted candidates."
  }
];

export default function Dashboard() {
  return (
    <div className="bg-gradient-to-br  from-white via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-black  min-h-screen text-gray-300  py-12 md:px-36">
      <header className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h4 className="text-xl md:text-4xl  font-bold mb-4">
            Empowered Job Screening with Multi-Agent AI
          </h4>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Streamline your recruitment process using layered AI agents. From JD understanding to candidate shortlisting and interview scheduling — experience intelligent automation like never before.
          </p>
        </motion.div>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl text-center font-semibold mb-10">How It Works</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1c1f2e] border border-[#3c3c3c] shadow-lg hover:shadow-blue-500/40 transition rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <agent.icon size={32} color="#60a5fa" />
                <h3 className="text-lg font-bold text-white">{agent.title}</h3>
              </div>
              <p className="text-gray-400 text-sm">
                {agent.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

     
    </div>
  );
}
