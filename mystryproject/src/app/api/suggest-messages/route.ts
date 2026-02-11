import { GoogleGenerativeAI } from "@google/generative-ai";

async function generateSuggestedMessages() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.log("No GEMINI_API_KEY found, using fallback messages");
      const fallbackQuestions = [
        "What's a skill you'd love to master and why?",
        "If you could instantly learn any language, which would it be?",
        "What small act of kindness have you witnessed recently?",
        "What fictional world would you most like to live in for a day?",
        "What's your favorite way to unwind after a long day?",
        "If you could invent a new holiday, what would it celebrate?",
        "What's a song that always puts you in a good mood?",
        "What's something you're looking forward to in the near future?",
        "If you could have any superpower, what would it be and how would you use it to help others?",
        "What's a topic you're currently learning about or interested in exploring?"
      ];
      return fallbackQuestions.join('||');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40, 
      maxOutputTokens: 8192,
    };

    const prompt = `Create a list of ten open-ended and engaging questions for an anonymous social messaging platform. 
    Each question should be separated by '||' (double pipe). 
    These questions should be suitable for a diverse audience and avoid personal or sensitive topics.
    Focus on universal themes that encourage friendly interaction.
    
    Example format: "What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?"
    
    Return ONLY the questions separated by '||', no additional formatting or JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Raw Gemini response:", text);
    
    // Clean up the response and ensure it has the correct format
    const cleanedText = text.trim().replace(/^["']|["']$/g, ''); // Remove quotes if present
    
    console.log("Cleaned text:", cleanedText);
    
    // If the response doesn't contain '||', use fallback
    if (!cleanedText.includes('||')) {
      console.log("No '||' found in response, using fallback");
      const fallbackQuestions = [
        "What's a skill you'd love to master and why?",
        "If you could instantly learn any language, which would it be?",
        "What small act of kindness have you witnessed recently?",
        "What fictional world would you most like to live in for a day?",
        "What's your favorite way to unwind after a long day?",
        "If you could invent a new holiday, what would it celebrate?",
        "What's a song that always puts you in a good mood?",
        "What's something you're looking forward to in the near future?",
        "If you could have any superpower, what would it be and how would you use it to help others?",
        "What's a topic you're currently learning about or interested in exploring?"
      ];
      return fallbackQuestions.join('||');
    }
    
    return cleanedText;
  } catch (error) {
    console.error('Error generating suggested messages:', error);
    
    // Return fallback messages if API fails
    const fallbackQuestions = [
      "What's a skill you'd love to master and why?",
      "If you could instantly learn any language, which would it be?",
      "What small act of kindness have you witnessed recently?",
      "What fictional world would you most like to live in for a day?",
      "What's your favorite way to unwind after a long day?",
      "If you could invent a new holiday, what would it celebrate?",
      "What's a song that always puts you in a good mood?",
      "What's something you're looking forward to in the near future?",
      "If you could have any superpower, what would it be and how would you use it to help others?",
      "What's a topic you're currently learning about or interested in exploring?"
    ];
    return fallbackQuestions.join('||');
  }
}

export async function GET(req: Request) {
  try {
    console.log("GET /api/suggest-messages called");
    const messages = await generateSuggestedMessages();
    console.log("Generated messages:", messages);
    
    return new Response(messages, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error('GET /api/suggest-messages error:', error);
    return new Response("Error generating messages", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

export async function POST(req: Request) {
  try {
    console.log("POST /api/suggest-messages called");
    const messages = await generateSuggestedMessages();
    console.log("Generated messages:", messages);
    
    return new Response(messages, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error('POST /api/suggest-messages error:', error);
    return new Response("Error generating messages", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}