import { useState, useEffect, useRef } from 'react'
import { Message } from '../lib/types'

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content:
        "Good morning! Based on your syllabus and AI knowledge check results, today looks like a great time to start 'Introduction to Artificial Intelligence' with your class. I can help you with lesson openers, hands-on activities, student discussion prompts, or ethics scenarios. What would you like to explore?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'teacher',
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3001/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mode: 'LESSON_SUPPORT',
          message: text,
          context: {
            gradeLevel: '9-10',
            subject: 'Artificial Intelligence'
          }
        })
      })

      if (response.ok) {
        const data = await response.json()
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: data.response || 'I received your message but couldn\'t generate a response.',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: 'Sorry, I\'m having trouble connecting to the AI service right now. Please try again.',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
      }
    } catch (error) {
      console.error('AI Chat error:', error)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: 'Network error. Please check your connection and try again.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const quickPrompts = [
    { label: 'Suggest an AI activity', prompt: 'suggest an activity for teaching AI' },
    { label: 'AI ethics discussion', prompt: 'ethics discussion ideas for AI class' },
    { label: 'Teach neural networks', prompt: 'how to teach neural networks' },
    { label: 'Assessment ideas', prompt: 'assessment ideas for AI' },
    { label: 'AI bias lesson', prompt: 'lesson on AI bias' },    { label: 'Differentiation strategies', prompt: 'differentiation strategies for ai' },
    { label: 'Lesson design tips', prompt: 'lesson design tips for teaching' },  ]

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-white">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-xl">🤖</div>
          <div>
            <h2 className="text-lg font-bold">AI Teaching Assistant</h2>
            <p className="text-blue-100 text-xs">Specialised in Artificial Intelligence education</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-xs text-blue-100">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'teacher' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'ai' && (
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-1">
                🤖
              </div>
            )}
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl ${
                message.sender === 'teacher'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p
                className={`text-xs mt-1.5 ${
                  message.sender === 'teacher' ? 'text-blue-100' : 'text-gray-400'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0">
              🤖
            </div>
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-none">
              <div className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-6 pt-4 pb-5">
        {/* Quick prompts */}
        <div className="mb-3 flex gap-2 flex-wrap">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(p.prompt)}
              className="text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-700 px-3 py-1.5 rounded-full transition font-medium"
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask for AI lesson ideas, activities, ethics prompts..."
            className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim()}
            className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-full transition"
            title="Send message"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  )
}

