import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Zap, Moon, Scale, Heart, Search, Play, Bot, Send } from "lucide-react";
const familyImage = "/attached_assets/generated_images/Family_enjoying_herbal_tea_747c1dae.png";
export default function Home() {
    const [featuredHerbIndex, setFeaturedHerbIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAIOpen, setIsAIOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        {
            id: '1',
            type: 'assistant',
            content: "Hello! I'm your herbal wellness help assistant. I can help you find herbs for specific health concerns, suggest preparation methods, or answer questions about natural remedies. What would you like to know?",
            timestamp: new Date()
        }
    ]);
    const [userInput, setUserInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const latestResponseRef = useRef(null);
    const scrollContainerRef = useRef(null);
    // Scroll to top of latest AI response for better reading experience
    useEffect(() => {
        if (!isTyping && latestResponseRef.current && scrollContainerRef.current && chatMessages.length > 1) {
            const latestMessage = chatMessages[chatMessages.length - 1];
            if (latestMessage.type === 'assistant') {
                setTimeout(() => {
                    if (scrollContainerRef.current && latestResponseRef.current) {
                        // Scroll to the AI response position
                        const responseTop = latestResponseRef.current.offsetTop - 20;
                        scrollContainerRef.current.scrollTo({
                            top: responseTop,
                            behavior: 'smooth'
                        });
                    }
                }, 300);
            }
        }
    }, [chatMessages, isTyping]);
    const { data: herbs, isLoading } = useQuery({
        queryKey: ["/api/herbs"],
    });
    // Featured herbs rotation
    const featuredHerbs = herbs?.filter(herb => ["Ginger", "Chamomile", "Peppermint", "Hibiscus", "Neem", "Moringa"].includes(herb.name)) || [];
    // Search functionality
    const filteredHerbs = herbs?.filter(herb => herb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        herb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        herb.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()))) || [];
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
        if (!userInput.trim())
            return;
        const userMessage = {
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
            const assistantMessage = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: data.response || "I'm sorry, I couldn't process your request right now. Please try again.",
                timestamp: new Date()
            };
            setChatMessages(prev => [...prev, assistantMessage]);
        }
        catch (error) {
            console.error('Error calling AI API:', error);
            const errorMessage = {
                id: (Date.now() + 2).toString(),
                type: 'assistant',
                content: "I'm experiencing technical difficulties. Please try again in a moment.",
                timestamp: new Date()
            };
            setChatMessages(prev => [...prev, errorMessage]);
        }
        finally {
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
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" }), _jsx("p", { className: "text-muted-foreground", children: "Loading natural wellness..." })] }) }));
    }
    return (_jsxs("div", { children: [_jsx("section", { className: "relative", children: _jsx("div", { className: "bg-gradient-to-br from-accent/20 to-secondary/30 py-16 px-4 pl-[16px] pr-[16px] pt-[10px] pb-[10px]", children: _jsx("div", { className: "max-w-7xl mx-auto", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [_jsxs("div", { className: "order-2 lg:order-1", children: [_jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground mb-6", "data-testid": "text-hero-title", children: "Feel stronger, calmer, and more alive\u2014naturally" }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" }), _jsx(Input, { type: "text", placeholder: "Search herbs by name, benefits, or health concern...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10 pr-4 py-3 text-lg border-2 border-primary/20 focus:border-primary" })] }), searchQuery && filteredHerbs.length > 0 && (_jsxs("div", { className: "mt-4 bg-card rounded-lg shadow-lg border border-border max-h-64 overflow-y-auto", children: [filteredHerbs.slice(0, 5).map((herb) => (_jsx(Link, { href: `/herbs#${herb.id}`, children: _jsx("div", { className: "p-4 hover:bg-accent/10 cursor-pointer border-b border-border last:border-b-0", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-2xl", children: herb.emoji }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-foreground", children: herb.name }), _jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: herb.description }), _jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: herb.benefits.slice(0, 2).map((benefit, index) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: benefit }, index))) })] })] }) }) }, herb.id))), filteredHerbs.length > 5 && (_jsxs("div", { className: "p-4 text-center text-sm text-muted-foreground", children: ["And ", filteredHerbs.length - 5, " more herbs..."] }))] })), searchQuery && filteredHerbs.length === 0 && (_jsx("div", { className: "mt-4 bg-card rounded-lg shadow-lg border border-border p-4", children: _jsxs("p", { className: "text-muted-foreground text-center", children: ["No herbs found matching \"", searchQuery, "\""] }) }))] }), _jsxs("div", { className: "bg-primary/90 text-primary-foreground p-6 rounded-xl mb-6", children: [_jsx("p", { className: "text-lg italic mb-2 text-[#b58700]", children: "\"I have given you all these trees for you to eat...\"" }), _jsx("p", { className: "text-base text-[#b58700]", children: "At Herbal Care Hub, we help you discover natural ways to boost energy, improve mental health, sleep better, and support wellbeing." })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx(Link, { href: "/herbs", children: _jsx(Button, { size: "lg", className: "text-lg font-semibold px-8 py-3", "data-testid": "button-explore-herbs", children: "Explore Herbs" }) }), _jsxs(Dialog, { open: isAIOpen, onOpenChange: setIsAIOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { size: "lg", variant: "outline", className: "text-lg font-semibold px-8 py-3", children: [_jsx(Bot, { className: "h-5 w-5 mr-2" }), "AI Assistant"] }) }), _jsxs(DialogContent, { className: "max-w-2xl max-h-[80vh] flex flex-col border-2 border-primary/20 shadow-xl", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Bot, { className: "h-5 w-5" }), "Herbal Wellness Help Assistant"] }) }), _jsxs("div", { className: "flex-1 flex flex-col min-h-0", children: [_jsxs("div", { ref: scrollContainerRef, className: "flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/20 rounded-lg", children: [chatMessages.map((message, index) => (_jsx("div", { ref: message.type === 'assistant' && index === chatMessages.length - 1 ? latestResponseRef : null, className: `flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `max-w-[80%] p-3 rounded-lg ${message.type === 'user'
                                                                                            ? 'bg-primary text-primary-foreground'
                                                                                            : 'bg-card border border-border'}`, children: [_jsx("p", { className: "text-sm", children: message.content }), _jsx("p", { className: "text-xs opacity-70 mt-1", children: message.timestamp.toLocaleTimeString() })] }) }, message.id))), isTyping && (_jsx("div", { className: "flex justify-start", children: _jsx("div", { className: "bg-card border border-border p-3 rounded-lg", children: _jsxs("div", { className: "flex space-x-1", children: [_jsx("div", { className: "w-2 h-2 bg-muted-foreground rounded-full animate-bounce" }), _jsx("div", { className: "w-2 h-2 bg-muted-foreground rounded-full animate-bounce", style: { animationDelay: '0.1s' } }), _jsx("div", { className: "w-2 h-2 bg-muted-foreground rounded-full animate-bounce", style: { animationDelay: '0.2s' } })] }) }) }))] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Textarea, { placeholder: "Ask about herbs, health concerns, or preparation methods...", value: userInput, onChange: (e) => setUserInput(e.target.value), onKeyPress: (e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage(), className: "flex-1 resize-none", rows: 2 }), _jsx(Button, { onClick: handleSendMessage, disabled: !userInput.trim() || isTyping, className: "px-4", children: _jsx(Send, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "mt-3", children: [_jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Quick suggestions:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: [
                                                                                        "Help me sleep better",
                                                                                        "Boost my energy",
                                                                                        "Digestive support",
                                                                                        "Stress relief"
                                                                                    ].map((suggestion) => (_jsx(Button, { variant: "outline", size: "sm", onClick: () => {
                                                                                            setUserInput(suggestion);
                                                                                            setTimeout(() => handleSendMessage(), 100);
                                                                                        }, className: "text-xs", children: suggestion }, suggestion))) })] })] })] })] })] })] }), _jsx("div", { className: "order-1 lg:order-2", children: _jsxs("div", { className: "relative", children: [_jsx("img", { src: familyImage, alt: "Family enjoying herbal tea together", className: "rounded-2xl w-full h-80 lg:h-96 object-cover shadow-lg" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" })] }) })] }) }) }) }), _jsx("section", { className: "py-16 px-4 bg-muted/30 pt-[10px] pb-[10px]", children: _jsx("div", { className: "max-w-5xl mx-auto", children: _jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6", children: wellnessCategories.map((category) => {
                            const IconComponent = category.icon;
                            return (_jsx(Link, { href: category.href, children: _jsxs("div", { className: "bg-card hover:bg-accent/10 transition-all duration-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md cursor-pointer", "data-testid": `card-category-${category.title.toLowerCase().replace(' ', '-')}`, children: [_jsx("div", { className: "bg-secondary/40 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3", children: _jsx(IconComponent, { className: "h-8 w-8 text-foreground" }) }), _jsx("h3", { className: "font-semibold text-sm text-foreground", children: category.title })] }) }, category.title));
                        }) }) }) }), _jsx("section", { className: "py-16 px-4 pt-[10px] pb-[10px]", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", "data-testid": "text-featured-herb-title", children: "Featured Herb" }), currentFeaturedHerb ? (_jsx("div", { className: "bg-card rounded-2xl p-8 shadow-lg border border-border", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-4xl font-bold mb-4 text-foreground", "data-testid": "text-featured-herb-name", children: currentFeaturedHerb.name }), _jsx("p", { className: "text-muted-foreground text-lg mb-6", "data-testid": "text-featured-herb-description", children: currentFeaturedHerb.description }), _jsx(Button, { className: "bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold", onClick: () => window.location.href = `/herbs#${currentFeaturedHerb.id}`, "data-testid": "button-learn-more-featured", children: "Learn More" })] }), _jsx("div", { className: "flex justify-center", children: _jsx("img", { src: currentFeaturedHerb.imageUrl || "/attached_assets/generated_images/Family_enjoying_herbal_tea_747c1dae.png", alt: currentFeaturedHerb.name, className: "rounded-2xl w-full max-w-sm h-64 object-cover shadow-md" }) })] }) })) : (_jsx("div", { className: "bg-card rounded-2xl p-8 shadow-lg border border-border text-center", children: _jsx("p", { className: "text-muted-foreground", children: "Loading featured herb..." }) }))] }) }), _jsx("section", { className: "py-16 px-4 bg-muted/30 pt-[10px] pb-[10px]", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("h2", { className: "text-2xl font-bold mb-8", "data-testid": "text-video-title", children: "Watch simple herb preparations" }), _jsx("div", { className: "bg-card rounded-2xl p-8 shadow-lg border border-border", children: _jsxs("div", { className: "aspect-video rounded-xl overflow-hidden relative", "data-testid": "video-placeholder-ginger-tea", children: [_jsx("img", { src: "/attached_assets/generated_images/Herbal_preparation_workspace_scene_4088b9aa.png", alt: "Traditional herbal preparation workspace with fresh herbs, mortar and pestle, and natural remedies", className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-black/20 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "bg-primary/90 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4", children: _jsx(Play, { className: "h-10 w-10 text-primary-foreground" }) }), _jsx("p", { className: "text-white text-lg font-semibold mb-2 drop-shadow-lg", children: "Herbal Preparation Guides" }), _jsx("p", { className: "text-white/90 drop-shadow-md", children: "Learn traditional methods for natural remedies" })] }) })] }) })] }) })] }));
}
