import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Heart, Leaf } from "lucide-react";
import HerbCard from "@/components/herbs/herb-card";
import HerbDetailModal from "@/components/herbs/herb-detail-modal";
import type { Herb } from "@shared/schema";

export default function MentalHealth() {
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allHerbs = [] } = useQuery<Herb[]>({
    queryKey: ["/api/herbs"],
  });

  // Filter herbs for mental health
  const mentalHealthHerbs = allHerbs.filter(herb => 
    herb.categories.includes("Mental Health")
  );

  const handleHerbClick = (herb: Herb) => {
    setSelectedHerb(herb);
    setIsModalOpen(true);
  };

  const mentalHealthTips = [
    {
      icon: Brain,
      title: "Mindful Breathing",
      description: "Practice deep breathing exercises with chamomile or lavender tea to calm your mind.",
      color: "text-blue-600"
    },
    {
      icon: Heart,
      title: "Emotional Balance",
      description: "Use herbs like African sage and peppermint to support emotional stability and clarity.",
      color: "text-pink-600"
    },
    {
      icon: Leaf,
      title: "Natural Calming",
      description: "Incorporate calming herbs into your daily routine for sustained mental wellness.",
      color: "text-green-600"
    }
  ];

  const dailyPractices = [
    "Start your day with a calming herbal tea",
    "Practice 10 minutes of mindful meditation",
    "Take short breaks to breathe deeply",
    "Create a peaceful evening routine",
    "Limit screen time before bed",
    "Connect with nature regularly"
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Brain className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6 text-blue-600" data-testid="text-page-title">
            Mental Health & Wellness
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover natural herbs and practices that support mental clarity, emotional balance, and inner peace.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mentalHealthTips.map((tip, index) => {
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
          <h2 className="text-3xl font-bold mb-8 text-center">Herbs for Mental Wellness</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentalHealthHerbs.map((herb) => (
              <div key={herb.id} onClick={() => handleHerbClick(herb)}>
                <HerbCard herb={herb} />
              </div>
            ))}
          </div>
        </div>

        {/* Daily Practices */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Daily Mental Wellness Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dailyPractices.map((practice, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-sm">{practice}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Safety & Guidance */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Lightbulb className="h-6 w-6" />
              Important Guidance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-blue-800">
              <p>
                <strong>Professional Support:</strong> These herbs complement but don't replace professional mental health care. 
                If you're experiencing persistent mental health challenges, please seek support from qualified professionals.
              </p>
              <p>
                <strong>Individual Response:</strong> Everyone responds differently to herbs. Start with small amounts and 
                observe how your body and mind respond.
              </p>
              <p>
                <strong>Consistency:</strong> Mental wellness is a journey. Regular, gentle practices often work better than 
                occasional intensive use.
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

