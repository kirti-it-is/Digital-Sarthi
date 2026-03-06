import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LANGUAGES, triggerTranslate, initializeGoogleTranslate, debugTranslate } from '../lib/translate'

export default function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    console.log('📄 LandingPage mounted, initializing Google Translate...')
    initializeGoogleTranslate()
    
    // Debug after 2 seconds
    setTimeout(() => {
      debugTranslate()
    }, 2000)
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold text-white text-sm">DS</div>
          <div>
            <h1 className="font-bold text-gray-900 text-base">Digital Sarthi</h1>
            <p className="text-xs text-gray-500">AI-Powered Teaching Platform</p>
          </div>
        </div>
        {/* Language buttons */}
        <div className="flex gap-1 flex-wrap justify-end">
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => triggerTranslate(l.code)}
              className="text-xs px-2.5 py-1 rounded-full border border-gray-200 text-gray-600 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all font-medium">
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            🤖 AI Subject Platform
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Digital Sarthi</h2>
          <p className="text-gray-500 text-sm">Choose your portal to continue</p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          {/* Admin card */}
          <button onClick={() => navigate('/login')}
            className="w-full text-left p-5 rounded-2xl border-2 border-gray-100 hover:border-green-400 hover:shadow-md transition-all group bg-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-3xl flex-shrink-0 group-hover:bg-green-100 transition-colors">🛡️</div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-base">Admin Portal</p>
                <p className="text-xs text-gray-500 mt-0.5">Manage teachers, upload curriculum & view insights</p>
              </div>
              <span className="text-green-500 text-xl">›</span>
            </div>
          </button>

          {/* Teacher card */}
          <button onClick={() => navigate('/login')}
            className="w-full text-left p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-400 hover:shadow-md transition-all group bg-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl flex-shrink-0 group-hover:bg-blue-100 transition-colors">👩‍🏫</div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-base">Teacher Portal</p>
                <p className="text-xs text-gray-500 mt-0.5">AI assistant, course plans, activities & quiz</p>
              </div>
              <span className="text-blue-500 text-xl">›</span>
            </div>
          </button>
        </div>
      </div>

      <div className="px-6 py-3 text-center border-t border-gray-100">
        <p className="text-xs text-gray-400">🔒 Digital Sarthi — AI Subject Platform v1.0</p>
      </div>
    </div>
  )
}