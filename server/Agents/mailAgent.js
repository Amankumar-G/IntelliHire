import { START, StateGraph, END } from "@langchain/langgraph";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { mailPrompt } from "./prompt.js";

// Initialize specialized LLM instances
const mailLLM = new ChatOpenAI({ modelName: "gpt-4o-mini", temperature: 0});

/**
 * HR Analyst Node - Evaluates cultural fit and soft skills
 * Input: { jobSummary: string, cvSummary: string }
 * Output: { hrScore: number, hrRationale: string }
 */
async function mailAgent(state) {
  console.log("\n=== Mail STARTED ===");
  
  const prompt = mailPrompt;
  const chain = prompt.pipe(mailLLM);
  const response = await chain.invoke(state);
  
  return { message: response };
}


async function Mail(contextJson) {
  const workflow = new StateGraph({
    channels: {
        contextJson: {
        default: () => contextJson,
        aggregate: "last"
      },
      message: { default: () => null },
    }
  });

  // Add nodes
  workflow.addNode("mail_Agent", mailAgent);
  // Set up workflow
  workflow.addEdge(START,"mail_Agent");
  workflow.addEdge("mail_Agent", END);

  // Compile and execute
  const app = workflow.compile();
  
  console.log("\n===  Mail PROCESS STARTED ===");

  
  const result = await app.invoke({
    contextJson: contextJson,
  });

  console.log("\n=== Mail PROCESS COMPLETED ===");




  return {
    message: result.message,
    }
 };


export { Mail };