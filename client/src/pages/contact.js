import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MessageCircle, Clock, Heart } from "lucide-react";
export default function Contact() {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const contactMutation = useMutation({
        mutationFn: async (data) => {
            return await apiRequest("POST", "/api/contact", data);
        },
        onSuccess: () => {
            toast({
                title: "Message sent successfully!",
                description: "We'll respond within 24-48 hours.",
            });
            setFormData({ name: "", email: "", subject: "", message: "" });
        },
        onError: () => {
            toast({
                title: "Failed to send message",
                description: "Please try again later.",
                variant: "destructive",
            });
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast({
                title: "Please fill in required fields",
                description: "Name, email, and message are required.",
                variant: "destructive",
            });
            return;
        }
        contactMutation.mutate(formData);
    };
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    const socialLinks = [
        { name: "Facebook", icon: "fab fa-facebook", color: "text-blue-600", bgColor: "bg-blue-50 hover:bg-blue-100" },
        { name: "Instagram", icon: "fab fa-instagram", color: "text-pink-600", bgColor: "bg-pink-50 hover:bg-pink-100" },
        { name: "YouTube", icon: "fab fa-youtube", color: "text-red-600", bgColor: "bg-red-50 hover:bg-red-100" },
        { name: "Twitter", icon: "fab fa-twitter", color: "text-blue-400", bgColor: "bg-blue-50 hover:bg-blue-100" }
    ];
    return (_jsx("div", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-4xl font-bold text-center mb-8", "data-testid": "text-page-title", children: "Contact Us" }), _jsx("p", { className: "text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto", children: "Have questions about herbs or natural wellness? We'd love to hear from you!" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [_jsx(Card, { className: "p-8 shadow-lg border border-border", children: _jsxs(CardContent, { className: "p-0", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", "data-testid": "text-form-title", children: "Send us a Message" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium mb-2", children: "Your Name *" }), _jsx(Input, { id: "name", type: "text", placeholder: "Enter your full name", value: formData.name, onChange: (e) => handleInputChange("name", e.target.value), required: true, "data-testid": "input-name" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium mb-2", children: "Email Address *" }), _jsx(Input, { id: "email", type: "email", placeholder: "your.email@example.com", value: formData.email, onChange: (e) => handleInputChange("email", e.target.value), required: true, "data-testid": "input-email" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "subject", className: "block text-sm font-medium mb-2", children: "Subject" }), _jsxs(Select, { onValueChange: (value) => handleInputChange("subject", value), children: [_jsx(SelectTrigger, { "data-testid": "select-subject", children: _jsx(SelectValue, { placeholder: "Select a topic" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "general", children: "General Question" }), _jsx(SelectItem, { value: "herbs", children: "Herb Information" }), _jsx(SelectItem, { value: "safety", children: "Safety Concerns" }), _jsx(SelectItem, { value: "collaboration", children: "Collaboration" }), _jsx(SelectItem, { value: "feedback", children: "Feedback" })] })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "message", className: "block text-sm font-medium mb-2", children: "Message *" }), _jsx(Textarea, { id: "message", rows: 5, placeholder: "Tell us how we can help you...", value: formData.message, onChange: (e) => handleInputChange("message", e.target.value), required: true, "data-testid": "textarea-message" })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: contactMutation.isPending, "data-testid": "button-send-message", children: contactMutation.isPending ? "Sending..." : "Send Message" })] })] }) }), _jsxs("div", { className: "space-y-8", children: [_jsx(Card, { className: "p-8 shadow-lg border border-border", children: _jsxs(CardContent, { className: "p-0", children: [_jsxs("h3", { className: "text-xl font-bold mb-4 flex items-center", children: [_jsx(MessageCircle, { className: "text-primary mr-3" }), "Quick Connect"] }), _jsx("p", { className: "text-muted-foreground mb-6", children: "For immediate questions or consultations, reach out through our messaging platforms:" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("a", { href: "#", className: "flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors", "data-testid": "link-whatsapp", children: [_jsx("i", { className: "fab fa-whatsapp text-2xl text-green-600" }), _jsx("span", { className: "font-medium", children: "WhatsApp" }), _jsx("span", { className: "text-sm text-muted-foreground ml-auto", children: "Coming Soon" })] }), _jsxs("a", { href: "#", className: "flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors", "data-testid": "link-telegram", children: [_jsx("i", { className: "fab fa-telegram text-2xl text-blue-600" }), _jsx("span", { className: "font-medium", children: "Telegram" }), _jsx("span", { className: "text-sm text-muted-foreground ml-auto", children: "Coming Soon" })] })] })] }) }), _jsx(Card, { className: "p-8 shadow-lg border border-border", children: _jsxs(CardContent, { className: "p-0", children: [_jsxs("h3", { className: "text-xl font-bold mb-4 flex items-center", children: [_jsx(Clock, { className: "text-accent mr-3" }), "Response Time"] }), _jsx("p", { className: "text-muted-foreground mb-4", children: "We typically respond to messages within 24-48 hours. For urgent health concerns, please consult with a healthcare professional immediately." }), _jsx("div", { className: "bg-yellow-50 border border-yellow-200 p-4 rounded-lg", children: _jsxs("p", { className: "text-sm text-yellow-800", children: [_jsx("strong", { children: "Remember:" }), " We provide educational information only. For medical emergencies or serious health issues, please contact your healthcare provider or emergency services."] }) })] }) }), _jsx(Card, { className: "p-8 shadow-lg border border-border", children: _jsxs(CardContent, { className: "p-0", children: [_jsxs("h3", { className: "text-xl font-bold mb-4 flex items-center", children: [_jsx(Heart, { className: "text-secondary mr-3" }), "Connect with Us"] }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Join our community of natural wellness enthusiasts:" }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: socialLinks.map((social) => (_jsxs("a", { href: "#", className: `flex items-center justify-center space-x-2 p-3 rounded-lg transition-colors ${social.bgColor}`, "data-testid": `link-social-${social.name.toLowerCase()}`, children: [_jsx("i", { className: `${social.icon} ${social.color}` }), _jsx("span", { className: "text-sm", children: social.name })] }, social.name))) })] }) })] })] })] }) }));
}
