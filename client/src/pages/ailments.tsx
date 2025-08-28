import { Card, CardContent } from "@/components/ui/card";
import { Droplet, Heart, HandHeart, Ribbon } from "lucide-react";

export default function Ailments() {
  const ailments = [
    {
      id: "diabetes",
      icon: Droplet,
      title: "Diabetes Support",
      color: "text-primary",
      description: "These herbs may help support healthy blood sugar levels as part of a comprehensive diabetes management plan.",
      herbs: [
        {
          name: "Neem (Muarubaini)",
          description: "Traditional support for blood sugar balance. Use as tea or powder."
        },
        {
          name: "Moringa",
          description: "Nutrient-dense leaves that may help with glucose management."
        },
        {
          name: "Hibiscus",
          description: "Antioxidant-rich flower that supports overall metabolic health."
        }
      ],
      warning: {
        type: "yellow",
        text: "Monitor blood sugar levels and consult your healthcare provider before using herbs alongside diabetes medications."
      }
    },
    {
      id: "blood-pressure",
      icon: Heart,
      title: "High Blood Pressure",
      color: "text-accent",
      description: "Gentle herbs that may help support cardiovascular health and healthy blood pressure levels.",
      herbs: [
        {
          name: "Hibiscus",
          description: "Studies suggest hibiscus tea may help maintain healthy blood pressure."
        },
        {
          name: "Garlic",
          description: "Traditional cardiovascular support, best used fresh or as extract."
        },
        {
          name: "African Basil",
          description: "Stress-reducing properties that support overall heart health."
        }
      ],
      warning: {
        type: "red",
        text: "Do not discontinue prescribed medications. Work with your doctor when adding herbs to your routine."
      }
    },
    {
      id: "arthritis",
      icon: HandHeart,
      title: "Arthritis Support",
      color: "text-secondary",
      description: "Anti-inflammatory herbs that may help ease joint discomfort and support mobility.",
      herbs: [
        {
          name: "Ginger",
          description: "Powerful anti-inflammatory properties for joint comfort. Use fresh or as tea."
        },
        {
          name: "Turmeric",
          description: "Golden spice with curcumin for inflammation support. Best with black pepper."
        },
        {
          name: "Moringa",
          description: "Rich in nutrients that support overall joint and bone health."
        }
      ],
      warning: {
        type: "blue",
        text: "Combine with gentle exercise, heat therapy, and a balanced diet for best results."
      }
    },
    {
      id: "wellness-support",
      icon: Ribbon,
      title: "General Wellness Support",
      color: "text-primary",
      description: "Antioxidant-rich herbs for general wellness and immune support. Not intended as cancer treatment.",
      herbs: [
        {
          name: "Soursop (Mtopeto)",
          description: "Rich in antioxidants for general immune and vitality support."
        },
        {
          name: "Baobab (Mbuyu)",
          description: "High vitamin C content supports immune system function."
        },
        {
          name: "Turmeric",
          description: "Powerful antioxidant and anti-inflammatory properties for wellness."
        }
      ],
      warning: {
        type: "purple",
        text: "These herbs support general wellness only. Always work with oncologists for cancer treatment and care."
      }
    }
  ];

  const getWarningColor = (type: string) => {
    switch (type) {
      case "yellow": return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "red": return "bg-red-50 border-red-200 text-red-800";
      case "blue": return "bg-blue-50 border-blue-200 text-blue-800";
      case "purple": return "bg-purple-50 border-purple-200 text-purple-800";
      default: return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8" data-testid="text-page-title">
          Common Ailments
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Natural herbal support for common health concerns. Always consult healthcare providers for serious conditions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ailments.map((ailment) => {
            const IconComponent = ailment.icon;
            
            return (
              <Card key={ailment.id} className="p-8 shadow-lg border border-border" data-testid={`card-ailment-${ailment.id}`}>
                <CardContent className="p-0">
                  <h2 className={`text-2xl font-bold mb-4 ${ailment.color} flex items-center`}>
                    <IconComponent className="mr-3 h-6 w-6" />
                    {ailment.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {ailment.description}
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    {ailment.herbs.map((herb, index) => (
                      <div key={index} className="bg-muted p-4 rounded-lg">
                        <h4 className={`font-semibold ${ailment.color}`}>{herb.name}</h4>
                        <p className="text-sm text-muted-foreground">{herb.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${getWarningColor(ailment.warning.type)}`}>
                    <p className="text-sm">
                      <strong>
                        {ailment.warning.type === "yellow" && "Important:"}
                        {ailment.warning.type === "red" && "Caution:"}
                        {ailment.warning.type === "blue" && "Tip:"}
                        {ailment.warning.type === "purple" && "Important:"}
                      </strong> {ailment.warning.text}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
