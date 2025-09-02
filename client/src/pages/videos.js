import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, Clock, ChefHat, List } from "lucide-react";
export default function Videos() {
    const videos = [
        {
            id: "turmeric-arthritis",
            title: "Turmeric Remedy for Arthritis Pain",
            description: "Natural anti-inflammatory remedy using turmeric to reduce joint pain and stiffness.",
            thumbnail: "/attached_assets/generated_images/Fresh_turmeric_root_powder_2c202d36.png",
            duration: "4:20",
            difficulty: "Easy",
            youtubeUrl: null,
            ingredients: ["Turmeric powder", "Warm milk or water", "Black pepper", "Honey"],
            steps: [
                "Mix 1 tsp turmeric powder with warm milk",
                "Add a pinch of black pepper for better absorption",
                "Stir in honey for taste",
                "Drink twice daily for best results",
                "Consult your doctor for persistent pain"
            ]
        },
        {
            id: "garlic-cholesterol",
            title: "Garlic for High Cholesterol",
            description: "Learn how to use garlic as a natural remedy to help manage cholesterol levels.",
            thumbnail: "/attached_assets/generated_images/Fresh_garlic_cloves_peeled_566ff3c0.png",
            duration: "3:45",
            difficulty: "Easy",
            youtubeUrl: null,
            ingredients: ["Fresh garlic cloves", "Warm water", "Lemon juice (optional)"],
            steps: [
                "Crush 2-3 fresh garlic cloves",
                "Let sit for 10 minutes to activate compounds",
                "Swallow with warm water on empty stomach",
                "Add lemon juice if desired",
                "Use for 2-3 weeks, then take a break"
            ]
        },
        {
            id: "aloe-acne",
            title: "Aloe Vera for Clear Skin & Acne",
            description: "Natural skincare remedy using aloe vera to treat acne and achieve clear, healthy skin.",
            thumbnail: "/attached_assets/generated_images/Fresh_aloe_vera_plant_37ed8ded.png",
            duration: "5:15",
            difficulty: "Easy",
            youtubeUrl: null,
            ingredients: ["Fresh aloe vera gel", "Tea tree oil (optional)", "Clean cloth"],
            steps: [
                "Extract fresh gel from aloe vera leaf",
                "Apply thin layer to clean face",
                "Add 1 drop tea tree oil for stubborn acne",
                "Leave for 15-20 minutes",
                "Rinse with cool water, pat dry"
            ]
        },
        {
            id: "onion-hair-growth",
            title: "Onion Juice for Hair Growth",
            description: "Traditional remedy using onion juice to stimulate hair growth and reduce hair loss.",
            thumbnail: "/attached_assets/generated_images/Fresh_red_onions_sliced_bb2a7403.png",
            duration: "6:30",
            difficulty: "Medium",
            youtubeUrl: null,
            ingredients: ["Medium onion", "Coconut oil", "Essential oil for scent"],
            steps: [
                "Grate or blend 1 medium onion",
                "Strain to extract pure juice",
                "Mix with 1 tbsp coconut oil",
                "Massage into scalp for 5 minutes",
                "Leave for 30 minutes, then shampoo thoroughly"
            ]
        },
        {
            id: "honey-cough",
            title: "Honey & Ginger Cough Remedy",
            description: "Soothing natural cough syrup using honey and ginger to relieve throat irritation.",
            thumbnail: "/attached_assets/generated_images/Raw_honey_jar_ginger_63a42cf4.png",
            duration: "4:00",
            difficulty: "Easy",
            youtubeUrl: null,
            ingredients: ["Raw honey", "Fresh ginger", "Warm water", "Lemon juice"],
            steps: [
                "Grate 1 tsp fresh ginger",
                "Mix with 2 tbsp raw honey",
                "Add lemon juice and warm water",
                "Take 1 tsp every 2-3 hours",
                "Best taken before meals"
            ]
        },
        {
            id: "cucumber-dark-circles",
            title: "Cucumber for Dark Under-Eye Circles",
            description: "Simple and effective remedy to reduce dark circles and puffiness around the eyes.",
            thumbnail: "/attached_assets/generated_images/Fresh_cucumber_slices_cooling_f0ef1ea8.png",
            duration: "2:45",
            difficulty: "Easy",
            youtubeUrl: null,
            ingredients: ["Fresh cucumber", "Rose water", "Cotton pads"],
            steps: [
                "Slice cucumber into thick rounds",
                "Chill in refrigerator for 30 minutes",
                "Soak cotton pads in rose water",
                "Place cucumber slices on closed eyes",
                "Relax for 15-20 minutes daily"
            ]
        },
        {
            id: "acv-acid-reflux",
            title: "Apple Cider Vinegar for Acid Reflux",
            description: "Natural remedy using apple cider vinegar to reduce heartburn and acid reflux symptoms.",
            thumbnail: "/attached_assets/generated_images/Apple_cider_vinegar_remedy_8b948f09.png",
            duration: "3:30",
            difficulty: "Easy",
            youtubeUrl: null,
            ingredients: ["Apple cider vinegar", "Warm water", "Honey (optional)"],
            steps: [
                "Mix 1-2 tbsp apple cider vinegar with warm water",
                "Add honey to taste if desired",
                "Drink 20 minutes before meals",
                "Start with small amounts to test tolerance",
                "Use with the 'mother' for best results"
            ]
        },
        {
            id: "lemon-teeth-whitening",
            title: "Lemon & Baking Soda Teeth Whitening",
            description: "Natural teeth whitening remedy using lemon juice and baking soda for brighter smiles.",
            thumbnail: "/attached_assets/generated_images/Lemon_baking_soda_whitening_04bc34a7.png",
            duration: "2:15",
            difficulty: "Easy",
            youtubeUrl: null,
            ingredients: ["Fresh lemon juice", "Baking soda", "Soft toothbrush", "Water"],
            steps: [
                "Mix equal parts lemon juice and baking soda",
                "Apply gently to teeth with soft brush",
                "Leave for 1-2 minutes maximum",
                "Rinse thoroughly with water",
                "Use only once per week to protect enamel"
            ]
        },
        {
            id: "coconut-oil-diabetes",
            title: "Coconut Oil & Cinnamon for Blood Sugar",
            description: "Natural remedy to help manage blood sugar levels using coconut oil and cinnamon.",
            thumbnail: "/attached_assets/generated_images/Coconut_oil_cinnamon_diabetes_24d32a1a.png",
            duration: "4:45",
            difficulty: "Easy",
            youtubeUrl: null,
            ingredients: ["Virgin coconut oil", "Ceylon cinnamon", "Warm water"],
            steps: [
                "Take 1 tbsp virgin coconut oil daily",
                "Add 1/2 tsp Ceylon cinnamon to meals",
                "Mix cinnamon with warm water as tea",
                "Take coconut oil before meals",
                "Monitor blood sugar and consult doctor"
            ]
        },
        {
            id: "mint-ginger-nausea",
            title: "Mint & Ginger for Nausea Relief",
            description: "Quick natural remedy to relieve nausea and morning sickness using mint and ginger.",
            thumbnail: "/attached_assets/generated_images/Mint_ginger_nausea_remedy_dd650feb.png",
            duration: "3:45",
            difficulty: "Easy",
            youtubeUrl: null,
            ingredients: ["Fresh mint leaves", "Fresh ginger", "Hot water", "Lemon"],
            steps: [
                "Steep fresh mint leaves in hot water",
                "Add thin ginger slices to the tea",
                "Let brew for 5-7 minutes",
                "Add fresh lemon juice",
                "Sip slowly when feeling nauseous"
            ]
        },
        {
            id: "chamomile-anxiety",
            title: "Chamomile & Green Tea for Stress Relief",
            description: "Calming herbal blend to reduce stress and anxiety naturally using chamomile and green tea.",
            thumbnail: "/attached_assets/generated_images/Green_tea_chamomile_stress_b57eeb53.png",
            duration: "4:20",
            difficulty: "Easy",
            youtubeUrl: null,
            ingredients: ["Chamomile flowers", "Green tea", "Honey", "Warm water"],
            steps: [
                "Combine equal parts chamomile and green tea",
                "Steep in warm (not boiling) water",
                "Brew for 3-5 minutes to avoid bitterness",
                "Add honey for natural sweetness",
                "Drink 2-3 times daily during stressful periods"
            ]
        },
        {
            id: "banana-oats-constipation",
            title: "Banana & Oats for Natural Constipation Relief",
            description: "Gentle digestive remedy using bananas and oats to relieve constipation naturally.",
            thumbnail: "/attached_assets/generated_images/Banana_oats_constipation_remedy_4c9229c2.png",
            duration: "5:00",
            difficulty: "Easy",
            youtubeUrl: null,
            ingredients: ["Ripe bananas", "Rolled oats", "Water or milk", "Honey"],
            steps: [
                "Mash 1 ripe banana in a bowl",
                "Add 1/2 cup rolled oats",
                "Pour warm water or milk to desired consistency",
                "Add honey for sweetness",
                "Eat first thing in the morning on empty stomach"
            ]
        }
    ];
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        setShowVideoModal(true);
    };
    return (_jsxs("div", { className: "py-16 px-4", children: [_jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("h1", { className: "text-4xl font-bold text-center mb-8", "data-testid": "text-page-title", children: "Natural Home Remedies Videos" }), _jsx("p", { className: "text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto", children: "Practical home remedies for common health conditions using natural ingredients" }), _jsx("div", { className: "bg-green-100 border border-green-300 rounded-lg p-4 max-w-3xl mx-auto mb-12", children: _jsxs("p", { className: "text-green-800 text-sm text-center", children: ["\uD83D\uDCFA ", _jsx("strong", { children: "Inspired by SUSANA HOME REMEDIES" }), " - Educational content for natural wellness.", _jsx("br", {}), _jsx("em", { children: "Always consult healthcare professionals before trying new remedies." })] }) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: videos.map((video) => (_jsxs(Card, { className: "overflow-hidden cursor-pointer hover:shadow-lg transition-shadow", onClick: () => handleVideoClick(video), "data-testid": `card-video-${video.id}`, children: [_jsxs("div", { className: "aspect-video bg-muted flex items-center justify-center relative overflow-hidden", children: [_jsx("img", { src: video.thumbnail, alt: video.title, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-center", children: _jsx(Play, { className: "h-16 w-16 text-white opacity-90" }) }), _jsx("div", { className: "absolute top-2 right-2", children: _jsx(Badge, { variant: "secondary", className: "text-xs", children: video.difficulty }) }), _jsx("div", { className: "absolute bottom-2 left-2", children: _jsx(Badge, { variant: "outline", className: "text-xs bg-black/50 text-white border-white/20", children: video.duration }) })] }), _jsxs(CardContent, { className: "p-6", children: [_jsx("h3", { className: "text-xl font-semibold mb-2", "data-testid": `text-video-title-${video.id}`, children: video.title }), _jsx("p", { className: "text-muted-foreground text-sm", "data-testid": `text-video-description-${video.id}`, children: video.description })] })] }, video.id))) }), _jsx("div", { className: "mt-12 text-center", children: _jsxs("div", { className: "bg-muted p-8 rounded-lg", children: [_jsx("h3", { className: "text-xl font-semibold mb-4", children: "More Videos Coming Soon!" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "We're working on creating comprehensive video guides for all our featured herbs and preparation methods." }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Subscribe to our newsletter to be notified when new videos are available." })] }) })] }), selectedVideo && (_jsx(Dialog, { open: showVideoModal, onOpenChange: setShowVideoModal, children: _jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-2xl", children: selectedVideo.title }) }), _jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "aspect-video bg-muted rounded-lg overflow-hidden", children: selectedVideo.youtubeUrl ? (_jsx("iframe", { src: selectedVideo.youtubeUrl, title: selectedVideo.title, className: "w-full h-full", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true })) : (_jsxs("div", { className: "w-full h-full flex items-center justify-center relative", children: [_jsx("img", { src: selectedVideo.thumbnail, alt: selectedVideo.title, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(Play, { className: "h-16 w-16 text-white mb-4 mx-auto" }), _jsx("p", { className: "text-lg font-semibold text-white", children: "Educational Video" }), _jsx("p", { className: "text-sm text-white/80", children: "Follow the ingredient list and preparation steps below for this natural home remedy" })] }) })] })) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [_jsx(ChefHat, { className: "h-5 w-5" }), "Ingredients"] }), _jsx("ul", { className: "list-disc list-inside space-y-2 text-muted-foreground", children: selectedVideo.ingredients.map((ingredient, index) => (_jsx("li", { children: ingredient }, index))) })] }), _jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [_jsx(Clock, { className: "h-5 w-5" }), "Video Details"] }), _jsxs("div", { className: "space-y-2 text-muted-foreground", children: [_jsxs("p", { children: [_jsx("strong", { children: "Duration:" }), " ", selectedVideo.duration] }), _jsxs("p", { children: [_jsx("strong", { children: "Difficulty:" }), _jsx(Badge, { variant: "secondary", className: "ml-2", children: selectedVideo.difficulty })] })] })] })] }), _jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [_jsx(List, { className: "h-5 w-5" }), "Preparation Steps"] }), _jsx("ol", { className: "list-decimal list-inside space-y-3 text-muted-foreground", children: selectedVideo.steps.map((step, index) => (_jsx("li", { className: "pl-2", children: step }, index))) })] }), _jsxs("div", { className: "bg-blue-50 p-4 rounded-lg", children: [_jsx("h4", { className: "font-semibold text-blue-800 mb-2", children: "Tips for Success" }), _jsxs("ul", { className: "list-disc list-inside text-sm text-blue-700 space-y-1", children: [_jsx("li", { children: "Use fresh, high-quality ingredients when possible" }), _jsx("li", { children: "Follow the timing instructions carefully" }), _jsx("li", { children: "Store prepared herbs properly to maintain potency" }), _jsx("li", { children: "Start with small amounts and adjust to your preference" })] })] })] })] }) }))] }));
}
