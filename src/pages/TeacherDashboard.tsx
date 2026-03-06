import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TeacherQuiz from './TeacherQuiz'
import AIChat from './AIChat'
import CoursePlan from './CoursePlan'
import { LANGUAGES, triggerTranslate, initializeGoogleTranslate } from '../lib/translate'

interface TeacherDashboardProps {
  user: { email: string; role: string }
  onLogout: () => void
}

type TeacherSection = 'dashboard' | 'chat' | 'quiz' | 'courseplan' | 'activities' | 'csv-analysis' | 'insights' | 'settings'

const WA = {
  bg:'#111B21', panel:'#202C33', border:'#2A3942',
  green:'#00A884', greenDark:'#005C4B',
  blue:'#53BDEB', blueDark:'#1C3747',
  text:'#E9EDEF', muted:'#8696A0', active:'#2A3942',
}

export default function TeacherDashboard({ user, onLogout }: TeacherDashboardProps) {
  const [activeSection, setActiveSection] = useState<TeacherSection>('dashboard')
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [gradeLevel, setGradeLevel]       = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    initializeGoogleTranslate()
  }, [])

  const handleQuizComplete = (level: string) => {
    setGradeLevel(level)
    setQuizCompleted(true)
    setActiveSection('chat')
  }

  const sidebarItems = [
    { id: 'dashboard',  label: 'Home',         icon: '🏠' },
    { id: 'chat',       label: 'AI Assistant', icon: '🤖' },
    { id: 'courseplan', label: 'Course Plan',  icon: '📚' },
    { id: 'activities', label: 'Activities',   icon: '🎯' },
    { id: 'csv-analysis', label: 'Student Analysis', icon: '📊' },
    { id: 'quiz',       label: 'Setup Quiz',   icon: '📝' },
    { id: 'insights',   label: 'Insights',     icon: '📈' },
    { id: 'settings',   label: 'Settings',     icon: '⚙️' },
  ]

  const currentLabel = sidebarItems.find(i => i.id === activeSection)?.label ?? ''

  return (
    <div className="min-h-screen flex" style={{ background: WA.bg }}>

      {/* SIDEBAR */}
      <div className="w-64 flex flex-col flex-shrink-0"
        style={{ background: WA.panel, borderRight: `1px solid ${WA.border}` }}>

        {/* Logo */}
        <div className="p-5" style={{ borderBottom: `1px solid ${WA.border}` }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ background: WA.blueDark, color: WA.blue }}>DS</div>
            <div>
              <h2 className="font-bold text-base" style={{ color: WA.text }}>Teacher Portal</h2>
              <p className="text-xs" style={{ color: WA.muted }}>Digital Sarthi</p>
            </div>
          </div>
          {gradeLevel && (
            <div className="mt-3 text-xs px-2 py-1 rounded-full inline-flex items-center gap-1"
              style={{ background: WA.blueDark, color: WA.blue }}>🎓 {gradeLevel}</div>
          )}
        </div>

        {/* Language switcher */}
        <div className="px-4 py-3" style={{ borderBottom: `1px solid ${WA.border}` }}>
          <p className="text-xs mb-2" style={{ color: WA.muted }}>🌐 Language</p>
          <div className="flex flex-wrap gap-1">
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => triggerTranslate(l.code)}
                className="text-xs px-2 py-0.5 rounded-full transition-all"
                style={{ background: WA.border, color: WA.muted }}
                onMouseEnter={e => { e.currentTarget.style.background = WA.blue; e.currentTarget.style.color = WA.bg }}
                onMouseLeave={e => { e.currentTarget.style.background = WA.border; e.currentTarget.style.color = WA.muted }}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {sidebarItems.map(item => (
            <button key={item.id} onClick={() => setActiveSection(item.id as TeacherSection)}
              className="w-full flex items-center gap-3 px-5 py-3 transition-all text-left"
              style={{
                background: activeSection === item.id ? WA.active : 'transparent',
                color:      activeSection === item.id ? WA.text   : WA.muted,
                borderLeft: activeSection === item.id ? `3px solid ${WA.blue}` : '3px solid transparent',
              }}>
              <span className="text-xl w-6">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Back button */}
        <div className="p-4" style={{ borderTop: `1px solid ${WA.border}` }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: WA.blueDark, color: WA.blue }}>
              {user.email[0].toUpperCase()}
            </div>
            <span className="text-xs truncate" style={{ color: WA.muted }}>{user.email}</span>
          </div>
          <button onClick={() => { onLogout(); navigate('/'); }} className="w-full text-xs py-2 rounded-lg"
            style={{ background: WA.active, color: WA.muted }}>← Back to Home</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ background: WA.panel, borderBottom: `1px solid ${WA.border}` }}>
          <div>
            <h1 className="font-semibold text-base" style={{ color: WA.text }}>{currentLabel}</h1>
            <p className="text-xs mt-0.5" style={{ color: WA.muted }}>
              AI Subject · {gradeLevel || 'Complete the quiz to set your grade'}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ background: WA.blueDark, color: WA.blue }}>
            {user.email[0].toUpperCase()}
          </div>
        </div>

        <div className="flex-1 overflow-auto" style={{ background: WA.bg }}>
          {activeSection === 'dashboard'  && <HomeSection gradeLevel={gradeLevel} setActiveSection={setActiveSection} quizCompleted={quizCompleted} />}
          {activeSection === 'chat'       && <DarkAIChat />}
          {activeSection === 'courseplan' && <DarkCoursePlan />}
          {activeSection === 'activities' && <ActivitiesSection gradeLevel={gradeLevel} />}
          {activeSection === 'csv-analysis' && <CsvAnalysisSection />}
          {activeSection === 'quiz'       && <TeacherQuiz onQuizComplete={handleQuizComplete} />}
          {activeSection === 'insights'   && <InsightsSection />}
          {activeSection === 'settings'   && <SettingsSection />}
        </div>
      </div>
    </div>
  )
}

