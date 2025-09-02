import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Heart, Brain, Leaf, Activity, Moon, Globe, TrendingUp } from "lucide-react";
import HerbCard from "@/components/herbs/herb-card";
import HerbDetailModal from "@/components/herbs/herb-detail-modal";
export default function GeneralWellness() {
    const [selectedHerb, setSelectedHerb] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: allHerbs = [] } = useQuery({
        queryKey: ["/api/herbs"],
    });
    // Filter herbs for general wellness
    const wellnessHerbs = allHerbs.filter(herb => herb.categories.includes("General Wellness") ||
        herb.categories.includes("Energy") ||
        herb.categories.includes("Mental Health"));
    const handleHerbClick = (herb) => {
        setSelectedHerb(herb);
        setIsModalOpen(true);
    };
    const globalHealthPillars = [
        {
            id: "nutrition",
            icon: Leaf,
            title: "Nutrition & Diet",
            color: "text-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            definition: "The foundation of health - what we eat directly impacts every system in our body.",
            keyPrinciples: [
                "Whole, unprocessed foods",
                "Plant-based foundation",
                "Adequate protein and healthy fats",
                "Fiber-rich carbohydrates",
                "Hydration with clean water"
            ],
            globalImpact: [
                "Poor nutrition causes 11 million deaths annually",
                "2 billion people lack essential micronutrients",
                "Diet-related diseases cost $2 trillion globally",
                "Food choices impact climate change"
            ],
            preventionStrategies: [
                "Eat a rainbow of vegetables daily",
                "Choose whole grains over refined",
                "Include healthy fats (nuts, seeds, avocados)",
                "Limit processed foods and added sugars",
                "Stay hydrated with water and herbal teas"
            ]
        },
        {
            id: "movement",
            icon: Activity,
            title: "Physical Activity",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            definition: "Regular movement is essential for maintaining health, preventing disease, and supporting mental wellbeing.",
            keyPrinciples: [
                "150 minutes moderate activity weekly",
                "Strength training 2-3 times per week",
                "Flexibility and balance exercises",
                "Daily movement throughout the day",
                "Activities you enjoy and can sustain"
            ],
            globalImpact: [
                "Physical inactivity causes 3.2 million deaths annually",
                "60-85% of people worldwide lead sedentary lives",
                "Exercise reduces risk of chronic diseases by 30%",
                "Active communities have better mental health"
            ],
            preventionStrategies: [
                "Start with 10-minute walks daily",
                "Use stairs instead of elevators",
                "Walk or bike for short trips",
                "Join group activities or sports",
                "Make movement a social activity"
            ]
        },
        {
            id: "sleep",
            icon: Moon,
            title: "Sleep & Recovery",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
            definition: "Quality sleep is essential for immune function, mental health, and overall wellbeing.",
            keyPrinciples: [
                "7-9 hours of quality sleep nightly",
                "Consistent sleep schedule",
                "Dark, cool, quiet sleep environment",
                "Relaxing bedtime routine",
                "Limit screen time before bed"
            ],
            globalImpact: [
                "1 in 3 adults don't get enough sleep",
                "Sleep deprivation costs $411 billion annually",
                "Poor sleep linked to 7 of 15 leading causes of death",
                "Sleep quality affects immune function"
            ],
            preventionStrategies: [
                "Establish consistent sleep schedule",
                "Create relaxing bedtime routine",
                "Keep bedroom cool and dark",
                "Avoid caffeine after 2 PM",
                "Use calming herbs like chamomile"
            ]
        },
        {
            id: "stress",
            icon: Brain,
            title: "Stress Management",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
            definition: "Chronic stress affects every system in the body and is a major contributor to modern health issues.",
            keyPrinciples: [
                "Regular stress reduction practices",
                "Mindfulness and meditation",
                "Social connections and support",
                "Time in nature",
                "Healthy boundaries and self-care"
            ],
            globalImpact: [
                "75% of doctor visits are stress-related",
                "Chronic stress affects 80% of adults",
                "Stress costs $300 billion annually in lost productivity",
                "Stress weakens immune system function"
            ],
            preventionStrategies: [
                "Practice daily meditation or deep breathing",
                "Spend time in nature regularly",
                "Maintain strong social connections",
                "Set healthy boundaries",
                "Use adaptogenic herbs for support"
            ]
        }
    ];
    const preventiveHealthStrategies = {
        title: "Preventive Health Strategies for Global Wellness",
        categories: [
            {
                name: "Immune System Support",
                description: "Strengthening the body's natural defense system",
                strategies: [
                    "Eat immune-boosting foods (garlic, ginger, citrus)",
                    "Get adequate vitamin D from sun exposure",
                    "Practice good hygiene and hand washing",
                    "Manage stress levels",
                    "Get quality sleep",
                    "Stay physically active"
                ],
                herbs: ["Echinacea", "Elderberry", "Ginger", "Turmeric", "Garlic"]
            },
            {
                name: "Gut Health Optimization",
                description: "Supporting the microbiome for overall health",
                strategies: [
                    "Eat fiber-rich foods daily",
                    "Include fermented foods (yogurt, sauerkraut)",
                    "Stay hydrated with clean water",
                    "Limit processed foods and antibiotics",
                    "Manage stress levels",
                    "Get adequate sleep"
                ],
                herbs: ["Ginger", "Peppermint", "Chamomile", "Fennel", "Probiotics"]
            },
            {
                name: "Detoxification Support",
                description: "Helping the body eliminate toxins naturally",
                strategies: [
                    "Stay hydrated with clean water",
                    "Eat cruciferous vegetables",
                    "Support liver function with herbs",
                    "Sweat through exercise or sauna",
                    "Get adequate fiber for elimination",
                    "Reduce exposure to environmental toxins"
                ],
                herbs: ["Dandelion root", "Milk thistle", "Burdock root", "Nettle", "Cilantro"]
            },
            {
                name: "Energy & Vitality",
                description: "Maintaining optimal energy levels throughout life",
                strategies: [
                    "Eat nutrient-dense whole foods",
                    "Stay hydrated throughout the day",
                    "Get regular physical activity",
                    "Manage stress and get adequate sleep",
                    "Use energizing herbs and adaptogens",
                    "Practice mindful eating"
                ],
                herbs: ["Ginseng", "Rhodiola", "Ashwagandha", "Moringa", "Green tea"]
            }
        ]
    };
    const lifestyleOptimization = [
        {
            category: "Daily Routines",
            practices: [
                "Morning hydration with lemon water",
                "10-15 minutes of stretching or yoga",
                "Mindful breakfast with protein and fiber",
                "Regular meal timing",
                "Evening wind-down routine",
                "Gratitude practice"
            ]
        },
        {
            category: "Environmental Health",
            practices: [
                "Use natural cleaning products",
                "Improve indoor air quality with plants",
                "Filter drinking water",
                "Reduce plastic use",
                "Choose organic foods when possible",
                "Spend time in nature regularly"
            ]
        },
        {
            category: "Social Wellness",
            practices: [
                "Maintain strong relationships",
                "Join community groups or activities",
                "Practice active listening",
                "Give and receive support",
                "Volunteer or help others",
                "Stay connected with family and friends"
            ]
        },
        {
            category: "Mental Wellness",
            practices: [
                "Practice mindfulness or meditation",
                "Learn new skills or hobbies",
                "Read regularly",
                "Limit social media use",
                "Seek professional help when needed",
                "Practice self-compassion"
            ]
        }
    ];
    const herbalWellnessSupport = {
        adaptogens: [
            {
                name: "Ashwagandha",
                benefits: ["Reduces stress and cortisol", "Improves energy and focus", "Supports immune function"],
                usage: "300-600mg daily, best in morning"
            },
            {
                name: "Rhodiola",
                benefits: ["Enhances mental performance", "Reduces fatigue", "Supports stress adaptation"],
                usage: "200-400mg daily, avoid evening"
            },
            {
                name: "Holy Basil",
                benefits: ["Reduces stress and anxiety", "Supports respiratory health", "Anti-inflammatory"],
                usage: "300-600mg daily or as tea"
            }
        ],
        immune: [
            {
                name: "Echinacea",
                benefits: ["Stimulates immune system", "Reduces cold duration", "Anti-inflammatory"],
                usage: "At first sign of illness, 3-5 days"
            },
            {
                name: "Elderberry",
                benefits: ["Antiviral properties", "Rich in antioxidants", "Supports respiratory health"],
                usage: "During cold/flu season, 1-2 weeks"
            },
            {
                name: "Garlic",
                benefits: ["Antimicrobial properties", "Supports cardiovascular health", "Immune boosting"],
                usage: "1-2 cloves daily or aged extract"
            }
        ],
        digestive: [
            {
                name: "Ginger",
                benefits: ["Improves digestion", "Reduces nausea", "Anti-inflammatory"],
                usage: "Fresh tea or 1-2 inches daily"
            },
            {
                name: "Peppermint",
                benefits: ["Soothes digestive discomfort", "Reduces bloating", "Calming effect"],
                usage: "1-2 cups tea daily after meals"
            },
            {
                name: "Chamomile",
                benefits: ["Gentle digestive support", "Promotes relaxation", "Anti-inflammatory"],
                usage: "1-2 cups tea daily, especially evening"
            }
        ]
    };
    return (_jsx("div", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center", children: _jsx(Shield, { className: "h-10 w-10 text-blue-600" }) }) }), _jsx("h1", { className: "text-4xl font-bold mb-6 text-blue-600", "data-testid": "text-page-title", children: "Global Wellness & Preventive Health" }), _jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto", children: "Discover how lifestyle choices impact global health outcomes and learn preventive strategies for optimal wellbeing using natural approaches and herbal support." })] }), _jsxs("div", { className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Four Pillars of Global Wellness" }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: globalHealthPillars.map((pillar) => {
                                const IconComponent = pillar.icon;
                                return (_jsxs(Card, { className: `p-6 shadow-lg border-2 ${pillar.borderColor}`, children: [_jsxs(CardHeader, { className: "pb-4", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: `p-3 rounded-full ${pillar.bgColor}`, children: _jsx(IconComponent, { className: `h-6 w-6 ${pillar.color}` }) }), _jsx("h3", { className: `text-xl font-bold ${pillar.color}`, children: pillar.title })] }), _jsx("p", { className: "text-muted-foreground text-sm", children: pillar.definition })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Key Principles:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: pillar.keyPrinciples.map((principle, index) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), principle] }, index))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Global Impact:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: pillar.globalImpact.map((impact, index) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-red-500 rounded-full" }), impact] }, index))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Prevention Strategies:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: pillar.preventionStrategies.map((strategy, index) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), strategy] }, index))) })] })] })] }, pillar.id));
                            }) })] }), _jsx("div", { className: "mb-16", children: _jsxs(Card, { className: "p-8 shadow-lg", children: [_jsx(CardHeader, { className: "text-center pb-6", children: _jsxs("h2", { className: "text-3xl font-bold mb-4 flex items-center justify-center gap-3", children: [_jsx(Globe, { className: "h-8 w-8 text-blue-600" }), preventiveHealthStrategies.title] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: preventiveHealthStrategies.categories.map((category, index) => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-blue-600 mb-2", children: category.name }), _jsx("p", { className: "text-muted-foreground mb-3", children: category.description })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Strategies:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1 mb-3", children: category.strategies.map((strategy, idx) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), strategy] }, idx))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Supporting Herbs:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: category.herbs.map((herb, idx) => (_jsx(Badge, { variant: "outline", className: "text-xs", children: herb }, idx))) })] })] }, index))) }) })] }) }), _jsxs("div", { className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Lifestyle Optimization for Wellness" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: lifestyleOptimization.map((category, index) => (_jsxs(Card, { className: "p-6 shadow-lg", children: [_jsx(CardHeader, { className: "pb-4", children: _jsx("h3", { className: "text-lg font-semibold text-center", children: category.category }) }), _jsx(CardContent, { children: _jsx("ul", { className: "space-y-2", children: category.practices.map((practice, idx) => (_jsxs("li", { className: "flex items-start gap-2 text-sm text-muted-foreground", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full mt-2" }), _jsx("span", { children: practice })] }, idx))) }) })] }, index))) })] }), _jsxs("div", { className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Herbal Support for Wellness" }), _jsxs(Tabs, { defaultValue: "adaptogens", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "adaptogens", children: "Adaptogens" }), _jsx(TabsTrigger, { value: "immune", children: "Immune Support" }), _jsx(TabsTrigger, { value: "digestive", children: "Digestive Health" })] }), _jsx(TabsContent, { value: "adaptogens", className: "space-y-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: herbalWellnessSupport.adaptogens.map((herb, index) => (_jsxs(Card, { className: "p-6", children: [_jsx(CardHeader, { children: _jsx("h3", { className: "text-lg font-semibold", children: herb.name }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Benefits:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: herb.benefits.map((benefit, idx) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), benefit] }, idx))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Usage:" }), _jsx("p", { className: "text-sm text-muted-foreground", children: herb.usage })] })] })] }, index))) }) }), _jsx(TabsContent, { value: "immune", className: "space-y-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: herbalWellnessSupport.immune.map((herb, index) => (_jsxs(Card, { className: "p-6", children: [_jsx(CardHeader, { children: _jsx("h3", { className: "text-lg font-semibold", children: herb.name }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Benefits:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: herb.benefits.map((benefit, idx) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), benefit] }, idx))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Usage:" }), _jsx("p", { className: "text-sm text-muted-foreground", children: herb.usage })] })] })] }, index))) }) }), _jsx(TabsContent, { value: "digestive", className: "space-y-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: herbalWellnessSupport.digestive.map((herb, index) => (_jsxs(Card, { className: "p-6", children: [_jsx(CardHeader, { children: _jsx("h3", { className: "text-lg font-semibold", children: herb.name }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Benefits:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: herb.benefits.map((benefit, idx) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-orange-500 rounded-full" }), benefit] }, idx))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Usage:" }), _jsx("p", { className: "text-sm text-muted-foreground", children: herb.usage })] })] })] }, index))) }) })] })] }), _jsxs("div", { className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Herbs for General Wellness" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: wellnessHerbs.map((herb) => (_jsx("div", { onClick: () => handleHerbClick(herb), children: _jsx(HerbCard, { herb: herb }) }, herb.id))) })] }), _jsx("div", { className: "text-center", children: _jsx(Card, { className: "p-8 bg-blue-50 border-blue-200", children: _jsxs(CardContent, { children: [_jsx("h3", { className: "text-2xl font-bold text-blue-800 mb-4", children: "Commit to Your Wellness Journey" }), _jsx("p", { className: "text-blue-700 mb-6", children: "Remember, optimal health is achieved through consistent, sustainable lifestyle choices. Start with small changes, build healthy habits, and use natural support to enhance your wellbeing." }), _jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [_jsxs(Badge, { variant: "outline", className: "text-blue-700 border-blue-300", children: [_jsx(Shield, { className: "h-4 w-4 mr-1" }), "Prevention First"] }), _jsxs(Badge, { variant: "outline", className: "text-blue-700 border-blue-300", children: [_jsx(Heart, { className: "h-4 w-4 mr-1" }), "Holistic Approach"] }), _jsxs(Badge, { variant: "outline", className: "text-blue-700 border-blue-300", children: [_jsx(TrendingUp, { className: "h-4 w-4 mr-1" }), "Sustainable Habits"] }), _jsxs(Badge, { variant: "outline", className: "text-blue-700 border-blue-300", children: [_jsx(Leaf, { className: "h-4 w-4 mr-1" }), "Natural Support"] })] })] }) }) }), _jsx(HerbDetailModal, { herb: selectedHerb, isOpen: isModalOpen, onClose: () => {
                        setIsModalOpen(false);
                        setSelectedHerb(null);
                    } })] }) }));
}
