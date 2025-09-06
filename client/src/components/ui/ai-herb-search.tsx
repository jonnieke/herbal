import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Leaf, Clock, AlertTriangle, Info, Zap, Heart, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HerbSearchResult {
  name: string;
  description: string;
  benefits: string[];
  usage: string;
  dosage: string;
  preparation: string;
  interactions: string[];
  warnings: string[];
  category: string;
}

export default function AIHerbSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<HerbSearchResult | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a herb name to search for.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/ai/herb-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch herb information");
      }

      const result = await response.json();
      setSearchResult(result);
      
      // Add to search history
      if (!searchHistory.includes(searchQuery.toLowerCase())) {
        setSearchHistory(prev => [searchQuery.toLowerCase(), ...prev.slice(0, 9)]);
      }

      toast({
        title: "Search Complete",
        description: `Found information for ${searchQuery}`,
      });
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Failed",
        description: "Unable to fetch herb information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSearch = (herb: string) => {
    setSearchQuery(herb);
    // Trigger search after setting the query
    setTimeout(() => handleSearch(), 100);
  };

  const popularHerbs = [
    "Ginger", "Turmeric", "Chamomile", "Peppermint", "Lavender",
    "Echinacea", "Ginseng", "Aloe Vera", "Garlic", "Honey"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            AI-Powered Herb Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search for any herb (e.g., Ginger, Turmeric, Chamomile)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>

          {/* Popular Herbs */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Popular herbs:</p>
            <div className="flex flex-wrap gap-2">
              {popularHerbs.map((herb) => (
                <Button
                  key={herb}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickSearch(herb)}
                  className="text-xs"
                >
                  {herb}
                </Button>
              ))}
            </div>
          </div>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Recent searches:</p>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((herb, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickSearch(herb)}
                    className="text-xs text-muted-foreground hover:text-primary"
                  >
                    {herb}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              {searchResult.name}
              <Badge variant="secondary">{searchResult.category}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Description */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Description
              </h4>
              <p className="text-muted-foreground">{searchResult.description}</p>
            </div>

            {/* Benefits */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                Health Benefits
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {searchResult.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage & Dosage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Usage
                </h4>
                <p className="text-sm text-muted-foreground">{searchResult.usage}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  Dosage
                </h4>
                <p className="text-sm text-muted-foreground">{searchResult.dosage}</p>
              </div>
            </div>

            {/* Preparation */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Leaf className="h-4 w-4 text-green-500" />
                Preparation Methods
              </h4>
              <p className="text-muted-foreground">{searchResult.preparation}</p>
            </div>

            {/* Interactions */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-500" />
                Drug Interactions
              </h4>
              <div className="space-y-2">
                {searchResult.interactions.map((interaction, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <span className="text-sm text-muted-foreground">{interaction}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warnings */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Warnings & Precautions
              </h4>
              <div className="space-y-2">
                {searchResult.warnings.map((warning, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span className="text-sm text-muted-foreground">{warning}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Searching for herb information...</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
