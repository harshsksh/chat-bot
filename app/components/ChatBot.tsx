'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, Trash2, Copy, Check, Moon, Sun, MessageSquare } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

type Theme = 'light' | 'dark' | 'gradient'

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>('gradient')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  
  // Initialize messages after component mounts to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
    setMessages([
      {
        id: '1',
        text: 'Hello! I\'m your AI assistant powered by Groq. ⚡ Ask me anything!',
        sender: 'bot',
        timestamp: new Date()
      }
    ])
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Copy message to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Clear all messages
  const clearMessages = () => {
    setMessages([
      {
        id: '1',
        text: 'Hello! I\'m your AI assistant powered by Groq. ⚡ Ask me anything!',
        sender: 'bot',
        timestamp: new Date()
      }
    ])
  }

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
    }
  }, [inputText])

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const messageToSend = inputText.trim()
    console.log('Sending message:', messageToSend)
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageToSend,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data.response) {
        throw new Error('No response from server')
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Get theme classes
  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 text-white'
      case 'gradient':
        return 'bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50'
      default:
        return 'bg-gray-50'
    }
  }

  const getHeaderClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-800 border-gray-700'
      case 'gradient':
        return 'bg-white/80 backdrop-blur-lg border-white/20 shadow-xl'
      default:
        return 'bg-white border-gray-200'
    }
  }

  const getInputClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
      case 'gradient':
        return 'bg-white/80 backdrop-blur-sm border-purple-200 focus:ring-purple-500'
      default:
        return 'bg-white border-gray-300'
    }
  }

  // Show loading state during hydration
  if (!isMounted) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <Sparkles className="w-6 h-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="mt-6 text-lg font-medium text-gray-700">Loading AI Chat...</p>
      </div>
    )
  }

  return (
    <div className={`flex flex-col h-screen ${getThemeClasses()} transition-colors duration-300`}>
      {/* Enhanced Header */}
      <div className={`${getHeaderClasses()} shadow-lg border-b p-4 transition-all duration-300`}>
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'}`}>
                AI Assistant
              </h1>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Powered by Groq ⚡
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Theme Switcher & Clear Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'gradient' : 'light')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              title="Change theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : theme === 'gradient' ? (
                <Sparkles className="w-5 h-5 text-purple-600" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={clearMessages}
              className={`p-2 rounded-lg transition-all duration-200 ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-red-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-red-600'
              }`}
              title="Clear chat"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-4xl mx-auto w-full">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`flex items-start space-x-3 max-w-[85%] md:max-w-[75%] ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200 ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                      : theme === 'dark'
                      ? 'bg-gradient-to-br from-gray-700 to-gray-600'
                      : 'bg-gradient-to-br from-purple-100 to-blue-100'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Sparkles className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                  )}
                </div>
              </div>
              
              {/* Message Bubble */}
              <div className="flex flex-col space-y-1 w-full">
                <div
                  className={`group relative px-4 py-3 rounded-2xl shadow-md ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-tr-md'
                      : theme === 'dark'
                      ? 'bg-gray-800 text-gray-100 border border-gray-700 rounded-tl-md'
                      : 'bg-white text-gray-900 border border-gray-200 rounded-tl-md'
                  } transition-all duration-200 hover:shadow-lg`}
                >
                  <div className="text-sm md:text-base leading-relaxed prose prose-sm max-w-none dark:prose-invert">
                    {message.sender === 'bot' ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-3 mb-2" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-base font-bold mt-2 mb-1" {...props} />,
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                          em: ({node, ...props}) => <em className="italic" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="ml-2" {...props} />,
                          code: ({node, inline, ...props}: any) => 
                            inline ? (
                              <code className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                                theme === 'dark' ? 'bg-gray-700 text-purple-300' : 'bg-gray-100 text-purple-600'
                              }`} {...props} />
                            ) : (
                              <code className={`block p-3 rounded-lg text-xs font-mono overflow-x-auto my-2 ${
                                theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
                              }`} {...props} />
                            ),
                          pre: ({node, ...props}) => <pre className="overflow-x-auto" {...props} />,
                          blockquote: ({node, ...props}) => (
                            <blockquote className={`border-l-4 pl-4 italic my-2 ${
                              theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                            }`} {...props} />
                          ),
                          a: ({node, ...props}) => (
                            <a className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                          ),
                          table: ({node, ...props}) => (
                            <div className="overflow-x-auto my-2">
                              <table className="min-w-full border-collapse" {...props} />
                            </div>
                          ),
                          th: ({node, ...props}) => (
                            <th className={`border px-3 py-2 font-bold ${
                              theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-100'
                            }`} {...props} />
                          ),
                          td: ({node, ...props}) => (
                            <td className={`border px-3 py-2 ${
                              theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                            }`} {...props} />
                          ),
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    ) : (
                      <p className="whitespace-pre-wrap break-words">{message.text}</p>
                    )}
                  </div>
                  
                  {/* Copy Button */}
                  <button
                    onClick={() => copyToClipboard(message.text, message.id)}
                    className={`absolute -top-2 -right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-600'
                    } shadow-md`}
                    title="Copy message"
                  >
                    {copiedId === message.id ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
                
                {/* Timestamp */}
                <div className={`flex items-center space-x-2 px-2 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Enhanced Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
              </div>
              <div className={`px-5 py-3 rounded-2xl rounded-tl-md shadow-md ${
                theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}>
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Section */}
      <div className={`border-t p-4 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : theme === 'gradient'
          ? 'bg-white/80 backdrop-blur-lg border-white/20'
          : 'bg-white border-gray-200'
      } transition-all duration-300 shadow-2xl`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            {/* Input */}
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Press Enter to send)"
                className={`w-full resize-none ${getInputClasses()} rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm max-h-32 min-h-[48px]`}
                rows={1}
                disabled={isLoading}
                style={{ 
                  scrollbarWidth: 'thin',
                  scrollbarColor: theme === 'dark' ? '#4B5563 #1F2937' : '#E5E7EB #F9FAFB'
                }}
              />
              {inputText.trim() && (
                <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                  {inputText.length}
                </div>
              )}
            </div>
            
            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className={`group relative px-5 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform ${
                !inputText.trim() || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white hover:shadow-lg hover:scale-105 active:scale-95'
              }`}
              title={!inputText.trim() ? 'Type a message to send' : 'Send message (Enter)'}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              )}
            </button>
          </div>
          
          {/* Message Counter */}
          <div className={`mt-2 text-xs flex items-center justify-between ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span className="flex items-center space-x-1">
              <MessageSquare className="w-3 h-3" />
              <span>{messages.length} message{messages.length !== 1 ? 's' : ''}</span>
            </span>
            <span className="text-xs">
              Shift + Enter for new line
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
