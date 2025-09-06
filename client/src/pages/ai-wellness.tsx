import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Search, MessageCircle, Brain, Heart } from "lucide-react";
import AIHerbSearch from "@/components/ui/ai-herb-search";
import AIWellnessAssistant from "@/components/ui/ai-wellness-assistant";

export default function AIWellness() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Wellness Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover herbs, get personalized wellness advice, and explore natural remedies 
              powered by advanced AI technology. Your journey to better health starts here.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Herb Search</h3>
            <p className="text-muted-foreground text-sm">
              Find comprehensive information about any herb including benefits, dosage, 
              preparation methods, and safety warnings.
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Wellness Assistant</h3>
            <p className="text-muted-foreground text-sm">
              Get personalized wellness advice, herb recommendations, and answers to 
              your health questions through intelligent conversation.
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Expert Knowledge</h3>
            <p className="text-muted-foreground text-sm">
              Access evidence-based information about traditional herbal medicine, 
              modern research, and safety guidelines.
            </p>
          </Card>
        </div>

        {/* AI Tools Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Wellness Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="search" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Herb Search
                </TabsTrigger>
                <TabsTrigger value="assistant" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Wellness Assistant
                </TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="mt-6">
                <AIHerbSearch />
              </TabsContent>

              <TabsContent value="assistant" className="mt-6">
                <AIWellnessAssistant />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Safety Notice */}
        <Card className="mt-8 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-orange-800 mb-2">
                  Important Safety Notice
                </h4>
                <p className="text-orange-700 text-sm">
                  While our AI provides helpful information about herbs and wellness, 
                  it's important to remember that this information is for educational 
                  purposes only. Always consult with a qualified healthcare provider 
                  before starting any new herbal regimen, especially if you have 
                  existing health conditions or are taking medications. The AI 
                  recommendations are not a substitute for professional medical advice.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
