import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { Herb } from "@/shared/schema";

interface FeaturedHerbProps {
  herb: Herb;
  onLearnMore?: () => void;
}

export default function FeaturedHerb({ herb, onLearnMore }: FeaturedHerbProps) {
  return (
    <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <img 
            src={herb.imageUrl || "/attached_assets/generated_images/Family_enjoying_herbal_tea_747c1dae.png"} 
            alt={herb.name}
            className="rounded-lg w-full h-64 object-cover"
          />
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-4 text-primary" data-testid="text-featured-herb-name">
            {herb.name} {herb.emoji}
          </h3>
          {herb.localName && (
            <p className="text-lg text-muted-foreground mb-2 italic">{herb.localName}</p>
          )}
          <p className="text-lg text-muted-foreground mb-6" data-testid="text-featured-herb-description">
            {herb.description}
          </p>
          <div className="space-y-3">
            {herb.benefits.slice(0, 3).map((benefit: string, index: number) => (
              <div key={index} className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-primary" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
          <Button 
            className="mt-6" 
            onClick={onLearnMore}
            data-testid="button-learn-more-featured"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
