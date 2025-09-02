import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Info, Heart, Droplet, Brain, Leaf, BookOpen, Lightbulb, Utensils } from "lucide-react";

export default function Ailments() {
  const [selectedAilment, setSelectedAilment] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

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

  const getWarningColor = (type: string) => {
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

  const handleAilmentClick = (ailmentId: string) => {
    const newSelectedAilment = selectedAilment === ailmentId ? null : ailmentId;
    setSelectedAilment(newSelectedAilment);
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">
            Common Health Conditions
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Educational information about common health conditions and natural herbal support. 
            Always consult healthcare providers for proper diagnosis and treatment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {ailments.map((ailment) => {
            const IconComponent = ailment.icon;
            
            return (
              <Card 
                key={ailment.id} 
                className={`p-6 shadow-lg border-2 cursor-pointer transition-all hover:shadow-xl ${ailment.borderColor} ${selectedAilment === ailment.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleAilmentClick(ailment.id)}
                data-testid={`card-ailment-${ailment.id}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${ailment.bgColor}`}>
                      <IconComponent className={`h-6 w-6 ${ailment.color}`} />
                    </div>
                    <div>
                      <CardTitle className={`text-xl font-bold ${ailment.color}`}>
                        {ailment.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{ailment.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4">
                    {ailment.definition}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {ailment.herbs.length} Herbs
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Natural Support
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedAilment && (
          <div ref={detailsRef} data-details-section="true" className="mt-12">
            {ailments.filter(ailment => ailment.id === selectedAilment).map((ailment) => {
              const IconComponent = ailment.icon;
              
              return (
                <Card key={ailment.id} className={`p-8 shadow-lg border-2 ${ailment.borderColor}`}>
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-4 rounded-full ${ailment.bgColor}`}>
                        <IconComponent className={`h-8 w-8 ${ailment.color}`} />
                      </div>
                      <div>
                        <h2 className={`text-3xl font-bold ${ailment.color}`}>
                          {ailment.title}
                        </h2>
                        <p className="text-lg text-muted-foreground">{ailment.subtitle}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-8">
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                        <TabsTrigger value="herbs">Herbal Support</TabsTrigger>
                        <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
                        <TabsTrigger value="safety">Safety</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Definition & Types
                          </h3>
                          <p className="text-muted-foreground mb-4">{ailment.definition}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ailment.types.map((type, index) => (
                              <div key={index} className="bg-muted p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">{type.name}</h4>
                                <p className="text-sm text-muted-foreground">{type.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            Risk Factors
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {ailment.riskFactors.map((factor, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-sm">{factor}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="symptoms" className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Common Symptoms</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {ailment.symptoms.map((symptom, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <span className="text-sm">{symptom}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="herbs" className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Leaf className="h-5 w-5" />
                            Herbal Support
                          </h3>
                          <div className="space-y-6">
                            {ailment.herbs.map((herb, index) => (
                              <Card key={index} className="p-6">
                                <CardHeader className="pb-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="text-lg font-semibold">{herb.name}</h4>
                                      <p className="text-sm text-muted-foreground italic">{herb.scientificName}</p>
                                    </div>
                                    <Badge variant="outline">Herbal Support</Badge>
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <p className="text-muted-foreground">{herb.description}</p>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <h5 className="font-semibold mb-2">Preparation & Dosage</h5>
                                      <p className="text-sm text-muted-foreground mb-2"><strong>How to use:</strong> {herb.preparation}</p>
                                      <p className="text-sm text-muted-foreground"><strong>Dosage:</strong> {herb.dosage}</p>
                                    </div>
                                    <div>
                                      <h5 className="font-semibold mb-2">Research Notes</h5>
                                      <p className="text-sm text-muted-foreground">{herb.research}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="lifestyle" className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Lightbulb className="h-5 w-5" />
                            Lifestyle Recommendations
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {ailment.lifestyleTips.map((tip, index) => (
                              <div key={index} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                <span className="text-sm">{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="safety" className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Info className="h-5 w-5" />
                            Important Safety Information
                          </h3>
                          <div className={`p-6 rounded-lg border ${getWarningColor(ailment.warning.type)}`}>
                            <p className="font-semibold mb-2">
                              {ailment.warning.type === "yellow" && "⚠️ Important:"}
                              {ailment.warning.type === "red" && "🚨 Caution:"}
                              {ailment.warning.type === "blue" && "💡 Tip:"}
                              {ailment.warning.type === "green" && "✅ Note:"}
                            </p>
                            <p>{ailment.warning.text}</p>
                          </div>
                          
                          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="font-semibold text-blue-800 mb-2">When to Seek Medical Attention</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                              <li>• Severe or worsening symptoms</li>
                              <li>• New or unusual symptoms</li>
                              <li>• Symptoms that interfere with daily activities</li>
                              <li>• Concerns about medication interactions</li>
                              <li>• Emergency symptoms (chest pain, severe shortness of breath, etc.)</li>
                            </ul>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <Card className="p-6 bg-muted/30">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Disclaimer</h3>
              <p className="text-sm text-muted-foreground">
                This information is for educational purposes only and is not intended as medical advice. 
                Always consult with qualified healthcare professionals for proper diagnosis and treatment. 
                Herbs may interact with medications and should be used under medical supervision.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
