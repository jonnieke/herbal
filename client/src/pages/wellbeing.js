import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Moon, Scale } from "lucide-react";
export default function Wellbeing() {
    const wellbeingCategories = [
        {
            id: "mental-health",
            icon: Brain,
            title: "Mental Health & Calm",
            color: "text-primary",
            bgColor: "bg-primary/10",
            description: "Find peace and mental clarity with these calming herbs that have been used for centuries to reduce stress and promote emotional balance.",
            herbs: [
                { name: "Chamomile", benefit: "Gentle relaxation and sleep support" },
                { name: "African Basil", benefit: "Mental clarity and stress relief" },
                { name: "African Sage", benefit: "Calming aromatherapy benefits" }
            ],
            tips: "Practice deep breathing, maintain a regular sleep schedule, and create calming bedtime rituals with herbal teas.",
            image: "/attached_assets/generated_images/Chamomile_flowers_blooming_fcc5a2fb.png"
        },
        {
            id: "energy",
            icon: Zap,
            title: "Energy & Vitality",
            color: "text-accent",
            bgColor: "bg-accent/10",
            description: "Boost your natural energy levels and stamina with these powerful herbs that support sustained vitality throughout the day.",
            herbs: [
                { name: "Moringa", benefit: "Complete nutrition and energy boost" },
                { name: "Baobab", benefit: "Vitamin C powerhouse for immunity" },
                { name: "Ginger", benefit: "Circulation and digestive energy" }
            ],
            tips: "Stay hydrated, eat nutrient-dense foods, get morning sunlight, and maintain regular exercise for sustained energy.",
            image: "/attached_assets/generated_images/Fresh_moringa_plant_leaves_f8771929.png"
        },
        {
            id: "sleep",
            icon: Moon,
            title: "Sleep & Relaxation",
            color: "text-secondary",
            bgColor: "bg-secondary/10",
            description: "Improve your sleep quality and relaxation with these gentle, soothing herbs that help calm the mind and prepare the body for rest.",
            herbs: [
                { name: "Chamomile", benefit: "Classic bedtime tea for peaceful sleep" },
                { name: "African Sage", benefit: "Aromatic relaxation therapy" },
                { name: "Hibiscus", benefit: "Evening wind-down ritual" }
            ],
            tips: "Create a consistent bedtime routine, limit screen time before sleep, and keep your bedroom cool and dark.",
            image: "/attached_assets/generated_images/African_sage_plant_11f1d049.png"
        },
        {
            id: "weight",
            icon: Scale,
            title: "Weight & Balance",
            color: "text-primary",
            bgColor: "bg-primary/10",
            description: "Support healthy weight management and metabolic balance with these herbs that assist digestion, metabolism, and overall wellness.",
            herbs: [
                { name: "Neem", benefit: "Blood sugar balance support" },
                { name: "Hibiscus", benefit: "Metabolism and hydration support" },
                { name: "Moringa", benefit: "Nutrient density for healthy meals" }
            ],
            tips: "Focus on whole foods, regular meals, portion control, and combining herbs with balanced nutrition and physical activity.",
            image: "/attached_assets/generated_images/Neem_tree_leaves_8f8d6bbc.png"
        }
    ];
    return (_jsx("div", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("h1", { className: "text-4xl font-bold text-center mb-8", "data-testid": "text-page-title", children: "Wellbeing Categories" }), _jsx("p", { className: "text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto", children: "Explore natural solutions organized by your wellness goals and needs." }), _jsx("div", { className: "space-y-16", children: wellbeingCategories.map((category, index) => {
                        const IconComponent = category.icon;
                        const isReversed = index % 2 === 1;
                        return (_jsx("section", { id: category.id, children: _jsx(Card, { className: "p-8 shadow-lg border border-border", children: _jsxs("div", { className: `grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`, children: [_jsxs("div", { className: isReversed ? 'lg:col-start-2' : '', children: [_jsxs("h2", { className: `text-3xl font-bold mb-4 ${category.color} flex items-center`, "data-testid": `text-category-${category.id}`, children: [_jsx(IconComponent, { className: "mr-3 h-8 w-8" }), category.title] }), _jsx("p", { className: "text-muted-foreground mb-6", children: category.description }), _jsx("div", { className: "space-y-4", children: category.herbs.map((herb, herbIndex) => (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Badge, { className: `${category.bgColor} ${category.color} border-0`, children: herb.name }), _jsxs("span", { className: "text-sm text-muted-foreground", children: ["- ", herb.benefit] })] }, herbIndex))) }), _jsxs("div", { className: "mt-6 p-4 bg-muted rounded-lg", children: [_jsx("h4", { className: "font-semibold mb-2", children: "Lifestyle Tips:" }), _jsx("p", { className: "text-sm text-muted-foreground", children: category.tips })] })] }), _jsx("div", { className: isReversed ? 'lg:col-start-1' : '', children: _jsx("img", { src: category.image, alt: `${category.title} lifestyle`, className: "rounded-lg w-full h-64 object-cover" }) })] }) }) }, category.id));
                    }) })] }) }));
}
