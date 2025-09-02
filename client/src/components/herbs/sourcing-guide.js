import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, ShoppingBag, Leaf, Star, AlertTriangle } from "lucide-react";
const sourcingOptions = [
    {
        id: "local-markets",
        title: "Local Markets & Farmers",
        icon: MapPin,
        description: "Traditional markets and local farmers",
        pros: ["Fresh and local", "Support local economy", "Often organic", "Bargain prices"],
        cons: ["Limited selection", "Seasonal availability", "Quality varies"],
        tips: [
            "Ask vendors about freshness and origin",
            "Visit early for best selection",
            "Build relationships with regular vendors",
            "Ask about growing methods"
        ],
        bestFor: ["Fresh leaves", "Local varieties", "Bulk purchases", "Seasonal herbs"]
    },
    {
        id: "health-stores",
        title: "Health Food Stores",
        icon: ShoppingBag,
        description: "Specialized health and wellness stores",
        pros: ["Quality assurance", "Organic options", "Expert staff", "Consistent supply"],
        cons: ["Higher prices", "Limited fresh options", "May be processed"],
        tips: [
            "Look for organic certification",
            "Check expiration dates",
            "Ask staff for recommendations",
            "Compare prices between stores"
        ],
        bestFor: ["Powdered herbs", "Capsules", "Essential oils", "Rare herbs"]
    },
    {
        id: "online-retailers",
        title: "Online Retailers",
        icon: Globe,
        description: "E-commerce platforms and specialty sites",
        pros: ["Wide selection", "Convenient", "Reviews available", "Bulk options"],
        cons: ["Cannot inspect quality", "Shipping costs", "Delivery time", "Return issues"],
        tips: [
            "Read customer reviews carefully",
            "Check for organic certification",
            "Compare prices across sites",
            "Start with small orders"
        ],
        bestFor: ["Rare herbs", "Bulk orders", "Convenience", "International varieties"]
    },
    {
        id: "grow-own",
        title: "Grow Your Own",
        icon: Leaf,
        description: "Home gardening and cultivation",
        pros: ["Most rewarding", "Cost effective", "Fresh supply", "Control over quality"],
        cons: ["Requires time", "Space needed", "Learning curve", "Seasonal limitations"],
        tips: [
            "Start with easy-to-grow herbs",
            "Use containers if space is limited",
            "Research growing requirements",
            "Join local gardening groups"
        ],
        bestFor: ["Fresh leaves", "Continuous supply", "Cost savings", "Educational"]
    }
];
const qualityIndicators = [
    {
        title: "Fresh Herbs",
        indicators: [
            "Bright, vibrant color",
            "Firm texture",
            "Strong aroma",
            "No wilting or browning"
        ]
    },
    {
        title: "Dried Herbs",
        indicators: [
            "Intact, whole pieces",
            "Strong fragrance",
            "No mold or moisture",
            "Recent harvest date"
        ]
    },
    {
        title: "Powdered Herbs",
        indicators: [
            "Fine, consistent texture",
            "Rich color",
            "Strong aroma",
            "Sealed packaging"
        ]
    }
];
export default function SourcingGuide({ herb }) {
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-xl font-semibold mb-4", children: ["Where to Find ", herb.name] }), _jsxs("p", { className: "text-muted-foreground mb-6", children: ["Discover the best places to source ", herb.name, " and how to ensure quality"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: sourcingOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (_jsxs(Card, { className: "overflow-hidden", children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [_jsx(IconComponent, { className: "h-5 w-5" }), option.title] }), _jsx("p", { className: "text-sm text-muted-foreground", children: option.description })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 gap-3", children: [_jsxs("div", { children: [_jsxs("h4", { className: "font-medium text-sm mb-2 flex items-center gap-1", children: [_jsx(Star, { className: "h-4 w-4 text-green-600" }), "Pros"] }), _jsx("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1", children: option.pros.map((pro, index) => (_jsx("li", { children: pro }, index))) })] }), _jsxs("div", { children: [_jsxs("h4", { className: "font-medium text-sm mb-2 flex items-center gap-1", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-orange-600" }), "Cons"] }), _jsx("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1", children: option.cons.map((con, index) => (_jsx("li", { children: con }, index))) })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-sm mb-2", children: "Tips:" }), _jsx("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1", children: option.tips.map((tip, index) => (_jsx("li", { children: tip }, index))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-sm mb-2", children: "Best for:" }), _jsx("div", { className: "flex flex-wrap gap-1", children: option.bestFor.map((item) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: item }, item))) })] })] })] }, option.id));
                }) }), _jsxs(Card, { className: "bg-green-50 border-green-200", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-green-800", children: "Quality Indicators" }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: qualityIndicators.map((category) => (_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-green-800 mb-2", children: category.title }), _jsx("ul", { className: "list-disc list-inside text-sm text-green-700 space-y-1", children: category.indicators.map((indicator, index) => (_jsx("li", { children: indicator }, index))) })] }, category.title))) }) })] }), herb.region && (_jsxs(Card, { className: "bg-blue-50 border-blue-200", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-blue-800", children: "Regional Information" }) }), _jsx(CardContent, { children: _jsxs("p", { className: "text-blue-700 text-sm", children: [herb.name, " is native to ", herb.region, ".", herb.isIndigenous === "true"
                                    ? " This indigenous herb has been used traditionally in local communities for generations. Look for it in local markets and traditional medicine shops."
                                    : " This herb has been adopted globally and is now widely available in most regions."] }) })] })), _jsxs(Card, { className: "bg-yellow-50 border-yellow-200", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-yellow-800", children: "Safety Reminders" }) }), _jsx(CardContent, { children: _jsxs("ul", { className: "list-disc list-inside text-sm text-yellow-700 space-y-1", children: [_jsx("li", { children: "Always verify the source and quality of herbs" }), _jsx("li", { children: "Check for organic certification when possible" }), _jsx("li", { children: "Avoid herbs that look moldy, discolored, or have unusual odors" }), _jsx("li", { children: "Store herbs properly to maintain freshness and potency" }), _jsx("li", { children: "Consult with healthcare providers about herb interactions" })] }) })] })] }));
}
