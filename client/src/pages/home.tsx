import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import FeaturedHerb from "@/components/herbs/featured-herb";
import { Brain, Zap, Moon, Scale, Heart, Search, Play, Bot, Send, X, Sparkles } from "lucide-react";
import type { Herb } from "@/shared/schema";
const familyImage = "/attached_assets/generated_images/Family_enjoying_herbal_tea_747c1dae.png";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [featuredHerbIndex, setFeaturedHerbIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAIOpen, setIsAIOpen] = useState(false);
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
  const latestResponseRef = useRef<HTMLDivElement>(null);

  // Scroll to top of latest AI response for better reading experience
  useEffect(() => {
    if (!isTyping && latestResponseRef.current && chatMessages.length > 1) {
      const latestMessage = chatMessages[chatMessages.length - 1];
      if (latestMessage.type === 'assistant') {
        setTimeout(() => {
          // Scroll the response into view at the top
          const scrollContainer = latestResponseRef.current?.closest('.overflow-y-auto');
          if (scrollContainer && latestResponseRef.current) {
            const responseElement = latestResponseRef.current;
            scrollContainer.scrollTop = responseElement.offsetTop - 10;
          }
        }, 200);
      }
    }
  }, [chatMessages, isTyping]);

  const { data: herbs, isLoading } = useQuery<Herb[]>({
    queryKey: ["/api/herbs"],
  });

  // Featured herbs rotation
  const featuredHerbs = herbs?.filter(herb => 
    ["Ginger", "Chamomile", "Peppermint", "Hibiscus", "Neem", "Moringa"].includes(herb.name)
  ) || [];

  // Search functionality
  const filteredHerbs = herbs?.filter(herb =>
    herb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    herb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    herb.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  useEffect(() => {
    if (featuredHerbs.length > 0) {
      const interval = setInterval(() => {
        setFeaturedHerbIndex((prev) => (prev + 1) % featuredHerbs.length);
      }, 10000); // Rotate every 10 seconds
      return () => clearInterval(interval);
    }
  }, [featuredHerbs.length]);

  const currentFeaturedHerb = featuredHerbs[featuredHerbIndex];

  // AI Assistant functionality
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    const currentInput = userInput;
    setUserInput("");
    setIsTyping(true);

    try {
      // Call the real Gemini API
      const response = await fetch('/api/ai/wellness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput })
      });

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.response || "I'm sorry, I couldn't process your request right now. Please try again.",
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling AI API:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: "I'm experiencing technical difficulties. Please try again in a moment.",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };


  const wellnessCategories = [
    {
      icon: Brain,
      title: "Mental Health",
      description: "Find calm and clarity with natural herbs",
      color: "text-primary",
      href: "/mental-health"
    },
    {
      icon: Zap,
      title: "Energy",
      description: "Boost vitality and stamina naturally",
      color: "text-accent",
      href: "/energy"
    },
    {
      icon: Moon,
      title: "Sleep",
      description: "Rest better with soothing herbs",
      color: "text-secondary",
      href: "/sleep"
    },
    {
      icon: Scale,
      title: "Weight Balance",
      description: "Support healthy weight management",
      color: "text-primary",
      href: "/weight-balance"
    },
    {
      icon: Heart,
      title: "General Wellness",
      description: "Overall health and vitality support",
      color: "text-accent",
      href: "/general-wellness"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading natural wellness...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section with Search */}
      <section className="relative">
        <div className="bg-gradient-to-br from-accent/20 to-secondary/30 py-16 px-4 pl-[16px] pr-[16px] pt-[10px] pb-[10px]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-hero-title">
                  Feel stronger, calmer, and more alive—naturally
                </h1>
                
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search herbs by name, benefits, or health concern..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-3 text-lg border-2 border-primary/20 focus:border-primary"
                    />
                  </div>
                  
                  {/* Search Results */}
                  {searchQuery && filteredHerbs.length > 0 && (
                    <div className="mt-4 bg-card rounded-lg shadow-lg border border-border max-h-64 overflow-y-auto">
                      {filteredHerbs.slice(0, 5).map((herb) => (
                        <Link key={herb.id} href={`/herbs#${herb.id}`}>
                          <div className="p-4 hover:bg-accent/10 cursor-pointer border-b border-border last:border-b-0">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{herb.emoji}</span>
                              <div>
                                <h3 className="font-semibold text-foreground">{herb.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{herb.description}</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {herb.benefits.slice(0, 2).map((benefit, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {benefit}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                      {filteredHerbs.length > 5 && (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          And {filteredHerbs.length - 5} more herbs...
                        </div>
                      )}
                    </div>
                  )}
                  
                  {searchQuery && filteredHerbs.length === 0 && (
                    <div className="mt-4 bg-card rounded-lg shadow-lg border border-border p-4">
                      <p className="text-muted-foreground text-center">No herbs found matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>

                <div className="bg-primary/90 text-primary-foreground p-6 rounded-xl mb-6">
                  <p className="text-lg italic mb-2 text-[#b58700]">
                    "I have given you all these trees for you to eat..."
                  </p>
                  <p className="text-base text-[#b58700]">
                    At Herbal Care Hub, we help you discover natural ways to boost energy, improve mental health, sleep better, and support wellbeing.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <Link href="/herbs">
                    <Button size="lg" className="text-lg font-semibold px-8 py-3" data-testid="button-explore-herbs">
                      Explore Herbs
                    </Button>
                  </Link>
                  
                  {/* AI Assistant Button */}
                  <Dialog open={isAIOpen} onOpenChange={setIsAIOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" variant="outline" className="text-lg font-semibold px-8 py-3">
                        <Bot className="h-5 w-5 mr-2" />
                        AI Assistant
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col border-2 border-primary/20 shadow-xl">
                      <DialogHeader>
                                       <DialogTitle className="flex items-center gap-2">
                 <Bot className="h-5 w-5" />
                 Herbal Wellness Help Assistant
               </DialogTitle>
                      </DialogHeader>
                      
                      <div className="flex-1 flex flex-col min-h-0">
                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/20 rounded-lg">
                          {chatMessages.map((message, index) => (
                            <div
                              key={message.id}
                              ref={message.type === 'assistant' && index === chatMessages.length - 1 ? latestResponseRef : null}
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
                              "Stress relief"
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
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <img 
                    src={familyImage} 
                    alt="Family enjoying herbal tea together"
                    className="rounded-2xl w-full h-80 lg:h-96 object-cover shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Quick Navigation Tiles */}
      <section className="py-16 px-4 bg-muted/30 pt-[10px] pb-[10px]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {wellnessCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.title} href={category.href}>
                  <div className="bg-card hover:bg-accent/10 transition-all duration-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md cursor-pointer" data-testid={`card-category-${category.title.toLowerCase().replace(' ', '-')}`}>
                    <div className="bg-secondary/40 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="h-8 w-8 text-foreground" />
                    </div>
                    <h3 className="font-semibold text-sm text-foreground">{category.title}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {/* Featured Herb Spotlight */}
      <section className="py-16 px-4 pt-[10px] pb-[10px]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" data-testid="text-featured-herb-title">
            Featured Herb
          </h2>
          {currentFeaturedHerb ? (
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-4xl font-bold mb-4 text-foreground" data-testid="text-featured-herb-name">
                    {currentFeaturedHerb.name}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6" data-testid="text-featured-herb-description">
                    {currentFeaturedHerb.description}
                  </p>
                  <Button 
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold" 
                    onClick={() => window.location.href = `/herbs#${currentFeaturedHerb.id}`}
                    data-testid="button-learn-more-featured"
                  >
                    Learn More
                  </Button>
                </div>
                <div className="flex justify-center">
                  <img 
                    src={currentFeaturedHerb.imageUrl || "/attached_assets/generated_images/Family_enjoying_herbal_tea_747c1dae.png"} 
                    alt={currentFeaturedHerb.name}
                    className="rounded-2xl w-full max-w-sm h-64 object-cover shadow-md"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border text-center">
              <p className="text-muted-foreground">Loading featured herb...</p>
            </div>
          )}
        </div>
      </section>
      {/* Video Section */}
      <section className="py-16 px-4 bg-muted/30 pt-[10px] pb-[10px]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8" data-testid="text-video-title">
            Watch simple herb preparations
          </h2>
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <div className="aspect-video bg-gradient-to-br from-muted to-secondary/20 rounded-xl flex items-center justify-center" data-testid="video-placeholder-ginger-tea">
              <div className="text-center">
                <div className="bg-primary/90 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Play className="h-10 w-10 text-primary-foreground" />
                </div>
                <p className="text-foreground text-lg font-semibold mb-2">Coming Soon</p>
                <p className="text-muted-foreground">Step-by-step herbal preparation guides</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
