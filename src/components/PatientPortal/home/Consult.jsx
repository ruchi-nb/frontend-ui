// File: components/PatientPortal/home/Consult.jsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { doctors } from '@/data/doctors';

const Consult = ({ doctor, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [callStatus, setCallStatus] = useState('connecting');
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const callTimerRef = useRef(null);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInputMessage(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (callStatus === 'connecting') {
      const timer = setTimeout(() => {
        setCallStatus('connected');
        
        setMessages([{ user: 'System', text: `You are now connected with ${doctor.name}` }]);
        
        callTimerRef.current = setInterval(() => {
          setCallDuration(prev => prev + 1);
        }, 1000);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [callStatus, doctors.name]);

  const handleVoiceToggle = () => {
    if (!recognitionRef.current) {
      setIsListening(!isListening);
      if (!isListening) {
        setTimeout(() => {
          setMessages(prev => [...prev, { user: 'Patient', text: 'Hello doctor, I have some concerns...' }]);
          setIsListening(false);
        }, 2000);
      }
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, { user: 'Patient', text: inputMessage }]);
      setInputMessage('');
    }
  };

  const endCall = () => {
    setCallStatus('ended');
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
    }
    
    setMessages(prev => [...prev, { user: 'System', text: 'Call ended' }]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 text-gray-600 hover:text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left h-5 w-5">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Consultation with {doctors.name}</h1>
            <p className="text-sm text-gray-600">{doctors.specialty}</p>
          </div>
        </div>
        
        {callStatus === 'connected' && (
          <div className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm font-medium">
            <i className="fas fa-clock mr-1"></i>
            {formatTime(callDuration)}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 bg-gray-900 relative">
          {callStatus === 'connecting' && (
            <div className="h-full flex flex-col items-center justify-center text-white">
              <div className="animate-pulse mb-4">
                <i className="fas fa-video-slash text-4xl"></i>
              </div>
              <p className="text-xl">Connecting to {doctors.name}...</p>
              <div className="mt-2 flex space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          )}
          
          {callStatus === 'connected' && (
            <>
              <div className="h-full flex items-center justify-center">
                <img 
                  src={doctors.image} 
                  alt={doctors.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
                {doctors.name}
              </div>
            </>
          )}
          
          {callStatus === 'ended' && (
            <div className="h-full flex flex-col items-center justify-center text-white">
              <i className="fas fa-phone-slash text-4xl mb-4"></i>
              <p className="text-xl">Call ended</p>
              <p className="mt-2">Duration: {formatTime(callDuration)}</p>
              <button
                onClick={onBack}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                Return to Doctors
              </button>
            </div>
          )}
          
          {callStatus === 'connected' && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <button
                className={`p-3 rounded-full transition-colors ${isListening ? 'bg-red-600' : 'bg-gray-600'} hover:bg-opacity-80`}
                onClick={handleVoiceToggle}
              >
                <i className={`fas fa-microphone text-white ${isListening ? '' : 'text-white'}`}></i>
              </button>
              <button className="p-3 rounded-full bg-gray-600 hover:bg-gray-700">
                <i className="fas fa-video text-white"></i>
              </button>
              <button 
                className="p-3 rounded-full bg-red-600 hover:bg-red-700"
                onClick={endCall}
              >
                <i className="fas fa-phone text-white"></i>
              </button>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/3 border-l bg-white flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-medium">Chat</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-96">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg max-w-[80%] ${message.user === 'Patient' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'}`}
              >
                <strong>{message.user}: </strong>
                <span>{message.text}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {isListening && (
            <div className="bg-blue-100 p-2 text-center">
              <i className="fas fa-microphone animate-pulse text-blue-600 mr-2"></i>
              Listening...
            </div>
          )}

          {callStatus === 'connected' && (
            <div className="p-3 border-t flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Consult;