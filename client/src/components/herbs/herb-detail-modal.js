import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Clock, Thermometer } from "lucide-react";
import HerbRecipes from "./herb-recipes";
import SourcingGuide from "./sourcing-guide";
import WellnessTracker from "./wellness-tracker";
const preparationGuides = {
    "Tea": {
        steps: [
            "Boil fresh, filtered water",
            "Add 1-2 tsp dried herb to tea infuser",
            "Pour hot water (not boiling, about 85-90°C)",
            "Steep for 5-10 minutes",
            "Remove infuser and enjoy"
        ],
        timing: "5-10 minutes",
        temperature: "85-90°C",
        tips: "Use fresh water, avoid reboiling. Steep time affects strength."
    },
    "Powder": {
        steps: [
            "Start with 1/4 to 1/2 tsp powder",
            "Mix into smoothies, yogurt, or water",
            "Store in airtight container away from light",
            "Use within 6 months for best potency"
        ],
        timing: "Immediate",
        temperature: "Room temperature",
        tips: "Start with small amounts and gradually increase. Mix well to avoid clumping."
    },
    "Fresh leaves": {
        steps: [
            "Wash fresh leaves thoroughly under cold water",
            "Use 2-3 times more than dried herb",
            "Chop finely for better extraction",
            "Add to salads, smoothies, or steep in hot water"
        ],
        timing: "Immediate",
        temperature: "Cold or room temperature",
        tips: "Use within 2-3 days of harvesting. Store in refrigerator wrapped in damp paper towel."
    },
    "Infusion": {
        steps: [
            "Bring water to a gentle boil",
            "Add herbs and remove from heat",
            "Cover and let steep for 15-30 minutes",
            "Strain through fine mesh sieve",
            "Store in refrigerator for up to 3 days"
        ],
        timing: "15-30 minutes",
        temperature: "100°C then cool",
        tips: "Longer steeping extracts more beneficial compounds. Use glass or ceramic container."
    },
    "Decoction": {
        steps: [
            "Add herbs to cold water",
            "Bring to boil and simmer for 20-30 minutes",
            "Strain and let cool",
            "Store in refrigerator for up to 3 days"
        ],
        timing: "20-30 minutes",
        temperature: "100°C simmer",
        tips: "Best for roots, bark, and hard plant parts. Simmer gently to avoid burning."
    },
    "Poultice": {
        steps: [
            "Crush fresh herbs or moisten dried herbs",
            "Apply directly to affected area",
            "Cover with clean cloth or bandage",
            "Leave for 15-30 minutes",
            "Remove and clean area thoroughly"
        ],
        timing: "15-30 minutes",
        temperature: "Room temperature",
        tips: "Test on small area first. Use fresh herbs when possible for best results."
    },
    "Capsules": {
        steps: [
            "Purchase pre-filled capsules or empty capsules",
            "Fill with powdered herb",
            "Take with water or juice",
            "Store in cool, dry place"
        ],
        timing: "Immediate",
        temperature: "Room temperature",
        tips: "Follow dosage instructions. Take with food to avoid stomach upset."
    },
    "Essential oil": {
        steps: [
            "Dilute essential oil with carrier oil (1-2 drops per tsp)",
            "Apply to skin or use in diffuser",
            "Never ingest undiluted essential oils",
            "Store in dark glass bottles"
        ],
        timing: "Immediate",
        temperature: "Room temperature",
        tips: "Always dilute before use. Test on small area first. Keep away from children and pets."
    },
    "Tincture": {
        steps: [
            "Purchase ready-made tincture or make your own",
            "Take recommended dosage with water",
            "Store in dark glass bottle",
            "Keep in cool, dark place"
        ],
        timing: "Immediate",
        temperature: "Room temperature",
        tips: "Tinctures are concentrated. Follow dosage carefully. Alcohol-based tinctures last longer."
    },
    "Extract": {
        steps: [
            "Purchase standardized extracts",
            "Follow dosage instructions on label",
            "Take with water or juice",
            "Store according to package directions"
        ],
        timing: "Immediate",
        temperature: "Room temperature",
        tips: "Extracts are highly concentrated. Start with lowest recommended dose."
    }
};
export default function HerbDetailModal({ herb, isOpen, onClose }) {
    if (!herb)
        return null;
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "flex items-center gap-3 text-2xl", children: [_jsx("span", { children: herb.emoji }), _jsx("span", { children: herb.name }), herb.isIndigenous === "true" && _jsx(Badge, { variant: "secondary", children: "African" })] }), herb.localName && _jsx("p", { className: "text-muted-foreground italic", children: herb.localName })] }), _jsxs(Tabs, { defaultValue: "overview", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-6", children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "preparation", children: "Preparation" }), _jsx(TabsTrigger, { value: "sourcing", children: "Where to Find" }), _jsx(TabsTrigger, { value: "recipes", children: "Recipes" }), _jsx(TabsTrigger, { value: "daily", children: "Daily Use" }), _jsx(TabsTrigger, { value: "tracker", children: "Tracker" })] }), _jsx(TabsContent, { value: "overview", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx("img", { src: herb.imageUrl || "/attached_assets/generated_images/Family_enjoying_herbal_tea_747c1dae.png", alt: herb.name, className: "rounded-lg w-full h-64 object-cover" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Description" }), _jsx("p", { className: "text-muted-foreground", children: herb.description })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Benefits" }), _jsx("div", { className: "space-y-2", children: herb.benefits.map((benefit, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Check, { className: "h-4 w-4 text-primary" }), _jsx("span", { className: "text-sm", children: benefit })] }, index))) })] })] })] }) }), _jsxs(TabsContent, { value: "preparation", className: "space-y-6", children: [_jsxs("div", { className: "mb-6", children: [_jsxs("h3", { className: "text-lg font-semibold mb-3", children: ["Preparation Methods for ", herb.name] }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Choose the preparation method that best suits your needs and the herb's properties. Each method extracts different compounds and has different applications." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: herb.preparationMethods.map((method) => {
                                        const guide = preparationGuides[method];
                                        return (_jsxs(Card, { className: "p-4", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-lg", children: method }) }), _jsx(CardContent, { className: "space-y-3", children: guide && (_jsxs(_Fragment, { children: [_jsx("ol", { className: "list-decimal list-inside space-y-1 text-sm text-muted-foreground", children: guide.steps.map((step, index) => (_jsx("li", { children: step }, index))) }), _jsxs("div", { className: "flex gap-4 text-xs text-muted-foreground mb-2", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), guide.timing] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Thermometer, { className: "h-3 w-3" }), guide.temperature] })] }), guide.tips && (_jsxs("div", { className: "text-xs text-blue-600 bg-blue-50 p-2 rounded", children: [_jsx("strong", { children: "Tip:" }), " ", guide.tips] }))] })) })] }, method));
                                    }) }), _jsxs(Card, { className: "bg-green-50 border-green-200", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-green-800", children: "Preparation Best Practices" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Quality Considerations" }), _jsxs("ul", { className: "space-y-1", children: [_jsx("li", { children: "\u2022 Use fresh, high-quality herbs" }), _jsx("li", { children: "\u2022 Store properly to maintain potency" }), _jsx("li", { children: "\u2022 Use filtered or spring water" }), _jsx("li", { children: "\u2022 Avoid aluminum cookware" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Safety Guidelines" }), _jsxs("ul", { className: "space-y-1", children: [_jsx("li", { children: "\u2022 Start with small amounts" }), _jsx("li", { children: "\u2022 Follow recommended dosages" }), _jsx("li", { children: "\u2022 Consult healthcare providers" }), _jsx("li", { children: "\u2022 Monitor for any reactions" })] })] })] }) })] })] }), _jsx(TabsContent, { value: "sourcing", className: "space-y-6", children: _jsx(SourcingGuide, { herb: herb }) }), _jsx(TabsContent, { value: "recipes", className: "space-y-6", children: _jsx(HerbRecipes, { herb: herb }) }), _jsx(TabsContent, { value: "tracker", className: "space-y-6", children: _jsx(WellnessTracker, { herb: herb }) }), _jsx(TabsContent, { value: "daily", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs(Card, { className: "p-4", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Morning Routine" }) }), _jsx(CardContent, { children: _jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1", children: [_jsxs("li", { children: ["Add ", herb.name, " powder to your morning smoothie"] }), _jsxs("li", { children: ["Brew ", herb.name, " tea with breakfast"] }), _jsxs("li", { children: ["Mix fresh ", herb.name, " leaves in yogurt"] })] }) })] }), _jsxs(Card, { className: "p-4", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Evening Routine" }) }), _jsx(CardContent, { children: _jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1", children: [_jsxs("li", { children: ["Enjoy ", herb.name, " tea before bedtime"] }), _jsxs("li", { children: ["Add ", herb.name, " to your evening bath"] }), _jsxs("li", { children: ["Use ", herb.name, " essential oil for aromatherapy"] })] }) })] }), _jsxs(Card, { className: "p-4", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Cooking & Meals" }) }), _jsx(CardContent, { children: _jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1", children: [_jsxs("li", { children: ["Add fresh ", herb.name, " to salads"] }), _jsxs("li", { children: ["Use ", herb.name, " powder in soups and stews"] }), _jsxs("li", { children: ["Infuse ", herb.name, " in cooking oils"] })] }) })] }), _jsxs(Card, { className: "p-4", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Wellness Tracking" }) }), _jsx(CardContent, { children: _jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1", children: [_jsxs("li", { children: ["Track how you feel after using ", herb.name] }), _jsx("li", { children: "Note any changes in energy or sleep" }), _jsx("li", { children: "Record dosage and timing" })] }) })] })] }) })] })] }) }));
}
