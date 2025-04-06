
import { loadPDFText } from "../utils/pdfLoader.js";
import { extractTextFromDOCX } from "../utils/fileExtractor.js";
import { generateEmbedding } from "../utils/embedding.js";
import { summarizeText } from "../utils/summaryGenerator.js"; 

import path from "path";
import {  io } from '../config/socket.js';
import fs from "fs/promises"; // Using promise-based fs
import Candidate from "../Schema/Candidate.js";
import { extractEmail } from "../utils/emailExtractor.js"; // Assuming you have this utility function

export const singleCv = async (req, res) => {
    try {
      const file = req.file;
      const { name, email,jobTitle } = req.body;
  
      if (!file) {
        console.log("⚠️ No file uploaded.");
        io.emit("message", "⚠️ No file uploaded.");
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      console.log(`📄 Processing uploaded file: ${file.originalname}`);
      io.emit("message", `📄 Processing uploaded file: ${file.originalname}`);
  
      let extractedText = "";
  
      if (file.mimetype === "application/pdf") {
        extractedText = await loadPDFText(file.buffer, file.originalname);
        console.log("✅ Extracted text from PDF.");
      } else if (
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.originalname.endsWith(".docx")
      ) {
        extractedText = await extractTextFromDOCX(file.buffer);
        console.log("✅ Extracted text from DOCX.");
      } else {
        console.log("❌ Unsupported file type.");
        io.emit("message", "❌ Unsupported file type.");
        return res.status(400).json({ error: "Unsupported file type" });
      }
  
      // Fallbacks for missing name/email
      const baseName = file.originalname.replace(/\.[^/.]+$/, "");
      const candidateName = name || baseName;
      let candidateEmail = email;
  
      if (!candidateEmail) {
        candidateEmail = extractEmail(extractedText); // Implement with regex
        console.log(`📧 Extracted email: ${candidateEmail}`);
      }
  
      // Summarize
      console.log("📝 Summarizing extracted text...");
      const summary = await summarizeText(extractedText);
  
      // Generate embedding
      console.log("🔢 Generating embedding...");
      // const embedding = await generateEmbedding(summary);
  
      // Store in MongoDB
      const candidateRecord = new Candidate({
        name: candidateName,
        email: candidateEmail,
        originalFileName: file.originalname,
        summary,
        // embedding,
        jobTitle
      });
  
      await candidateRecord.save();
      io.emit("message", `✅ Stored candidate ${candidateName} (${candidateEmail})`);
  
      res.json({
        message: "Candidate CV processed successfully",
        candidate: {
          name: candidateName,
          email: candidateEmail,
        },
      });
  
    } catch (error) {
      console.error("❌ Error uploading CV:", error);
      io.emit("message", `❌ Error: ${error.message}`);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}


export const multipleCv = async (req, res) => { 
        try {
          const files = req.files;
          const bodyData = req.body;
      
          if (!files || files.length === 0) {
            console.log("⚠️ No files uploaded.");
            io.emit("message", "⚠️ No files uploaded.");
            return res.status(400).json({ error: "No files uploaded" });
          }
      
          const results = [];
      
          for (const file of files) {
            console.log(`📄 Processing uploaded file: ${file.originalname}`);
            io.emit("message", `📄 Processing uploaded file: ${file.originalname}`);
      
            let extractedText = "";
            if (file.mimetype === "application/pdf") {
              extractedText = await loadPDFText(file.buffer, file.originalname);
              console.log("✅ Extracted text from PDF.");
            } else if (
              file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
              file.originalname.endsWith(".docx")
            ) {
              extractedText = await extractTextFromDOCX(file.buffer);
              console.log("✅ Extracted text from DOCX.");
            } else {
              console.log("❌ Unsupported file type.");
              continue;
            }
      
            // Extract candidate details from body or fallback
            const baseName = file.originalname.replace(/\.[^/.]+$/, ""); // Remove extension
            const candidateName = bodyData[file.originalname]?.name || baseName;
            let candidateEmail = bodyData[file.originalname]?.email;
      
            if (!candidateEmail) {
              candidateEmail = extractEmail(extractedText); // You need to implement this
              console.log(`📧 Extracted email: ${candidateEmail}`);
            }
      
            // Summarize
            console.log("📝 Summarizing extracted text...");
            const summary = await summarizeText(extractedText);
      
            // Generate embedding
            console.log("🔢 Generating embedding...");
            const embedding = await generateEmbedding(summary);
      
            // Store in MongoDB
            const candidateRecord = new Candidate({
              name: candidateName,
              email: candidateEmail,
              originalFileName: file.originalname,
              summary,
              embedding,
            });
      
            await candidateRecord.save();
            results.push({ name: candidateName, email: candidateEmail });
            io.emit("message", `✅ Stored candidate ${candidateName} (${candidateEmail})`);
          }
      
          res.json({ message: "All files processed", candidates: results });
      
        } catch (error) {
          console.error("❌ Error uploading CVs:", error);
          io.emit("message", `❌ Error: ${error.message}`);
          res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
      }