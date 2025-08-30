import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Bed, Star, BookOpen, Clock, Lightbulb } from "lucide-react";
import HerbCard from "@/components/herbs/herb-card";
import HerbDetailModal from "@/components/herbs/herb-detail-modal";
import type { Herb } from "../../shared/schema";

export default function Sleep() {
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allHerbs = [] } = useQuery<Herb[]>({
    queryKey: ["/api/herbs"],
  });

  // Filter herbs for sleep
  const sleepHerbs = allHerbs.filter(herb => 
    herb.categories.includes("Sleep")
  );

  const handleHerbClick = (herb: Herb) => {
    setSelectedHerb(herb);
    setIsModalOpen(true);
  };

  const sleepTips = [
    {
      icon: Moon,
      title: "Natural Relaxation",
      description: "Use calming herbs like chamomile and African sage to prepare your mind for sleep.",
      color: "text-indigo-600"
    },
    {
      icon: Bed,
      title: "Sleep Ritual",
      description: "Create a consistent bedtime routine with soothing herbal teas and practices.",
      color: "text-purple-600"
    },
    {
      icon: Star,
      title: "Quality Rest",
      description: "Support deeper, more restorative sleep with gentle herbal remedies.",
      color: "text-blue-600"
    }
  ];

  const bedtimeRitual = [
    "Dim lights 1 hour before bed",
    "Drink calming herbal tea (chamomile, African sage)",
    "Practice gentle breathing exercises",
    "Read a book or listen to calming music",
    "Avoid screens and stimulating activities",
    "Create a cool, dark, quiet sleep environment"
  ];

  const sleepTimeline = [
    { time: "8:00 PM", activity: "Begin winding down", herb: "Chamomile tea" },
    { time: "9:00 PM", activity: "Relaxation practice", herb: "African sage steam" },
    { time: "9:30 PM", activity: "Bedtime preparation", herb: "Lavender aromatherapy" },
    { time: "10:00 PM", activity: "Sleep time", herb: "Gentle breathing" }
  ];

  const sleepEnhancers = [
    "Keep bedroom cool (65-68°F/18-20°C)",
    "Use blackout curtains",
    "White noise machine or nature sounds",
    "Comfortable, supportive mattress",
    "Regular sleep schedule",
    "Limit caffeine after 2 PM"
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
              <Moon className="h-10 w-10 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6 text-indigo-600" data-testid="text-page-title">
            Sleep & Relaxation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover natural herbs and practices that promote restful sleep, deep relaxation, and peaceful nights.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {sleepTips.map((tip, index) => {
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
          <h2 className="text-3xl font-bold mb-8 text-center">Herbs for Sleep & Relaxation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sleepHerbs.map((herb) => (
              <div key={herb.id} onClick={() => handleHerbClick(herb)}>
                <HerbCard herb={herb} />
              </div>
            ))}
          </div>
        </div>

        {/* Bedtime Ritual */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Bedtime Ritual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bedtimeRitual.map((ritual, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <span className="text-sm">{ritual}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sleep Timeline */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Sleep Preparation Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sleepTimeline.map((timing, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="font-semibold text-indigo-600 mb-2">{timing.time}</div>
                  <div className="text-sm text-muted-foreground mb-2">{timing.activity}</div>
                  <Badge variant="outline" className="text-xs">{timing.herb}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sleep Environment */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed className="h-6 w-6" />
              Sleep Environment Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sleepEnhancers.map((enhancer, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-sm">{enhancer}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sleep Tips */}
        <Card className="bg-indigo-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-800">
              <Lightbulb className="h-6 w-6" />
              Sleep Enhancement Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-indigo-800">
              <p>
                <strong>Consistency is Key:</strong> Go to bed and wake up at the same time every day, even on weekends.
              </p>
              <p>
                <strong>Herb Timing:</strong> Take sleep-supporting herbs 30-60 minutes before bedtime for best results.
              </p>
              <p>
                <strong>Mind-Body Connection:</strong> Combine herbs with relaxation techniques like meditation or gentle yoga.
              </p>
              <p>
                <strong>Patience:</strong> It may take 1-2 weeks to establish a new sleep routine. Be patient with the process.
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

