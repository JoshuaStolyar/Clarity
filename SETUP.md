# Clarity Setup Guide

## Getting Started with the AI Coach

The Clarity app now uses Anthropic's Claude AI to power the coaching chatbot. Follow these steps to get it running:

### 1. Get Your Anthropic API Key

1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up for an account (if you don't have one)
3. Navigate to "API Keys" in the dashboard
4. Click "Create Key" and copy your API key

### 2. Configure Your Environment

1. Copy the `.env.example` file to create a new `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_actual_api_key_here
   PORT=3001
   ```

### 3. Run the Application

The app now has both a frontend and backend. You can run them together with:

```bash
npm run dev:full
```

This will start:
- Frontend (Vite): http://localhost:5173
- Backend (Express): http://localhost:3001

**Alternative:** Run them separately in different terminals:

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run server
```

### 4. Using the Coach

1. Complete the onboarding flow (name, age, goal)
2. Navigate to the "Coach" tab
3. Select a mentor personality (or use General Coach)
4. Start chatting! The AI will:
   - Answer your questions with research-backed advice
   - Help you think through challenges
   - Guide you toward your goals
   - Adapt to the mentor personality you chose

### Mentor Personalities

- **Alex Hormozi**: Direct, tactical, business-focused
- **Dan Martell**: Growth-oriented, systems-thinking
- **Leila Hormozi**: Strategic, psychology-focused
- **General Coach**: Supportive and balanced (default)

### Troubleshooting

**"API key not configured" error:**
- Make sure your `.env` file exists in the root directory
- Check that `ANTHROPIC_API_KEY` is set correctly
- Restart the backend server after adding the API key

**Backend won't start:**
- Make sure port 3001 is available
- Check that all dependencies are installed: `npm install`

**Chat not working:**
- Ensure both frontend and backend are running
- Check the browser console for errors
- Verify the backend is accessible at http://localhost:3001/api/health

### API Costs

Anthropic charges per token used. The app uses Claude 3.5 Sonnet, which is:
- Input: $3 per million tokens
- Output: $15 per million tokens

A typical conversation message costs less than $0.01. For more details, see [Anthropic's pricing page](https://www.anthropic.com/pricing).

---

Need help? Check the main README.md or open an issue on GitHub.
