# 🌍 AI Travel Itinerary Generator

An intelligent travel planning app that uses AI (Claude by Anthropic) to generate personalized travel itineraries based on your preferences!

## 🎯 What This App Does

Users enter their travel details:
- Origin and destination cities
- Travel dates
- Number of travelers
- Activity preferences (sightseeing, outdoor, museums, etc.)
- Food preferences (local cuisine, fine dining, street food, etc.)

The AI then generates a custom day-by-day itinerary tailored to these preferences!

## 🏗️ Project Structure

```
.
├── index.html          # Frontend form (runs in browser)
├── style.css           # Styling
├── script.js           # Frontend logic (collects data, displays results)
├── server.js           # Backend server (calls AI API securely)
├── package.json        # Node.js dependencies
├── .env                # API keys (you'll create this)
└── .env.example        # Template for .env file
```

## 🔑 Understanding the Architecture

### Frontend (Browser)
- **index.html**: The form users fill out
- **script.js**: Collects form data and sends it to the backend
- **style.css**: Makes everything look nice

### Backend (Node.js Server)
- **server.js**:
  - Receives data from frontend
  - Calls Claude AI API (with your API key)
  - Sends the generated itinerary back to frontend

### Why do we need a backend?
We can't call AI APIs directly from the browser because:
1. **Security**: API keys would be visible to anyone (they could steal your key!)
2. **CORS**: Browsers block many external API calls for security
3. **Control**: Backend lets you monitor usage and add features

## 📋 Prerequisites

Before starting, you need:
1. **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
2. **Anthropic API Key** - [Get one here](https://console.anthropic.com/)

## 🚀 Setup Instructions

### Step 1: Install Node.js

Check if you have Node.js:
```bash
node --version
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### Step 2: Install Dependencies

In your project folder, run:
```bash
npm install
```

This installs:
- **express**: Web server framework
- **@anthropic-ai/sdk**: Claude AI client library
- **dotenv**: Loads environment variables from .env file

### Step 3: Get Your API Key

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to "API Keys"
4. Create a new API key
5. Copy the key (you'll only see it once!)

### Step 4: Configure Your API Key

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` in a text editor:
   ```bash
   # On Mac/Linux
   nano .env

   # On Windows
   notepad .env
   ```

3. Replace `your_api_key_here` with your actual API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
   ```

4. Save and close the file

⚠️ **IMPORTANT**: Never commit the `.env` file to GitHub! It's already in `.gitignore`.

### Step 5: Start the Server

Run:
```bash
npm start
```

You should see:
```
🚀 Server is running on http://localhost:3000
📝 Open your browser to see the app!
```

### Step 6: Use the App!

1. Open your browser to `http://localhost:3000`
2. Fill out the travel form
3. Click "Generate Itinerary!"
4. Wait a few seconds while AI creates your custom itinerary
5. View your personalized travel plan!

## 🎓 Learning Points

### 1. **Frontend-Backend Communication**
- **Frontend** (script.js) uses `fetch()` to send HTTP POST requests
- **Backend** (server.js) receives requests with `app.post()`
- Data is sent as JSON

```javascript
// Frontend sends data
const response = await fetch('/generate-itinerary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
});

// Backend receives data
app.post('/generate-itinerary', async (req, res) => {
    const userData = req.body;
    // Process the data...
});
```

### 2. **API Integration**
The backend calls Claude API like this:
```javascript
const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }]
});
```

### 3. **Environment Variables**
Sensitive data (API keys) are stored in `.env` and loaded with `dotenv`:
```javascript
require('dotenv').config();
const apiKey = process.env.ANTHROPIC_API_KEY;
```

### 4. **Async/Await**
Modern JavaScript for handling asynchronous operations:
```javascript
async function generateItinerary() {
    const response = await fetch('/api');  // Wait for response
    const data = await response.json();    // Wait for parsing
    return data;
}
```

## 🎨 Customization Ideas

Want to enhance the app? Try:

1. **Add more preferences**:
   - Budget level (budget, moderate, luxury)
   - Travel style (solo, family, romantic)
   - Pace (relaxed, moderate, packed)

2. **Better formatting**:
   - Parse the AI response more intelligently
   - Add icons for activities
   - Create a printable version

3. **Save itineraries**:
   - Add a database (MongoDB, PostgreSQL)
   - Let users save and revisit itineraries
   - Share itineraries with friends

4. **Use different AI models**:
   - Try OpenAI's GPT-4
   - Compare results from different models
   - Let users choose their preferred AI

## 🐛 Troubleshooting

### "Cannot find module 'express'"
Run: `npm install`

### "ANTHROPIC_API_KEY is not defined"
Make sure you created `.env` file with your API key

### "Port 3000 is already in use"
Change `PORT = 3000` in server.js to another number (like 3001)

### "API key invalid"
Double-check your API key in `.env` file - no spaces, no quotes

### Server won't start
Check if Node.js is installed: `node --version`

## 💰 Cost Information

Anthropic Claude API pricing (as of 2024):
- Claude 3.5 Sonnet: ~$3 per million input tokens, ~$15 per million output tokens
- Each itinerary costs roughly $0.01-0.05 depending on length
- You get $5 free credit when you sign up!

## 🔐 Security Best Practices

1. ✅ Never commit `.env` to GitHub (already in `.gitignore`)
2. ✅ Never share your API key publicly
3. ✅ Rotate API keys if they're ever exposed
4. ✅ Add rate limiting if deploying publicly
5. ✅ Validate user input before sending to AI

## 📚 Additional Resources

- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Fetch API Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Node.js Beginner Guide](https://nodejs.org/en/docs/guides/)

## 🎉 Next Steps

Now that you have AI integration working, you can:
1. Experiment with different prompts to get better itineraries
2. Add more user inputs for even more personalization
3. Learn about deploying to production (Heroku, Vercel, etc.)
4. Build other AI-powered features!

Happy coding and safe travels! 🚀✈️
