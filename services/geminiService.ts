
import { GoogleGenAI } from "@google/genai";
import { SaleEntry } from "../types";

export const analyzeFinancials = async (entries: SaleEntry[]): Promise<string> => {
  if (entries.length === 0) return "No data available for analysis yet.";

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const dataSummary = entries.map(e => (
    `Date: ${e.date}, Cash: ${e.cashSales}, Card: ${e.cardSales}, Exp: ${e.expenses}`
  )).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze these daily business records and provide a brief summary of trends, efficiency, and one actionable tip to increase net profit. 
      Keep it professional and concise.
      
      Records:
      ${dataSummary}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "Unable to generate analysis at this time.";
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return "The financial advisor is currently unavailable. Please check your data manually.";
  }
};
