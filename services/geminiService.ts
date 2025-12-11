
import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might have better error handling or a fallback.
  // For this context, we assume the key is present.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateQuizQuestions = async (): Promise<QuizQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Buatkan 5 soal pilihan ganda (4 pilihan) tentang 'Kemerdekaan Berpendapat Warga Negara di Era Keterbukaan Informasi' di Indonesia. Pastikan ada satu jawaban yang benar.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              description: "Daftar soal-soal kuis.",
              items: {
                type: Type.OBJECT,
                properties: {
                  question: {
                    type: Type.STRING,
                    description: "Teks pertanyaan."
                  },
                  options: {
                    type: Type.ARRAY,
                    description: "Daftar 4 pilihan jawaban.",
                    items: { type: Type.STRING }
                  },
                  correctAnswer: {
                    type: Type.STRING,
                    description: "Jawaban yang benar dari daftar pilihan."
                  }
                },
                required: ["question", "options", "correctAnswer"]
              }
            }
          },
          required: ["questions"]
        }
      }
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    
    // Validate the structure before returning
    if (parsed.questions && Array.isArray(parsed.questions)) {
      return parsed.questions as QuizQuestion[];
    } else {
      throw new Error("Invalid response format from Gemini API");
    }

  } catch (error) {
    console.error("Error generating quiz questions:", error);
    // Return fallback questions in case of an API error
    return [
      {
        question: "Manakah undang-undang di Indonesia yang menjadi landasan utama kebebasan informasi publik?",
        options: ["UU ITE", "UU Pers", "UU Keterbukaan Informasi Publik (KIP)", "KUHP"],
        correctAnswer: "UU Keterbukaan Informasi Publik (KIP)",
      },
      {
        question: "Apa yang dimaksud dengan 'hoax' dalam konteks keterbukaan informasi?",
        options: ["Opini pribadi", "Informasi yang belum terverifikasi", "Berita yang sengaja dibuat bohong untuk menipu", "Kritik terhadap pemerintah"],
        correctAnswer: "Berita yang sengaja dibuat bohong untuk menipu",
      },
    ];
  }
};
