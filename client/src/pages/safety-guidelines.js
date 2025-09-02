import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Heart, BookOpen, Phone } from "lucide-react";
export default function SafetyGuidelines() {
    const safetyPrinciples = [
        {
            icon: AlertTriangle,
            title: "Consult Healthcare Providers",
            description: "Always consult with qualified healthcare providers before using herbs, especially if you have existing medical conditions or are taking medications.",
            color: "text-red-600"
        },
        {
            icon: Shield,
            title: "Start Small",
            description: "Begin with small amounts and gradually increase as needed. Monitor your body's response and discontinue use if adverse effects occur.",
            color: "text-blue-600"
        },
        {
            icon: Heart,
            title: "Know Your Body",
            description: "Understand your individual health conditions, allergies, and sensitivities. What works for others may not work for you.",
            color: "text-green-600"
        }
    ];
    const safetyChecklist = [
        "Research the herb thoroughly before use",
        "Check for potential drug interactions",
        "Verify the quality and source of herbs",
        "Start with the lowest recommended dose",
        "Monitor for any adverse reactions",
        "Keep a record of herbs you're using",
        "Store herbs properly in cool, dry places",
        "Check expiration dates regularly"
    ];
    const warningSigns = [
        "Allergic reactions (rash, itching, swelling)",
        "Digestive upset (nausea, vomiting, diarrhea)",
        "Dizziness or lightheadedness",
        "Changes in heart rate or blood pressure",
        "Unusual fatigue or weakness",
        "Mood changes or irritability",
        "Sleep disturbances",
        "Headaches or migraines"
    ];
    const specialPopulations = [
        {
            group: "Pregnant & Breastfeeding Women",
            considerations: [
                "Many herbs are not safe during pregnancy",
                "Some herbs can affect milk supply",
                "Always consult healthcare provider first",
                "Avoid herbs with hormonal effects"
            ]
        },
        {
            group: "Children",
            considerations: [
                "Children's bodies process herbs differently",
                "Dosages must be adjusted for age and weight",
                "Some herbs are not safe for children",
                "Always consult pediatric healthcare provider"
            ]
        },
        {
            group: "Elderly",
            considerations: [
                "May have multiple health conditions",
                "Often taking multiple medications",
                "Higher risk of drug interactions",
                "May need lower dosages"
            ]
        },
        {
            group: "People with Chronic Conditions",
            considerations: [
                "Diabetes, heart disease, kidney disease",
                "Autoimmune conditions",
                "Mental health conditions",
                "Cancer or cancer treatment history"
            ]
        }
    ];
    return (_jsx("div", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "w-20 h-20 bg-red-100 rounded-full flex items-center justify-center", children: _jsx(Shield, { className: "h-10 w-10 text-red-600" }) }) }), _jsx("h1", { className: "text-4xl font-bold mb-6 text-red-600", "data-testid": "text-page-title", children: "Safety Guidelines" }), _jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto", children: "Essential safety information for responsible herbal use. Your health and safety are our top priority." })] }), _jsxs(Card, { className: "mb-16 bg-red-50 border-red-200", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-red-800", children: [_jsx(AlertTriangle, { className: "h-6 w-6" }), "Important Medical Disclaimer"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4 text-red-800", children: [_jsxs("p", { children: [_jsx("strong", { children: "This information is for educational purposes only and is not intended as medical advice." }), "Herbal remedies should not replace professional medical treatment."] }), _jsx("p", { children: "Always consult with qualified healthcare providers before using herbs, especially if you have existing medical conditions, are pregnant, breastfeeding, or taking medications." }), _jsx("p", { children: "If you experience any adverse reactions, discontinue use immediately and seek medical attention." })] }) })] }), _jsxs("div", { className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Core Safety Principles" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: safetyPrinciples.map((principle, index) => {
                                const IconComponent = principle.icon;
                                return (_jsx(Card, { className: "text-center", children: _jsxs(CardContent, { className: "pt-6", children: [_jsx(IconComponent, { className: `h-12 w-12 mx-auto mb-4 ${principle.color}` }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: principle.title }), _jsx("p", { className: "text-muted-foreground", children: principle.description })] }) }, index));
                            }) })] }), _jsxs(Card, { className: "mb-16", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(BookOpen, { className: "h-6 w-6" }), "Pre-Use Safety Checklist"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: safetyChecklist.map((item, index) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-muted rounded-lg", children: [_jsx("div", { className: "w-2 h-2 bg-green-600 rounded-full" }), _jsx("span", { className: "text-sm", children: item })] }, index))) }) })] }), _jsxs(Card, { className: "mb-16", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-orange-600", children: [_jsx(AlertTriangle, { className: "h-6 w-6" }), "Warning Signs to Watch For"] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-muted-foreground mb-4", children: "If you experience any of these symptoms while using herbs, discontinue use immediately and consult a healthcare provider:" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: warningSigns.map((sign, index) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200", children: [_jsx("div", { className: "w-2 h-2 bg-orange-600 rounded-full" }), _jsx("span", { className: "text-sm", children: sign })] }, index))) })] })] }), _jsxs("div", { className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Special Considerations" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: specialPopulations.map((population, index) => (_jsxs(Card, { className: "p-6", children: [_jsx(CardHeader, { className: "pb-4", children: _jsx("h3", { className: "text-lg font-semibold text-blue-600", children: population.group }) }), _jsx(CardContent, { children: _jsx("ul", { className: "space-y-2", children: population.considerations.map((consideration, idx) => (_jsxs("li", { className: "flex items-start gap-2 text-sm text-muted-foreground", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full mt-2" }), _jsx("span", { children: consideration })] }, idx))) }) })] }, index))) })] }), _jsxs(Card, { className: "bg-blue-50 border-blue-200", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-blue-800", children: [_jsx(Phone, { className: "h-6 w-6" }), "Emergency Information"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4 text-blue-800", children: [_jsx("p", { children: _jsx("strong", { children: "In case of emergency or severe adverse reaction:" }) }), _jsxs("ul", { className: "space-y-2 ml-4", children: [_jsx("li", { children: "\u2022 Call emergency services (911) immediately" }), _jsx("li", { children: "\u2022 Contact your local poison control center" }), _jsx("li", { children: "\u2022 Bring the herb or product with you to the emergency room" }), _jsx("li", { children: "\u2022 Inform healthcare providers about all herbs and medications you're taking" })] }), _jsxs("p", { className: "mt-4", children: [_jsx("strong", { children: "Poison Control Hotline:" }), " 1-800-222-1222 (US)"] })] }) })] })] }) }));
}
