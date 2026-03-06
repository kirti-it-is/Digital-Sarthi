const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const OpenAI = require('openai');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Mock data
const users = [
  {
    id: '1',
    email: 'admin@digitalsarthi.com',
    password: '$2b$10$T.8euJlP53r/Ud/fQmgnb.VKplJtl1sB9g6so0DjD6KmjL29g2cze', // admin123
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'teacher@digitalsarthi.com',
    password: '$2b$10$RrGl62RGkIRHMs4vp7nA/eXk.LcLT6ijj4cyUTsNUt7d1lgmnN9DG', // teacher123
    name: 'Teacher User',
    role: 'teacher'
  }
];

const curriculum = [
  {
    id: '1',
    title: 'Introduction to Artificial Intelligence',
    gradeLevel: '6-8',
    subject: 'AI',
    description: 'Basic concepts of AI and machine learning'
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    gradeLevel: '8-10',
    subject: 'AI',
    description: 'Understanding algorithms and data training'
  }
];

// Initialize OpenAI (you'll need to set OPENAI_API_KEY environment variable)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key-here'
});

// Auth middleware - COMPLETELY REMOVED
// const authenticateToken = (req, res, next) => {
//   // Skip authentication for now
//   next();
// };

// Routes

// Login - Always succeeds now
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email } = req.body;

    // Always return success with admin role for any login
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: email || 'test@example.com',
      role: 'admin' // Default to admin
    };

    const token = 'mock-jwt-token-' + Date.now();

    res.json({
      token,
      user: mockUser
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get curriculum
app.get('/api/curriculum', (req, res) => {
  res.json(curriculum);
});

// Get lesson guide (now accepts POST so client can send extra context)
app.post('/api/curriculum/:id/lesson-guide', (req, res) => {
  const { id } = req.params;
  const { gradeLevel, quizScore } = req.body || {}; // optionally provided by client
  const item = curriculum.find(c => c.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Curriculum not found' });
  }

  // Example of using the additional info; in real app you might tailor content
  const lessonGuide = {
    id: item.id,
    title: item.title,
    introduction: `Welcome to ${item.title}. This lesson will cover the fundamental concepts of ${item.subject}.`,
    activity: 'Students will engage in hands-on activities to understand AI concepts through interactive examples.',
    quiz: 'A short quiz to assess understanding of key concepts.',
    discussion: 'Class discussion on the ethical implications of AI technology.',
    // include some of the extra context we received
    meta: {
      gradeLevel: gradeLevel || 'unknown',
      previousScore: quizScore || null
    }
  };

  res.json(lessonGuide);
});

// AI Chat
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, mode } = req.body;

    // Mock AI response for now
    const responses = {
      LESSON_SUPPORT: [
        "Great question! Let me help you structure this lesson. For introducing AI concepts, I recommend starting with real-world examples that students can relate to.",
        "That's an excellent approach. You could enhance this by adding a hands-on activity where students create their own simple decision trees.",
        "Perfect! To make this more engaging, consider using visual aids or interactive simulations to demonstrate the concepts."
      ],
      QUIZ_GENERATION: [
        "I'll help you create an effective quiz. Based on the curriculum, here are some suggested questions...",
        "For assessment purposes, I recommend including both multiple-choice and short-answer questions to test different levels of understanding."
      ]
    };

    const modeResponses = responses[mode] || responses.LESSON_SUPPORT;
    const randomResponse = modeResponses[Math.floor(Math.random() * modeResponses.length)];

    res.json({
      response: randomResponse,
      suggestions: [
        "Try adding more interactive elements",
        "Consider student grouping strategies",
        "Include real-world applications"
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'AI chat failed' });
  }
});

// Analyze CSV
app.post('/api/ai/analyze-csv', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Mock analysis response
    const analysis = {
      totalStudents: 25,
      averageScore: 78.5,
      strengths: ['Good understanding of basic concepts', 'Strong problem-solving skills'],
      areasForImprovement: ['Need more practice with advanced topics', 'Improve critical thinking'],
      recommendations: [
        'Focus on hands-on activities',
        'Provide additional resources for struggling students',
        'Encourage peer learning'
      ]
    };

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'CSV analysis failed' });
  }
});

// Upload PDF
app.post('/api/curriculum/upload-pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Mock processing response
    const result = {
      success: true,
      message: 'PDF uploaded and processed successfully',
      curriculumId: Date.now().toString(),
      extractedContent: 'AI curriculum content has been extracted and organized.'
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'PDF upload failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});