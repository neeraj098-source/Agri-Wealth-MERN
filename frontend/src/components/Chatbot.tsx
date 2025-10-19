import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Send, Bot, User, Loader2, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const mockResponses = [
  {
    keywords: ['crop', 'disease', 'pest'],
    response: "For crop disease management, I recommend regular field monitoring and using integrated pest management (IPM) practices. Consider crop rotation and resistant varieties. What specific crop are you dealing with?"
  },
  {
    keywords: ['fertilizer', 'nutrient', 'soil'],
    response: "Soil health is crucial for good yields. I suggest getting a soil test done first. Based on your crop type, organic fertilizers like compost or vermicompost are excellent choices. What's your current soil condition?"
  },
  {
    keywords: ['waste', 'sell', 'price'],
    response: "Agricultural waste like rice husks, wheat straw, and corn stalks are in high demand! Current market rates: Rice husks ₹3-5/kg, Wheat straw ₹2-4/kg. Check our marketplace to connect with buyers directly."
  },
  {
    keywords: ['weather', 'rain', 'season'],
    response: "Weather monitoring is essential for farming success. Use weather apps and plan your sowing accordingly. For monsoon crops, ensure proper drainage. Need specific weather advice for your region?"
  },
  {
    keywords: ['hello', 'hi', 'hey'],
    response: "Hello! I'm your AI farming assistant. I can help you with crop management, pest control, soil health, waste selling opportunities, and more. What would you like to know?"
  }
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI farming assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    for (const response of mockResponses) {
      if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return response.response;
      }
    }

    return "I understand you're asking about farming. I specialize in crop management, soil health, pest control, and helping you sell agricultural waste. Could you be more specific about what you need help with?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <section id="chatbot" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">AI Farming Assistant</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant answers to your farming questions, learn about best practices, and discover opportunities to monetize your agricultural waste.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {!isOpen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Bot className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-semibold mb-4">Start Chatting with Our AI Assistant</h3>
                <p className="text-muted-foreground mb-6">
                  Ask about crop diseases, soil management, pest control, weather advice, or how to sell your agricultural waste.
                </p>
                <a href="https://kisan-sahayak-ckv5.onrender.com" target="_blank" rel="noopener noreferrer">
  <Button
    size="lg"
    className="bg-green-600 hover:bg-green-700"
  >
    <MessageCircle className="mr-2 w-5 h-5" />
    Start Conversation
  </Button>
</a>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b bg-green-600 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">AI Farming Assistant</h3>
                        <p className="text-sm text-green-100">Online • Ready to help</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20"
                    >
                      ✕
                    </Button>
                  </div>
                </div>

                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                        >
                          <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${message.isBot ? 'bg-green-100' : 'bg-blue-100'}`}>
                              {message.isBot ? (
                                <Bot className="w-4 h-4 text-green-600" />
                              ) : (
                                <User className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                            <div className={`rounded-lg p-3 ${message.isBot ? 'bg-muted' : 'bg-green-600 text-white'}`}>
                              <p className="text-sm">{message.text}</p>
                              <p className={`text-xs mt-1 ${message.isBot ? 'text-muted-foreground' : 'text-green-100'}`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start space-x-2">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="bg-muted rounded-lg p-3">
                            <div className="flex items-center space-x-1">
                              <Loader2 className="w-4 h-4 animate-spin text-green-600" />
                              <span className="text-sm text-muted-foreground">AI is typing...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Chat Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about farming, crops, or selling waste..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Try asking: "How to manage crop diseases?" or "What's the price for rice waste?"
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}