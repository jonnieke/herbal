import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Leaf, BookOpen, Lightbulb } from "lucide-react";
import HerbCard from "@/components/herbs/herb-card";
import HerbDetailModal from "@/components/herbs/herb-detail-modal";
export default function MentalHealth() {
    const [selectedHerb, setSelectedHerb] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: allHerbs = [] } = useQuery({
        queryKey: ["/api/herbs"],
    });
    // Filter herbs for mental health
    const mentalHealthHerbs = allHerbs.filter(herb => herb.categories.includes("Mental Health"));
    const handleHerbClick = (herb) => {
        setSelectedHerb(herb);
        setIsModalOpen(true);
    };
    const mentalHealthTips = [
        {
            icon: Brain,
            title: "Mindful Breathing",
            description: "Practice deep breathing exercises with chamomile or lavender tea to calm your mind.",
            color: "text-blue-600"
        },
        {
            icon: Heart,
            title: "Emotional Balance",
            description: "Use herbs like African sage and peppermint to support emotional stability and clarity.",
            color: "text-pink-600"
        },
        {
            icon: Leaf,
            title: "Natural Calming",
            description: "Incorporate calming herbs into your daily routine for sustained mental wellness.",
            color: "text-green-600"
        }
    ];
    const dailyPractices = [
        "Start your day with a calming herbal tea",
        "Practice 10 minutes of mindful meditation",
        "Take short breaks to breathe deeply",
        "Create a peaceful evening routine",
        "Limit screen time before bed",
        "Connect with nature regularly"
    ];
    return (_jsx("div", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center", children: _jsx(Brain, { className: "h-10 w-10 text-blue-600" }) }) }), _jsx("h1", { className: "text-4xl font-bold mb-6 text-blue-600", "data-testid": "text-page-title", children: "Mental Health & Wellness" }), _jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto", children: "Discover natural herbs and practices that support mental clarity, emotional balance, and inner peace." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-16", children: mentalHealthTips.map((tip, index) => {
                        const IconComponent = tip.icon;
                        return (_jsx(Card, { className: "text-center", children: _jsxs(CardContent, { className: "pt-6", children: [_jsx(IconComponent, { className: `h-12 w-12 mx-auto mb-4 ${tip.color}` }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: tip.title }), _jsx("p", { className: "text-muted-foreground", children: tip.description })] }) }, index));
                    }) }), _jsxs("div", { className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Herbs for Mental Wellness" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: mentalHealthHerbs.map((herb) => (_jsx("div", { onClick: () => handleHerbClick(herb), children: _jsx(HerbCard, { herb: herb }) }, herb.id))) })] }), _jsxs(Card, { className: "mb-16", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(BookOpen, { className: "h-6 w-6" }), "Daily Mental Wellness Practices"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: dailyPractices.map((practice, index) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-muted rounded-lg", children: [_jsx("div", { className: "w-2 h-2 bg-blue-600 rounded-full" }), _jsx("span", { className: "text-sm", children: practice })] }, index))) }) })] }), _jsxs(Card, { className: "bg-blue-50 border-blue-200", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-blue-800", children: [_jsx(Lightbulb, { className: "h-6 w-6" }), "Important Guidance"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4 text-blue-800", children: [_jsxs("p", { children: [_jsx("strong", { children: "Professional Support:" }), " These herbs complement but don't replace professional mental health care. If you're experiencing persistent mental health challenges, please seek support from qualified professionals."] }), _jsxs("p", { children: [_jsx("strong", { children: "Individual Response:" }), " Everyone responds differently to herbs. Start with small amounts and observe how your body and mind respond."] }), _jsxs("p", { children: [_jsx("strong", { children: "Consistency:" }), " Mental wellness is a journey. Regular, gentle practices often work better than occasional intensive use."] })] }) })] }), _jsx(HerbDetailModal, { herb: selectedHerb, isOpen: isModalOpen, onClose: () => {
                        setIsModalOpen(false);
                        setSelectedHerb(null);
                    } })] }) }));
}
