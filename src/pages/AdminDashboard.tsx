import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockTeachers, aiTopics } from '../lib/mock-data'
import { LANGUAGES, triggerTranslate, initializeGoogleTranslate } from '../lib/translate'

interface AdminDashboardProps {
  user: { email: string; role: string }
  onLogout: () => void
}

type AdminSection = 'dashboard' | 'teachers' | 'curriculum' | 'library' | 'insights' | 'settings'

const WA = {
  bg:'#111B21', panel:'#202C33', border:'#2A3942',
  green:'#00A884', greenDark:'#005C4B',
  text:'#E9EDEF', muted:'#8696A0', active:'#2A3942',
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard')
  const navigate = useNavigate()

  useEffect(() => {
    initializeGoogleTranslate()
  }, [])

  const sidebarItems = [
    { id: 'dashboard',  label: 'Dashboard',        icon: '📊' },
    { id: 'teachers',   label: 'Manage Teachers',  icon: '👨‍🏫' },
    { id: 'curriculum', label: 'Upload Curriculum',icon: '📁' },
    { id: 'library',    label: 'Curriculum Library',icon: '🤖' },
    { id: 'insights',   label: 'Insights',         icon: '📈' },
    { id: 'settings',   label: 'Settings',         icon: '⚙️' },
  ]

  const currentLabel = sidebarItems.find(i => i.id === activeSection)?.label ?? ''

  return (
    <div className="min-h-screen flex" style={{ background: WA.bg }}>
      <div className="w-64 flex flex-col flex-shrink-0"
        style={{ background: WA.panel, borderRight: `1px solid ${WA.border}` }}>

        <div className="p-5" style={{ borderBottom: `1px solid ${WA.border}` }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ background: WA.greenDark, color: WA.green }}>DS</div>
            <div>
              <h2 className="font-bold text-base" style={{ color: WA.text }}>Admin Portal</h2>
              <p className="text-xs" style={{ color: WA.muted }}>Digital Sarthi</p>
            </div>
          </div>
        </div>

        {/* Language switcher */}
        <div className="px-4 py-3" style={{ borderBottom: `1px solid ${WA.border}` }}>
          <p className="text-xs mb-2" style={{ color: WA.muted }}>🌐 Language</p>
          <div className="flex flex-wrap gap-1">
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => triggerTranslate(l.code)}
                className="text-xs px-2 py-0.5 rounded-full transition-all"
                style={{ background: WA.border, color: WA.muted }}
                onMouseEnter={e => { e.currentTarget.style.background = WA.green; e.currentTarget.style.color = WA.bg }}
                onMouseLeave={e => { e.currentTarget.style.background = WA.border; e.currentTarget.style.color = WA.muted }}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {sidebarItems.map(item => (
            <button key={item.id} onClick={() => setActiveSection(item.id as AdminSection)}
              className="w-full flex items-center gap-3 px-5 py-3 transition-all text-left"
              style={{
                background: activeSection === item.id ? WA.active : 'transparent',
                color:      activeSection === item.id ? WA.text   : WA.muted,
                borderLeft: activeSection === item.id ? `3px solid ${WA.green}` : '3px solid transparent',
              }}>
              <span className="text-xl w-6">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4" style={{ borderTop: `1px solid ${WA.border}` }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: WA.greenDark, color: WA.green }}>
              {user.email[0].toUpperCase()}
            </div>
            <span className="text-xs truncate" style={{ color: WA.muted }}>{user.email}</span>
          </div>
          <button onClick={() => { onLogout(); navigate('/'); }} className="w-full text-xs py-2 rounded-lg"
            style={{ background: WA.active, color: WA.muted }}>← Back to Home</button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-6 py-4"
          style={{ background: WA.panel, borderBottom: `1px solid ${WA.border}` }}>
          <div>
            <h1 className="font-semibold text-base" style={{ color: WA.text }}>{currentLabel}</h1>
            <p className="text-xs mt-0.5" style={{ color: WA.muted }}>AI Subject · Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ background: WA.greenDark, color: WA.green }}>
            {user.email[0].toUpperCase()}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6" style={{ background: WA.bg }}>
          {activeSection === 'dashboard'  && <DashboardSection />}
          {activeSection === 'teachers'   && <TeachersSection />}
          {activeSection === 'curriculum' && <CurriculumSection />}
          {activeSection === 'library'    && <LibrarySection />}
          {activeSection === 'insights'   && <InsightsSection />}
          {activeSection === 'settings'   && <SettingsSection />}
        </div>
      </div>
    </div>
  )
}

