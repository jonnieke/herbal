import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, GraduationCap, Shield } from "lucide-react";
export default function About() {
    const values = [
        {
            icon: Leaf,
            title: "Natural Approach",
            description: "We focus on gentle, natural solutions that work with your body's healing processes.",
            color: "text-primary bg-primary/10"
        },
        {
            icon: GraduationCap,
            title: "Education First",
            description: "We provide comprehensive education so you can make informed decisions about your wellness.",
            color: "text-accent bg-accent/10"
        },
        {
            icon: Shield,
            title: "Safety Priority",
            description: "Safety information and proper guidance are included with every recommendation.",
            color: "text-secondary bg-secondary/10"
        }
    ];
    return (_jsx("div", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-4xl font-bold text-center mb-12", "data-testid": "text-page-title", children: "About Herbal Care Hub" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-3xl font-bold mb-6 text-primary", "data-testid": "text-mission-title", children: "Our Mission" }), _jsx("p", { className: "text-lg text-muted-foreground mb-6", children: "To make herbal knowledge simple, safe, and accessible for everyone. We believe that nature has provided us with incredible healing resources, and our goal is to help you discover and use them safely." }), _jsx("p", { className: "text-muted-foreground", children: "At Herbal Care Hub, we bridge the gap between traditional wisdom and modern wellness needs, providing education and guidance for natural health solutions." })] }), _jsx("div", { children: _jsx("img", { src: "/attached_assets/generated_images/Family_enjoying_herbal_tea_747c1dae.png", alt: "Family enjoying herbal tea together", className: "rounded-xl w-full h-64 object-cover" }) })] }), _jsx(Card, { className: "p-8 shadow-lg border border-border mb-16", children: _jsxs(CardContent, { className: "p-0", children: [_jsx("h2", { className: "text-3xl font-bold mb-6 text-center text-accent", "data-testid": "text-story-title", children: "Our Story" }), _jsx("p", { className: "text-lg text-muted-foreground text-center mb-6 italic", children: "\"We believe herbs are a gift for health, balance, and vitality.\"" }), _jsxs("div", { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Herbal Care Hub was born from a deep appreciation for the wisdom of traditional healers and the growing need for accessible, reliable information about natural wellness. We recognize that many people are seeking alternatives to support their health journey, but often lack reliable guidance." }), _jsx("p", { children: "Our team combines respect for traditional knowledge with modern research to provide you with safe, practical information about herbs and natural wellness. We focus particularly on African indigenous herbs, which have been used for generations but are often overlooked in modern wellness conversations." }), _jsx("p", { children: "Every herb we feature has been carefully researched for safety and traditional uses. We believe that when used responsibly and with proper knowledge, herbs can be powerful allies in maintaining health and vitality." })] })] }) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-16", children: values.map((value, index) => {
                        const IconComponent = value.icon;
                        return (_jsxs("div", { className: "text-center", "data-testid": `value-${index}`, children: [_jsx("div", { className: `w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${value.color}`, children: _jsx(IconComponent, { className: "h-8 w-8" }) }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: value.title }), _jsx("p", { className: "text-muted-foreground text-sm", children: value.description })] }, index));
                    }) }), _jsxs("div", { className: "bg-yellow-50 border border-yellow-200 p-6 rounded-lg text-center", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", "data-testid": "text-disclaimer-title", children: "Important Disclaimer" }), _jsx("p", { className: "text-sm text-yellow-800", children: "The information provided on Herbal Care Hub is for educational purposes only and is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers before making changes to your health routine, especially if you have existing health conditions or take medications." })] })] }) }));
}
