import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";
const recipeCategories = {
    "Tea": {
        icon: "☕",
        description: "Traditional herbal tea preparations"
    },
    "Smoothie": {
        icon: "🥤",
        description: "Nutritious smoothie recipes"
    },
    "Cooking": {
        icon: "🍳",
        description: "Cooking and meal integration"
    },
    "Wellness": {
        icon: "🌿",
        description: "Wellness and therapeutic uses"
    }
};
const getRecipesForHerb = (herbName) => {
    const recipes = {
        "Ginger": [
            {
                title: "Ginger Lemon Tea",
                category: "Tea",
                time: "10 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Fresh ginger root (1 inch)", "Lemon (1/2)", "Honey (1 tsp)", "Hot water (2 cups)"],
                instructions: [
                    "Slice 1 inch of fresh ginger thinly",
                    "Boil 2 cups of water",
                    "Add ginger and simmer for 5 minutes",
                    "Strain and add lemon juice and honey",
                    "Let cool slightly before drinking"
                ],
                benefits: "Digestive support, immune boost, anti-inflammatory"
            },
            {
                title: "Ginger Turmeric Golden Milk",
                category: "Wellness",
                time: "15 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Fresh ginger (1 inch)", "Turmeric powder (1/2 tsp)", "Black pepper (pinch)", "Milk (1 cup)", "Honey (1 tsp)"],
                instructions: [
                    "Grate fresh ginger finely",
                    "Heat milk in a saucepan",
                    "Add ginger, turmeric, and black pepper",
                    "Simmer for 10 minutes, stirring occasionally",
                    "Strain and add honey to taste"
                ],
                benefits: "Anti-inflammatory, immune support, warming"
            },
            {
                title: "Ginger Digestive Smoothie",
                category: "Smoothie",
                time: "5 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Fresh ginger (1/2 inch)", "Banana (1)", "Almond milk (1 cup)", "Honey (1 tsp)", "Cinnamon (pinch)"],
                instructions: [
                    "Peel and grate fresh ginger",
                    "Add all ingredients to blender",
                    "Blend until smooth and creamy",
                    "Add ice if desired"
                ],
                benefits: "Digestive aid, energy boost, anti-nausea"
            }
        ],
        "Chamomile": [
            {
                title: "Calming Chamomile Tea",
                category: "Tea",
                time: "5 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Chamomile flowers (2 tsp)", "Hot water (1 cup)", "Honey (1 tsp, optional)"],
                instructions: [
                    "Add 2 tsp chamomile flowers to tea infuser",
                    "Pour hot water (not boiling, about 85°C)",
                    "Steep for 5-7 minutes",
                    "Remove infuser and add honey if desired",
                    "Best enjoyed before bedtime"
                ],
                benefits: "Sleep support, relaxation, digestive comfort"
            },
            {
                title: "Chamomile Lavender Bath Soak",
                category: "Wellness",
                time: "20 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Chamomile flowers (1/4 cup)", "Lavender buds (2 tbsp)", "Epsom salts (2 cups)", "Warm bath water"],
                instructions: [
                    "Mix chamomile and lavender in a muslin bag",
                    "Fill bath with warm water",
                    "Add Epsom salts and herb bag",
                    "Soak for 15-20 minutes",
                    "Relax and breathe deeply"
                ],
                benefits: "Stress relief, skin soothing, relaxation"
            },
            {
                title: "Chamomile Honey Face Mask",
                category: "Wellness",
                time: "10 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Chamomile tea (2 tbsp)", "Raw honey (1 tbsp)", "Oatmeal (1 tbsp)", "Lemon juice (1/2 tsp)"],
                instructions: [
                    "Brew strong chamomile tea and let cool",
                    "Mix with honey, oatmeal, and lemon juice",
                    "Apply to clean face",
                    "Leave for 10-15 minutes",
                    "Rinse with warm water"
                ],
                benefits: "Skin soothing, anti-inflammatory, calming"
            }
        ],
        "Moringa": [
            {
                title: "Moringa Green Smoothie",
                category: "Smoothie",
                time: "5 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Moringa powder (1 tsp)", "Spinach (1 cup)", "Banana (1)", "Apple (1/2)", "Coconut water (1 cup)"],
                instructions: [
                    "Add all ingredients to high-speed blender",
                    "Blend until smooth and creamy",
                    "Add more coconut water if too thick",
                    "Enjoy immediately for best nutrition"
                ],
                benefits: "Complete nutrition, energy boost, detox support"
            },
            {
                title: "Moringa Energy Balls",
                category: "Cooking",
                time: "15 min",
                difficulty: "Medium",
                servings: 12,
                ingredients: ["Dates (1 cup)", "Moringa powder (2 tbsp)", "Almonds (1/2 cup)", "Coconut flakes (1/4 cup)", "Chia seeds (2 tbsp)"],
                instructions: [
                    "Process dates and almonds in food processor",
                    "Add moringa powder and chia seeds",
                    "Mix until well combined",
                    "Roll into 12 small balls",
                    "Coat with coconut flakes and refrigerate"
                ],
                benefits: "Sustained energy, nutrient dense, portable snack"
            },
            {
                title: "Moringa Oatmeal Bowl",
                category: "Cooking",
                time: "10 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Oats (1/2 cup)", "Moringa powder (1 tsp)", "Banana (1/2)", "Berries (1/4 cup)", "Almond milk (1 cup)"],
                instructions: [
                    "Cook oats with almond milk",
                    "Stir in moringa powder",
                    "Top with sliced banana and berries",
                    "Add honey or maple syrup if desired"
                ],
                benefits: "Nutrient-rich breakfast, sustained energy, fiber"
            }
        ],
        "Hibiscus": [
            {
                title: "Hibiscus Iced Tea",
                category: "Tea",
                time: "20 min",
                difficulty: "Easy",
                servings: 4,
                ingredients: ["Hibiscus flowers (1/4 cup)", "Water (4 cups)", "Honey (2 tbsp)", "Lemon (1)", "Fresh mint (handful)"],
                instructions: [
                    "Boil water and add hibiscus flowers",
                    "Steep for 10-15 minutes",
                    "Strain and let cool completely",
                    "Add honey, lemon juice, and mint",
                    "Serve over ice"
                ],
                benefits: "Heart health, refreshing, rich in antioxidants"
            },
            {
                title: "Hibiscus Agua Fresca",
                category: "Wellness",
                time: "25 min",
                difficulty: "Easy",
                servings: 6,
                ingredients: ["Hibiscus flowers (1/2 cup)", "Water (6 cups)", "Lime juice (1/4 cup)", "Sugar (1/3 cup)", "Fresh mint"],
                instructions: [
                    "Boil water and steep hibiscus for 15 minutes",
                    "Strain and add sugar while hot",
                    "Let cool completely",
                    "Add lime juice and mint",
                    "Serve chilled with ice"
                ],
                benefits: "Hydrating, vitamin C, cooling properties"
            },
            {
                title: "Hibiscus Face Toner",
                category: "Wellness",
                time: "15 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Hibiscus tea (1/2 cup)", "Apple cider vinegar (1 tbsp)", "Witch hazel (1 tbsp)", "Essential oil (2 drops)"],
                instructions: [
                    "Brew strong hibiscus tea and let cool",
                    "Mix with apple cider vinegar and witch hazel",
                    "Add essential oil of choice",
                    "Store in spray bottle",
                    "Use as facial toner"
                ],
                benefits: "Skin brightening, astringent, anti-aging"
            }
        ],
        "Peppermint": [
            {
                title: "Peppermint Digestive Tea",
                category: "Tea",
                time: "5 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Fresh peppermint leaves (1/4 cup)", "Hot water (1 cup)", "Honey (optional)"],
                instructions: [
                    "Wash fresh peppermint leaves",
                    "Add to tea infuser or directly to cup",
                    "Pour hot water and steep 5 minutes",
                    "Remove leaves and add honey if desired"
                ],
                benefits: "Digestive support, mental clarity, cooling"
            },
            {
                title: "Peppermint Energy Smoothie",
                category: "Smoothie",
                time: "5 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Fresh peppermint (1/4 cup)", "Spinach (1 cup)", "Banana (1)", "Coconut water (1 cup)", "Lime (1/2)"],
                instructions: [
                    "Blend all ingredients until smooth",
                    "Add ice if desired",
                    "Enjoy immediately for refreshing energy"
                ],
                benefits: "Mental clarity, digestive support, refreshing"
            }
        ],
        "Turmeric": [
            {
                title: "Turmeric Golden Milk",
                category: "Wellness",
                time: "15 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Turmeric powder (1 tsp)", "Black pepper (1/4 tsp)", "Milk (1 cup)", "Honey (1 tsp)", "Cinnamon (pinch)"],
                instructions: [
                    "Heat milk in saucepan",
                    "Add turmeric, black pepper, and cinnamon",
                    "Simmer for 10 minutes, stirring",
                    "Strain and add honey",
                    "Drink warm before bed"
                ],
                benefits: "Anti-inflammatory, immune support, warming"
            },
            {
                title: "Turmeric Face Mask",
                category: "Wellness",
                time: "10 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Turmeric powder (1 tsp)", "Honey (1 tbsp)", "Yogurt (1 tbsp)", "Lemon juice (1/2 tsp)"],
                instructions: [
                    "Mix all ingredients in bowl",
                    "Apply to clean face",
                    "Leave for 10-15 minutes",
                    "Rinse with warm water"
                ],
                benefits: "Anti-inflammatory, skin brightening, healing"
            }
        ],
        "Neem": [
            {
                title: "Neem Detox Tea",
                category: "Tea",
                time: "10 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Neem leaves (1 tsp)", "Hot water (1 cup)", "Honey (1 tsp)", "Lemon (1/2)"],
                instructions: [
                    "Add neem leaves to tea infuser",
                    "Pour hot water and steep 5-7 minutes",
                    "Add honey and lemon to mask bitterness",
                    "Drink on empty stomach"
                ],
                benefits: "Blood sugar support, detoxification, skin health"
            },
            {
                title: "Neem Face Wash",
                category: "Wellness",
                time: "5 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Neem powder (1 tbsp)", "Honey (1 tsp)", "Water (2 tbsp)", "Tea tree oil (2 drops)"],
                instructions: [
                    "Mix neem powder with water",
                    "Add honey and tea tree oil",
                    "Apply to face in circular motion",
                    "Rinse with warm water"
                ],
                benefits: "Antimicrobial, skin clearing, anti-acne"
            }
        ],
        "Aloe Vera": [
            {
                title: "Aloe Vera Digestive Shot",
                category: "Wellness",
                time: "5 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Fresh aloe gel (2 tbsp)", "Lemon juice (1 tbsp)", "Honey (1 tsp)", "Water (1/4 cup)"],
                instructions: [
                    "Extract fresh aloe gel from leaf",
                    "Blend with lemon, honey, and water",
                    "Drink on empty stomach",
                    "Best in morning"
                ],
                benefits: "Digestive support, skin healing, detoxification"
            },
            {
                title: "Aloe Vera Face Gel",
                category: "Wellness",
                time: "10 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Fresh aloe gel (2 tbsp)", "Vitamin E oil (5 drops)", "Lavender oil (2 drops)"],
                instructions: [
                    "Extract fresh aloe gel",
                    "Mix with vitamin E and lavender oil",
                    "Apply to clean face",
                    "Leave for 15 minutes, rinse"
                ],
                benefits: "Skin healing, moisturizing, anti-inflammatory"
            }
        ],
        "Soursop": [
            {
                title: "Soursop Smoothie",
                category: "Smoothie",
                time: "5 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Soursop pulp (1/2 cup)", "Coconut milk (1/2 cup)", "Honey (1 tbsp)", "Lime juice (1 tbsp)"],
                instructions: [
                    "Remove seeds from soursop pulp",
                    "Blend with coconut milk and lime",
                    "Add honey to taste",
                    "Serve chilled"
                ],
                benefits: "Antioxidant rich, immune support, digestive aid"
            },
            {
                title: "Soursop Tea",
                category: "Tea",
                time: "15 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Soursop leaves (2-3)", "Hot water (1 cup)", "Honey (optional)"],
                instructions: [
                    "Wash soursop leaves",
                    "Add to hot water",
                    "Steep for 10-15 minutes",
                    "Strain and add honey if desired"
                ],
                benefits: "Relaxation, sleep support, immune boost"
            }
        ],
        "African Basil": [
            {
                title: "African Basil Steam Inhalation",
                category: "Wellness",
                time: "10 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Fresh African basil leaves (1/2 cup)", "Hot water (4 cups)", "Towel"],
                instructions: [
                    "Boil water in large pot",
                    "Add fresh basil leaves",
                    "Cover head with towel",
                    "Inhale steam for 5-10 minutes"
                ],
                benefits: "Respiratory support, mental clarity, antimicrobial"
            },
            {
                title: "African Basil Tea",
                category: "Tea",
                time: "5 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Fresh African basil (1/4 cup)", "Hot water (1 cup)", "Honey (1 tsp)"],
                instructions: [
                    "Wash fresh basil leaves",
                    "Add to hot water",
                    "Steep for 5 minutes",
                    "Strain and add honey"
                ],
                benefits: "Cold relief, mental clarity, stress reduction"
            }
        ],
        "Baobab": [
            {
                title: "Baobab Energy Smoothie",
                category: "Smoothie",
                time: "5 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Baobab powder (2 tbsp)", "Banana (1)", "Orange juice (1 cup)", "Chia seeds (1 tbsp)"],
                instructions: [
                    "Blend all ingredients until smooth",
                    "Add ice if desired",
                    "Enjoy immediately"
                ],
                benefits: "Vitamin C boost, energy, immune support"
            },
            {
                title: "Baobab Yogurt Bowl",
                category: "Cooking",
                time: "5 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Greek yogurt (1 cup)", "Baobab powder (1 tbsp)", "Berries (1/2 cup)", "Honey (1 tsp)"],
                instructions: [
                    "Mix baobab powder with yogurt",
                    "Top with berries and honey",
                    "Sprinkle with granola if desired"
                ],
                benefits: "Probiotic support, vitamin C, protein"
            }
        ],
        "African Sage": [
            {
                title: "African Sage Steam Therapy",
                category: "Wellness",
                time: "15 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Fresh African sage (1/2 cup)", "Hot water (4 cups)", "Towel", "Bowl"],
                instructions: [
                    "Boil water in large bowl",
                    "Add fresh sage leaves",
                    "Cover head with towel",
                    "Inhale steam for 10-15 minutes"
                ],
                benefits: "Respiratory support, relaxation, antimicrobial"
            },
            {
                title: "African Sage Tea",
                category: "Tea",
                time: "5 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Fresh African sage (1/4 cup)", "Hot water (1 cup)", "Honey (optional)"],
                instructions: [
                    "Wash fresh sage leaves",
                    "Add to hot water",
                    "Steep for 5-7 minutes",
                    "Strain and add honey if desired"
                ],
                benefits: "Respiratory health, relaxation, steam therapy"
            }
        ],
        "Chia Seeds": [
            {
                title: "Chia Seed Pudding",
                category: "Cooking",
                time: "10 min + overnight",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Chia seeds (1/4 cup)", "Almond milk (1 cup)", "Honey (1 tbsp)", "Vanilla extract (1/2 tsp)"],
                instructions: [
                    "Mix chia seeds with almond milk",
                    "Add honey and vanilla",
                    "Stir well and refrigerate overnight",
                    "Top with berries before serving"
                ],
                benefits: "High protein, omega-3, sustained energy"
            },
            {
                title: "Chia Energy Smoothie",
                category: "Smoothie",
                time: "5 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Chia seeds (2 tbsp)", "Banana (1)", "Berries (1/2 cup)", "Coconut water (1 cup)"],
                instructions: [
                    "Soak chia seeds in coconut water for 10 minutes",
                    "Add all ingredients to blender",
                    "Blend until smooth",
                    "Enjoy immediately"
                ],
                benefits: "Energy boost, hydration, nutrient dense"
            }
        ],
        "Urtica massaica": [
            {
                title: "African Nettle Soup",
                category: "Cooking",
                time: "30 min",
                difficulty: "Medium",
                servings: 4,
                ingredients: ["Cooked nettle leaves (2 cups)", "Onion (1)", "Garlic (3 cloves)", "Vegetable broth (4 cups)"],
                instructions: [
                    "Cook nettle leaves thoroughly to remove sting",
                    "Sauté onion and garlic",
                    "Add broth and cooked nettles",
                    "Simmer for 20 minutes"
                ],
                benefits: "Rich in minerals, joint health, anti-inflammatory"
            },
            {
                title: "Nettle Tea",
                category: "Tea",
                time: "10 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Dried nettle leaves (2 tsp)", "Hot water (1 cup)", "Honey (optional)"],
                instructions: [
                    "Add dried nettle leaves to hot water",
                    "Steep for 5-7 minutes",
                    "Strain and add honey if desired",
                    "Enjoy warm"
                ],
                benefits: "Allergy relief, mineral rich, detox support"
            }
        ],
        "Persea americana": [
            {
                title: "Avocado Leaf Tea",
                category: "Tea",
                time: "10 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Fresh avocado leaves (3-4)", "Hot water (2 cups)", "Honey (optional)"],
                instructions: [
                    "Wash fresh avocado leaves",
                    "Add to hot water",
                    "Simmer for 5-7 minutes",
                    "Strain and add honey if desired"
                ],
                benefits: "Heart health, traditional medicine, calming"
            },
            {
                title: "Avocado Wellness Bowl",
                category: "Cooking",
                time: "15 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Avocado (1/2)", "Quinoa (1/2 cup)", "Cherry tomatoes (1/2 cup)", "Olive oil (1 tbsp)"],
                instructions: [
                    "Cook quinoa according to package",
                    "Slice avocado and tomatoes",
                    "Mix with olive oil and seasonings",
                    "Serve as a nutritious bowl"
                ],
                benefits: "Heart health, healthy fats, nutrient dense"
            }
        ],
        "Bidens pilosa": [
            {
                title: "Black Jack Wound Healing Paste",
                category: "Wellness",
                time: "15 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Fresh Black Jack leaves (1/2 cup)", "Honey (1 tbsp)", "Coconut oil (1 tsp)"],
                instructions: [
                    "Crush fresh leaves into paste",
                    "Mix with honey and coconut oil",
                    "Apply to clean wounds",
                    "Cover with clean bandage"
                ],
                benefits: "Wound healing, antimicrobial, traditional medicine"
            },
            {
                title: "Black Jack Tea",
                category: "Tea",
                time: "10 min",
                difficulty: "Easy",
                servings: 1,
                ingredients: ["Fresh Black Jack leaves (1/4 cup)", "Hot water (1 cup)", "Honey (optional)"],
                instructions: [
                    "Wash fresh leaves thoroughly",
                    "Add to hot water",
                    "Steep for 5-7 minutes",
                    "Strain and add honey if desired"
                ],
                benefits: "Blood sugar support, immune boost, traditional use"
            }
        ]
    };
    return recipes[herbName] || [
        {
            title: `${herbName} Basic Tea`,
            category: "Tea",
            time: "10 min",
            difficulty: "Easy",
            servings: 1,
            ingredients: [`Dried ${herbName} (2 tsp)`, "Hot water (1 cup)", "Honey (1 tsp, optional)"],
            instructions: [
                "Add 2 tsp of dried herb to tea infuser",
                "Pour hot water (not boiling)",
                "Steep for 5-10 minutes",
                "Remove infuser and add honey if desired",
                "Enjoy while warm"
            ],
            benefits: "General wellness support, traditional preparation"
        },
        {
            title: `${herbName} Wellness Smoothie`,
            category: "Smoothie",
            time: "5 min",
            difficulty: "Easy",
            servings: 1,
            ingredients: [`${herbName} powder (1 tsp)`, "Banana (1)", "Almond milk (1 cup)", "Honey (1 tsp)"],
            instructions: [
                "Add all ingredients to blender",
                "Blend until smooth and creamy",
                "Add ice if desired",
                "Enjoy immediately"
            ],
            benefits: "Nutrient boost, easy absorption, daily wellness"
        }
    ];
};
export default function HerbRecipes({ herb }) {
    const recipes = getRecipesForHerb(herb.name);
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-4", children: "Recipes & Daily Integration" }), _jsxs("p", { className: "text-muted-foreground mb-6", children: ["Discover delicious ways to incorporate ", herb.name, " into your daily routine"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: recipes.map((recipe, index) => (_jsxs(Card, { className: "overflow-hidden", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg", children: recipe.title }), _jsx("div", { className: "flex items-center gap-2 mt-2", children: _jsxs(Badge, { variant: "outline", className: "text-xs", children: [recipeCategories[recipe.category]?.icon, " ", recipe.category] }) })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), recipe.time] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "h-3 w-3" }), recipe.servings] })] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-sm mb-2", children: "Ingredients:" }), _jsx("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1", children: recipe.ingredients.map((ingredient, idx) => (_jsx("li", { children: ingredient }, idx))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-sm mb-2", children: "Instructions:" }), _jsx("ol", { className: "list-decimal list-inside text-sm text-muted-foreground space-y-1", children: recipe.instructions.map((instruction, idx) => (_jsx("li", { children: instruction }, idx))) })] }), _jsxs("div", { className: "bg-muted p-3 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Star, { className: "h-4 w-4 text-primary" }), _jsx("span", { className: "font-medium text-sm", children: "Benefits" })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: recipe.benefits })] })] })] }, index))) }), _jsxs(Card, { className: "bg-blue-50 border-blue-200", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-blue-800", children: "Daily Integration Tips" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-blue-800 mb-2", children: "Morning Routine" }), _jsxs("ul", { className: "list-disc list-inside text-sm text-blue-700 space-y-1", children: [_jsxs("li", { children: ["Add ", herb.name, " to your morning tea or smoothie"] }), _jsx("li", { children: "Mix powder into yogurt or oatmeal" }), _jsx("li", { children: "Use fresh leaves in breakfast salads" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-blue-800 mb-2", children: "Evening Routine" }), _jsxs("ul", { className: "list-disc list-inside text-sm text-blue-700 space-y-1", children: [_jsxs("li", { children: ["Enjoy ", herb.name, " tea before bedtime"] }), _jsx("li", { children: "Add to evening meals for flavor and benefits" }), _jsx("li", { children: "Use in relaxing bath preparations" })] })] })] }) })] })] }));
}