function DashboardSection() {
  const stats = [
    {label:'AI Teachers',value:'12',icon:'👨‍🏫'},
    {label:'Curriculum Modules',value:'16',icon:'🤖'},
    {label:'Active Topics',value:'4',icon:'🧠'},
    {label:'Lessons Generated',value:'45',icon:'📋'},
  ]
  return (
    <div className="max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{color:'#8696A0'}}>Overview</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s,i)=>(
          <div key={i} className="rounded-xl p-4 flex flex-col gap-2" style={{background:'#202C33',border:'1px solid #2A3942'}}>
            <span className="text-2xl">{s.icon}</span>
            <span className="text-2xl font-bold" style={{color:'#00A884'}}>{s.value}</span>
            <span className="text-xs" style={{color:'#8696A0'}}>{s.label}</span>
          </div>
        ))}
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{color:'#8696A0'}}>AI Curriculum Topics</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiTopics.map(topic=>(
          <div key={topic.id} className="rounded-xl p-5" style={{background:'#202C33',border:'1px solid #2A3942'}}>
            <div className="flex justify-between mb-3">
              <span className="font-semibold text-sm" style={{color:'#E9EDEF'}}>{topic.title}</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{background:'#005C4B',color:'#00A884'}}>Grade {topic.gradeRange}</span>
            </div>
            <ul className="space-y-1">
              {topic.modules.map((mod:string,i:number)=>(
                <li key={i} className="text-xs flex items-center gap-2" style={{color:'#8696A0'}}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:'#00A884'}}/>{mod}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function TeachersSection() {
  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{color:'#8696A0'}}>All Teachers</p>
        <button className="text-xs px-4 py-2 rounded-lg font-semibold" style={{background:'#005C4B',color:'#00A884'}}>+ Add Teacher</button>
      </div>
      <div className="rounded-xl overflow-hidden" style={{border:'1px solid #2A3942'}}>
        <div className="grid grid-cols-5 px-5 py-3 text-xs font-semibold uppercase" style={{background:'#2A3942',color:'#8696A0'}}>
          <span>Name</span><span>Subject</span><span>Grade</span><span>Status</span><span>Actions</span>
        </div>
        {mockTeachers.map((t,i)=>(
          <div key={t.id} className="grid grid-cols-5 px-5 py-4 items-center text-sm"
            style={{background:i%2===0?'#202C33':'#1A2730',borderTop:'1px solid #2A3942',color:'#E9EDEF'}}>
            <span className="font-medium">{t.name}</span>
            <span><span className="text-xs px-2 py-0.5 rounded-full" style={{background:'#005C4B',color:'#00A884'}}>🤖 {t.subject}</span></span>
            <span style={{color:'#8696A0'}}>{t.gradeLevel}</span>
            <span><span className="text-xs px-2 py-0.5 rounded-full"
              style={t.status==='active'?{background:'#005C4B',color:'#00A884'}:{background:'#2A3942',color:'#8696A0'}}>
              {t.status==='active'?'● Active':'○ Inactive'}</span></span>
            <div className="flex gap-3">
              <button className="text-xs" style={{color:'#53BDEB'}}>View</button>
              <button className="text-xs" style={{color:'#EF4444'}}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CurriculumSection() {
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [gradeLevel, setGradeLevel] = useState('')
  const [subject, setSubject] = useState('')
  const [title, setTitle] = useState('')

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
      setTitle(file.name.replace('.pdf', ''))
    } else {
      alert('Please select a PDF file')
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !gradeLevel || !subject) {
      alert('Please fill all fields and select a PDF file')
      return
    }

    setUploading(true)
    setUploadStatus('')

    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('pdf', selectedFile)
      formData.append('gradeLevel', gradeLevel)
      formData.append('subject', subject)
      formData.append('title', title)

      const response = await fetch('http://localhost:3001/api/curriculum/upload-pdf', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setUploadStatus('✅ PDF uploaded and processed successfully!')
        setSelectedFile(null)
        setGradeLevel('')
        setSubject('')
        setTitle('')
        // Reset file input
        const fileInput = document.getElementById('pdf-upload') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } else {
        const error = await response.json()
        setUploadStatus(`❌ Upload failed: ${error.error}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('❌ Network error. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{color:'#8696A0'}}>Upload Curriculum PDF</p>
      <div className="rounded-xl p-8" style={{background:'#202C33',border:'1px solid #2A3942'}}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{color:'#E9EDEF'}}>Grade Level</label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border"
              style={{background:'#111B21',border:'1px solid #2A3942',color:'#E9EDEF'}}
            >
              <option value="">Select Grade</option>
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{color:'#E9EDEF'}}>Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border"
              style={{background:'#111B21',border:'1px solid #2A3942',color:'#E9EDEF'}}
            >
              <option value="">Select Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Social Studies">Social Studies</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{color:'#E9EDEF'}}>Title (Optional)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Auto-generated from filename"
              className="w-full px-3 py-2 rounded-lg border"
              style={{background:'#111B21',border:'1px solid #2A3942',color:'#E9EDEF'}}
            />
          </div>

          <div className="rounded-xl p-6 text-center border-2 border-dashed" style={{borderColor:'#2A3942'}}>
            <input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="text-4xl mb-3">📄</div>
            <h3 className="font-semibold mb-1" style={{color:'#E9EDEF'}}>
              {selectedFile ? selectedFile.name : 'Select PDF File'}
            </h3>
            <p className="text-sm mb-4" style={{color:'#8696A0'}}>
              {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB` : 'PDF files up to 10MB'}
            </p>
            <label
              htmlFor="pdf-upload"
              className="text-sm px-5 py-2 rounded-lg font-semibold cursor-pointer inline-block"
              style={{background:'#005C4B',color:'#00A884'}}
            >
              Choose PDF
            </label>
          </div>

          {uploadStatus && (
            <div className="text-sm p-3 rounded-lg" style={{
              background: uploadStatus.startsWith('✅') ? '#005C4B' : '#7F1D1D',
              color: '#E9EDEF'
            }}>
              {uploadStatus}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading || !selectedFile || !gradeLevel || !subject}
            className="w-full text-sm px-5 py-3 rounded-lg font-semibold disabled:opacity-50"
            style={{background:'#00A884',color:'#111B21'}}
          >
            {uploading ? '🔄 Processing PDF...' : '📤 Upload & Process PDF'}
          </button>
        </div>
      </div>
    </div>
  )
}

function LibrarySection() {
  const files = [
    {title:'Grade 6 — Foundations of AI',date:'2024-02-15',size:'2.4 MB',tag:'Foundations'},
    {title:'Grade 7 — Machine Learning',date:'2024-02-10',size:'3.1 MB',tag:'ML'},
    {title:'Grade 8 — Neural Networks',date:'2024-02-05',size:'2.8 MB',tag:'Deep Learning'},
    {title:'Grade 9 — AI Ethics',date:'2024-01-28',size:'1.9 MB',tag:'Ethics'},
  ]
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{color:'#8696A0'}}>Curriculum Library</p>
      <div className="space-y-3">
        {files.map((f,i)=>(
          <div key={i} className="flex items-center gap-4 px-5 py-4 rounded-xl"
            style={{background:'#202C33',border:'1px solid #2A3942'}}>
            <span className="text-2xl">🤖</span>
            <div className="flex-1">
              <p className="font-medium text-sm" style={{color:'#E9EDEF'}}>{f.title}</p>
              <p className="text-xs mt-0.5" style={{color:'#8696A0'}}>{f.date} · {f.size} · <span style={{color:'#00A884'}}>{f.tag}</span></p>
            </div>
            <button className="text-xs font-medium" style={{color:'#00A884'}}>Download</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function InsightsSection() {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{color:'#8696A0'}}>Platform Insights</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl p-5" style={{background:'#202C33',border:'1px solid #2A3942'}}>
          <h3 className="text-sm font-semibold mb-4" style={{color:'#E9EDEF'}}>Topic Focus</h3>
          {[['Foundations of AI',40],['Machine Learning',30],['Neural Networks',15],['AI Ethics',15]].map(([l,p])=>(
            <div key={l as string} className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-xs" style={{color:'#8696A0'}}>{l}</span>
                <span className="text-xs" style={{color:'#00A884'}}>{p}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{background:'#2A3942'}}>
                <div className="h-1.5 rounded-full" style={{width:`${p}%`,background:'#00A884'}}/>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-5" style={{background:'#202C33',border:'1px solid #2A3942'}}>
          <h3 className="text-sm font-semibold mb-4" style={{color:'#E9EDEF'}}>Platform Usage</h3>
          {[['Active Teachers','10/12'],['Lessons Created','45'],['Course Plans','38'],['Daily Users','28']].map(([l,v])=>(
            <div key={l} className="flex justify-between py-2" style={{borderBottom:'1px solid #2A3942'}}>
              <span className="text-xs" style={{color:'#8696A0'}}>{l}</span>
              <span className="text-xs font-bold" style={{color:'#00A884'}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SettingsSection() {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{color:'#8696A0'}}>Settings</p>
      <div className="rounded-xl p-5 space-y-5" style={{background:'#202C33',border:'1px solid #2A3942'}}>
        <div className="pb-5" style={{borderBottom:'1px solid #2A3942'}}>
          <p className="text-sm font-semibold mb-1" style={{color:'#E9EDEF'}}>Notifications</p>
          <label className="flex items-center gap-3 cursor-pointer mt-2">
            <input type="checkbox" defaultChecked className="w-4 h-4"/>
            <span className="text-sm" style={{color:'#8696A0'}}>Notify on new teacher signup</span>
          </label>
        </div>
        <div>
          <p className="text-sm font-semibold mb-2" style={{color:'#E9EDEF'}}>Platform Name</p>
          <input type="text" defaultValue="Digital Sarthi — AI Education"
            className="w-full px-4 py-2 text-sm rounded-lg"
            style={{background:'#2A3942',border:'1px solid #3D4F5C',color:'#E9EDEF'}}/>
        </div>
      </div>
    </div>
  )
}
