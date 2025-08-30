import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Heart, Brain, Leaf, Activity, Sun, Moon, Users, Globe, TrendingUp, AlertTriangle, Info, Lightbulb, BookOpen } from "lucide-react";
import HerbCard from "@/components/herbs/herb-card";
import HerbDetailModal from "@/components/herbs/herb-detail-modal";
import type { Herb } from "../../shared/schema";

export default function GeneralWellness() {
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allHerbs = [] } = useQuery<Herb[]>({
    queryKey: ["/api/herbs"],
  });

  // Filter herbs for general wellness
  const wellnessHerbs = allHerbs.filter(herb => 
    herb.categories.includes("General Wellness") ||
    herb.categories.includes("Energy") ||
    herb.categories.includes("Mental Health")
  );

  const handleHerbClick = (herb: Herb) => {
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

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6 text-blue-600" data-testid="text-page-title">
            Global Wellness & Preventive Health
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how lifestyle choices impact global health outcomes and learn preventive strategies 
            for optimal wellbeing using natural approaches and herbal support.
          </p>
        </div>

        {/* Global Health Pillars */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Four Pillars of Global Wellness</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {globalHealthPillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <Card key={pillar.id} className={`p-6 shadow-lg border-2 ${pillar.borderColor}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-full ${pillar.bgColor}`}>
                        <IconComponent className={`h-6 w-6 ${pillar.color}`} />
                      </div>
                      <h3 className={`text-xl font-bold ${pillar.color}`}>{pillar.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{pillar.definition}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Principles:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {pillar.keyPrinciples.map((principle, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {principle}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Global Impact:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {pillar.globalImpact.map((impact, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            {impact}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Prevention Strategies:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {pillar.preventionStrategies.map((strategy, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Preventive Health Strategies */}
        <div className="mb-16">
          <Card className="p-8 shadow-lg">
            <CardHeader className="text-center pb-6">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <Globe className="h-8 w-8 text-blue-600" />
                {preventiveHealthStrategies.title}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {preventiveHealthStrategies.categories.map((category, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-600 mb-2">{category.name}</h3>
                      <p className="text-muted-foreground mb-3">{category.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Strategies:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                        {category.strategies.map((strategy, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Supporting Herbs:</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.herbs.map((herb, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {herb}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lifestyle Optimization */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Lifestyle Optimization for Wellness</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifestyleOptimization.map((category, index) => (
              <Card key={index} className="p-6 shadow-lg">
                <CardHeader className="pb-4">
                  <h3 className="text-lg font-semibold text-center">{category.category}</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.practices.map((practice, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Herbal Wellness Support */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Herbal Support for Wellness</h2>
          <Tabs defaultValue="adaptogens" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="adaptogens">Adaptogens</TabsTrigger>
              <TabsTrigger value="immune">Immune Support</TabsTrigger>
              <TabsTrigger value="digestive">Digestive Health</TabsTrigger>
            </TabsList>

            <TabsContent value="adaptogens" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {herbalWellnessSupport.adaptogens.map((herb, index) => (
                  <Card key={index} className="p-6">
                    <CardHeader>
                      <h3 className="text-lg font-semibold">{herb.name}</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Benefits:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {herb.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Usage:</h4>
                        <p className="text-sm text-muted-foreground">{herb.usage}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="immune" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {herbalWellnessSupport.immune.map((herb, index) => (
                  <Card key={index} className="p-6">
                    <CardHeader>
                      <h3 className="text-lg font-semibold">{herb.name}</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Benefits:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {herb.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Usage:</h4>
                        <p className="text-sm text-muted-foreground">{herb.usage}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="digestive" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {herbalWellnessSupport.digestive.map((herb, index) => (
                  <Card key={index} className="p-6">
                    <CardHeader>
                      <h3 className="text-lg font-semibold">{herb.name}</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Benefits:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {herb.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Usage:</h4>
                        <p className="text-sm text-muted-foreground">{herb.usage}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Featured Herbs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Herbs for General Wellness</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wellnessHerbs.map((herb) => (
              <div key={herb.id} onClick={() => handleHerbClick(herb)}>
                <HerbCard herb={herb} />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="p-8 bg-blue-50 border-blue-200">
            <CardContent>
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Commit to Your Wellness Journey</h3>
              <p className="text-blue-700 mb-6">
                Remember, optimal health is achieved through consistent, sustainable lifestyle choices. 
                Start with small changes, build healthy habits, and use natural support to enhance your wellbeing.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="text-blue-700 border-blue-300">
                  <Shield className="h-4 w-4 mr-1" />
                  Prevention First
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300">
                  <Heart className="h-4 w-4 mr-1" />
                  Holistic Approach
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Sustainable Habits
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300">
                  <Leaf className="h-4 w-4 mr-1" />
                  Natural Support
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Herb Detail Modal */}
        <HerbDetailModal
          herb={selectedHerb}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedHerb(null);
          }}
        />
      </div>
    </div>
  );
}

