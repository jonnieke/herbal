import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Heart, BookOpen, Users, Phone } from "lucide-react";

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

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="h-10 w-10 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6 text-red-600" data-testid="text-page-title">
            Safety Guidelines
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Essential safety information for responsible herbal use. Your health and safety are our top priority.
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mb-16 bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-6 w-6" />
              Important Medical Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-red-800">
              <p>
                <strong>This information is for educational purposes only and is not intended as medical advice.</strong> 
                Herbal remedies should not replace professional medical treatment.
              </p>
              <p>
                Always consult with qualified healthcare providers before using herbs, especially if you have 
                existing medical conditions, are pregnant, breastfeeding, or taking medications.
              </p>
              <p>
                If you experience any adverse reactions, discontinue use immediately and seek medical attention.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Safety Principles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Core Safety Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safetyPrinciples.map((principle, index) => {
              const IconComponent = principle.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <IconComponent className={`h-12 w-12 mx-auto mb-4 ${principle.color}`} />
                    <h3 className="text-xl font-semibold mb-2">{principle.title}</h3>
                    <p className="text-muted-foreground">{principle.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Safety Checklist */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Pre-Use Safety Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safetyChecklist.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Warning Signs */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="h-6 w-6" />
              Warning Signs to Watch For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you experience any of these symptoms while using herbs, discontinue use immediately and consult a healthcare provider:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {warningSigns.map((sign, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-sm">{sign}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Special Populations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Special Considerations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialPopulations.map((population, index) => (
              <Card key={index} className="p-6">
                <CardHeader className="pb-4">
                  <h3 className="text-lg font-semibold text-blue-600">{population.group}</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {population.considerations.map((consideration, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span>{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Information */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Phone className="h-6 w-6" />
              Emergency Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-blue-800">
              <p>
                <strong>In case of emergency or severe adverse reaction:</strong>
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Call emergency services (911) immediately</li>
                <li>• Contact your local poison control center</li>
                <li>• Bring the herb or product with you to the emergency room</li>
                <li>• Inform healthcare providers about all herbs and medications you're taking</li>
              </ul>
              <p className="mt-4">
                <strong>Poison Control Hotline:</strong> 1-800-222-1222 (US)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
