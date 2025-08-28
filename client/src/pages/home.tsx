import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FeaturedHerb from "@/components/herbs/featured-herb";
import { Brain, Zap, Moon, Scale, Heart, Search, Play } from "lucide-react";
import type { Herb } from "@shared/schema";
import familyImage from "@assets/generated_images/Family_enjoying_herbal_tea_747c1dae.png";

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
        <div className="bg-gradient-to-br from-accent/20 to-secondary/30 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-hero-title">
                  Feel stronger, calmer, and more alive—naturally
                </h1>
                <div className="bg-primary/90 text-primary-foreground p-6 rounded-xl mb-6">
                  <p className="text-lg italic mb-2 text-[#b58700]">
                    "I have given you all these trees for you to eat..."
                  </p>
                  <p className="text-base text-[#b58700]">
                    At Herbal Care Hub, we help you discover natural ways to boost energy, improve mental health, sleep better, and support wellbeing.
                  </p>
                </div>
                <Link href="/herbs">
                  <Button size="lg" className="text-lg font-semibold px-8 py-3" data-testid="button-explore-herbs">
                    Explore Herbs
                  </Button>
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <img 
                    src={familyImage} 
                    alt="Family enjoying herbal tea together"
                    className="rounded-2xl w-full h-80 lg:h-96 object-cover shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Quick Navigation Tiles */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {wellnessCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.title} href={category.href}>
                  <div className="bg-card hover:bg-accent/10 transition-all duration-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md cursor-pointer" data-testid={`card-category-${category.title.toLowerCase().replace(' ', '-')}`}>
                    <div className="bg-secondary/40 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="h-8 w-8 text-foreground" />
                    </div>
                    <h3 className="font-semibold text-sm text-foreground">{category.title}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {/* Featured Herb Spotlight */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" data-testid="text-featured-herb-title">
            Featured Herb
          </h2>
          {currentFeaturedHerb ? (
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-4xl font-bold mb-4 text-foreground" data-testid="text-featured-herb-name">
                    {currentFeaturedHerb.name}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6" data-testid="text-featured-herb-description">
                    {currentFeaturedHerb.description}
                  </p>
                  <Button 
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold" 
                    onClick={() => window.location.href = `/herbs#${currentFeaturedHerb.id}`}
                    data-testid="button-learn-more-featured"
                  >
                    Learn More
                  </Button>
                </div>
                <div className="flex justify-center">
                  <img 
                    src={currentFeaturedHerb.imageUrl || "https://via.placeholder.com/400x300?text=Featured+Herb"} 
                    alt={currentFeaturedHerb.name}
                    className="rounded-2xl w-full max-w-sm h-64 object-cover shadow-md"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border text-center">
              <p className="text-muted-foreground">Loading featured herb...</p>
            </div>
          )}
        </div>
      </section>
      {/* Video Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8" data-testid="text-video-title">
            Watch simple herb preparations
          </h2>
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <div className="aspect-video bg-gradient-to-br from-muted to-secondary/20 rounded-xl flex items-center justify-center" data-testid="video-placeholder-ginger-tea">
              <div className="text-center">
                <div className="bg-primary/90 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Play className="h-10 w-10 text-primary-foreground" />
                </div>
                <p className="text-foreground text-lg font-semibold mb-2">Coming Soon</p>
                <p className="text-muted-foreground">Step-by-step herbal preparation guides</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
