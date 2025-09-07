import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Herb } from "@/shared/schema";
import { getCdnUrl } from "@/lib/api.js";

interface HerbCardProps {
  herb: Herb;
  onClick?: () => void;
}

export default function HerbCard({ herb, onClick }: HerbCardProps) {
  return (
    <Card 
      className="herb-card cursor-pointer overflow-hidden border border-border"
      onClick={onClick}
      data-testid={`card-herb-${herb.id}`}
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={getCdnUrl(herb.imageUrl || "/attached_assets/generated_images/Family_enjoying_herbal_tea_747c1dae.png")} 
          alt={herb.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-semibold" data-testid={`text-herb-name-${herb.id}`}>
            {herb.name} {herb.emoji}
          </h3>
          {herb.isIndigenous === "true" && (
            <Badge variant="secondary" className="text-xs">African</Badge>
          )}
        </div>
        {herb.localName && (
          <p className="text-sm text-muted-foreground mb-2 italic">{herb.localName}</p>
        )}
        <p className="text-muted-foreground text-sm mb-4" data-testid={`text-herb-description-${herb.id}`}>
          {herb.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {herb.categories.slice(0, 3).map((category: string) => (
            <Badge key={category} variant="outline" className="text-xs">
              {category}
            </Badge>
          ))}
          {herb.categories.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{herb.categories.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