function HomeSection({ gradeLevel, setActiveSection, quizCompleted }: {
  gradeLevel: string; setActiveSection: (s: TeacherSection) => void; quizCompleted: boolean
}) {
  const cards = [
    { id: 'chat',       icon: '🤖', label: 'AI Assistant',  desc: 'Chat with your AI to plan lessons' },
    { id: 'courseplan', icon: '📚', label: 'Course Plan',   desc: 'View your AI-generated plan' },
    { id: 'activities', icon: '🎯', label: 'AI Activities', desc: 'Classroom activities & games' },
    { id: 'quiz',       icon: '📝', label: 'Setup Quiz',    desc: 'Tell us your grade level' },
    { id: 'insights',   icon: '📊', label: 'Insights',      desc: 'Your teaching stats' },
  ]
  return (
    <div className="p-6 max-w-2xl">
      {!quizCompleted && (
        <div className="mb-5 px-5 py-4 rounded-xl flex items-start gap-3"
          style={{ background: '#1C3747', border: '1px solid #53BDEB' }}>
          <span className="text-xl">👋</span>
          <p className="text-sm" style={{ color: '#8696A0' }}>
            Welcome! Complete the{' '}
            <button onClick={() => setActiveSection('quiz')} className="underline" style={{ color: '#53BDEB' }}>
              Setup Quiz
            </button>{' '}
            to personalise your experience.
          </p>
        </div>
      )}
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8696A0' }}>Your Sections</p>
      <div className="space-y-3">
        {cards.map(card => (
          <button key={card.id} onClick={() => setActiveSection(card.id as TeacherSection)}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all"
            style={{ background: '#202C33', border: '1px solid #2A3942' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#53BDEB')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A3942')}>
            <span className="text-2xl w-10 text-center">{card.icon}</span>
            <div>
              <p className="font-semibold text-sm" style={{ color: '#E9EDEF' }}>{card.label}</p>
              <p className="text-xs mt-0.5" style={{ color: '#8696A0' }}>{card.desc}</p>
            </div>
            <span className="ml-auto text-lg" style={{ color: '#8696A0' }}>›</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function DarkAIChat() {
  return (
    <div style={{ background: '#111B21', minHeight: '100%' }}>
      <style>{`
        .dc .bg-white { background: #202C33 !important; }
        .dc .bg-gray-50 { background: #111B21 !important; }
        .dc .bg-gray-100 { background: #2A3942 !important; }
        .dc .text-gray-900 { color: #E9EDEF !important; }
        .dc .text-gray-700 { color: #E9EDEF !important; }
        .dc .text-gray-600 { color: #8696A0 !important; }
        .dc .text-gray-500 { color: #8696A0 !important; }
        .dc .text-gray-400 { color: #8696A0 !important; }
        .dc .border-gray-200 { border-color: #2A3942 !important; }
        .dc .border-gray-300 { border-color: #2A3942 !important; }
        .dc input { background: #2A3942 !important; color: #E9EDEF !important; border-color: #3D4F5C !important; }
        .dc input::placeholder { color: #8696A0 !important; }
        .dc .bg-indigo-100 { background: #1C3747 !important; }
        .dc .bg-gradient-to-r { background: #005C4B !important; }
      `}</style>
      <div className="dc"><AIChat /></div>
    </div>
  )
}

function DarkCoursePlan() {
  return (
    <div style={{ background: '#111B21', minHeight: '100%' }}>
      <style>{`
        .dp .bg-white { background: #202C33 !important; }
        .dp .bg-gray-50 { background: #111B21 !important; }
        .dp .text-gray-900 { color: #E9EDEF !important; }
        .dp .text-gray-700 { color: #8696A0 !important; }
        .dp .text-gray-600 { color: #8696A0 !important; }
        .dp .text-gray-500 { color: #8696A0 !important; }
        .dp .border-gray-100 { border-color: #2A3942 !important; }
        .dp .from-blue-50   { --tw-gradient-from: #1C3747 !important; }
        .dp .to-blue-100    { --tw-gradient-to: #1a3040 !important; }
        .dp .from-green-50  { --tw-gradient-from: #0d2b1f !important; }
        .dp .to-green-100   { --tw-gradient-to: #0a2019 !important; }
        .dp .from-purple-50 { --tw-gradient-from: #1e1535 !important; }
        .dp .to-purple-100  { --tw-gradient-to: #180f2b !important; }
        .dp .from-orange-50 { --tw-gradient-from: #2b1a0d !important; }
        .dp .to-orange-100  { --tw-gradient-to: #231508 !important; }
      `}</style>
      <div className="dp"><CoursePlan /></div>
    </div>
  )
}

function ActivitiesSection({ gradeLevel }: { gradeLevel: string }) {
  const activities = [
    { title: 'Human Algorithm Game', description: 'Students follow rule cards to sort objects — simulating rule-based AI decisions.', duration: '20 mins', difficulty: 'Easy',   icon: '🎮' },
    { title: 'Train Your Classifier', description: 'Students write rules to classify cat vs dog images, experiencing supervised ML.', duration: '30 mins', difficulty: 'Medium', icon: '🐾' },
    { title: 'AI Bias Audit',         description: 'Students audit a real AI tool for bias and propose fairer alternatives.', duration: '35 mins', difficulty: 'Medium', icon: '⚖️' },
    { title: 'Perceptron Whiteboard', description: "Students adjust 'weights' to solve AND/OR logic gates intuitively.", duration: '25 mins', difficulty: 'Hard',   icon: '🧠' },
    { title: 'AI Ethics Debate',      description: '"Should AI grade your exams?" Students argue for and against.', duration: '30 mins', difficulty: 'Medium', icon: '🗣️' },
    { title: 'Real-World AI Map',     description: 'Students map 10 AI tools they use daily and what data each collects.', duration: '20 mins', difficulty: 'Easy',   icon: '🗺️' },
  ]
  const diffColor: Record<string,string> = { Easy:'#00A884', Medium:'#F59E0B', Hard:'#EF4444' }
  return (
    <div className="p-6">
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color:'#8696A0' }}>
        Activities · {gradeLevel || 'All Grades'}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map((a,i) => (
          <div key={i} className="rounded-xl p-5" style={{ background:'#202C33', border:'1px solid #2A3942' }}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{a.icon}</span>
                <span className="font-semibold text-sm" style={{ color:'#E9EDEF' }}>{a.title}</span>
              </div>
              <span className="text-xs font-semibold" style={{ color: diffColor[a.difficulty] }}>{a.difficulty}</span>
            </div>
            <p className="text-xs mb-3" style={{ color:'#8696A0' }}>{a.description}</p>
            <div className="flex justify-between pt-3" style={{ borderTop:'1px solid #2A3942' }}>
              <span className="text-xs" style={{ color:'#8696A0' }}>⏱ {a.duration}</span>
              <button className="text-xs font-medium" style={{ color:'#00A884' }}>View →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CsvAnalysisSection() {
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [className, setClassName] = useState('')
  const [topic, setTopic] = useState('')
  const [analysisStatus, setAnalysisStatus] = useState('')

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      setSelectedFile(file)
    } else {
      alert('Please select a CSV file')
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile || !className || !topic) {
      alert('Please fill all fields and select a CSV file')
      return
    }

    setAnalyzing(true)
    setAnalysisStatus('')
    setAnalysisResult(null)

    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('csv', selectedFile)
      formData.append('className', className)
      formData.append('topic', topic)

      const response = await fetch('http://localhost:3001/api/ai/analyze-csv', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setAnalysisResult(data.analysis)
        setAnalysisStatus(`✅ Analysis completed for ${data.studentCount} students!`)
      } else {
        const error = await response.json()
        setAnalysisStatus(`❌ Analysis failed: ${error.error}`)
      }
    } catch (error) {
      console.error('Analysis error:', error)
      setAnalysisStatus('❌ Network error. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color:'#8696A0' }}>
        Student Performance Analysis
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="rounded-xl p-6" style={{ background:'#202C33', border:'1px solid #2A3942' }}>
          <h3 className="font-semibold mb-4" style={{ color:'#E9EDEF' }}>Upload Student Marks CSV</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color:'#E9EDEF' }}>Class Name</label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="e.g., Class 9A"
                className="w-full px-3 py-2 rounded-lg border"
                style={{ background:'#111B21', border:'1px solid #2A3942', color:'#E9EDEF' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color:'#E9EDEF' }}>Topic/Test Name</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Algebra Quiz"
                className="w-full px-3 py-2 rounded-lg border"
                style={{ background:'#111B21', border:'1px solid #2A3942', color:'#E9EDEF' }}
              />
            </div>

            <div className="rounded-xl p-4 text-center border-2 border-dashed" style={{ borderColor:'#2A3942' }}>
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-semibold mb-1" style={{ color:'#E9EDEF' }}>
                {selectedFile ? selectedFile.name : 'Select CSV File'}
              </h4>
              <p className="text-xs mb-3" style={{ color:'#8696A0' }}>
                CSV with columns: name/score or student_name/marks
              </p>
              <label
                htmlFor="csv-upload"
                className="text-sm px-4 py-2 rounded-lg font-semibold cursor-pointer inline-block"
                style={{ background:'#005C4B', color:'#00A884' }}
              >
                Choose CSV
              </label>
            </div>

            {analysisStatus && (
              <div className="text-sm p-3 rounded-lg" style={{
                background: analysisStatus.startsWith('✅') ? '#005C4B' : '#7F1D1D',
                color: '#E9EDEF'
              }}>
                {analysisStatus}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={analyzing || !selectedFile || !className || !topic}
              className="w-full text-sm px-5 py-3 rounded-lg font-semibold disabled:opacity-50"
              style={{ background:'#00A884', color:'#111B21' }}
            >
              {analyzing ? '🔄 Analyzing Student Data...' : '📈 Analyze Performance'}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="rounded-xl p-6" style={{ background:'#202C33', border:'1px solid #2A3942' }}>
          <h3 className="font-semibold mb-4" style={{ color:'#E9EDEF' }}>Analysis Results</h3>

          {analysisResult ? (
            <div className="space-y-4">
              <div className="text-sm" style={{ color:'#E9EDEF', whiteSpace: 'pre-line' }}>
                {analysisResult.raw}
              </div>
              
              {analysisResult.stats && (
                <div className="mt-4 p-3 rounded-lg" style={{ background:'#111B21' }}>
                  <h4 className="font-medium mb-2" style={{ color:'#00A884' }}>Statistics</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div style={{ color:'#8696A0' }}>Total Students: <span style={{ color:'#E9EDEF' }}>{analysisResult.stats.total}</span></div>
                    <div style={{ color:'#8696A0' }}>Average: <span style={{ color:'#E9EDEF' }}>{analysisResult.stats.average}%</span></div>
                    <div style={{ color:'#8696A0' }}>Highest: <span style={{ color:'#E9EDEF' }}>{analysisResult.stats.highest}%</span></div>
                    <div style={{ color:'#8696A0' }}>Lowest: <span style={{ color:'#E9EDEF' }}>{analysisResult.stats.lowest}%</span></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-sm" style={{ color:'#8696A0' }}>
                Upload a CSV file and click analyze to see AI-powered insights on student performance
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InsightsSection() {
  return (
    <div className="p-6 max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color:'#8696A0' }}>Insights</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl p-5" style={{ background:'#202C33', border:'1px solid #2A3942' }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color:'#E9EDEF' }}>Lesson Activity</h3>
          {[['AI Lessons Created','12'],['Chat Interactions','45'],['Course Plans','8']].map(([l,v])=>(
            <div key={l} className="flex justify-between py-2" style={{ borderBottom:'1px solid #2A3942' }}>
              <span className="text-xs" style={{ color:'#8696A0' }}>{l}</span>
              <span className="text-xs font-bold" style={{ color:'#00A884' }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-5" style={{ background:'#202C33', border:'1px solid #2A3942' }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color:'#E9EDEF' }}>Most Used Features</h3>
          {[['Activity Suggestions',85],['Lesson Planning',70],['Ethics Prompts',60]].map(([l,p])=>(
            <div key={l as string} className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-xs" style={{ color:'#8696A0' }}>{l}</span>
                <span className="text-xs" style={{ color:'#00A884' }}>{p}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background:'#2A3942' }}>
                <div className="h-1.5 rounded-full" style={{ width:`${p}%`, background:'#00A884' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SettingsSection() {
  return (
    <div className="p-6 max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color:'#8696A0' }}>Settings</p>
      <div className="rounded-xl p-5 space-y-5" style={{ background:'#202C33', border:'1px solid #2A3942' }}>
        <div className="pb-5" style={{ borderBottom:'1px solid #2A3942' }}>
          <p className="text-sm font-semibold mb-2" style={{ color:'#E9EDEF' }}>Notifications</p>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm" style={{ color:'#8696A0' }}>Receive daily AI teaching suggestions</span>
          </label>
        </div>
        <div>
          <p className="text-sm font-semibold mb-2" style={{ color:'#E9EDEF' }}>Subject</p>
          <div className="text-xs px-3 py-2 rounded-lg" style={{ background:'#005C4B', color:'#00A884' }}>
            🤖 You are teaching <strong>Artificial Intelligence</strong>.
          </div>
        </div>
      </div>
    </div>
  )
}
