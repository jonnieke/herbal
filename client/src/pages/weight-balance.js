import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, Apple, Heart, Leaf, Clock, Target, AlertTriangle } from "lucide-react";
import HerbCard from "@/components/herbs/herb-card";
import HerbDetailModal from "@/components/herbs/herb-detail-modal";
export default function WeightBalance() {
    const [selectedHerb, setSelectedHerb] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: allHerbs = [] } = useQuery({
        queryKey: ["/api/herbs"],
    });
    // Filter herbs for weight balance and metabolism
    const weightBalanceHerbs = allHerbs.filter(herb => herb.categories.includes("Weight Balance") ||
        herb.categories.includes("General Wellness"));
    const handleHerbClick = (herb) => {
        setSelectedHerb(herb);
        setIsModalOpen(true);
    };
    const globalHealthIssues = [
        {
            id: "obesity-epidemic",
            icon: Scale,
            title: "Global Obesity Epidemic",
            color: "text-red-600",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
            definition: "Obesity has become a global health crisis affecting over 2 billion people worldwide, with rates tripling since 1975.",
            statistics: [
                "39% of adults worldwide are overweight",
                "13% of adults are obese",
                "340 million children and adolescents are overweight or obese",
                "Obesity-related deaths: 4.7 million annually"
            ],
            rootCauses: [
                "Ultra-processed foods high in sugar, salt, and unhealthy fats",
                "Sedentary lifestyles and reduced physical activity",
                "Food marketing and availability of cheap, unhealthy options",
                "Stress and emotional eating patterns",
                "Lack of nutrition education and cooking skills",
                "Food deserts and limited access to fresh produce"
            ],
            healthConsequences: [
                "Type 2 Diabetes - 90% of cases linked to obesity",
                "Cardiovascular Disease - leading cause of death globally",
                "Hypertension - affects 1.3 billion people worldwide",
                "Sleep Apnea and respiratory issues",
                "Joint problems and reduced mobility",
                "Mental health issues and depression"
            ]
        },
        {
            id: "metabolic-syndrome",
            icon: Heart,
            title: "Metabolic Syndrome",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
            definition: "A cluster of conditions that occur together, increasing the risk of heart disease, stroke, and type 2 diabetes.",
            components: [
                "Abdominal obesity (waist circumference >40 inches men, >35 inches women)",
                "High blood pressure (≥130/85 mmHg)",
                "High blood sugar (≥100 mg/dL fasting)",
                "High triglycerides (≥150 mg/dL)",
                "Low HDL cholesterol (<40 mg/dL men, <50 mg/dL women)"
            ],
            prevalence: "Affects 25-30% of adults globally",
            riskFactors: [
                "Poor diet high in refined carbohydrates and sugars",
                "Physical inactivity and sedentary behavior",
                "Chronic stress and poor sleep quality",
                "Genetic predisposition",
                "Age and hormonal changes"
            ]
        },
        {
            id: "inflammation",
            icon: AlertTriangle,
            title: "Chronic Inflammation",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
            definition: "Low-grade, persistent inflammation that contributes to most chronic diseases and weight gain resistance.",
            causes: [
                "Processed foods and refined sugars",
                "Trans fats and vegetable oils",
                "Chronic stress and poor sleep",
                "Environmental toxins and pollution",
                "Sedentary lifestyle",
                "Food sensitivities and gut dysbiosis"
            ],
            healthImpact: [
                "Insulin resistance and diabetes",
                "Cardiovascular disease",
                "Autoimmune conditions",
                "Cognitive decline and dementia",
                "Cancer risk increase",
                "Accelerated aging"
            ]
        }
    ];
    const nutritionEducation = {
        title: "Nutrition Fundamentals for Global Health",
        principles: [
            {
                name: "Whole Foods First",
                description: "Prioritize unprocessed, nutrient-dense foods from nature",
                examples: ["Fresh vegetables and fruits", "Whole grains", "Lean proteins", "Healthy fats"],
                benefits: ["Higher nutrient density", "Better satiety", "Stable blood sugar", "Reduced inflammation"]
            },
            {
                name: "Plant-Based Foundation",
                description: "Build meals around plant foods for optimal health",
                examples: ["Legumes and beans", "Nuts and seeds", "Colorful vegetables", "Whole fruits"],
                benefits: ["Fiber for gut health", "Antioxidants", "Lower calorie density", "Heart health support"]
            },
            {
                name: "Mindful Eating",
                description: "Develop awareness of hunger, fullness, and eating patterns",
                examples: ["Eat slowly and chew thoroughly", "Listen to hunger cues", "Avoid emotional eating", "Practice gratitude"],
                benefits: ["Better portion control", "Improved digestion", "Reduced stress", "Sustainable habits"]
            },
            {
                name: "Hydration Priority",
                description: "Water is essential for metabolism and overall health",
                examples: ["Drink water before meals", "Limit sugary beverages", "Include herbal teas", "Monitor urine color"],
                benefits: ["Improved metabolism", "Better digestion", "Reduced cravings", "Clearer thinking"]
            }
        ]
    };
    const lifestyleStrategies = [
        {
            category: "Physical Activity",
            strategies: [
                "Start with 10-minute walks daily",
                "Gradually increase to 150 minutes/week",
                "Include strength training 2-3 times/week",
                "Find activities you enjoy",
                "Use stairs instead of elevators",
                "Walk or bike for short trips"
            ]
        },
        {
            category: "Sleep Optimization",
            strategies: [
                "Aim for 7-9 hours of quality sleep",
                "Establish consistent sleep schedule",
                "Create a relaxing bedtime routine",
                "Limit screen time before bed",
                "Keep bedroom cool and dark",
                "Avoid large meals before sleep"
            ]
        },
        {
            category: "Stress Management",
            strategies: [
                "Practice daily meditation or deep breathing",
                "Engage in regular physical activity",
                "Spend time in nature",
                "Maintain social connections",
                "Set boundaries and prioritize self-care",
                "Consider therapy or counseling if needed"
            ]
        },
        {
            category: "Environment Optimization",
            strategies: [
                "Stock kitchen with healthy options",
                "Remove tempting processed foods",
                "Plan meals and snacks ahead",
                "Use smaller plates and bowls",
                "Eat at the table without distractions",
                "Keep healthy snacks visible"
            ]
        }
    ];
    const herbalSupport = {
        metabolism: [
            {
                name: "Green Tea",
                benefits: ["Contains EGCG for fat oxidation", "Boosts metabolism", "Rich in antioxidants"],
                usage: "2-3 cups daily, best between meals"
            },
            {
                name: "Ginger",
                benefits: ["Improves digestion", "Reduces inflammation", "Supports blood sugar balance"],
                usage: "Fresh ginger tea or 1-2 inches daily"
            },
            {
                name: "Cinnamon",
                benefits: ["Helps regulate blood sugar", "Reduces insulin resistance", "Anti-inflammatory"],
                usage: "1/2-1 tsp daily in food or tea"
            }
        ],
        appetite: [
            {
                name: "Fiber-Rich Herbs",
                benefits: ["Increase satiety", "Slow digestion", "Support gut health"],
                examples: ["Psyllium husk", "Chia seeds", "Flaxseeds"]
            },
            {
                name: "Bitter Herbs",
                benefits: ["Stimulate digestive enzymes", "Reduce cravings", "Support liver function"],
                examples: ["Dandelion root", "Burdock root", "Gentian"]
            }
        ],
        stress: [
            {
                name: "Adaptogenic Herbs",
                benefits: ["Help body adapt to stress", "Reduce cortisol levels", "Support energy balance"],
                examples: ["Ashwagandha", "Rhodiola", "Holy basil"]
            }
        ]
    };
    return (_jsx("div", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "w-20 h-20 bg-green-100 rounded-full flex items-center justify-center", children: _jsx(Scale, { className: "h-10 w-10 text-green-600" }) }) }), _jsx("h1", { className: "text-4xl font-bold mb-6 text-green-600", "data-testid": "text-page-title", children: "Global Health & Weight Balance" }), _jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto", children: "Understanding how eating habits and lifestyle choices impact global health outcomes. Discover sustainable approaches to weight management and overall wellbeing." })] }), _jsxs("div", { className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Major Health Issues Stemming from Eating Habits" }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: globalHealthIssues.map((issue) => {
                                const IconComponent = issue.icon;
                                return (_jsxs(Card, { className: `p-6 shadow-lg border-2 ${issue.borderColor}`, children: [_jsxs(CardHeader, { className: "pb-4", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: `p-3 rounded-full ${issue.bgColor}`, children: _jsx(IconComponent, { className: `h-6 w-6 ${issue.color}` }) }), _jsx("h3", { className: `text-xl font-bold ${issue.color}`, children: issue.title })] }), _jsx("p", { className: "text-muted-foreground text-sm", children: issue.definition })] }), _jsxs(CardContent, { className: "space-y-4", children: [issue.statistics && (_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Global Statistics:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: issue.statistics.map((stat, index) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-red-500 rounded-full" }), stat] }, index))) })] })), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Root Causes:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: issue.rootCauses?.map((cause, index) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-orange-500 rounded-full" }), cause] }, index))) })] }), issue.healthConsequences && (_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Health Consequences:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: issue.healthConsequences.map((consequence, index) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-purple-500 rounded-full" }), consequence] }, index))) })] }))] })] }, issue.id));
                            }) })] }), _jsx("div", { className: "mb-16", children: _jsxs(Card, { className: "p-8 shadow-lg", children: [_jsx(CardHeader, { className: "text-center pb-6", children: _jsxs("h2", { className: "text-3xl font-bold mb-4 flex items-center justify-center gap-3", children: [_jsx(Apple, { className: "h-8 w-8 text-green-600" }), nutritionEducation.title] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: nutritionEducation.principles.map((principle, index) => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-green-600 mb-2", children: principle.name }), _jsx("p", { className: "text-muted-foreground mb-3", children: principle.description })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Examples:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1 mb-3", children: principle.examples.map((example, idx) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), example] }, idx))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Benefits:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: principle.benefits.map((benefit, idx) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), benefit] }, idx))) })] })] }, index))) }) })] }) }), _jsxs("div", { className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Lifestyle Strategies for Sustainable Health" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: lifestyleStrategies.map((strategy, index) => (_jsxs(Card, { className: "p-6 shadow-lg", children: [_jsx(CardHeader, { className: "pb-4", children: _jsx("h3", { className: "text-lg font-semibold text-center", children: strategy.category }) }), _jsx(CardContent, { children: _jsx("ul", { className: "space-y-2", children: strategy.strategies.map((item, idx) => (_jsxs("li", { className: "flex items-start gap-2 text-sm text-muted-foreground", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full mt-2" }), _jsx("span", { children: item })] }, idx))) }) })] }, index))) })] }), _jsxs("div", { className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Herbal Support for Weight Balance" }), _jsxs(Tabs, { defaultValue: "metabolism", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "metabolism", children: "Metabolism" }), _jsx(TabsTrigger, { value: "appetite", children: "Appetite Control" }), _jsx(TabsTrigger, { value: "stress", children: "Stress Management" })] }), _jsx(TabsContent, { value: "metabolism", className: "space-y-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: herbalSupport.metabolism.map((herb, index) => (_jsxs(Card, { className: "p-6", children: [_jsx(CardHeader, { children: _jsx("h3", { className: "text-lg font-semibold", children: herb.name }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Benefits:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: herb.benefits.map((benefit, idx) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), benefit] }, idx))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Usage:" }), _jsx("p", { className: "text-sm text-muted-foreground", children: herb.usage })] })] })] }, index))) }) }), _jsx(TabsContent, { value: "appetite", className: "space-y-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: herbalSupport.appetite.map((category, index) => (_jsxs(Card, { className: "p-6", children: [_jsx(CardHeader, { children: _jsx("h3", { className: "text-lg font-semibold", children: category.name }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Benefits:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: category.benefits.map((benefit, idx) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), benefit] }, idx))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Examples:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: category.examples.map((example, idx) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-orange-500 rounded-full" }), example] }, idx))) })] })] })] }, index))) }) }), _jsx(TabsContent, { value: "stress", className: "space-y-6", children: _jsx("div", { className: "grid grid-cols-1 gap-6", children: herbalSupport.stress.map((category, index) => (_jsxs(Card, { className: "p-6", children: [_jsx(CardHeader, { children: _jsx("h3", { className: "text-lg font-semibold", children: category.name }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Benefits:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: category.benefits.map((benefit, idx) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-purple-500 rounded-full" }), benefit] }, idx))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Examples:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: category.examples.map((example, idx) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), example] }, idx))) })] })] })] }, index))) }) })] })] }), _jsxs("div", { className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Herbs for Weight Balance & Metabolism" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: weightBalanceHerbs.map((herb) => (_jsx("div", { onClick: () => handleHerbClick(herb), children: _jsx(HerbCard, { herb: herb }) }, herb.id))) })] }), _jsx("div", { className: "text-center", children: _jsx(Card, { className: "p-8 bg-green-50 border-green-200", children: _jsxs(CardContent, { children: [_jsx("h3", { className: "text-2xl font-bold text-green-800 mb-4", children: "Start Your Health Journey Today" }), _jsx("p", { className: "text-green-700 mb-6", children: "Remember, sustainable weight management is about creating lasting lifestyle changes, not quick fixes. Focus on nourishing your body with whole foods, staying active, managing stress, and getting adequate sleep." }), _jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [_jsxs(Badge, { variant: "outline", className: "text-green-700 border-green-300", children: [_jsx(Target, { className: "h-4 w-4 mr-1" }), "Set Realistic Goals"] }), _jsxs(Badge, { variant: "outline", className: "text-green-700 border-green-300", children: [_jsx(Clock, { className: "h-4 w-4 mr-1" }), "Be Patient"] }), _jsxs(Badge, { variant: "outline", className: "text-green-700 border-green-300", children: [_jsx(Heart, { className: "h-4 w-4 mr-1" }), "Prioritize Health"] }), _jsxs(Badge, { variant: "outline", className: "text-green-700 border-green-300", children: [_jsx(Leaf, { className: "h-4 w-4 mr-1" }), "Use Natural Support"] })] })] }) }) }), _jsx(HerbDetailModal, { herb: selectedHerb, isOpen: isModalOpen, onClose: () => {
                        setIsModalOpen(false);
                        setSelectedHerb(null);
                    } })] }) }));
}
