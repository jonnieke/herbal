import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, MessageCircle, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Herb } from "@shared/schema";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
             content: "Hello! I'm your herbal wellness help assistant. I can help you find herbs for specific health concerns, suggest preparation methods, or answer questions about natural remedies. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const { data: herbs } = useQuery<Herb[]>({
    queryKey: ["/api/herbs"],
  });

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setUserInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userInput, herbs || []);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string, availableHerbs: Herb[]): string => {
    const lowerQuery = query.toLowerCase();
    
    // Herb recommendations based on health concerns
    if (lowerQuery.includes('sleep') || lowerQuery.includes('insomnia') || lowerQuery.includes('rest')) {
      const sleepHerbs = availableHerbs.filter(herb => 
        herb.benefits.some(benefit => 
          benefit.toLowerCase().includes('sleep') || 
          benefit.toLowerCase().includes('relax') ||
          benefit.toLowerCase().includes('calm')
        )
      );
      return `For better sleep, I recommend: ${sleepHerbs.map(h => h.name).join(', ')}. These herbs have natural calming properties that can help you relax and improve sleep quality. Try chamomile tea before bedtime or add lavender to your evening routine.`;
    }
    
    if (lowerQuery.includes('energy') || lowerQuery.includes('tired') || lowerQuery.includes('fatigue')) {
      const energyHerbs = availableHerbs.filter(herb => 
        herb.benefits.some(benefit => 
          benefit.toLowerCase().includes('energy') || 
          benefit.toLowerCase().includes('boost') ||
          benefit.toLowerCase().includes('vitality')
        )
      );
      return `To boost your energy naturally, try: ${energyHerbs.map(h => h.name).join(', ')}. These herbs can help increase vitality and stamina. Moringa is particularly excellent for sustained energy, while ginger can provide an immediate pick-me-up.`;
    }
    
    if (lowerQuery.includes('digest') || lowerQuery.includes('stomach') || lowerQuery.includes('nausea')) {
      const digestiveHerbs = availableHerbs.filter(herb => 
        herb.benefits.some(benefit => 
          benefit.toLowerCase().includes('digest') || 
          benefit.toLowerCase().includes('stomach') ||
          herb.name.toLowerCase().includes('ginger') ||
          herb.name.toLowerCase().includes('peppermint')
        )
      );
      return `For digestive support, I recommend: ${digestiveHerbs.map(h => h.name).join(', ')}. Ginger is excellent for nausea and morning sickness, while peppermint can soothe stomach discomfort. Try ginger tea after meals or peppermint for bloating relief.`;
    }
    
    if (lowerQuery.includes('immune') || lowerQuery.includes('cold') || lowerQuery.includes('flu')) {
      const immuneHerbs = availableHerbs.filter(herb => 
        herb.benefits.some(benefit => 
          benefit.toLowerCase().includes('immune') || 
          benefit.toLowerCase().includes('cold') ||
          benefit.toLowerCase().includes('infection')
        )
      );
      return `To support your immune system, consider: ${immuneHerbs.map(h => h.name).join(', ')}. These herbs have natural antimicrobial and immune-boosting properties. Turmeric with black pepper is particularly effective for overall immune support.`;
    }
    
    if (lowerQuery.includes('stress') || lowerQuery.includes('anxiety') || lowerQuery.includes('calm')) {
      const stressHerbs = availableHerbs.filter(herb => 
        herb.benefits.some(benefit => 
          benefit.toLowerCase().includes('stress') || 
          benefit.toLowerCase().includes('anxiety') ||
          benefit.toLowerCase().includes('calm') ||
          benefit.toLowerCase().includes('relax')
        )
      );
      return `For stress and anxiety relief, try: ${stressHerbs.map(h => h.name).join(', ')}. These herbs have natural calming properties. Chamomile tea is excellent for daily stress relief, while African sage can help with mental clarity during stressful times.`;
    }
    
    if (lowerQuery.includes('skin') || lowerQuery.includes('acne') || lowerQuery.includes('healing')) {
      const skinHerbs = availableHerbs.filter(herb => 
        herb.benefits.some(benefit => 
          benefit.toLowerCase().includes('skin') || 
          benefit.toLowerCase().includes('healing') ||
          herb.name.toLowerCase().includes('aloe') ||
          herb.name.toLowerCase().includes('neem')
        )
      );
      return `For skin health, I recommend: ${skinHerbs.map(h => h.name).join(', ')}. Aloe vera is excellent for burns and skin healing, while neem has powerful antimicrobial properties for acne. Turmeric can also help with skin brightening and inflammation.`;
    }
    
    if (lowerQuery.includes('weight') || lowerQuery.includes('metabolism') || lowerQuery.includes('diet')) {
      const weightHerbs = availableHerbs.filter(herb => 
        herb.benefits.some(benefit => 
          benefit.toLowerCase().includes('weight') || 
          benefit.toLowerCase().includes('metabolism') ||
          benefit.toLowerCase().includes('detox')
        )
      );
      return `For weight management and metabolism support, consider: ${weightHerbs.map(h => h.name).join(', ')}. These herbs can support healthy metabolism and detoxification. Remember that herbs work best when combined with a balanced diet and regular exercise.`;
    }
    
    // General herb information
    if (lowerQuery.includes('herb') || lowerQuery.includes('plant')) {
      return `I can help you learn about various herbs and their benefits! Some popular herbs include ginger (digestive support), chamomile (sleep and relaxation), moringa (energy and nutrition), and turmeric (anti-inflammatory). What specific health concern are you looking to address?`;
    }
    
    // Default response
    return `I'm here to help you with herbal wellness! I can recommend herbs for specific health concerns like sleep, energy, digestion, immune support, stress, skin health, or weight management. Just let me know what you're looking for, and I'll suggest the best natural remedies. You can also ask me about preparation methods or how to incorporate herbs into your daily routine.`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
          >
            <Bot className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
                         <DialogTitle className="flex items-center gap-2">
               <Bot className="h-5 w-5" />
               Herbal Wellness Help Assistant
             </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 flex flex-col min-h-0">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/20 rounded-lg">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input Area */}
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask about herbs, health concerns, or preparation methods..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                className="flex-1 resize-none"
                rows={2}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isTyping}
                className="px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Quick Suggestions */}
            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Help me sleep better",
                  "Boost my energy",
                  "Digestive support",
                  "Stress relief",
                  "Skin health",
                  "Weight management"
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setUserInput(suggestion);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
