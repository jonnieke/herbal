import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, MessageCircle, Eye, Plus, Users, TrendingUp, Award, Tag, User, ThumbsUp } from "lucide-react";
export default function Community() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
    const [currentUserEmail, setCurrentUserEmail] = useState(""); // User will input their email
    const [currentUserName, setCurrentUserName] = useState(""); // User will input their name
    const queryClient = useQueryClient();
    // Form states
    const [postForm, setPostForm] = useState({
        authorName: "",
        authorEmail: "",
        title: "",
        content: "",
        category: "success-story",
        tags: [],
        imageUrl: ""
    });
    const [commentForm, setCommentForm] = useState({
        authorName: "",
        authorEmail: "",
        content: ""
    });
    // Fetch community posts
    const { data: posts = [], isLoading, error } = useQuery({
        queryKey: ["/api/community/posts"],
        refetchOnWindowFocus: false,
        retry: 3,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
    // Fallback sample posts if API fails
    const fallbackPosts = [
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
    const { data: comments = [] } = useQuery({
        queryKey: ["/api/community/posts", selectedPost?.id, "comments"],
        enabled: !!selectedPost,
        refetchOnWindowFocus: false,
    });
    // Create post mutation
    const createPostMutation = useMutation({
        mutationFn: async (postData) => {
            const response = await fetch("/api/community/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
            });
            if (!response.ok)
                throw new Error("Failed to create post");
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
        mutationFn: async (commentData) => {
            const response = await fetch("/api/community/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(commentData),
            });
            if (!response.ok)
                throw new Error("Failed to create comment");
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
        mutationFn: async ({ postId, userEmail }) => {
            const response = await fetch(`/api/community/posts/${postId}/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userEmail }),
            });
            if (!response.ok)
                throw new Error("Failed to like post");
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
            (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
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
    const handleLikePost = (postId) => {
        if (!currentUserEmail.trim()) {
            const email = prompt("Please enter your email to like this post:");
            if (!email || !email.trim()) {
                return;
            }
            setCurrentUserEmail(email.trim());
            likePostMutation.mutate({ postId, userEmail: email.trim() });
            return;
        }
        likePostMutation.mutate({ postId, userEmail: currentUserEmail });
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    const getCategoryIcon = (category) => {
        const cat = categories.find(c => c.value === category);
        return cat ? cat.icon : Users;
    };
    const getCategoryColor = (category) => {
        switch (category) {
            case "success-story": return "bg-green-100 text-green-800";
            case "journey": return "bg-blue-100 text-blue-800";
            case "question": return "bg-purple-100 text-purple-800";
            case "tip": return "bg-orange-100 text-orange-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" }), _jsx("p", { className: "text-muted-foreground", children: "Loading community posts..." })] }) }));
    }
    if (error) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-red-500 text-2xl mb-4", children: "\u26A0\uFE0F" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "Error Loading Community" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Unable to load community posts. Please try again later." }), _jsx(Button, { onClick: () => window.location.reload(), children: "Retry" })] }) }));
    }
    return (_jsx("div", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", "data-testid": "text-community-title", children: "Wellness Community Center" }), _jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Share your wellness journey, celebrate successes, ask questions, and support others on their path to natural health." })] }), process.env.NODE_ENV === 'development' && (_jsxs("div", { className: "mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Debug Info:" }), _jsxs("p", { children: ["Total posts: ", displayPosts.length] }), _jsxs("p", { children: ["Selected category: ", selectedCategory] }), _jsxs("p", { children: ["Filtered posts: ", filteredPosts.length] }), _jsx("p", { children: "Posts by category:" }), _jsx("ul", { className: "text-sm", children: categories.map(cat => (_jsxs("li", { children: [cat.label, ": ", displayPosts.filter(p => p.category === cat.value).length] }, cat.value))) })] })), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [_jsx(Card, { children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx(Users, { className: "h-8 w-8 text-primary mx-auto mb-2" }), _jsx("div", { className: "text-2xl font-bold", children: displayPosts.length }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Community Posts" })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx(Award, { className: "h-8 w-8 text-green-600 mx-auto mb-2" }), _jsx("div", { className: "text-2xl font-bold", children: displayPosts.filter(p => p.category === "success-story").length }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Success Stories" })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx(MessageCircle, { className: "h-8 w-8 text-blue-600 mx-auto mb-2" }), _jsx("div", { className: "text-2xl font-bold", children: displayPosts.filter(p => p.category === "question").length }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Questions Asked" })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx(Heart, { className: "h-8 w-8 text-red-600 mx-auto mb-2" }), _jsx("div", { className: "text-2xl font-bold", children: displayPosts.reduce((sum, post) => sum + parseInt(post.likes), 0) }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Total Likes" })] }) })] }), _jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-8", children: [_jsx("div", { className: "flex-1", children: _jsx(Input, { placeholder: "Search posts, tags, or content...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "max-w-md" }) }), _jsxs(Dialog, { open: isCreatePostOpen, onOpenChange: setIsCreatePostOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "flex items-center gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), "Share Your Story"] }) }), _jsxs(DialogContent, { className: "max-w-2xl max-h-[80vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Share Your Wellness Journey" }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Your Name *" }), _jsx(Input, { placeholder: "Enter your name...", value: postForm.authorName, onChange: (e) => setPostForm({ ...postForm, authorName: e.target.value }), required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Your Email *" }), _jsx(Input, { type: "email", placeholder: "Enter your email...", value: postForm.authorEmail, onChange: (e) => setPostForm({ ...postForm, authorEmail: e.target.value }), required: true }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Your email will only be used for community features and won't be shared publicly." })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Title" }), _jsx(Input, { placeholder: "Give your post a descriptive title...", value: postForm.title, onChange: (e) => setPostForm({ ...postForm, title: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Category" }), _jsxs(Select, { value: postForm.category, onValueChange: (value) => setPostForm({ ...postForm, category: value }), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "success-story", children: "Success Story" }), _jsx(SelectItem, { value: "journey", children: "Wellness Journey" }), _jsx(SelectItem, { value: "question", children: "Question" }), _jsx(SelectItem, { value: "tip", children: "Tip & Advice" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Content" }), _jsx(Textarea, { placeholder: "Share your experience, ask questions, or provide helpful tips...", value: postForm.content, onChange: (e) => setPostForm({ ...postForm, content: e.target.value }), rows: 6 })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Tags (comma-separated)" }), _jsx(Input, { placeholder: "herbs, sleep, energy, etc.", value: postForm.tags.join(", "), onChange: (e) => setPostForm({ ...postForm, tags: e.target.value.split(",").map(t => t.trim()).filter(t => t) }) })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Image URL (optional)" }), _jsx(Input, { placeholder: "https://example.com/image.jpg", value: postForm.imageUrl, onChange: (e) => setPostForm({ ...postForm, imageUrl: e.target.value }) })] }), _jsx(Button, { onClick: handleCreatePost, disabled: createPostMutation.isPending || !postForm.title || !postForm.content || !postForm.authorName || !postForm.authorEmail, className: "w-full", children: createPostMutation.isPending ? "Creating..." : "Share Post" })] })] })] })] }), _jsx(Tabs, { value: selectedCategory, onValueChange: setSelectedCategory, className: "mb-8", children: _jsx(TabsList, { className: "grid w-full grid-cols-5", children: categories.map((category) => {
                            const IconComponent = category.icon;
                            return (_jsxs(TabsTrigger, { value: category.value, className: "flex items-center gap-2", children: [_jsx(IconComponent, { className: "h-4 w-4" }), _jsx("span", { className: "hidden sm:inline", children: category.label })] }, category.value));
                        }) }) }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: filteredPosts.map((post) => {
                        const CategoryIcon = getCategoryIcon(post.category);
                        return (_jsxs(Card, { className: "hover:shadow-lg transition-shadow cursor-pointer", children: [_jsx(CardHeader, { children: _jsx("div", { className: "flex items-start justify-between", children: _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsxs(Badge, { className: getCategoryColor(post.category), children: [_jsx(CategoryIcon, { className: "h-3 w-3 mr-1" }), categories.find(c => c.value === post.category)?.label] }), _jsx("span", { className: "text-sm text-muted-foreground", children: formatDate(post.createdAt) })] }), _jsx(CardTitle, { className: "text-lg mb-2", children: post.title }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(User, { className: "h-4 w-4" }), post.authorName] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "h-4 w-4" }), post.views] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Heart, { className: "h-4 w-4" }), post.likes] })] })] }) }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-muted-foreground mb-4 line-clamp-3", children: post.content }), post.imageUrl && (_jsx("img", { src: post.imageUrl, alt: post.title, className: "w-full h-48 object-cover rounded-lg mb-4" })), post.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: post.tags.map((tag, index) => (_jsxs(Badge, { variant: "outline", className: "text-xs", children: [_jsx(Tag, { className: "h-3 w-3 mr-1" }), tag] }, index))) })), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleLikePost(post.id), className: "flex items-center gap-2", children: [_jsx(ThumbsUp, { className: "h-4 w-4" }), "Like"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => {
                                                        setSelectedPost(post);
                                                        setIsCommentDialogOpen(true);
                                                    }, className: "flex items-center gap-2", children: [_jsx(MessageCircle, { className: "h-4 w-4" }), post.category === "question" ? "Answer" : "Comment"] })] })] })] }, post.id));
                    }) }), filteredPosts.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(MessageCircle, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "No posts found" }), _jsx("p", { className: "text-muted-foreground mb-4", children: searchQuery ? "Try adjusting your search terms" : "Be the first to share your wellness journey!" }), _jsxs(Button, { onClick: () => setIsCreatePostOpen(true), children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Share Your Story"] })] })), _jsx(Dialog, { open: isCommentDialogOpen, onOpenChange: setIsCommentDialogOpen, children: _jsxs(DialogContent, { className: "max-w-2xl max-h-[80vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: selectedPost?.category === "question"
                                        ? `Answers to "${selectedPost?.title}"`
                                        : `Comments on "${selectedPost?.title}"` }) }), selectedPost && (_jsxs("div", { className: "space-y-4", children: [_jsx(Card, { children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Badge, { className: getCategoryColor(selectedPost.category), children: categories.find(c => c.value === selectedPost.category)?.label }), _jsx("span", { className: "text-sm text-muted-foreground", children: formatDate(selectedPost.createdAt) })] }), _jsx("h3", { className: "font-semibold mb-2", children: selectedPost.title }), _jsx("p", { className: "text-sm text-muted-foreground", children: selectedPost.content })] }) }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-semibold", children: selectedPost.category === "question"
                                                    ? `Answers (${comments.length})`
                                                    : `Comments (${comments.length})` }), comments.map((comment) => (_jsx(Card, { children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(User, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "font-medium text-sm", children: comment.authorName }), _jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(comment.createdAt) })] }), _jsxs("div", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [_jsx(Heart, { className: "h-3 w-3" }), comment.likes] })] }), _jsx("p", { className: "text-sm", children: comment.content })] }) }, comment.id)))] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Your Name *" }), _jsx(Input, { placeholder: "Enter your name...", value: commentForm.authorName, onChange: (e) => setCommentForm({ ...commentForm, authorName: e.target.value }), required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Your Email *" }), _jsx(Input, { type: "email", placeholder: "Enter your email...", value: commentForm.authorEmail, onChange: (e) => {
                                                                    setCommentForm({ ...commentForm, authorEmail: e.target.value });
                                                                    setCurrentUserEmail(e.target.value); // Store for likes
                                                                }, required: true }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Your email will only be used for community features and won't be shared publicly." })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: selectedPost.category === "question" ? "Your Answer" : "Your Comment" }), _jsx(Textarea, { placeholder: selectedPost.category === "question"
                                                            ? "Share your experience and advice to help answer this question..."
                                                            : "Share your thoughts, ask questions, or offer support...", value: commentForm.content, onChange: (e) => setCommentForm({ ...commentForm, content: e.target.value }), rows: 3 })] }), _jsx(Button, { onClick: handleCreateComment, disabled: createCommentMutation.isPending || !commentForm.content || !commentForm.authorName || !commentForm.authorEmail, className: "w-full", children: createCommentMutation.isPending ? "Posting..." : (selectedPost.category === "question" ? "Post Answer" : "Post Comment") })] })] }))] }) })] }) }));
}
