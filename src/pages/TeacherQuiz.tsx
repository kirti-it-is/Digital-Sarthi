import { useState } from 'react'
import { quizQuestions } from '../lib/mock-data'

interface TeacherQuizProps {
  onQuizComplete: (gradeLevel: string) => void
}

export default function TeacherQuiz({ onQuizComplete }: TeacherQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [submitted, setSubmitted] = useState(false)
  const [gradeLevel, setGradeLevel] = useState('')

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const scoredQuestions = quizQuestions.filter(q => q.correctAnswer !== -1)
  const score = scoredQuestions.filter((q, i) => answers[quizQuestions.indexOf(q)] === q.correctAnswer).length

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex })
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleCompleteQuiz = () => {
    onQuizComplete(gradeLevel)
  }

  if (submitted) {
    const pct = Math.round((score / scoredQuestions.length) * 100)
    const level = pct >= 67 ? 'Advanced' : pct >= 34 ? 'Intermediate' : 'Beginner'
    const levelColor = level === 'Advanced' ? 'text-green-700 bg-green-50' : level === 'Intermediate' ? 'text-yellow-700 bg-yellow-50' : 'text-blue-700 bg-blue-50'

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Knowledge Check Complete!</h2>
          <p className="text-gray-500 text-sm mb-6">Your responses have been used to personalise your AI teaching assistant</p>

          <div className="bg-blue-50 rounded-xl p-5 mb-5 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-700">AI Knowledge Score</span>
              <span className="font-bold text-blue-600 text-lg">{score}/{scoredQuestions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${pct}%` }}></div>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${levelColor}`}>
              {level} Level
            </span>
          </div>

          <div className="mb-6 text-left">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Your Grade Level</label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Choose a grade level...</option>
              <option value="Grade 5-6">Grade 5-6</option>
              <option value="Grade 7-8">Grade 7-8</option>
              <option value="Grade 9+">Grade 9+</option>
            </select>
          </div>

          <button
            onClick={handleCompleteQuiz}
            disabled={!gradeLevel}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
          >
            Continue to AI Teaching Assistant →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Knowledge Check</h1>
              <p className="text-sm text-gray-500 mt-0.5">Helps us personalise your AI teaching experience</p>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {currentQuestion + 1} / {quizQuestions.length}
            </span>
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Type Tag */}
        <div className="mb-4">
          {question.correctAnswer !== -1 ? (
            <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full">
              🧠 AI Knowledge Question
            </span>
          ) : (
            <span className="text-xs bg-purple-50 text-purple-700 font-semibold px-3 py-1 rounded-full">
              📋 Teaching Preference
            </span>
          )}
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h2>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                  answers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={index}
                  checked={answers[currentQuestion] === index}
                  onChange={() => handleAnswer(index)}
                  className="w-4 h-4"
                />
                <span className="ml-4 text-gray-900 font-medium">
                  {String.fromCharCode(65 + index)}. {option}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>

          {currentQuestion === quizQuestions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={answers[currentQuestion] === undefined}
              className="px-8 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
