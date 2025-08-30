import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, Apple, Heart, Leaf, Clock, Target, AlertTriangle } from "lucide-react";
import HerbCard from "@/components/herbs/herb-card";
import HerbDetailModal from "@/components/herbs/herb-detail-modal";
import type { Herb } from "@shared/schema";

export default function WeightBalance() {
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allHerbs = [] } = useQuery<Herb[]>({
    queryKey: ["/api/herbs"],
  });

  // Filter herbs for weight balance and metabolism
  const weightBalanceHerbs = allHerbs.filter(herb => 
    herb.categories.includes("Weight Balance") || 
    herb.categories.includes("General Wellness")
  );

  const handleHerbClick = (herb: Herb) => {
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

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Scale className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6 text-green-600" data-testid="text-page-title">
            Global Health & Weight Balance
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding how eating habits and lifestyle choices impact global health outcomes. 
            Discover sustainable approaches to weight management and overall wellbeing.
          </p>
        </div>

        {/* Global Health Issues */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Major Health Issues Stemming from Eating Habits</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {globalHealthIssues.map((issue) => {
              const IconComponent = issue.icon;
              return (
                <Card key={issue.id} className={`p-6 shadow-lg border-2 ${issue.borderColor}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-full ${issue.bgColor}`}>
                        <IconComponent className={`h-6 w-6 ${issue.color}`} />
                      </div>
                      <h3 className={`text-xl font-bold ${issue.color}`}>{issue.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{issue.definition}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {issue.statistics && (
                      <div>
                        <h4 className="font-semibold mb-2">Global Statistics:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {issue.statistics.map((stat, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              {stat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold mb-2">Root Causes:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {issue.rootCauses?.map((cause, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            {cause}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {issue.healthConsequences && (
                      <div>
                        <h4 className="font-semibold mb-2">Health Consequences:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {issue.healthConsequences.map((consequence, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              {consequence}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Nutrition Education */}
        <div className="mb-16">
          <Card className="p-8 shadow-lg">
            <CardHeader className="text-center pb-6">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <Apple className="h-8 w-8 text-green-600" />
                {nutritionEducation.title}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {nutritionEducation.principles.map((principle, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-green-600 mb-2">{principle.name}</h3>
                      <p className="text-muted-foreground mb-3">{principle.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Examples:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                        {principle.examples.map((example, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Benefits:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {principle.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lifestyle Strategies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Lifestyle Strategies for Sustainable Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifestyleStrategies.map((strategy, index) => (
              <Card key={index} className="p-6 shadow-lg">
                <CardHeader className="pb-4">
                  <h3 className="text-lg font-semibold text-center">{strategy.category}</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {strategy.strategies.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Herbal Support */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Herbal Support for Weight Balance</h2>
          <Tabs defaultValue="metabolism" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="metabolism">Metabolism</TabsTrigger>
              <TabsTrigger value="appetite">Appetite Control</TabsTrigger>
              <TabsTrigger value="stress">Stress Management</TabsTrigger>
            </TabsList>

            <TabsContent value="metabolism" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {herbalSupport.metabolism.map((herb, index) => (
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

            <TabsContent value="appetite" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {herbalSupport.appetite.map((category, index) => (
                  <Card key={index} className="p-6">
                    <CardHeader>
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Benefits:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {category.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Examples:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {category.examples.map((example, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stress" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {herbalSupport.stress.map((category, index) => (
                  <Card key={index} className="p-6">
                    <CardHeader>
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Benefits:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {category.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Examples:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {category.examples.map((example, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              {example}
                            </li>
                          ))}
                        </ul>
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
          <h2 className="text-3xl font-bold mb-8 text-center">Herbs for Weight Balance & Metabolism</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weightBalanceHerbs.map((herb) => (
              <div key={herb.id} onClick={() => handleHerbClick(herb)}>
                <HerbCard herb={herb} />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="p-8 bg-green-50 border-green-200">
            <CardContent>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Start Your Health Journey Today</h3>
              <p className="text-green-700 mb-6">
                Remember, sustainable weight management is about creating lasting lifestyle changes, 
                not quick fixes. Focus on nourishing your body with whole foods, staying active, 
                managing stress, and getting adequate sleep.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="text-green-700 border-green-300">
                  <Target className="h-4 w-4 mr-1" />
                  Set Realistic Goals
                </Badge>
                <Badge variant="outline" className="text-green-700 border-green-300">
                  <Clock className="h-4 w-4 mr-1" />
                  Be Patient
                </Badge>
                <Badge variant="outline" className="text-green-700 border-green-300">
                  <Heart className="h-4 w-4 mr-1" />
                  Prioritize Health
                </Badge>
                <Badge variant="outline" className="text-green-700 border-green-300">
                  <Leaf className="h-4 w-4 mr-1" />
                  Use Natural Support
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

