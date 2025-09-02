import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MessageCircle, Clock, Heart } from "lucide-react";
import type { InsertContactMessage } from "@/shared/schema";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll respond within 24-48 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in required fields",
        description: "Name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const socialLinks = [
    { name: "Facebook", icon: "fab fa-facebook", color: "text-blue-600", bgColor: "bg-blue-50 hover:bg-blue-100" },
    { name: "Instagram", icon: "fab fa-instagram", color: "text-pink-600", bgColor: "bg-pink-50 hover:bg-pink-100" },
    { name: "YouTube", icon: "fab fa-youtube", color: "text-red-600", bgColor: "bg-red-50 hover:bg-red-100" },
    { name: "Twitter", icon: "fab fa-twitter", color: "text-blue-400", bgColor: "bg-blue-50 hover:bg-blue-100" }
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8" data-testid="text-page-title">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Have questions about herbs or natural wellness? We'd love to hear from you!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 shadow-lg border border-border">
            <CardContent className="p-0">
              <h2 className="text-2xl font-bold mb-6" data-testid="text-form-title">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    data-testid="input-name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    data-testid="input-email"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Select onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger data-testid="select-subject">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="herbs">Herb Information</SelectItem>
                      <SelectItem value="safety">Safety Concerns</SelectItem>
                      <SelectItem value="collaboration">Collaboration</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                    data-testid="textarea-message"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={contactMutation.isPending}
                  data-testid="button-send-message"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Connect */}
            <Card className="p-8 shadow-lg border border-border">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <MessageCircle className="text-primary mr-3" />
                  Quick Connect
                </h3>
                <p className="text-muted-foreground mb-6">
                  For immediate questions or consultations, reach out through our messaging platforms:
                </p>
                <div className="space-y-4">
                  <a 
                    href="#" 
                    className="flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    data-testid="link-whatsapp"
                  >
                    <i className="fab fa-whatsapp text-2xl text-green-600"></i>
                    <span className="font-medium">WhatsApp</span>
                    <span className="text-sm text-muted-foreground ml-auto">Coming Soon</span>
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    data-testid="link-telegram"
                  >
                    <i className="fab fa-telegram text-2xl text-blue-600"></i>
                    <span className="font-medium">Telegram</span>
                    <span className="text-sm text-muted-foreground ml-auto">Coming Soon</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="p-8 shadow-lg border border-border">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Clock className="text-accent mr-3" />
                  Response Time
                </h3>
                <p className="text-muted-foreground mb-4">
                  We typically respond to messages within 24-48 hours. For urgent health concerns, please consult with a healthcare professional immediately.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Remember:</strong> We provide educational information only. For medical emergencies or serious health issues, please contact your healthcare provider or emergency services.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="p-8 shadow-lg border border-border">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Heart className="text-secondary mr-3" />
                  Connect with Us
                </h3>
                <p className="text-muted-foreground mb-4">
                  Join our community of natural wellness enthusiasts:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-colors ${social.bgColor}`}
                      data-testid={`link-social-${social.name.toLowerCase()}`}
                    >
                      <i className={`${social.icon} ${social.color}`}></i>
                      <span className="text-sm">{social.name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
