import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Clock, Thermometer } from "lucide-react";
import type { Herb } from "@shared/schema";
import HerbRecipes from "./herb-recipes";
import SourcingGuide from "./sourcing-guide";
import WellnessTracker from "./wellness-tracker";

interface HerbDetailModalProps {
  herb: Herb | null;
  isOpen: boolean;
  onClose: () => void;
}

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

export default function HerbDetailModal({ herb, isOpen, onClose }: HerbDetailModalProps) {
  if (!herb) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span>{herb.emoji}</span>
            <span>{herb.name}</span>
            {herb.isIndigenous === "true" && <Badge variant="secondary">African</Badge>}
          </DialogTitle>
          {herb.localName && <p className="text-muted-foreground italic">{herb.localName}</p>}
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="preparation">Preparation</TabsTrigger>
            <TabsTrigger value="sourcing">Where to Find</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="daily">Daily Use</TabsTrigger>
            <TabsTrigger value="tracker">Tracker</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <img 
                src={herb.imageUrl || "/attached_assets/generated_images/Family_enjoying_herbal_tea_747c1dae.png"} 
                alt={herb.name}
                className="rounded-lg w-full h-64 object-cover"
              />
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{herb.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                  <div className="space-y-2">
                    {herb.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preparation" className="space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Preparation Methods for {herb.name}</h3>
              <p className="text-muted-foreground text-sm">
                Choose the preparation method that best suits your needs and the herb's properties. 
                Each method extracts different compounds and has different applications.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {herb.preparationMethods.map((method: string) => {
                const guide = preparationGuides[method as keyof typeof preparationGuides];
                return (
                  <Card key={method} className="p-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{method}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {guide && (
                        <>
                          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                            {guide.steps.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ol>
                          <div className="flex gap-4 text-xs text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {guide.timing}
                            </div>
                            <div className="flex items-center gap-1">
                              <Thermometer className="h-3 w-3" />
                              {guide.temperature}
                            </div>
                          </div>
                          {guide.tips && (
                            <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                              <strong>Tip:</strong> {guide.tips}
                            </div>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Preparation Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
                  <div>
                    <h4 className="font-semibold mb-2">Quality Considerations</h4>
                    <ul className="space-y-1">
                      <li>• Use fresh, high-quality herbs</li>
                      <li>• Store properly to maintain potency</li>
                      <li>• Use filtered or spring water</li>
                      <li>• Avoid aluminum cookware</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Safety Guidelines</h4>
                    <ul className="space-y-1">
                      <li>• Start with small amounts</li>
                      <li>• Follow recommended dosages</li>
                      <li>• Consult healthcare providers</li>
                      <li>• Monitor for any reactions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

                    <TabsContent value="sourcing" className="space-y-6">
            <SourcingGuide herb={herb} />
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6">
            <HerbRecipes herb={herb} />
                      </TabsContent>

          <TabsContent value="tracker" className="space-y-6">
            <WellnessTracker herb={herb} />
          </TabsContent>

          <TabsContent value="daily" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <CardHeader>
                  <CardTitle className="text-lg">Morning Routine</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Add {herb.name} powder to your morning smoothie</li>
                    <li>Brew {herb.name} tea with breakfast</li>
                    <li>Mix fresh {herb.name} leaves in yogurt</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardHeader>
                  <CardTitle className="text-lg">Evening Routine</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Enjoy {herb.name} tea before bedtime</li>
                    <li>Add {herb.name} to your evening bath</li>
                    <li>Use {herb.name} essential oil for aromatherapy</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardHeader>
                  <CardTitle className="text-lg">Cooking & Meals</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Add fresh {herb.name} to salads</li>
                    <li>Use {herb.name} powder in soups and stews</li>
                    <li>Infuse {herb.name} in cooking oils</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardHeader>
                  <CardTitle className="text-lg">Wellness Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Track how you feel after using {herb.name}</li>
                    <li>Note any changes in energy or sleep</li>
                    <li>Record dosage and timing</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
