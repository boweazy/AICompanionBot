import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI
const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
}

// In-memory storage for chat sessions (you could use database in production)
const chatSessions = new Map<string, ChatSession>();

export async function createChatSession(): Promise<string> {
  const sessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const session: ChatSession = {
    id: sessionId,
    messages: [{
      id: `msg_${Date.now()}_1`,
      role: 'assistant',
      content: "Hello! I'm your SmartFlow AI Companion. I can help you with bot creation, social media automation strategies, platform-specific advice, and answer any questions about optimizing your social presence. How can I assist you today?",
      timestamp: new Date()
    }],
    createdAt: new Date()
  };
  
  chatSessions.set(sessionId, session);
  return sessionId;
}

export async function sendMessage(sessionId: string, userMessage: string): Promise<ChatMessage> {
  const session = chatSessions.get(sessionId);
  if (!session) {
    throw new Error('Chat session not found');
  }

  // Add user message to session
  const userMsg: ChatMessage = {
    id: `msg_${Date.now()}_${session.messages.length + 1}`,
    role: 'user',
    content: userMessage,
    timestamp: new Date()
  };
  session.messages.push(userMsg);

  try {
    // Create context-aware prompt for bot/social media expertise
    const systemPrompt = `You are a SmartFlow AI Companion, an expert assistant for social media automation and bot creation. You help users:

1. Create and configure social media bots
2. Understand platform-specific automation strategies (Twitter, Instagram, LinkedIn, Facebook, TikTok, YouTube)
3. Optimize engagement, content creation, and follower growth
4. Navigate the SmartFlow platform features
5. Troubleshoot bot performance and analytics

Provide practical, actionable advice. Be conversational but professional. Focus on real strategies that work within platform guidelines.

Chat History:
${session.messages.slice(-10).map(msg => `${msg.role}: ${msg.content}`).join('\n')}

User: ${userMessage}

Answer:`;

    const model = genai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt,
    });

    const response = await model;
    const aiResponse = response.text || "I apologize, but I'm having trouble processing your request right now. Please try again.";

    // Add AI response to session
    const aiMsg: ChatMessage = {
      id: `msg_${Date.now()}_${session.messages.length + 1}`,
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    };
    session.messages.push(aiMsg);

    return aiMsg;
  } catch (error) {
    console.error('AI Chat Error:', error);
    
    // Add error response
    const errorMsg: ChatMessage = {
      id: `msg_${Date.now()}_${session.messages.length + 1}`,
      role: 'assistant',
      content: "I'm experiencing some technical difficulties. Please check that your Gemini API key is properly configured and try again.",
      timestamp: new Date()
    };
    session.messages.push(errorMsg);

    return errorMsg;
  }
}

export function getChatSession(sessionId: string): ChatSession | undefined {
  return chatSessions.get(sessionId);
}

export function getAllChatSessions(): ChatSession[] {
  return Array.from(chatSessions.values());
}