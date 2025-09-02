import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Moon, Bed, Star, BookOpen, Clock, Lightbulb } from "lucide-react";
import HerbCard from "@/components/herbs/herb-card";
import HerbDetailModal from "@/components/herbs/herb-detail-modal";
export default function Sleep() {
    const [selectedHerb, setSelectedHerb] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: allHerbs = [] } = useQuery({
        queryKey: ["/api/herbs"],
    });
    // Filter herbs for sleep
    const sleepHerbs = allHerbs.filter(herb => herb.categories.includes("Sleep"));
    const handleHerbClick = (herb) => {
        setSelectedHerb(herb);
        setIsModalOpen(true);
    };
    const sleepTips = [
        {
            icon: Moon,
            title: "Natural Relaxation",
            description: "Use calming herbs like chamomile and African sage to prepare your mind for sleep.",
            color: "text-indigo-600"
        },
        {
            icon: Bed,
            title: "Sleep Ritual",
            description: "Create a consistent bedtime routine with soothing herbal teas and practices.",
            color: "text-purple-600"
        },
        {
            icon: Star,
            title: "Quality Rest",
            description: "Support deeper, more restorative sleep with gentle herbal remedies.",
            color: "text-blue-600"
        }
    ];
    const bedtimeRitual = [
        "Dim lights 1 hour before bed",
        "Drink calming herbal tea (chamomile, African sage)",
        "Practice gentle breathing exercises",
        "Read a book or listen to calming music",
        "Avoid screens and stimulating activities",
        "Create a cool, dark, quiet sleep environment"
    ];
    const sleepTimeline = [
        { time: "8:00 PM", activity: "Begin winding down", herb: "Chamomile tea" },
        { time: "9:00 PM", activity: "Relaxation practice", herb: "African sage steam" },
        { time: "9:30 PM", activity: "Bedtime preparation", herb: "Lavender aromatherapy" },
        { time: "10:00 PM", activity: "Sleep time", herb: "Gentle breathing" }
    ];
    const sleepEnhancers = [
        "Keep bedroom cool (65-68°F/18-20°C)",
        "Use blackout curtains",
        "White noise machine or nature sounds",
        "Comfortable, supportive mattress",
        "Regular sleep schedule",
        "Limit caffeine after 2 PM"
    ];
    return (_jsx("div", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center", children: _jsx(Moon, { className: "h-10 w-10 text-indigo-600" }) }) }), _jsx("h1", { className: "text-4xl font-bold mb-6 text-indigo-600", "data-testid": "text-page-title", children: "Sleep & Relaxation" }), _jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto", children: "Discover natural herbs and practices that promote restful sleep, deep relaxation, and peaceful nights." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-16", children: sleepTips.map((tip, index) => {
                        const IconComponent = tip.icon;
                        return (_jsx(Card, { className: "text-center", children: _jsxs(CardContent, { className: "pt-6", children: [_jsx(IconComponent, { className: `h-12 w-12 mx-auto mb-4 ${tip.color}` }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: tip.title }), _jsx("p", { className: "text-muted-foreground", children: tip.description })] }) }, index));
                    }) }), _jsxs("div", { className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Herbs for Sleep & Relaxation" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: sleepHerbs.map((herb) => (_jsx("div", { onClick: () => handleHerbClick(herb), children: _jsx(HerbCard, { herb: herb }) }, herb.id))) })] }), _jsxs(Card, { className: "mb-16", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(BookOpen, { className: "h-6 w-6" }), "Bedtime Ritual"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: bedtimeRitual.map((ritual, index) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-muted rounded-lg", children: [_jsx("div", { className: "w-2 h-2 bg-indigo-600 rounded-full" }), _jsx("span", { className: "text-sm", children: ritual })] }, index))) }) })] }), _jsxs(Card, { className: "mb-16", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-6 w-6" }), "Sleep Preparation Timeline"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: sleepTimeline.map((timing, index) => (_jsxs("div", { className: "p-4 border rounded-lg", children: [_jsx("div", { className: "font-semibold text-indigo-600 mb-2", children: timing.time }), _jsx("div", { className: "text-sm text-muted-foreground mb-2", children: timing.activity }), _jsx(Badge, { variant: "outline", className: "text-xs", children: timing.herb })] }, index))) }) })] }), _jsxs(Card, { className: "mb-16", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Bed, { className: "h-6 w-6" }), "Sleep Environment Optimization"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: sleepEnhancers.map((enhancer, index) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-muted rounded-lg", children: [_jsx("div", { className: "w-2 h-2 bg-purple-600 rounded-full" }), _jsx("span", { className: "text-sm", children: enhancer })] }, index))) }) })] }), _jsxs(Card, { className: "bg-indigo-50 border-indigo-200", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-indigo-800", children: [_jsx(Lightbulb, { className: "h-6 w-6" }), "Sleep Enhancement Tips"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4 text-indigo-800", children: [_jsxs("p", { children: [_jsx("strong", { children: "Consistency is Key:" }), " Go to bed and wake up at the same time every day, even on weekends."] }), _jsxs("p", { children: [_jsx("strong", { children: "Herb Timing:" }), " Take sleep-supporting herbs 30-60 minutes before bedtime for best results."] }), _jsxs("p", { children: [_jsx("strong", { children: "Mind-Body Connection:" }), " Combine herbs with relaxation techniques like meditation or gentle yoga."] }), _jsxs("p", { children: [_jsx("strong", { children: "Patience:" }), " It may take 1-2 weeks to establish a new sleep routine. Be patient with the process."] })] }) })] }), _jsx(HerbDetailModal, { herb: selectedHerb, isOpen: isModalOpen, onClose: () => {
                        setIsModalOpen(false);
                        setSelectedHerb(null);
                    } })] }) }));
}
