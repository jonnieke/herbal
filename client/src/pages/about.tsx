import { Card, CardContent } from "@/components/ui/card";
import { Leaf, GraduationCap, Shield } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Leaf,
      title: "Natural Approach",
      description: "We focus on gentle, natural solutions that work with your body's healing processes.",
      color: "text-primary bg-primary/10"
    },
    {
      icon: GraduationCap,
      title: "Education First",
      description: "We provide comprehensive education so you can make informed decisions about your wellness.",
      color: "text-accent bg-accent/10"
    },
    {
      icon: Shield,
      title: "Safety Priority",
      description: "Safety information and proper guidance are included with every recommendation.",
      color: "text-secondary bg-secondary/10"
    }
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12" data-testid="text-page-title">
          About Herbal Care Hub
        </h1>
        
        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary" data-testid="text-mission-title">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              To make herbal knowledge simple, safe, and accessible for everyone. We believe that nature has provided us with incredible healing resources, and our goal is to help you discover and use them safely.
            </p>
            <p className="text-muted-foreground">
              At Herbal Care Hub, we bridge the gap between traditional wisdom and modern wellness needs, providing education and guidance for natural health solutions.
            </p>
          </div>
          <div>
            <img 
              src="/attached_assets/generated_images/Family_enjoying_herbal_tea_747c1dae.png" 
              alt="Family enjoying herbal tea together" 
              className="rounded-xl w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Story Section */}
        <Card className="p-8 shadow-lg border border-border mb-16">
          <CardContent className="p-0">
            <h2 className="text-3xl font-bold mb-6 text-center text-accent" data-testid="text-story-title">
              Our Story
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-6 italic">
              "We believe herbs are a gift for health, balance, and vitality."
            </p>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Herbal Care Hub was born from a deep appreciation for the wisdom of traditional healers and the growing need for accessible, reliable information about natural wellness. We recognize that many people are seeking alternatives to support their health journey, but often lack reliable guidance.
              </p>
              <p>
                Our team combines respect for traditional knowledge with modern research to provide you with safe, practical information about herbs and natural wellness. We focus particularly on African indigenous herbs, which have been used for generations but are often overlooked in modern wellness conversations.
              </p>
              <p>
                Every herb we feature has been carefully researched for safety and traditional uses. We believe that when used responsibly and with proper knowledge, herbs can be powerful allies in maintaining health and vitality.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            
            return (
              <div key={index} className="text-center" data-testid={`value-${index}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${value.color}`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2" data-testid="text-disclaimer-title">
            Important Disclaimer
          </h3>
          <p className="text-sm text-yellow-800">
            The information provided on Herbal Care Hub is for educational purposes only and is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers before making changes to your health routine, especially if you have existing health conditions or take medications.
          </p>
        </div>
      </div>
    </div>
  );
}
