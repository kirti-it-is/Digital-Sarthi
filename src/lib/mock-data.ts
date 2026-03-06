import { Teacher, QuizQuestion, CoursePlan } from './types'

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Priya Singh',
    subject: 'Artificial Intelligence',
    gradeLevel: '6-7',
    status: 'active',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    subject: 'Artificial Intelligence',
    gradeLevel: '8-9',
    status: 'active',
  },
  {
    id: '3',
    name: 'Anjali Patel',
    subject: 'Artificial Intelligence',
    gradeLevel: '6-8',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Vikram Singh',
    subject: 'Artificial Intelligence',
    gradeLevel: '7-9',
    status: 'active',
  },
]

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which of the following best describes Artificial Intelligence?',
    options: [
      'Systems that simulate human intelligence to perform tasks and learn from data',
      'Machines that only follow fixed, pre-programmed rules',
      'Software used only for data storage and retrieval',
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: 'What is Machine Learning in the context of AI?',
    options: [
      'A subset of AI where systems learn patterns from data without being explicitly programmed',
      'A technique used only in robotics and automation',
      'A type of relational database management system',
    ],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: 'Which of these is a real-world application of AI?',
    options: [
      'Recommendation engines like those used by Netflix or YouTube',
      'Traditional calculators performing arithmetic operations',
      'Simple text editors like Notepad',
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: 'What grade level are you teaching AI to?',
    options: ['Grade 5-6', 'Grade 7-8', 'Grade 9+'],
    correctAnswer: -1,
  },
  {
    id: 5,
    question: 'How do you typically deliver your AI lessons?',
    options: [
      'Mostly lecture-based with slides',
      'Mix of lecture and interactive activities',
      'Mostly hands-on experiments and projects',
    ],
    correctAnswer: -1,
  },
  {
    id: 6,
    question: 'Which AI topic are you most focused on this term?',
    options: [
      'Foundations of AI & Machine Learning',
      'Neural Networks & Deep Learning',
      'AI Ethics, Bias & Responsible AI',
    ],
    correctAnswer: -1,
  },
]

export const mockCoursePlan: CoursePlan = {
  id: '1',
  topic: 'Introduction to Artificial Intelligence',
  gradeLevel: '6',
  duration: '40 minutes',
  introduction:
    'Begin with a relatable hook: "How does Spotify know which song to play next?" Walk students through how AI observes patterns in listening history to make predictions. This bridges the abstract concept of AI to something they experience daily.',
  activity:
    'Run the "Human Algorithm" game: give students a set of animal picture cards and a simple decision tree (Does it have fur? → Does it have 4 legs?). Students must classify animals by following the rules — helping them physically experience how a rule-based AI makes decisions.',
  quiz:
    'Ask students: "What would happen if you trained an AI only on data from one city? Would it work in another country?" Have groups debate in 3 minutes, then share. This builds critical thinking around data diversity and AI limitations.',
  discussion:
    'Facilitate: "Should AI be allowed to grade your exams?" Push students to think about fairness, accountability, and what questions AI still cannot answer. Encourage them to consider who is responsible when AI makes a mistake.',
}

export const aiTopics = [
  {
    id: 'foundations',
    title: 'Foundations of AI',
    gradeRange: '6-7',
    modules: [
      'What is AI? History & Overview',
      'Rule-based Systems vs Learning Systems',
      'AI in Everyday Life',
      'How Computers "See" and "Hear"',
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning Basics',
    gradeRange: '7-8',
    modules: [
      'What is Machine Learning?',
      'Training Data & Labels',
      'Supervised vs Unsupervised Learning',
      'Decision Trees & Simple Models',
    ],
  },
  {
    id: 'neural',
    title: 'Neural Networks & Deep Learning',
    gradeRange: '8-9',
    modules: [
      'How the Brain Inspired AI',
      'Layers, Weights & Activations',
      'Image Recognition with CNNs',
      'Natural Language Processing (NLP)',
    ],
  },
  {
    id: 'ethics',
    title: 'AI Ethics & Responsible AI',
    gradeRange: '6-9',
    modules: [
      'AI Bias & Fairness',
      'Privacy & Data Rights',
      'AI in Healthcare & Justice',
      'Future of Work & AI',
    ],
  },
]

export const mockAIResponses = [
  {
    trigger: 'suggest',
    response:
      'Here\'s a great activity for introducing AI: The "Sorting Algorithm" game. Give students coloured cards with numbers and challenge them to sort using different strategies. Then discuss how early AI used similar rule-based sorting — making the abstract concrete!',
  },
  {
    trigger: 'activity',
    response:
      'Try the "Train Your Classifier" activity: show students 20 images (cats vs dogs). Have them write 3 rules to tell them apart. Then test on 5 new images — how accurate were their rules? This is literally how a supervised ML model works, and they will feel the frustration of edge cases!',
  },
  {
    trigger: 'assessment',
    response:
      'For AI assessment, try the "AI Audit" task — ask students to pick any app they use (Instagram, Maps, Spotify) and write: (1) What data does the AI use? (2) What does it predict? (3) Could it be unfair to anyone? This connects assessment to their real world.',
  },
  {
    trigger: 'ethics',
    response:
      'Teach AI ethics through real cases. Show the COMPAS recidivism algorithm — an AI used to predict criminal reoffending that showed racial bias. Ask: Who is responsible? The developer? The data? This triggers powerful, lasting discussion.',
  },
  {
    trigger: 'neural',
    response:
      'For neural networks, try the "Perceptron Game" — draw a 2-input node on the whiteboard. Give students sliders (weights) and ask them to tune it to correctly classify AND/OR gates. They will discover backpropagation intuitively!',
  },
  {
    trigger: 'bias',
    response:
      'Show students the "Gender Shades" study by Joy Buolamwini — facial recognition that worked 99% accurately on light-skinned men but only 65% on dark-skinned women. Ask: Why did this happen? What data was used? This makes biased training data immediately real.',
  },
  {
    trigger: 'start',
    response:
      "Good morning! Based on your syllabus and quiz results, today looks great for introducing 'Foundations of Artificial Intelligence' to your class. I have pre-loaded resources aligned to your grade level and teaching style. Want a lesson opener, interactive activity, or discussion prompts?",
  },
  {
    trigger: 'default',
    response:
      'I can help you with AI lesson planning, classroom activities, assessment ideas, or discussion prompts. I am tuned specifically for teaching Artificial Intelligence — from foundations and machine learning basics to ethics and neural networks. What topic or grade level are you working on today?',
  },
]
