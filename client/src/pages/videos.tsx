import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, Clock, ChefHat, List } from "lucide-react";

export default function Videos() {
  const videos = [
    {
      id: "neem-tea",
      title: "How to Prepare Neem Tea",
      description: "Learn the traditional method for brewing neem leaves into a beneficial tea.",
      thumbnail: "/attached_assets/generated_images/Neem_tree_leaves_8f8d6bbc.png",
      duration: "5:32",
      difficulty: "Easy",
      ingredients: ["Neem leaves", "Water", "Honey (optional)"],
      steps: [
        "Gather fresh neem leaves or use dried leaves",
        "Boil 2 cups of water",
        "Add 1-2 teaspoons of neem leaves",
        "Simmer for 5-7 minutes",
        "Strain and add honey if desired"
      ]
    },
    {
      id: "moringa-powder",
      title: "Moringa Powder Benefits & Uses",
      description: "Discover the nutritional benefits and uses of moringa powder in daily meals.",
      thumbnail: "/attached_assets/generated_images/Fresh_moringa_plant_leaves_f8771929.png",
      duration: "4:15",
      difficulty: "Easy",
      ingredients: ["Moringa powder", "Smoothie ingredients", "Water or milk"],
      steps: [
        "Start with 1/4 to 1/2 teaspoon of moringa powder",
        "Add to smoothies, yogurt, or water",
        "Mix well to avoid clumping",
        "Store in airtight container away from light"
      ]
    },
    {
      id: "ginger-tea",
      title: "Making Ginger Tea",
      description: "Step-by-step guide to preparing fresh ginger tea for digestion and immunity.",
      thumbnail: "/attached_assets/generated_images/Fresh_ginger_root_pieces_b404e3ce.png",
      duration: "6:45",
      difficulty: "Easy",
      ingredients: ["Fresh ginger root", "Lemon", "Honey", "Water"],
      steps: [
        "Slice 1 inch of fresh ginger",
        "Boil 2 cups of water",
        "Add ginger and simmer for 5 minutes",
        "Strain and add lemon and honey"
      ]
    },
    {
      id: "chamomile-sleep",
      title: "Chamomile Sleep Remedy",
      description: "Create the perfect bedtime chamomile tea for better sleep quality.",
      thumbnail: "/attached_assets/generated_images/Chamomile_flowers_blooming_fcc5a2fb.png",
      duration: "3:20",
      difficulty: "Easy",
      ingredients: ["Chamomile flowers", "Hot water", "Honey (optional)"],
      steps: [
        "Add 1-2 tsp chamomile to cup",
        "Pour hot water (not boiling)",
        "Steep for 5-7 minutes",
        "Strain and add honey if desired"
      ]
    },
    {
      id: "hibiscus-heart",
      title: "Hibiscus for Heart Health",
      description: "Learn to brew hibiscus tea and understand its cardiovascular benefits.",
      thumbnail: "/attached_assets/generated_images/Red_hibiscus_flowers_47e0eec6.png",
      duration: "7:10",
      difficulty: "Easy",
      ingredients: ["Hibiscus flowers", "Water", "Honey", "Lemon", "Mint"],
      steps: [
        "Boil water and add hibiscus",
        "Steep for 10-15 minutes",
        "Strain and cool",
        "Add honey, lemon, and mint"
      ]
    },
    {
      id: "sage-steam",
      title: "African Sage Steam Therapy",
      description: "Traditional steam therapy using African sage for respiratory wellness.",
      thumbnail: "/attached_assets/generated_images/African_sage_plant_11f1d049.png",
      duration: "8:30",
      difficulty: "Medium",
      ingredients: ["African sage leaves", "Hot water", "Towel", "Bowl"],
      steps: [
        "Boil water in a large bowl",
        "Add fresh sage leaves",
        "Cover head with towel",
        "Inhale steam for 5-10 minutes"
      ]
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
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
              onClick={() => handleVideoClick(video)}
              data-testid={`card-video-${video.id}`}
            >
              <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-center">
                  <Play className="h-16 w-16 text-white opacity-90" />
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs">{video.difficulty}</Badge>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge variant="outline" className="text-xs bg-black/50 text-white border-white/20">
                    {video.duration}
                  </Badge>
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

      {/* Video Detail Modal */}
      {selectedVideo && (
        <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedVideo.title}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
                          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
              <img 
                src={selectedVideo.thumbnail} 
                alt={selectedVideo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 text-white mb-4 mx-auto" />
                  <p className="text-lg font-semibold text-white">Video Coming Soon</p>
                  <p className="text-white/80">Step-by-step preparation guide</p>
                </div>
              </div>
            </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <ChefHat className="h-5 w-5" />
                    Ingredients
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {selectedVideo.ingredients.map((ingredient: string, index: number) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Video Details
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Duration:</strong> {selectedVideo.duration}</p>
                    <p><strong>Difficulty:</strong> 
                      <Badge variant="secondary" className="ml-2">{selectedVideo.difficulty}</Badge>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <List className="h-5 w-5" />
                  Preparation Steps
                </h3>
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                  {selectedVideo.steps.map((step: string, index: number) => (
                    <li key={index} className="pl-2">{step}</li>
                  ))}
                </ol>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Tips for Success</h4>
                <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                  <li>Use fresh, high-quality ingredients when possible</li>
                  <li>Follow the timing instructions carefully</li>
                  <li>Store prepared herbs properly to maintain potency</li>
                  <li>Start with small amounts and adjust to your preference</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
