import { useState, useEffect } from 'react'
import { mockCoursePlan, aiTopics } from '../lib/mock-data'

interface Curriculum {
  id: string
  title: string
  subject: string
  grade_level: string
  content: string
}

export default function CoursePlan() {
  const [curriculum, setCurriculum] = useState<Curriculum[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCurriculum, setSelectedCurriculum] = useState<Curriculum | null>(null)
  const [lessonGuide, setLessonGuide] = useState<any>(null)

  useEffect(() => {
    fetchCurriculum()
  }, [])

  const fetchCurriculum = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3001/api/curriculum', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setCurriculum(data)
        if (data.length > 0) {
          setSelectedCurriculum(data[0])
          fetchLessonGuide(data[0].id)
        }
      }
    } catch (error) {
      console.error('Failed to fetch curriculum:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchLessonGuide = async (curriculumId: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3001/api/curriculum/${curriculumId}/lesson-guide`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          gradeLevel: '9-10', // This should come from user profile
          quizScore: 75 // This should come from quiz results
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setLessonGuide(data)
      }
    } catch (error) {
      console.error('Failed to fetch lesson guide:', error)
    }
  }

  if (loading) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading curriculum...</p>
        </div>
      </div>
    )
  }

  const plan = lessonGuide || mockCoursePlan

  return (
    <div className="h-[calc(100vh-80px)] overflow-y-auto bg-gray-50 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">AI Course Plan</h1>
          <p className="text-gray-500 mt-1">
            Personalised plan generated based on your AI knowledge level, grade, and teaching style.
          </p>
        </div>

        {/* Curriculum Selector */}
        {curriculum.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Curriculum Topic</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {curriculum.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedCurriculum(item)
                    fetchLessonGuide(item.id)
                  }}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedCurriculum?.id === item.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.subject} • Grade {item.grade_level}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Course Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-blue-600">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
                🤖 {selectedCurriculum?.subject || 'Artificial Intelligence'}
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{plan.topic || selectedCurriculum?.title}</h2>
              <p className="text-gray-600 mt-2">
                Grade Level: <span className="font-semibold">{selectedCurriculum?.grade_level || plan.gradeLevel}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Suggested Duration</p>
              <p className="text-2xl font-bold text-blue-600">{plan.duration || '2 weeks'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">📖</span>
                <h3 className="text-lg font-bold text-gray-900">Concept Explanation</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                {plan.conceptExplanation || plan.introduction || 'Loading lesson content...'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">🎯</span>
                <h3 className="text-lg font-bold text-gray-900">Classroom Activity</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                {plan.classroomActivity || plan.activity || 'Loading activity...'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">💡</span>
                <h3 className="text-lg font-bold text-gray-900">Teaching Strategy</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                {plan.teachingStrategy || 'Loading strategy...'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">🌟</span>
                <h3 className="text-lg font-bold text-gray-900">Real-Life Example</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                {plan.realLifeExample || 'Loading example...'}
              </p>
            </div>
          </div>

          {/* Additional Content */}
          {plan.howToIntroduce && (
            <div className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">🚀</span>
                <h3 className="text-lg font-bold text-gray-900">How to Introduce</h3>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{plan.howToIntroduce}</p>
            </div>
          )}

          {plan.studentQuiz && (
            <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">📝</span>
                <h3 className="text-lg font-bold text-gray-900">Student Quiz</h3>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{plan.studentQuiz}</p>
            </div>
          )}

          {plan.teachingTip && (
            <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">💡</span>
                <h3 className="text-lg font-bold text-gray-900">Teaching Tip</h3>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{plan.teachingTip}</p>
            </div>
          )}
        </div>

        {/* AI Topics Roadmap */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">AI Curriculum Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {aiTopics.map((topic, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900">{topic.title}</h4>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">
                  Grade {topic.gradeRange}
                </span>
              </div>
              <ul className="space-y-1">
                {topic.modules.map((mod, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                    {mod}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center pb-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            Download Plan
          </button>
          <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition">
            Share with Students
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition">
            Get AI Tips
          </button>
        </div>
      </div>
    </div>
  )
}

