import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Heart, 
  MessageCircle, 
  Eye, 
  Plus, 
  Send, 
  Users, 
  TrendingUp, 
  Award,
  Calendar,
  Tag,
  User,
  ThumbsUp
} from "lucide-react";
import type { CommunityPost, CommunityComment } from "../../shared/schema";

interface CreatePostForm {
  authorName: string;
  authorEmail: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl?: string;
}

interface CreateCommentForm {
  authorName: string;
  authorEmail: string;
  content: string;
}

export default function Community() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState(""); // User will input their email
  const [currentUserName, setCurrentUserName] = useState(""); // User will input their name
  
  const queryClient = useQueryClient();

  // Form states
  const [postForm, setPostForm] = useState<CreatePostForm>({
    authorName: "",
    authorEmail: "",
    title: "",
    content: "",
    category: "success-story",
    tags: [],
    imageUrl: ""
  });

  const [commentForm, setCommentForm] = useState<CreateCommentForm>({
    authorName: "",
    authorEmail: "",
    content: ""
  });

  // Fetch community posts
  const { data: posts = [], isLoading, error } = useQuery<CommunityPost[]>({
    queryKey: ["/api/community/posts"],
    refetchOnWindowFocus: false,
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fallback sample posts if API fails
  const fallbackPosts: CommunityPost[] = [
    {
      id: "1",
      authorName: "Sarah Johnson",
      authorEmail: "sarah@example.com",
      title: "My Journey with Chamomile for Better Sleep",
      content: "I've been struggling with insomnia for months, and chamomile tea has been a game-changer! I started drinking a cup 30 minutes before bed, and within a week, I noticed a significant improvement in my sleep quality.",
      category: "success-story",
      tags: ["sleep", "chamomile", "anxiety", "insomnia"],
      imageUrl: "/attached_assets/generated_images/Chamomile_flowers_blooming_fcc5a2fb.png",
      likes: "5",
      views: "12",
      isApproved: "true",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      authorName: "Michael Chen",
      authorEmail: "michael@example.com",
      title: "Ginger Tea: My Natural Energy Boost",
      content: "As someone who works long hours, I was always looking for natural ways to boost my energy without caffeine crashes. Ginger tea has been incredible!",
      category: "success-story",
      tags: ["energy", "ginger", "digestion", "anti-inflammatory"],
      imageUrl: "/attached_assets/generated_images/Fresh_ginger_root_pieces_b404e3ce.png",
      likes: "3",
      views: "8",
      isApproved: "true",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      authorName: "David Thompson",
      authorEmail: "david@example.com",
      title: "Question: Best Herbs for Stress Management?",
      content: "I'm going through a particularly stressful time at work and looking for natural ways to manage stress. What would you recommend?",
      category: "question",
      tags: ["stress", "adaptogens", "mental-health", "beginner"],
      imageUrl: null,
      likes: "2",
      views: "15",
      isApproved: "true",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  const displayPosts = posts.length > 0 ? posts : fallbackPosts;

  // Fetch comments for selected post
  const { data: comments = [] } = useQuery<CommunityComment[]>({
    queryKey: ["/api/community/posts", selectedPost?.id, "comments"],
    enabled: !!selectedPost,
    refetchOnWindowFocus: false,
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (postData: CreatePostForm) => {
      const response = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      if (!response.ok) throw new Error("Failed to create post");
      return response.json();
    },
         onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["/api/community/posts"] });
       setIsCreatePostOpen(false);
       setPostForm({
         authorName: "",
         authorEmail: "",
         title: "",
         content: "",
         category: "success-story",
         tags: [],
         imageUrl: ""
       });
     },
  });

  // Create comment mutation
  const createCommentMutation = useMutation({
    mutationFn: async (commentData: CreateCommentForm & { postId: string }) => {
      const response = await fetch("/api/community/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });
      if (!response.ok) throw new Error("Failed to create comment");
      return response.json();
    },
         onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["/api/community/posts", selectedPost?.id, "comments"] });
       setIsCommentDialogOpen(false);
       setCommentForm({
         authorName: "",
         authorEmail: "",
         content: ""
       });
     },
  });

  // Like post mutation
  const likePostMutation = useMutation({
    mutationFn: async ({ postId, userEmail }: { postId: string; userEmail: string }) => {
      const response = await fetch(`/api/community/posts/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail }),
      });
      if (!response.ok) throw new Error("Failed to like post");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community/posts"] });
    },
  });

  // Filter posts based on category and search
  const filteredPosts = displayPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return matchesCategory && matchesSearch;
  });

  // Debug logging
  console.log('All posts:', displayPosts);
  console.log('Selected category:', selectedCategory);
  console.log('Filtered posts:', filteredPosts);

  const categories = [
    { value: "all", label: "All Posts", icon: Users },
    { value: "success-story", label: "Success Stories", icon: Award },
    { value: "journey", label: "Wellness Journeys", icon: TrendingUp },
    { value: "question", label: "Questions", icon: MessageCircle },
    { value: "tip", label: "Tips & Advice", icon: Heart },
  ];

  const handleCreatePost = () => {
    if (!postForm.authorName.trim() || !postForm.authorEmail.trim()) {
      alert("Please provide your name and email to share your story.");
      return;
    }
    createPostMutation.mutate(postForm);
  };

  const handleCreateComment = () => {
    if (!commentForm.authorName.trim() || !commentForm.authorEmail.trim()) {
      alert("Please provide your name and email to comment.");
      return;
    }
    if (selectedPost) {
      createCommentMutation.mutate({
        ...commentForm,
        postId: selectedPost.id
      });
    }
  };

  const handleLikePost = (postId: string) => {
    if (!currentUserEmail.trim()) {
      alert("Please provide your email to like posts. You can set it in the comment section.");
      return;
    }
    likePostMutation.mutate({ postId, userEmail: currentUserEmail });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : Users;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "success-story": return "bg-green-100 text-green-800";
      case "journey": return "bg-blue-100 text-blue-800";
      case "question": return "bg-purple-100 text-purple-800";
      case "tip": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading community posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold mb-2">Error Loading Community</h3>
          <p className="text-muted-foreground mb-4">Unable to load community posts. Please try again later.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-community-title">
            Wellness Community Center
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your wellness journey, celebrate successes, ask questions, and support others on their path to natural health.
          </p>
        </div>

                 {/* Debug Info - Remove this in production */}
         {process.env.NODE_ENV === 'development' && (
           <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
             <h3 className="font-semibold mb-2">Debug Info:</h3>
             <p>Total posts: {displayPosts.length}</p>
             <p>Selected category: {selectedCategory}</p>
             <p>Filtered posts: {filteredPosts.length}</p>
             <p>Posts by category:</p>
             <ul className="text-sm">
               {categories.map(cat => (
                 <li key={cat.value}>
                   {cat.label}: {displayPosts.filter(p => p.category === cat.value).length}
                 </li>
               ))}
             </ul>
           </div>
         )}

         {/* Stats */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{displayPosts.length}</div>
              <div className="text-sm text-muted-foreground">Community Posts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                             <div className="text-2xl font-bold">
                 {displayPosts.filter(p => p.category === "success-story").length}
               </div>
              <div className="text-sm text-muted-foreground">Success Stories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                             <div className="text-2xl font-bold">
                 {displayPosts.filter(p => p.category === "question").length}
               </div>
              <div className="text-sm text-muted-foreground">Questions Asked</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                             <div className="text-2xl font-bold">
                 {displayPosts.reduce((sum, post) => sum + parseInt(post.likes), 0)}
               </div>
              <div className="text-sm text-muted-foreground">Total Likes</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search posts, tags, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Share Your Story
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Share Your Wellness Journey</DialogTitle>
              </DialogHeader>
                             <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="text-sm font-medium">Your Name *</label>
                     <Input
                       placeholder="Enter your name..."
                       value={postForm.authorName}
                       onChange={(e) => setPostForm({ ...postForm, authorName: e.target.value })}
                       required
                     />
                   </div>
                                        <div>
                       <label className="text-sm font-medium">Your Email *</label>
                       <Input
                         type="email"
                         placeholder="Enter your email..."
                         value={postForm.authorEmail}
                         onChange={(e) => setPostForm({ ...postForm, authorEmail: e.target.value })}
                         required
                       />
                       <p className="text-xs text-muted-foreground mt-1">Your email will only be used for community features and won't be shared publicly.</p>
                     </div>
                 </div>
                 <div>
                   <label className="text-sm font-medium">Title</label>
                   <Input
                     placeholder="Give your post a descriptive title..."
                     value={postForm.title}
                     onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                   />
                 </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={postForm.category} onValueChange={(value) => setPostForm({ ...postForm, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="success-story">Success Story</SelectItem>
                      <SelectItem value="journey">Wellness Journey</SelectItem>
                      <SelectItem value="question">Question</SelectItem>
                      <SelectItem value="tip">Tip & Advice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    placeholder="Share your experience, ask questions, or provide helpful tips..."
                    value={postForm.content}
                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                    rows={6}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tags (comma-separated)</label>
                  <Input
                    placeholder="herbs, sleep, energy, etc."
                    value={postForm.tags.join(", ")}
                    onChange={(e) => setPostForm({ ...postForm, tags: e.target.value.split(",").map(t => t.trim()).filter(t => t) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Image URL (optional)</label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={postForm.imageUrl}
                    onChange={(e) => setPostForm({ ...postForm, imageUrl: e.target.value })}
                  />
                </div>
                                 <Button 
                   onClick={handleCreatePost} 
                   disabled={createPostMutation.isPending || !postForm.title || !postForm.content || !postForm.authorName || !postForm.authorEmail}
                   className="w-full"
                 >
                   {createPostMutation.isPending ? "Creating..." : "Share Post"}
                 </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger key={category.value} value={category.value} className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPosts.map((post) => {
            const CategoryIcon = getCategoryIcon(post.category);
            return (
              <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(post.category)}>
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {categories.find(c => c.value === post.category)?.label}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.authorName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {post.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  
                  {post.imageUrl && (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLikePost(post.id)}
                      className="flex items-center gap-2"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Like
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedPost(post);
                        setIsCommentDialogOpen(true);
                      }}
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Comment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Be the first to share your wellness journey!"}
            </p>
            <Button onClick={() => setIsCreatePostOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Share Your Story
            </Button>
          </div>
        )}

        {/* Comment Dialog */}
        <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Comments on "{selectedPost?.title}"</DialogTitle>
            </DialogHeader>
            
            {selectedPost && (
              <div className="space-y-4">
                {/* Post Preview */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getCategoryColor(selectedPost.category)}>
                        {categories.find(c => c.value === selectedPost.category)?.label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(selectedPost.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2">{selectedPost.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedPost.content}</p>
                  </CardContent>
                </Card>

                {/* Comments */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Comments ({comments.length})</h4>
                  {comments.map((comment) => (
                    <Card key={comment.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-sm">{comment.authorName}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Heart className="h-3 w-3" />
                            {comment.likes}
                          </div>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                                 {/* Add Comment */}
                 <div className="space-y-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <label className="text-sm font-medium">Your Name *</label>
                       <Input
                         placeholder="Enter your name..."
                         value={commentForm.authorName}
                         onChange={(e) => setCommentForm({ ...commentForm, authorName: e.target.value })}
                         required
                       />
                     </div>
                     <div>
                       <label className="text-sm font-medium">Your Email *</label>
                       <Input
                         type="email"
                         placeholder="Enter your email..."
                         value={commentForm.authorEmail}
                         onChange={(e) => {
                           setCommentForm({ ...commentForm, authorEmail: e.target.value });
                           setCurrentUserEmail(e.target.value); // Store for likes
                         }}
                         required
                       />
                       <p className="text-xs text-muted-foreground mt-1">Your email will only be used for community features and won't be shared publicly.</p>
                     </div>
                   </div>
                   <div>
                     <label className="text-sm font-medium">Your Comment</label>
                     <Textarea
                       placeholder="Share your thoughts, ask questions, or offer support..."
                       value={commentForm.content}
                       onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                       rows={3}
                     />
                   </div>
                   <Button 
                     onClick={handleCreateComment}
                     disabled={createCommentMutation.isPending || !commentForm.content || !commentForm.authorName || !commentForm.authorEmail}
                     className="w-full"
                   >
                     {createCommentMutation.isPending ? "Posting..." : "Post Comment"}
                   </Button>
                 </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
