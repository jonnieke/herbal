import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

export default function Videos() {
  const videos = [
    {
      id: "neem-tea",
      title: "How to Prepare Neem Tea",
      description: "Learn the traditional method for brewing neem leaves into a beneficial tea.",
      thumbnail: "https://via.placeholder.com/400x225?text=Neem+Tea+Preparation"
    },
    {
      id: "moringa-powder",
      title: "Moringa Powder Benefits",
      description: "Discover the nutritional benefits and uses of moringa powder in daily meals.",
      thumbnail: "https://via.placeholder.com/400x225?text=Moringa+Powder"
    },
    {
      id: "ginger-tea",
      title: "Making Ginger Tea",
      description: "Step-by-step guide to preparing fresh ginger tea for digestion and immunity.",
      thumbnail: "https://via.placeholder.com/400x225?text=Ginger+Tea"
    },
    {
      id: "chamomile-sleep",
      title: "Chamomile Sleep Remedy",
      description: "Create the perfect bedtime chamomile tea for better sleep quality.",
      thumbnail: "https://via.placeholder.com/400x225?text=Chamomile+Tea"
    },
    {
      id: "hibiscus-heart",
      title: "Hibiscus for Heart Health",
      description: "Learn to brew hibiscus tea and understand its cardiovascular benefits.",
      thumbnail: "https://via.placeholder.com/400x225?text=Hibiscus+Tea"
    },
    {
      id: "sage-steam",
      title: "African Sage Steam Therapy",
      description: "Traditional steam therapy using African sage for respiratory wellness.",
      thumbnail: "https://via.placeholder.com/400x225?text=Steam+Therapy"
    }
  ];

  const handleVideoClick = (videoId: string) => {
    // TODO: Implement actual video playback
    console.log("Playing video:", videoId);
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8" data-testid="text-page-title">
          Herbal Preparation Videos
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Learn how to prepare and use herbs safely with our step-by-step video guides.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Card 
              key={video.id} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleVideoClick(video.id)}
              data-testid={`card-video-${video.id}`}
            >
              <div className="aspect-video bg-muted flex items-center justify-center relative">
                <div className="text-center">
                  <Play className="h-12 w-12 text-primary mb-2 mx-auto" />
                  <p className="text-sm text-muted-foreground">Video Coming Soon</p>
                </div>
                <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Play className="h-16 w-16 text-white opacity-80" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2" data-testid={`text-video-title-${video.id}`}>
                  {video.title}
                </h3>
                <p className="text-muted-foreground text-sm" data-testid={`text-video-description-${video.id}`}>
                  {video.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-muted p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">More Videos Coming Soon!</h3>
            <p className="text-muted-foreground mb-4">
              We're working on creating comprehensive video guides for all our featured herbs and preparation methods.
            </p>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter to be notified when new videos are available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
