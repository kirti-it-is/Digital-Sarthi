export type UserRole = 'admin' | 'teacher'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface Teacher {
  id: string
  name: string
  subject: string
  gradeLevel: string
  status: 'active' | 'inactive'
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export interface Message {
  id: string
  sender: 'ai' | 'teacher'
  content: string
  timestamp: Date
}

export interface CoursePlan {
  id: string
  topic: string
  gradeLevel: string
  duration: string
  introduction: string
  activity: string
  quiz: string
  discussion: string
}
