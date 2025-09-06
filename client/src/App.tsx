import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import FloatingAIAssistant from "@/components/ui/floating-ai-assistant";
import Home from "@/pages/home";
import Herbs from "@/pages/herbs";
import Wellbeing from "@/pages/wellbeing";
import MentalHealth from "@/pages/mental-health";
import Energy from "@/pages/energy";
import Sleep from "@/pages/sleep";
import WeightBalance from "@/pages/weight-balance";
import GeneralWellness from "@/pages/general-wellness";
import Ailments from "@/pages/ailments";
import Videos from "@/pages/videos";
import Community from "@/pages/community";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import SafetyGuidelines from "@/pages/safety-guidelines";
import PrivacyPolicy from "@/pages/privacy-policy";
import AIWellness from "@/pages/ai-wellness";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/herbs" component={Herbs} />
          <Route path="/wellbeing" component={Wellbeing} />
          <Route path="/mental-health" component={MentalHealth} />
          <Route path="/energy" component={Energy} />
          <Route path="/sleep" component={Sleep} />
          <Route path="/weight-balance" component={WeightBalance} />
          <Route path="/general-wellness" component={GeneralWellness} />
          <Route path="/ailments" component={Ailments} />
          <Route path="/videos" component={Videos} />
          <Route path="/community" component={Community} />
          <Route path="/ai-wellness" component={AIWellness} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/safety-guidelines" component={SafetyGuidelines} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <FloatingAIAssistant />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
