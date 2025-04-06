import { START, StateGraph, END } from "@langchain/langgraph";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { hrPrompt, techPrompt, bizPrompt, decisionPrompt } from "./prompt.js";
import { io } from '../config/socket.js';

// Initialize specialized LLM instances
const hrLLM = new ChatOpenAI({ modelName: "gpt-4o-mini", temperature: 0.2 });
const techLLM = new ChatOpenAI({ modelName: "gpt-4o-mini", temperature: 0.1 });
const businessLLM = new ChatOpenAI({ modelName: "gpt-4o-mini", temperature: 0.3 });
const decisionLLM = new ChatOpenAI({ modelName: "gpt-4o-mini", temperature: 0 });

/**
 * HR Analyst Node - Evaluates cultural fit and soft skills
 * Input: { jobSummary: string, cvSummary: string }
 * Output: { hrScore: number, hrRationale: string }
 */
async function hrAnalyst(state) {
  console.log("\n=== HR ANALYSIS STARTED ===");
  io.emit("message", "\n=== HR ANALYSIS STARTED ===");
  
  const prompt = hrPrompt;
  const chain = prompt.pipe(hrLLM);
  const response = await chain.invoke(state);
  
  const evaluation = JSON.parse(response.content
    .replace(/^json\s*/i, '')
    .replace(/```/g, '')
    .trim());
  console.log("HR Evaluation:", evaluation);
  io.emit("hr-evaluation", evaluation);
  
  return { hrEvaluation: evaluation };
}

/**
 * Technical Analyst Node - Assesses technical capabilities
 * Input: { jobSummary: string, cvSummary: string }
 * Output: { techScore: number, techRationale: string }
 */
async function techAnalyst(state) {
  console.log("\n=== TECHNICAL ANALYSIS STARTED ===");
  io.emit("message", "\n=== TECHNICAL ANALYSIS STARTED ===");
  
  const prompt = techPrompt;
  const chain = prompt.pipe(techLLM);
  const response = await chain.invoke(state);
  
  const evaluation = JSON.parse(response.content
    .replace(/^json\s*/i, '')
    .replace(/```/g, '')
    .trim());
  console.log("Technical Evaluation:", evaluation);
  io.emit("tech-evaluation", evaluation);
  
  return { techEvaluation: evaluation };
}

/**
 * Business Analyst Node - Evaluates business impact potential
 * Input: { jobSummary: string, cvSummary: string }
 * Output: { businessScore: number, businessRationale: string }
 */
async function businessAnalyst(state) {
  console.log("\n=== BUSINESS ANALYSIS STARTED ===");
  io.emit("message", "\n=== BUSINESS ANALYSIS STARTED ===");
  
  const prompt = bizPrompt;
  const chain = prompt.pipe(businessLLM);
  const response = await chain.invoke(state);
  
  const evaluation = JSON.parse(response.content
    .replace(/^json\s*/i, '')
    .replace(/```/g, '')
    .trim());
  console.log("Business Evaluation:", evaluation);
  io.emit("business-evaluation", evaluation);
  
  return { businessEvaluation: evaluation };
}

/**
 * Decision Maker Node - Makes final shortlisting decision
 * Input: All evaluations
 * Output: { finalDecision: boolean, decisionRationale: string }
 */
async function decisionMaker(state) {
  console.log("\n=== FINAL DECISION MAKING ===");
  io.emit("message", "\n=== FINAL DECISION MAKING ===");
  
  const prompt = decisionPrompt;
  const chain = prompt.pipe(decisionLLM);
  const response = await chain.invoke({
    hrEvaluation: state.hrEvaluation,
    techEvaluation: state.techEvaluation,
    businessEvaluation: state.businessEvaluation,
    jobSummary: state.jobSummary
  });
  
  const decision = JSON.parse(response.content.replace(/^json\s*/i, ''));
  console.log("Final Decision:", decision);
  io.emit("final-decision", decision);
  
  return { finalDecision: decision };
}

async function runCVReview(jobSummary, cvSummary,jobTitle) {
  const workflow = new StateGraph({
    channels: {
      jobSummary: {
        default: () => jobSummary,
        aggregate: "last"
      },
      cvSummary: {
        default: () => cvSummary,
        aggregate: "last"
      },
      jobTitle: {
        default: () => jobTitle,
        aggregate: "last"
      },
      hrEvaluation: { default: () => null },
      techEvaluation: { default: () => null },
      businessEvaluation: { default: () => null },
      finalDecision: { default: () => null }
    }
  });

  // Add nodes
  workflow.addNode("hr_analysis", hrAnalyst);
  workflow.addNode("tech_analysis", techAnalyst);
  workflow.addNode("business_analysis", businessAnalyst);
  workflow.addNode("final_decision", decisionMaker);

  // Set up workflow
  workflow.addEdge(START,"hr_analysis");
  workflow.addEdge(START, "tech_analysis");
  workflow.addEdge(START, "business_analysis");
  workflow.addEdge("hr_analysis", "final_decision");
  workflow.addEdge("tech_analysis", "final_decision");
  workflow.addEdge("business_analysis", "final_decision");
  workflow.addEdge("final_decision", END);

  // Compile and execute
  const app = workflow.compile();
  
  console.log("\n=== CV REVIEW PROCESS STARTED ===");
  io.emit("message", "\n=== CV REVIEW PROCESS STARTED ===");
  
  const result = await app.invoke({
    jobSummary: jobSummary,
    cvSummary: cvSummary,
    jobTitle: jobTitle
  });

  console.log("\n=== REVIEW PROCESS COMPLETED ===");
  io.emit("message", "\n=== REVIEW PROCESS COMPLETED ===");

  const { hrEvaluation, techEvaluation, businessEvaluation, finalDecision } = result;

  return {
    evaluation: {
      hrScore: hrEvaluation.hrScore,
      hrRationale: hrEvaluation.hrRationale,
      culturalRedFlags: hrEvaluation.culturalRedFlags || [],
      diversityAssets: hrEvaluation.diversityAssets || [],
      techScore: techEvaluation.techScore,
      techRationale: techEvaluation.techRationale,
      skillValidation: techEvaluation.skillValidation || { verified: [], unverified: [] },
      techDebtRisk: techEvaluation.techDebtRisk || "",
      businessScore: businessEvaluation.businessScore,
      businessRationale: businessEvaluation.businessRationale,
      timeToProductivity: businessEvaluation.timeToProductivity || "",
      growthForecast: businessEvaluation.growthForecast || { "6mo": "", "3yr": "" },
      finalDecision: finalDecision.finalDecision,
      decisionRationale: finalDecision.decisionRationale,
      scoreBreakdown: {
        hrScore: hrEvaluation.hrScore || 0,
        techScore: techEvaluation.techScore || 0,
        businessScore: businessEvaluation.businessScore || 0,
        compositeScore: (
          (hrEvaluation.hrScore || 0) +
          (techEvaluation.techScore || 0) +
          (businessEvaluation.businessScore || 0)
        ) / 3,
      },
      riskFactors: finalDecision.riskFactors || [],
      recommendedNextSteps: finalDecision.recommendedNextSteps || [],
    }
  };
}

export { runCVReview };