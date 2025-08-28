import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FeaturedHerb from "@/components/herbs/featured-herb";
import { Brain, Zap, Moon, Scale, Heart, Search, Play } from "lucide-react";
import type { Herb } from "@shared/schema";

export default function Home() {
  const [featuredHerbIndex, setFeaturedHerbIndex] = useState(0);

  const { data: herbs, isLoading } = useQuery<Herb[]>({
    queryKey: ["/api/herbs"],
  });

  // Featured herbs rotation
  const featuredHerbs = herbs?.filter(herb => 
    ["Ginger", "Chamomile", "Peppermint", "Hibiscus", "Neem", "Moringa"].includes(herb.name)
  ) || [];

  useEffect(() => {
    if (featuredHerbs.length > 0) {
      const interval = setInterval(() => {
        setFeaturedHerbIndex((prev) => (prev + 1) % featuredHerbs.length);
      }, 10000); // Rotate every 10 seconds
      return () => clearInterval(interval);
    }
  }, [featuredHerbs.length]);

  const currentFeaturedHerb = featuredHerbs[featuredHerbIndex];

  const wellnessCategories = [
    {
      icon: Brain,
      title: "Mental Health",
      description: "Find calm and clarity with natural herbs",
      color: "text-primary",
      href: "/wellbeing#mental-health"
    },
    {
      icon: Zap,
      title: "Energy",
      description: "Boost vitality and stamina naturally",
      color: "text-accent",
      href: "/wellbeing#energy"
    },
    {
      icon: Moon,
      title: "Sleep",
      description: "Rest better with soothing herbs",
      color: "text-secondary",
      href: "/wellbeing#sleep"
    },
    {
      icon: Scale,
      title: "Weight Balance",
      description: "Support healthy weight management",
      color: "text-primary",
      href: "/wellbeing#weight"
    },
    {
      icon: Heart,
      title: "General Wellness",
      description: "Overall health and vitality support",
      color: "text-accent",
      href: "/wellbeing#general"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading natural wellness...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-br from-primary/20 to-accent/30 py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6" data-testid="text-hero-title">
              Feel stronger, calmer, and more alive—naturally
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="text-hero-description">
              I have given you all these trees for you to eat… At Herbal Care Hub, we help you discover natural ways to boost energy, improve mental health, sleep better, and support wellbeing.
            </p>
            <Link href="/herbs">
              <Button size="lg" className="text-lg font-semibold" data-testid="button-explore-remedies">
                Explore Natural Remedies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Navigation Tiles */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="text-wellness-journey-title">
            Choose Your Wellness Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wellnessCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.title} href={category.href}>
                  <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer h-full" data-testid={`card-category-${category.title.toLowerCase().replace(' ', '-')}`}>
                    <CardContent className="text-center p-0">
                      <IconComponent className={`h-12 w-12 ${category.color} mx-auto mb-4`} />
                      <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                      <p className="text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
            
            {/* Browse All Herbs Tile */}
            <Link href="/herbs">
              <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground p-6 hover:shadow-xl transition-shadow cursor-pointer h-full" data-testid="card-browse-all">
                <CardContent className="text-center p-0">
                  <Search className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Browse All Herbs</h3>
                  <p className="opacity-90">Explore our complete herbal library</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Herb Spotlight */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="text-featured-herb-title">
            Featured Herb Spotlight
          </h2>
          {currentFeaturedHerb ? (
            <FeaturedHerb 
              herb={currentFeaturedHerb}
              onLearnMore={() => window.location.href = `/herbs#${currentFeaturedHerb.id}`}
            />
          ) : (
            <div className="bg-card rounded-xl p-8 shadow-lg border border-border text-center">
              <p className="text-muted-foreground">Loading featured herb...</p>
            </div>
          )}
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="text-video-title">
            Learn How to Prepare
          </h2>
          <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
            <h3 className="text-xl font-semibold mb-6 text-center">How to Make Ginger Tea</h3>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center" data-testid="video-placeholder-ginger-tea">
              <div className="text-center">
                <Play className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Video placeholder - "How to make ginger tea"</p>
                <p className="text-sm text-muted-foreground">Coming soon: Step-by-step herbal preparation guides</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
