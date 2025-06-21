import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, X, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

export function FloatingVoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const speak = useCallback((text: string) => {
    if (!synthRef.current) {
      synthRef.current = window.speechSynthesis;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  }, []);

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Speech recognition is not supported in your browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      processQuery(result);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error('Voice recognition error. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, []);

  const processQuery = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    let response = '';

    if (lowerQuery.includes('scheme') || lowerQuery.includes('available')) {
      response = 'Based on a typical profile, you might be eligible for PM Scholarship Scheme for education, Startup India Initiative for business funding, and Digital India Program for skill development. Would you like specific details about any of these?';
    } else if (lowerQuery.includes('education')) {
      response = 'For education, I recommend the PM Scholarship Scheme which provides up to 50,000 rupees per year for higher education. The deadline is March 31st, 2024.';
    } else if (lowerQuery.includes('startup') || lowerQuery.includes('business')) {
      response = 'The Startup India Initiative offers funding up to 20 lakh rupees for innovative startups. It includes mentorship and network access. The application deadline is April 15th, 2024.';
    } else if (lowerQuery.includes('complaint')) {
      response = 'You can file complaints through our complaint portal. We support both manual form submission and voice-assisted complaint filing. Average resolution time is 3.2 days.';
    } else if (lowerQuery.includes('traffic')) {
      response = 'Our traffic updates section provides real-time information about road conditions, traffic jams, and city infrastructure. You can also report road issues like potholes.';
    } else {
      response = 'I can help you with government schemes, complaint filing, traffic updates, and the elderly skills program. What specific information are you looking for?';
    }

    setResponse(response);
    speak(response);
  }, [speak]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      speak('Hello! I\'m your voice assistant. How can I help you with government services today?');
    } else {
      stopSpeaking();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <Button
          onClick={toggleOpen}
          size="lg"
          className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <motion.div
            animate={isListening ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Mic className="w-6 h-6" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Voice Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 15 }}
            className="fixed bottom-24 right-6 z-50 w-80"
          >
            <Card className="shadow-2xl border-2">
              <CardContent className="p-4 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold">Voice Assistant</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={toggleOpen}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Controls */}
                <div className="flex gap-2">
                  <Button
                    onClick={startListening}
                    disabled={isListening || isSpeaking}
                    variant={isListening ? "destructive" : "default"}
                    className="flex-1"
                  >
                    {isListening ? (
                      <>
                        <MicOff className="w-4 h-4 mr-2" />
                        Listening...
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-2" />
                        Ask Question
                      </>
                    )}
                  </Button>

                  {isSpeaking && (
                    <Button onClick={stopSpeaking} variant="outline">
                      <VolumeX className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Voice Animation */}
                {isListening && (
                  <motion.div className="flex justify-center items-center h-16">
                    <div className="flex items-center gap-1">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-blue-500 rounded-full"
                          animate={{
                            height: [8, 24, 16, 32, 12, 8, 28, 20],
                            opacity: [0.7, 1, 0.8, 1, 0.9, 0.7, 1, 0.8],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Transcript */}
                {transcript && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg"
                  >
                    <p className="text-sm">
                      <strong>You:</strong> {transcript}
                    </p>
                  </motion.div>
                )}

                {/* Response */}
                {response && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                  >
                    <p className="text-sm">
                      <strong>Assistant:</strong> {response}
                    </p>
                    {isSpeaking && (
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Volume2 className="w-3 h-3" />
                        Speaking...
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Quick Actions */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">Try asking:</p>
                  <div className="flex flex-wrap gap-1">
                    {[
                      'What schemes are available?',
                      'How to file complaint?',
                      'Traffic updates',
                    ].map((question) => (
                      <Button
                        key={question}
                        variant="outline"
                        size="sm"
                        className="text-xs h-6"
                        onClick={() => processQuery(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}