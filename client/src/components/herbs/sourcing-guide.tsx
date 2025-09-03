import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, ShoppingBag, Leaf, Star, AlertTriangle } from "lucide-react";
import type { Herb } from "@/shared/schema";

interface SourcingGuideProps {
  herb: Herb;
}

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

export default function SourcingGuide({ herb }: SourcingGuideProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Where to Find {herb.name}</h3>
        <p className="text-muted-foreground mb-6">
          Discover the best places to source {herb.name} and how to ensure quality
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sourcingOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <Card key={option.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <IconComponent className="h-5 w-5" />
                  {option.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                      <Star className="h-4 w-4 text-green-600" />
                      Pros
                    </h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {option.pros.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      Cons
                    </h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {option.cons.map((con, index) => (
                        <li key={index}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Tips:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {option.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Best for:</h4>
                  <div className="flex flex-wrap gap-1">
                    {option.bestFor.map((item) => (
                      <Badge key={item} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Quality Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {qualityIndicators.map((category) => (
              <div key={category.title}>
                <h4 className="font-medium text-green-800 mb-2">{category.title}</h4>
                <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                  {category.indicators.map((indicator, index) => (
                    <li key={index}>{indicator}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {herb.region && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Regional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 text-sm">
              {herb.name} is native to {herb.region}. 
              {herb.isIndigenous === "true" 
                ? " This indigenous herb has been used traditionally in local communities for generations. Look for it in local markets and traditional medicine shops."
                : " This herb has been adopted globally and is now widely available in most regions."
              }
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800">Safety Reminders</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
            <li>Always verify the source and quality of herbs</li>
            <li>Check for organic certification when possible</li>
            <li>Avoid herbs that look moldy, discolored, or have unusual odors</li>
            <li>Store herbs properly to maintain freshness and potency</li>
            <li>Consult with healthcare providers about herb interactions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
