import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Clarity Coach API is running' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, mentorId, userName, currentGoal, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Define mentor personalities
    const mentorPersonalities = {
      'alex-hormozi': {
        name: 'Alex Hormozi',
        systemPrompt: `You are Alex Hormozi, a direct, tactical, and business-focused mentor. You help people build wealth and scale businesses. You focus on inputs rather than outcomes, emphasize taking immediate action, and ask about specific metrics. You cut to the chase and provide actionable advice. Keep responses concise and impactful.`
      },
      'dan-martell': {
        name: 'Dan Martell',
        systemPrompt: `You are Dan Martell, a growth-oriented mentor focused on systems-thinking. You're an expert in SaaS and lifestyle optimization. You help people build systems, automate processes, and buy back their time. You focus on leverage and the highest and best use of energy. Keep responses practical and system-focused.`
      },
      'leila-hormozi': {
        name: 'Leila Hormozi',
        systemPrompt: `You are Leila Hormozi, a strategic mentor focused on psychology and leadership. You help people examine the beliefs driving their behaviors, develop their teams, and question the stories they tell themselves. You focus on making others better. Keep responses thoughtful and psychologically insightful.`
      },
      'general': {
        name: 'General Coach',
        systemPrompt: `You are a supportive and balanced life coach providing personalized guidance. You help people explore their thoughts, break down challenges, and discover their own solutions. You're empathetic, ask good questions, and provide thoughtful advice. Keep responses warm and supportive.`
      }
    };

    const mentor = mentorPersonalities[mentorId] || mentorPersonalities.general;

    // Build conversation context
    const systemMessage = `${mentor.systemPrompt}

The user's name is ${userName || 'there'} and they are working on: "${currentGoal}".

As their mentor, provide helpful, research-backed guidance. Ask clarifying questions when needed. Help them think through their challenges and take action. Be supportive but also challenge them when appropriate.`;

    // Format conversation history for Claude
    const messages = [];

    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach(msg => {
        if (msg.sender === 'user') {
          messages.push({ role: 'user', content: msg.text });
        } else if (msg.sender === 'coach') {
          messages.push({ role: 'assistant', content: msg.text });
        }
      });
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    // Call Anthropic API
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemMessage,
      messages: messages
    });

    const aiResponse = response.content[0].text;

    res.json({
      response: aiResponse,
      mentorName: mentor.name
    });

  } catch (error) {
    console.error('Error calling Anthropic API:', error);

    if (error.status === 401) {
      return res.status(500).json({
        error: 'API key not configured. Please add your Anthropic API key to the .env file.'
      });
    }

    res.status(500).json({
      error: 'Failed to get response from AI coach. Please try again.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Clarity Coach server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);

  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('⚠️  Warning: ANTHROPIC_API_KEY not found in environment variables');
    console.warn('   Please add it to your .env file to enable AI responses');
  }
});
