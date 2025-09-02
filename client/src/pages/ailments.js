import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Info, Heart, Droplet, Leaf, BookOpen, Lightbulb, Utensils } from "lucide-react";
export default function Ailments() {
    const [selectedAilment, setSelectedAilment] = useState(null);
    const detailsRef = useRef(null);
    const ailments = [
        {
            id: "diabetes",
            icon: Droplet,
            title: "Diabetes",
            subtitle: "Blood Sugar Management",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            definition: "Diabetes is a chronic health condition where the body either doesn't produce enough insulin or can't effectively use the insulin it produces, leading to elevated blood sugar levels.",
            types: [
                {
                    name: "Type 1 Diabetes",
                    description: "Autoimmune condition where the body attacks insulin-producing cells in the pancreas"
                },
                {
                    name: "Type 2 Diabetes",
                    description: "Most common type where the body becomes resistant to insulin or doesn't produce enough"
                },
                {
                    name: "Gestational Diabetes",
                    description: "Develops during pregnancy and usually resolves after childbirth"
                }
            ],
            symptoms: [
                "Increased thirst and frequent urination",
                "Unexplained weight loss",
                "Fatigue and irritability",
                "Blurred vision",
                "Slow-healing wounds",
                "Tingling or numbness in hands/feet"
            ],
            riskFactors: [
                "Family history of diabetes",
                "Obesity or overweight",
                "Physical inactivity",
                "Poor diet high in processed foods",
                "Age (risk increases with age)",
                "Ethnic background (higher risk in certain populations)"
            ],
            herbs: [
                {
                    name: "Neem (Muarubaini)",
                    scientificName: "Azadirachta indica",
                    description: "Traditional herb used for blood sugar management. Contains compounds that may help improve insulin sensitivity.",
                    preparation: "Tea, powder, or capsules",
                    dosage: "Start with 1/4 tsp powder or 1 cup tea daily",
                    research: "Studies suggest neem may help lower blood sugar levels and improve glucose tolerance."
                },
                {
                    name: "Moringa",
                    scientificName: "Moringa oleifera",
                    description: "Nutrient-dense leaves rich in antioxidants and compounds that may support healthy blood sugar levels.",
                    preparation: "Fresh leaves, powder, or tea",
                    dosage: "1/2 to 1 tsp powder daily in smoothies or water",
                    research: "Contains chlorogenic acid which may help regulate blood sugar absorption."
                },
                {
                    name: "Hibiscus",
                    scientificName: "Hibiscus sabdariffa",
                    description: "Antioxidant-rich flower that may help with glucose metabolism and overall metabolic health.",
                    preparation: "Tea, cold brew, or extract",
                    dosage: "1-2 cups of tea daily",
                    research: "Rich in polyphenols that may help improve insulin sensitivity."
                }
            ],
            lifestyleTips: [
                "Monitor blood sugar levels regularly",
                "Follow a balanced, low-glycemic diet",
                "Exercise regularly (150 minutes/week)",
                "Maintain a healthy weight",
                "Get adequate sleep (7-9 hours)",
                "Manage stress through meditation or yoga"
            ],
            warning: {
                type: "yellow",
                text: "Monitor blood sugar levels closely and consult your healthcare provider before using herbs alongside diabetes medications. Herbs may interact with prescription drugs."
            }
        },
        {
            id: "hypertension",
            icon: Heart,
            title: "High Blood Pressure",
            subtitle: "Hypertension Management",
            color: "text-red-600",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
            definition: "Hypertension is a condition where the force of blood against artery walls is consistently too high, putting extra strain on the heart and blood vessels.",
            types: [
                {
                    name: "Primary Hypertension",
                    description: "Most common type with no identifiable cause, develops gradually over years"
                },
                {
                    name: "Secondary Hypertension",
                    description: "Caused by an underlying condition like kidney disease or hormonal disorders"
                }
            ],
            symptoms: [
                "Often called the 'silent killer' - may have no symptoms",
                "Headaches (especially in the morning)",
                "Shortness of breath",
                "Nosebleeds",
                "Chest pain",
                "Dizziness or lightheadedness",
                "Vision problems"
            ],
            riskFactors: [
                "Age (risk increases with age)",
                "Family history",
                "Obesity or overweight",
                "Physical inactivity",
                "High salt intake",
                "Excessive alcohol consumption",
                "Stress and anxiety",
                "Smoking"
            ],
            herbs: [
                {
                    name: "Hibiscus",
                    scientificName: "Hibiscus sabdariffa",
                    description: "Studies suggest hibiscus tea may help lower blood pressure through its diuretic and vasodilating properties.",
                    preparation: "Tea, cold brew, or extract",
                    dosage: "2-3 cups of tea daily",
                    research: "Clinical studies show hibiscus may reduce systolic and diastolic blood pressure."
                },
                {
                    name: "Garlic",
                    scientificName: "Allium sativum",
                    description: "Traditional cardiovascular herb that may help relax blood vessels and improve circulation.",
                    preparation: "Fresh cloves, powder, or aged extract",
                    dosage: "1-2 cloves daily or 600-1200mg extract",
                    research: "Contains allicin which may help lower blood pressure and improve arterial health."
                },
                {
                    name: "African Basil",
                    scientificName: "Ocimum gratissimum",
                    description: "Stress-reducing herb that may help lower blood pressure through its calming effects.",
                    preparation: "Tea, fresh leaves, or essential oil",
                    dosage: "1-2 cups of tea daily",
                    research: "May help reduce stress hormones that contribute to elevated blood pressure."
                }
            ],
            lifestyleTips: [
                "Reduce sodium intake (aim for <2,300mg daily)",
                "Follow the DASH diet (Dietary Approaches to Stop Hypertension)",
                "Exercise regularly (30 minutes most days)",
                "Limit alcohol consumption",
                "Quit smoking",
                "Practice stress management techniques",
                "Maintain a healthy weight"
            ],
            warning: {
                type: "red",
                text: "Do not discontinue prescribed blood pressure medications. Work with your doctor when adding herbs to your routine. Monitor blood pressure regularly."
            }
        },
        {
            id: "arthritis",
            icon: Heart,
            title: "Arthritis",
            subtitle: "Joint Health Support",
            color: "text-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            definition: "Arthritis is inflammation of one or more joints, causing pain, stiffness, and reduced range of motion. There are over 100 different types of arthritis.",
            types: [
                {
                    name: "Osteoarthritis",
                    description: "Most common type, caused by wear and tear of joint cartilage"
                },
                {
                    name: "Rheumatoid Arthritis",
                    description: "Autoimmune condition where the immune system attacks joint tissues"
                },
                {
                    name: "Gout",
                    description: "Caused by uric acid crystal buildup in joints"
                }
            ],
            symptoms: [
                "Joint pain and stiffness",
                "Swelling and tenderness",
                "Reduced range of motion",
                "Warmth and redness around joints",
                "Fatigue and weakness",
                "Morning stiffness lasting >30 minutes"
            ],
            riskFactors: [
                "Age (risk increases with age)",
                "Family history",
                "Previous joint injury",
                "Obesity (puts extra stress on joints)",
                "Repetitive joint movements",
                "Autoimmune conditions"
            ],
            herbs: [
                {
                    name: "Ginger",
                    scientificName: "Zingiber officinale",
                    description: "Powerful anti-inflammatory herb that may help reduce joint pain and inflammation.",
                    preparation: "Fresh root, tea, powder, or extract",
                    dosage: "1-2 inches fresh ginger daily or 1-2 cups tea",
                    research: "Contains gingerols and shogaols with potent anti-inflammatory properties."
                },
                {
                    name: "Turmeric",
                    scientificName: "Curcuma longa",
                    description: "Golden spice containing curcumin, a powerful anti-inflammatory compound.",
                    preparation: "Fresh root, powder, or extract",
                    dosage: "1/2-1 tsp powder daily with black pepper",
                    research: "Curcumin may help reduce inflammation and joint pain comparable to some medications."
                },
                {
                    name: "Moringa",
                    scientificName: "Moringa oleifera",
                    description: "Nutrient-rich herb that supports overall joint and bone health.",
                    preparation: "Fresh leaves, powder, or tea",
                    dosage: "1/2-1 tsp powder daily",
                    research: "Rich in calcium, magnesium, and anti-inflammatory compounds."
                }
            ],
            lifestyleTips: [
                "Low-impact exercise (swimming, walking, yoga)",
                "Maintain a healthy weight",
                "Use hot/cold therapy for pain relief",
                "Practice gentle stretching daily",
                "Eat anti-inflammatory foods",
                "Get adequate rest and sleep",
                "Consider physical therapy"
            ],
            warning: {
                type: "blue",
                text: "Combine herbs with gentle exercise, heat therapy, and a balanced diet for best results. Consult healthcare provider for severe or worsening symptoms."
            }
        },
        {
            id: "digestive",
            icon: Utensils,
            title: "Digestive Health",
            subtitle: "Gut Wellness Support",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
            definition: "Digestive health encompasses the proper functioning of the gastrointestinal system, including digestion, absorption, and elimination of food.",
            types: [
                {
                    name: "Irritable Bowel Syndrome (IBS)",
                    description: "Functional disorder affecting the large intestine"
                },
                {
                    name: "Acid Reflux/GERD",
                    description: "Stomach acid flows back into the esophagus"
                },
                {
                    name: "Constipation",
                    description: "Infrequent or difficult bowel movements"
                }
            ],
            symptoms: [
                "Abdominal pain and cramping",
                "Bloating and gas",
                "Nausea and vomiting",
                "Heartburn and acid reflux",
                "Diarrhea or constipation",
                "Loss of appetite",
                "Fatigue"
            ],
            riskFactors: [
                "Poor diet (high in processed foods)",
                "Stress and anxiety",
                "Lack of physical activity",
                "Dehydration",
                "Food intolerances",
                "Medication side effects"
            ],
            herbs: [
                {
                    name: "Peppermint",
                    scientificName: "Mentha piperita",
                    description: "Soothing herb that may help relax digestive muscles and reduce bloating.",
                    preparation: "Tea, essential oil, or capsules",
                    dosage: "1-2 cups of tea daily",
                    research: "May help relieve IBS symptoms and reduce abdominal pain."
                },
                {
                    name: "Ginger",
                    scientificName: "Zingiber officinale",
                    description: "Traditional digestive aid that may help with nausea and improve digestion.",
                    preparation: "Fresh root, tea, or powder",
                    dosage: "1-2 inches fresh ginger daily",
                    research: "May help reduce nausea, improve gastric emptying, and reduce inflammation."
                },
                {
                    name: "Chamomile",
                    scientificName: "Matricaria chamomilla",
                    description: "Gentle herb that may help soothe digestive discomfort and reduce inflammation.",
                    preparation: "Tea or extract",
                    dosage: "1-2 cups of tea daily",
                    research: "May help reduce stomach acid and soothe irritated digestive tissues."
                }
            ],
            lifestyleTips: [
                "Eat slowly and chew thoroughly",
                "Stay hydrated (8-10 glasses water daily)",
                "Include fiber-rich foods",
                "Manage stress through relaxation techniques",
                "Exercise regularly",
                "Avoid trigger foods",
                "Eat smaller, more frequent meals"
            ],
            warning: {
                type: "green",
                text: "Start with small amounts of herbs and gradually increase. Keep a food diary to identify triggers."
            }
        }
    ];
    const getWarningColor = (type) => {
        switch (type) {
            case "yellow": return "bg-yellow-50 border-yellow-200 text-yellow-800";
            case "red": return "bg-red-50 border-red-200 text-red-800";
            case "blue": return "bg-blue-50 border-blue-200 text-blue-800";
            case "green": return "bg-green-50 border-green-200 text-green-800";
            default: return "bg-gray-50 border-gray-200 text-gray-800";
        }
    };
    // Handle scrolling when an ailment is selected
    useEffect(() => {
        if (selectedAilment && detailsRef.current) {
            // Use requestAnimationFrame to ensure DOM has updated
            const scrollToDetails = () => {
                if (detailsRef.current) {
                    const yOffset = -20; // Small offset from top
                    const y = detailsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });
                }
            };
            // Use multiple timing strategies to ensure it works
            requestAnimationFrame(() => {
                requestAnimationFrame(scrollToDetails);
            });
            // Fallback timeout
            setTimeout(scrollToDetails, 100);
        }
    }, [selectedAilment]);
    const handleAilmentClick = (ailmentId) => {
        const newSelectedAilment = selectedAilment === ailmentId ? null : ailmentId;
        setSelectedAilment(newSelectedAilment);
    };
    return (_jsx("div", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", "data-testid": "text-page-title", children: "Common Health Conditions" }), _jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto", children: "Educational information about common health conditions and natural herbal support. Always consult healthcare providers for proper diagnosis and treatment." })] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12", children: ailments.map((ailment) => {
                        const IconComponent = ailment.icon;
                        return (_jsxs(Card, { className: `p-6 shadow-lg border-2 cursor-pointer transition-all hover:shadow-xl ${ailment.borderColor} ${selectedAilment === ailment.id ? 'ring-2 ring-primary' : ''}`, onClick: () => handleAilmentClick(ailment.id), "data-testid": `card-ailment-${ailment.id}`, children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `p-3 rounded-full ${ailment.bgColor}`, children: _jsx(IconComponent, { className: `h-6 w-6 ${ailment.color}` }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: `text-xl font-bold ${ailment.color}`, children: ailment.title }), _jsx("p", { className: "text-sm text-muted-foreground", children: ailment.subtitle })] })] }) }), _jsxs(CardContent, { className: "pt-0", children: [_jsx("p", { className: "text-muted-foreground text-sm mb-4", children: ailment.definition }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Badge, { variant: "outline", className: "text-xs", children: [ailment.herbs.length, " Herbs"] }), _jsx(Badge, { variant: "outline", className: "text-xs", children: "Natural Support" })] })] })] }, ailment.id));
                    }) }), selectedAilment && (_jsx("div", { ref: detailsRef, "data-details-section": "true", className: "mt-12", children: ailments.filter(ailment => ailment.id === selectedAilment).map((ailment) => {
                        const IconComponent = ailment.icon;
                        return (_jsxs(Card, { className: `p-8 shadow-lg border-2 ${ailment.borderColor}`, children: [_jsx(CardHeader, { className: "pb-6", children: _jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx("div", { className: `p-4 rounded-full ${ailment.bgColor}`, children: _jsx(IconComponent, { className: `h-8 w-8 ${ailment.color}` }) }), _jsxs("div", { children: [_jsx("h2", { className: `text-3xl font-bold ${ailment.color}`, children: ailment.title }), _jsx("p", { className: "text-lg text-muted-foreground", children: ailment.subtitle })] })] }) }), _jsx(CardContent, { className: "space-y-8", children: _jsxs(Tabs, { defaultValue: "overview", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-5", children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "symptoms", children: "Symptoms" }), _jsx(TabsTrigger, { value: "herbs", children: "Herbal Support" }), _jsx(TabsTrigger, { value: "lifestyle", children: "Lifestyle" }), _jsx(TabsTrigger, { value: "safety", children: "Safety" })] }), _jsxs(TabsContent, { value: "overview", className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-xl font-semibold mb-3 flex items-center gap-2", children: [_jsx(BookOpen, { className: "h-5 w-5" }), "Definition & Types"] }), _jsx("p", { className: "text-muted-foreground mb-4", children: ailment.definition }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: ailment.types.map((type, index) => (_jsxs("div", { className: "bg-muted p-4 rounded-lg", children: [_jsx("h4", { className: "font-semibold mb-2", children: type.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: type.description })] }, index))) })] }), _jsxs("div", { children: [_jsxs("h3", { className: "text-xl font-semibold mb-3 flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-5 w-5" }), "Risk Factors"] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2", children: ailment.riskFactors.map((factor, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-red-500 rounded-full" }), _jsx("span", { className: "text-sm", children: factor })] }, index))) })] })] }), _jsx(TabsContent, { value: "symptoms", className: "space-y-6", children: _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-4", children: "Common Symptoms" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: ailment.symptoms.map((symptom, index) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-muted rounded-lg", children: [_jsx("div", { className: "w-2 h-2 bg-orange-500 rounded-full" }), _jsx("span", { className: "text-sm", children: symptom })] }, index))) })] }) }), _jsx(TabsContent, { value: "herbs", className: "space-y-6", children: _jsxs("div", { children: [_jsxs("h3", { className: "text-xl font-semibold mb-4 flex items-center gap-2", children: [_jsx(Leaf, { className: "h-5 w-5" }), "Herbal Support"] }), _jsx("div", { className: "space-y-6", children: ailment.herbs.map((herb, index) => (_jsxs(Card, { className: "p-6", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-lg font-semibold", children: herb.name }), _jsx("p", { className: "text-sm text-muted-foreground italic", children: herb.scientificName })] }), _jsx(Badge, { variant: "outline", children: "Herbal Support" })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-muted-foreground", children: herb.description }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("h5", { className: "font-semibold mb-2", children: "Preparation & Dosage" }), _jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [_jsx("strong", { children: "How to use:" }), " ", herb.preparation] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [_jsx("strong", { children: "Dosage:" }), " ", herb.dosage] })] }), _jsxs("div", { children: [_jsx("h5", { className: "font-semibold mb-2", children: "Research Notes" }), _jsx("p", { className: "text-sm text-muted-foreground", children: herb.research })] })] })] })] }, index))) })] }) }), _jsx(TabsContent, { value: "lifestyle", className: "space-y-6", children: _jsxs("div", { children: [_jsxs("h3", { className: "text-xl font-semibold mb-4 flex items-center gap-2", children: [_jsx(Lightbulb, { className: "h-5 w-5" }), "Lifestyle Recommendations"] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: ailment.lifestyleTips.map((tip, index) => (_jsxs("div", { className: "flex items-start gap-3 p-4 bg-muted rounded-lg", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full mt-2" }), _jsx("span", { className: "text-sm", children: tip })] }, index))) })] }) }), _jsx(TabsContent, { value: "safety", className: "space-y-6", children: _jsxs("div", { children: [_jsxs("h3", { className: "text-xl font-semibold mb-4 flex items-center gap-2", children: [_jsx(Info, { className: "h-5 w-5" }), "Important Safety Information"] }), _jsxs("div", { className: `p-6 rounded-lg border ${getWarningColor(ailment.warning.type)}`, children: [_jsxs("p", { className: "font-semibold mb-2", children: [ailment.warning.type === "yellow" && "⚠️ Important:", ailment.warning.type === "red" && "🚨 Caution:", ailment.warning.type === "blue" && "💡 Tip:", ailment.warning.type === "green" && "✅ Note:"] }), _jsx("p", { children: ailment.warning.text })] }), _jsxs("div", { className: "mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [_jsx("h4", { className: "font-semibold text-blue-800 mb-2", children: "When to Seek Medical Attention" }), _jsxs("ul", { className: "text-sm text-blue-700 space-y-1", children: [_jsx("li", { children: "\u2022 Severe or worsening symptoms" }), _jsx("li", { children: "\u2022 New or unusual symptoms" }), _jsx("li", { children: "\u2022 Symptoms that interfere with daily activities" }), _jsx("li", { children: "\u2022 Concerns about medication interactions" }), _jsx("li", { children: "\u2022 Emergency symptoms (chest pain, severe shortness of breath, etc.)" })] })] })] }) })] }) })] }, ailment.id));
                    }) })), _jsx("div", { className: "mt-12 text-center", children: _jsx(Card, { className: "p-6 bg-muted/30", children: _jsxs(CardContent, { children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Disclaimer" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "This information is for educational purposes only and is not intended as medical advice. Always consult with qualified healthcare professionals for proper diagnosis and treatment. Herbs may interact with medications and should be used under medical supervision." })] }) }) })] }) }));
}
