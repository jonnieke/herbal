import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Sun, Battery, TrendingUp, Clock, Lightbulb } from "lucide-react";
import HerbCard from "@/components/herbs/herb-card";
import HerbDetailModal from "@/components/herbs/herb-detail-modal";
import type { Herb } from "@/shared/schema";

export default function Energy() {
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allHerbs = [] } = useQuery<Herb[]>({
    queryKey: ["/api/herbs"],
  });

  // Filter herbs for energy
  const energyHerbs = allHerbs.filter(herb => 
    herb.categories.includes("Energy")
  );

  const handleHerbClick = (herb: Herb) => {
    setSelectedHerb(herb);
    setIsModalOpen(true);
  };

  const energyTips = [
    {
      icon: Zap,
      title: "Natural Boost",
      description: "Use herbs like ginger and moringa for sustained energy without crashes.",
      color: "text-yellow-600"
    },
    {
      icon: Sun,
      title: "Morning Ritual",
      description: "Start your day with energizing herbal teas to boost vitality naturally.",
      color: "text-orange-600"
    },
    {
      icon: Battery,
      title: "Endurance Support",
      description: "Support your body's energy systems with nutrient-rich herbs.",
      color: "text-green-600"
    }
  ];

  const energyRituals = [
    "Morning ginger tea for natural energy boost",
    "Moringa powder in smoothies for sustained vitality",
    "Baobab fruit for vitamin C and energy support",
    "Regular hydration with herbal infusions",
    "Balanced meals with energy-supporting herbs",
    "Adequate rest to complement herbal energy support"
  ];

  const energyTiming = [
    { time: "6-8 AM", activity: "Ginger tea or moringa smoothie", herb: "Ginger, Moringa" },
    { time: "10-11 AM", activity: "Mid-morning energy boost", herb: "Baobab, Turmeric" },
    { time: "2-3 PM", activity: "Afternoon vitality support", herb: "Peppermint, Hibiscus" },
    { time: "6-7 PM", activity: "Evening wind-down", herb: "Chamomile, African Sage" }
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
              <Zap className="h-10 w-10 text-yellow-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6 text-yellow-600" data-testid="text-page-title">
            Natural Energy & Vitality
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover herbs that provide sustained energy, boost vitality, and support your body's natural energy systems.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {energyTips.map((tip, index) => {
            const IconComponent = tip.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <IconComponent className={`h-12 w-12 mx-auto mb-4 ${tip.color}`} />
                  <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                  <p className="text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Herbs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Herbs for Energy & Vitality</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {energyHerbs.map((herb) => (
              <div key={herb.id} onClick={() => handleHerbClick(herb)}>
                <HerbCard herb={herb} />
              </div>
            ))}
          </div>
        </div>

        {/* Daily Energy Rituals */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              Daily Energy Rituals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {energyRituals.map((ritual, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-sm">{ritual}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Energy Timing Guide */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Optimal Energy Timing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {energyTiming.map((timing, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="font-semibold text-yellow-600 mb-2">{timing.time}</div>
                  <div className="text-sm text-muted-foreground mb-2">{timing.activity}</div>
                  <Badge variant="outline" className="text-xs">{timing.herb}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Energy Tips */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Lightbulb className="h-6 w-6" />
              Energy Enhancement Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-yellow-800">
              <p>
                <strong>Start Slow:</strong> Begin with small amounts of energizing herbs and gradually increase as your body adapts.
              </p>
              <p>
                <strong>Stay Hydrated:</strong> Energy herbs work best when you're well-hydrated. Drink plenty of water throughout the day.
              </p>
              <p>
                <strong>Listen to Your Body:</strong> Pay attention to how different herbs affect your energy levels and adjust accordingly.
              </p>
              <p>
                <strong>Combine with Lifestyle:</strong> Herbs work best when combined with good sleep, nutrition, and regular movement.
              </p>
            </div>
          </CardContent>
        </Card>

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

