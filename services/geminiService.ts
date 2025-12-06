import { GoogleGenAI, Type } from "@google/genai";
import { AIStudyGuide } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTopicGuide = async (topicTitle: string, contextDescription: string): Promise<AIStudyGuide> => {
  try {
    const prompt = `
      你是一位资深的 Java 全栈技术专家和讲师。
      请为主题："${topicTitle}" 创建一份简明扼要的学习指南。
      上下文描述：${contextDescription}
      
      请严格按照以下 JSON 格式返回中文内容：
      {
        "summary": "2-3句话的高层总结，说明为什么这个技术很重要。",
        "keyConcepts": ["核心概念1", "核心概念2", "核心概念3", "核心概念4"],
        "interviewQuestions": ["常见面试题1？", "常见面试题2？", "常见面试题3？"],
        "learningPath": ["步骤1：...", "步骤2：...", "步骤3：..."]
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            keyConcepts: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            interviewQuestions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            learningPath: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
          },
          required: ["summary", "keyConcepts", "interviewQuestions", "learningPath"],
        },
      },
    });

    if (!response.text) {
      throw new Error("No content generated");
    }

    const data = JSON.parse(response.text) as AIStudyGuide;
    return data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};