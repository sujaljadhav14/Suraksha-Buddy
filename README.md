# SurakshaBuddy - Digital Wellness Chatbot 🤖💙

An intelligent chatbot designed to help users manage digital wellness concerns through conversational AI. SurakshaBuddy provides practical advice, solutions, and challenges to improve your relationship with technology.

# Live Demo
[Demo](https://suraksha-buddy.vercel.app/)



## 🎯 Project Overview

SurakshaBuddy is a digital wellness companion that addresses modern technology-related concerns such as:
- 📱 Screen addiction
- 💬 WhatsApp forwards and misinformation
- 🔊 Loud public video consumption
- 📸 Social media reel ethics
- ✓ Digital communication etiquette (being left on 'seen')
- 🧘 General digital wellness guidance

The chatbot provides structured responses including explanations, practical solutions, ready-to-use polite messages, and mini-challenges to encourage healthier digital habits.

---

## ✨ Key Features

### 1. **Intelligent Conversation Flow**
- Smart categorization of user concerns into 8 distinct digital wellness topics
- Context-aware responses with structured advice
- Emergency detection system for safety-critical situations

### 2. **Voice Input** 🎤
- Speech-to-text functionality using Web Speech API
- Visual feedback during recording
- Browser-based, no external dependencies

### 3. **Structured Responses**
Each response includes:
- **Explanation**: Why the behavior is problematic
- **Practical Solutions**: 2-4 actionable steps
- **Polite Message**: Ready-to-copy text for others
- **Mini Challenge**: Small wellness improvement task

### 4. **Rate Limiting**
- 18 requests per hour per session
- Visual counter showing remaining requests
- Prevents API quota exhaustion

### 5. **Response Caching**
- Intelligent caching of identical questions
- Instant responses for repeated queries
- Reduces API costs and improves speed

### 6. **Modern UI/UX**
- Clean, responsive design
- Floating avatar icons with visual effects
- Dark mode support
- Real-time loading indicators

---

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 15.3.6 (React 19)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **AI Model**: OpenAI GPT-4o-mini
- **Speech Recognition**: Web Speech API
- **Language**: TypeScript

---

## 🤖 AI Tools & Platforms Used

### **AI Platform**
- **OpenAI GPT-4o-mini** - Used for generating intelligent responses

### **AI Assistance in Development**
- AI tools assisted in:
  - Code structure and optimization
  - TypeScript type definitions
  - UI component implementation
  - Debugging and error handling

### **Original Work by Participant**
The following were created entirely by the participant:
- ✅ Conversation design and flow logic
- ✅ Digital wellness categorization system
- ✅ Structured response format
- ✅ Rate limiting strategy
- ✅ Caching implementation
- ✅ User experience design
- ✅ Emergency detection logic
- ✅ Mini-challenge concept

---

## 💬 Prompts & Conversation Design

### **System Prompts Used**

#### 1. **Message Categorization Prompt**
```
You are a message categorization assistant. Categorize the user's message 
into EXACTLY ONE of these categories:

- WhatsApp forwards
- Screen addiction
- Loud public videos
- Reel ethics
- Leaving on 'seen'
- General digital wellness
- Gratitude
- None

Rules:
- If the user is expressing thanks, use 'Gratitude'
- If the concern doesn't fit a specific category but is related to digital 
  life, use 'General digital wellness'
- If completely unrelated to digital wellness, use 'None'
```

#### 2. **Emergency Detection Prompt**
```
You are a safety assistant that analyzes user requests to determine if 
they are harmful, illegal, or indicate an emergency.

EMERGENCY SITUATIONS: Physical danger, medical emergencies, immediate threats
HARMFUL BUT NOT EMERGENCY: Illegal information requests, harmful content
SAFE REQUESTS: Normal digital wellness questions
```

#### 3. **Structured Response Prompt**
```
You are SurakshaBuddy, a friendly chatbot that helps users with digital 
wellness concerns.

Based on the category and user's message, provide:
1. explanation: Why the behavior is problematic (2-3 sentences)
2. solutions: Array of 2-4 practical, actionable solutions
3. politeMessage: A ready-to-copy message the user can send to others
4. miniChallenge: A small challenge to improve digital wellness

Be empathetic, practical, and encouraging.
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+ installed
- OpenAI API key

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/sujaljadhav14/Suraksha-Buddy.git
cd Suraksha-Buddy
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example file
copy .env.example .env

# Edit .env and add your OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here
```

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:9002
```

---

## 📖 Usage Guide

### Text Input
1. Type your digital wellness concern in the input box
2. Press Enter or click the send button
3. Receive structured advice with solutions and challenges

### Voice Input
1. Click the microphone 🎤 icon
2. Allow microphone permissions
3. Speak your concern clearly
4. Text will auto-populate and you can send

### Rate Limiting
- You have 18 requests per hour
- Counter shows remaining requests in bottom-right
- Limit resets after 1 hour

### Caching
- Identical questions return instant cached responses
- Cached responses don't count toward rate limit
- Cache lasts 1 hour

---

## 📋 Features Breakdown

| Feature | Description | Status |
|---------|-------------|--------|
| Text Chat | Standard text-based conversation | ✅ |
| Voice Input | Speech-to-text using Web Speech API | ✅ |
| Smart Categorization | AI categorizes concerns into 8 topics | ✅ |
| Structured Responses | Explanation, solutions, message, challenge | ✅ |
| Emergency Detection | Identifies safety-critical situations | ✅ |
| Rate Limiting | 18 requests/hour per session | ✅ |
| Response Caching | Instant responses for repeated queries | ✅ |
| Token Optimization | 300 token limit for faster responses | ✅ |
| Modern UI | Clean, responsive, dark mode | ✅ |

---

## 🔒 Security & Privacy

- ✅ No user data stored
- ✅ API keys secured via environment variables
- ✅ Rate limiting prevents abuse
- ✅ No conversation history persistence
- ✅ HTTPS encryption on deployed version

---

## 📝 Competition Compliance

### ✅ Originality
- Conversation design is completely original
- Logic flow created by participant
- Unique structured response format
- Custom categorization system

### ✅ Functionality
- Fully functional chatbot
- Live demo available
- All features working as intended

### ✅ Content Guidelines
- ❌ No offensive or abusive material
- ❌ No hateful or harmful content
- ❌ No political or sensitive elements
- ✅ Focused on positive digital wellness

### ✅ AI Tool Disclosure
- Clearly mentioned all AI tools used
- Documented specific prompts
- Explained participant's original contributions

### ✅ Submission
- One submission per participant
- Original work, not plagiarized
- AI-assisted but not fully AI-generated

---

## 🎓 Learning Outcomes

This project demonstrates:
- Conversational AI design
- API integration and optimization
- Rate limiting and caching strategies
- Modern web development with Next.js
- User experience design
- Speech recognition implementation

---

## 🤝 Contributing

This is a competition submission project. Contributions are not currently accepted.

---

## 📄 License

This project is created for educational and competition purposes.

---

## 👨‍💻 Author

**Sujal Jadhav**
- GitHub: [@sujaljadhav14](https://github.com/sujaljadhav14)

---

## 🙏 Acknowledgments

- OpenAI for GPT-4o-mini API
- Next.js team for the amazing framework
- Radix UI for accessible components
- Competition organizers for the opportunity


**Made with 💙 for Digital Wellness**
