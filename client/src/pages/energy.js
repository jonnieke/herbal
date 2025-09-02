import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Sun, Battery, TrendingUp, Clock, Lightbulb } from "lucide-react";
import HerbCard from "@/components/herbs/herb-card";
import HerbDetailModal from "@/components/herbs/herb-detail-modal";
export default function Energy() {
    const [selectedHerb, setSelectedHerb] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: allHerbs = [] } = useQuery({
        queryKey: ["/api/herbs"],
    });
    // Filter herbs for energy
    const energyHerbs = allHerbs.filter(herb => herb.categories.includes("Energy"));
    const handleHerbClick = (herb) => {
        setSelectedHerb(herb);
        setIsModalOpen(true);
    };
    const energyTips = [
        {
            icon: Zap,
            title: "Natural Boost",
            description: "Use herbs like ginger and moringa for sustained energy without crashes.",
            color: "text-yellow-600"
        },
        {
            icon: Sun,
            title: "Morning Ritual",
            description: "Start your day with energizing herbal teas to boost vitality naturally.",
            color: "text-orange-600"
        },
        {
            icon: Battery,
            title: "Endurance Support",
            description: "Support your body's energy systems with nutrient-rich herbs.",
            color: "text-green-600"
        }
    ];
    const energyRituals = [
        "Morning ginger tea for natural energy boost",
        "Moringa powder in smoothies for sustained vitality",
        "Baobab fruit for vitamin C and energy support",
        "Regular hydration with herbal infusions",
        "Balanced meals with energy-supporting herbs",
        "Adequate rest to complement herbal energy support"
    ];
    const energyTiming = [
        { time: "6-8 AM", activity: "Ginger tea or moringa smoothie", herb: "Ginger, Moringa" },
        { time: "10-11 AM", activity: "Mid-morning energy boost", herb: "Baobab, Turmeric" },
        { time: "2-3 PM", activity: "Afternoon vitality support", herb: "Peppermint, Hibiscus" },
        { time: "6-7 PM", activity: "Evening wind-down", herb: "Chamomile, African Sage" }
    ];
    return (_jsx("div", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center", children: _jsx(Zap, { className: "h-10 w-10 text-yellow-600" }) }) }), _jsx("h1", { className: "text-4xl font-bold mb-6 text-yellow-600", "data-testid": "text-page-title", children: "Natural Energy & Vitality" }), _jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto", children: "Discover herbs that provide sustained energy, boost vitality, and support your body's natural energy systems." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-16", children: energyTips.map((tip, index) => {
                        const IconComponent = tip.icon;
                        return (_jsx(Card, { className: "text-center", children: _jsxs(CardContent, { className: "pt-6", children: [_jsx(IconComponent, { className: `h-12 w-12 mx-auto mb-4 ${tip.color}` }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: tip.title }), _jsx("p", { className: "text-muted-foreground", children: tip.description })] }) }, index));
                    }) }), _jsxs("div", { className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Herbs for Energy & Vitality" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: energyHerbs.map((herb) => (_jsx("div", { onClick: () => handleHerbClick(herb), children: _jsx(HerbCard, { herb: herb }) }, herb.id))) })] }), _jsxs(Card, { className: "mb-16", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(TrendingUp, { className: "h-6 w-6" }), "Daily Energy Rituals"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: energyRituals.map((ritual, index) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-muted rounded-lg", children: [_jsx("div", { className: "w-2 h-2 bg-yellow-600 rounded-full" }), _jsx("span", { className: "text-sm", children: ritual })] }, index))) }) })] }), _jsxs(Card, { className: "mb-16", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-6 w-6" }), "Optimal Energy Timing"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: energyTiming.map((timing, index) => (_jsxs("div", { className: "p-4 border rounded-lg", children: [_jsx("div", { className: "font-semibold text-yellow-600 mb-2", children: timing.time }), _jsx("div", { className: "text-sm text-muted-foreground mb-2", children: timing.activity }), _jsx(Badge, { variant: "outline", className: "text-xs", children: timing.herb })] }, index))) }) })] }), _jsxs(Card, { className: "bg-yellow-50 border-yellow-200", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-yellow-800", children: [_jsx(Lightbulb, { className: "h-6 w-6" }), "Energy Enhancement Tips"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4 text-yellow-800", children: [_jsxs("p", { children: [_jsx("strong", { children: "Start Slow:" }), " Begin with small amounts of energizing herbs and gradually increase as your body adapts."] }), _jsxs("p", { children: [_jsx("strong", { children: "Stay Hydrated:" }), " Energy herbs work best when you're well-hydrated. Drink plenty of water throughout the day."] }), _jsxs("p", { children: [_jsx("strong", { children: "Listen to Your Body:" }), " Pay attention to how different herbs affect your energy levels and adjust accordingly."] }), _jsxs("p", { children: [_jsx("strong", { children: "Combine with Lifestyle:" }), " Herbs work best when combined with good sleep, nutrition, and regular movement."] })] }) })] }), _jsx(HerbDetailModal, { herb: selectedHerb, isOpen: isModalOpen, onClose: () => {
                        setIsModalOpen(false);
                        setSelectedHerb(null);
                    } })] }) }));
}
