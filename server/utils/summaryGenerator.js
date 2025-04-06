import dotenv from 'dotenv';
dotenv.config();

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";

// Initialize the OpenAI LLM instance.
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const llm = new ChatOpenAI({
  openAIApiKey: OPENAI_API_KEY,
  model: "gpt-4o-mini", // Ensure this model name is correct and available
  temperature: 0,
});

// Define the summarization prompt using chat messages
const prompt = ChatPromptTemplate.fromMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `You are an expert résumé summarization assistant. 
Your goal is to read the full text of a candidate's résumé and produce a concise yet comprehensive summary that:

1. Captures every key point: education, work experience, skills, certifications, projects, achievements, and any other relevant detail.
2. Remains completely fair and unbiased: use neutral language, avoid assumptions or value judgments, and present information factually.
3. Structures the summary to facilitate automated downstream processing and human review: group information into clear sections (e.g., Education, Experience, Skills, Certifications, Projects, Achievements).
4. Uses consistent formatting and bullet points for readability.
5. Highlights anything unusual or exceptional (e.g., gaps in employment, major awards) without editorializing.

Always prioritize completeness and clarity over brevity.`
  ),
  HumanMessagePromptTemplate.fromTemplate(
    `Please summarize the following résumé text.  
Ensure you do not omit any significant detail.  
Organize the summary into these sections:

• Education  
• Professional Experience  
• Key Skills & Technologies  
• Certifications & Training  
• Projects & Contributions  
• Awards & Achievements  

Maintain neutrality and fairness. Use bullet points under each section.  
Here is the résumé text:

\"\"\"  
{text}  
\"\"\"`
  ),
]);

// Create the chain by piping the prompt to the LLM
const summarizationChain = prompt.pipe(llm);

/**
 * Summarize the provided text.
 * @param {string} text - The text to summarize.
 * @returns {Promise<string>} - The generated summary.
 */
export async function summarizeText(text) {
  const response = await summarizationChain.invoke({ text });
  return response.content;
}


const jobDescriptionPrompt  = ChatPromptTemplate.fromMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `You are a senior Talent Intelligence Assistant specialized in processing and enriching job descriptions. 
Your goal is to:
1. Identify and highlight all critical elements (role responsibilities, required skills, qualifications, experience, location, benefits, company culture).
2. Produce a concise but comprehensive summary that preserves every essential detail.
3. Elaborate on each section to create clear context for downstream LLMs (e.g., candidate matching, skill extraction, ranking).
4. Maintain a neutral, professional tone and use consistent formatting.`
  ),
  HumanMessagePromptTemplate.fromTemplate(
    `Please process the following job posting:

Title: {title}

Description:
\"\"\"
{description}
\"\"\"

Tasks:
1. **Key Points**: List out bullet-point highlights under headings:
   - Role & Responsibilities  
   - Required Skills & Qualifications  
   - Experience & Education  
   - Location & Logistics  
   - Compensation & Benefits  
   - Company Culture & Values  

2. **Summary**: Write a 3-4 sentence summary that captures the core of the role.

3. **Elaboration**: For each bullet point above, add one sentence of context or rationale to clarify why it matters.

Provide the output in Markdown with clear headings and bullet points.`
  ),
]);

const jobDescriptionChain = jobDescriptionPrompt.pipe(llm);

export async function summarizeJD( title, description) {
  const response = await jobDescriptionChain.invoke({ title, description });
  return response.content;
}