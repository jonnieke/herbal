import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HerbCard from "@/components/herbs/herb-card";
import HerbSearch from "@/components/herbs/herb-search";
import HerbDetailModal from "@/components/herbs/herb-detail-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Herb } from "@/shared/schema";

export default function Herbs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allHerbs = [], isLoading } = useQuery<Herb[]>({
    queryKey: ["/api/herbs"],
  });

  const { data: searchResults = [], isLoading: isSearching } = useQuery<Herb[]>({
    queryKey: ["/api/herbs/search", searchQuery],
    queryFn: async () => {
      const response = await fetch(`/api/herbs/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to search herbs');
      }
      return response.json();
    },
    enabled: searchQuery.length >= 2,
  });

  const displayedHerbs = searchQuery.length >= 2 ? searchResults : allHerbs;
  
  const globalHerbs = displayedHerbs.filter(herb => herb.isIndigenous === "false");
  const indigenousHerbs = displayedHerbs.filter(herb => herb.isIndigenous === "true");

  const allCategories = Array.from(
    new Set(allHerbs.flatMap(herb => herb.categories))
  ).sort();

  const handleHerbClick = (herb: Herb) => {
    setSelectedHerb(herb);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading herbs library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8" data-testid="text-page-title">
          Herbs Library
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Discover nature's pharmacy with our comprehensive collection of healing herbs from around the world.
        </p>

        {/* Search Bar */}
        <div className="mb-12">
          <HerbSearch onSearch={setSearchQuery} />
        </div>

        {/* Category Filters */}
        {!searchQuery && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("")}
                data-testid="button-category-all"
              >
                All Categories
              </Button>
              {allCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`button-category-${category.toLowerCase().replace(' ', '-')}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">
              Search Results for "{searchQuery}"
              {!isSearching && (
                <Badge variant="secondary" className="ml-2">
                  {searchResults.length} found
                </Badge>
              )}
            </h2>
            {isSearching ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-lg p-6 animate-pulse">
                    <div className="bg-muted h-48 rounded mb-4"></div>
                    <div className="bg-muted h-6 rounded mb-2"></div>
                    <div className="bg-muted h-4 rounded"></div>
                  </div>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((herb) => (
                  <HerbCard
                    key={herb.id}
                    herb={herb}
                    onClick={() => handleHerbClick(herb)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No herbs found matching your search.</p>
              </div>
            )}
          </div>
        )}

        {/* Global Herbs */}
        {!searchQuery && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6" data-testid="text-global-herbs-title">
              Global Herbs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {globalHerbs
                .filter(herb => !selectedCategory || herb.categories.includes(selectedCategory))
                .map((herb) => (
                  <HerbCard
                    key={herb.id}
                    herb={herb}
                    onClick={() => handleHerbClick(herb)}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Indigenous African Herbs */}
        {!searchQuery && (
          <div>
            <h2 className="text-2xl font-bold mb-6" data-testid="text-indigenous-herbs-title">
              Indigenous African Herbs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {indigenousHerbs
                .filter(herb => !selectedCategory || herb.categories.includes(selectedCategory))
                .map((herb) => (
                  <HerbCard
                    key={herb.id}
                    herb={herb}
                    onClick={() => handleHerbClick(herb)}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!searchQuery && selectedCategory && (
          displayedHerbs.filter(herb => herb.categories.includes(selectedCategory)).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No herbs found in the "{selectedCategory}" category.</p>
            </div>
          )
        )}
      </div>

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
  );
}
