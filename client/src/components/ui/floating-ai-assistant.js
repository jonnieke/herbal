import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send } from "lucide-react";
export default function FloatingAIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
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
    const messagesEndRef = useRef(null);
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
    return (_jsx("div", { className: "fixed bottom-6 right-6 z-50", children: _jsxs(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { size: "lg", className: "rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90", children: _jsx(Bot, { className: "h-6 w-6" }) }) }), _jsxs(DialogContent, { className: "max-w-2xl max-h-[80vh] flex flex-col border-2 border-primary/20 shadow-xl", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Bot, { className: "h-5 w-5" }), "Herbal Wellness Help Assistant"] }) }), _jsxs("div", { className: "flex-1 flex flex-col min-h-0", children: [_jsxs("div", { ref: scrollContainerRef, className: "flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/20 rounded-lg", children: [chatMessages.map((message, index) => (_jsx("div", { ref: message.type === 'assistant' && index === chatMessages.length - 1 ? latestResponseRef : null, className: `flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `max-w-[80%] p-3 rounded-lg ${message.type === 'user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-card border border-border'}`, children: [_jsx("p", { className: "text-sm", children: message.content }), _jsx("p", { className: "text-xs opacity-70 mt-1", children: message.timestamp.toLocaleTimeString() })] }) }, message.id))), isTyping && (_jsx("div", { className: "flex justify-start", children: _jsx("div", { className: "bg-card border border-border p-3 rounded-lg", children: _jsxs("div", { className: "flex space-x-1", children: [_jsx("div", { className: "w-2 h-2 bg-muted-foreground rounded-full animate-bounce" }), _jsx("div", { className: "w-2 h-2 bg-muted-foreground rounded-full animate-bounce", style: { animationDelay: '0.1s' } }), _jsx("div", { className: "w-2 h-2 bg-muted-foreground rounded-full animate-bounce", style: { animationDelay: '0.2s' } })] }) }) })), _jsx("div", { ref: messagesEndRef })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Textarea, { placeholder: "Ask about herbs, health concerns, or preparation methods...", value: userInput, onChange: (e) => setUserInput(e.target.value), onKeyPress: (e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage(), className: "flex-1 resize-none", rows: 2 }), _jsx(Button, { onClick: handleSendMessage, disabled: !userInput.trim() || isTyping, className: "px-4", children: _jsx(Send, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "mt-3", children: [_jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Quick suggestions:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: [
                                                "Help me sleep better",
                                                "Boost my energy",
                                                "Digestive support",
                                                "Stress relief",
                                                "Skin health",
                                                "Weight management"
                                            ].map((suggestion) => (_jsx(Button, { variant: "outline", size: "sm", onClick: () => {
                                                    setUserInput(suggestion);
                                                    setTimeout(() => handleSendMessage(), 100);
                                                }, className: "text-xs", children: suggestion }, suggestion))) })] })] })] })] }) }));
}
