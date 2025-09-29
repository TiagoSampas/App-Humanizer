
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const checkAIGenerated = async (text: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key for Gemini is not configured.");
  }
  
  const prompt = `Analisa o seguinte texto e determina se foi muito provavelmente gerado por uma inteligência artificial ou escrito por um humano. A tua resposta deve ser apenas a palavra "IA" ou a palavra "Humano". Não adiciones qualquer outra explicação ou pontuação. O texto a analisar é:\n\n"${text}"`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API for AI check:", error);
    throw new Error("Failed to check content.");
  }
};

export const humanizeText = async (text: string): Promise<string> => {
   if (!process.env.API_KEY) {
    throw new Error("API key for Gemini is not configured.");
  }

  const prompt = `Atua como um especialista em escrita e copywriter. A tua tarefa é reescrever o texto fornecido para que soe mais natural, envolvente e humano. Adota um tom coloquial e autêntico, como se fosse escrito por uma pessoa para outra. Evita a linguagem robótica, jargões excessivos ou estruturas de frases demasiado complexas. O resultado final deve estar em português de Portugal. Mantém a intenção e o significado original do texto. Não adiciones introduções ou conclusões que não façam parte do texto original, apenas reescreve o conteúdo. Aqui está o texto:\n\n"${text}"`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API for humanization:", error);
    throw new Error("Failed to humanize text.");
  }
};
