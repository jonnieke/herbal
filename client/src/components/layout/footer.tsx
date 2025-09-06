import { useLocation } from "wouter";
import { Leaf } from "lucide-react";

export default function Footer() {
  const [, setLocation] = useLocation();

  const handleNavigation = (path: string) => {
    setLocation(path);
  };

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 pt-[10px] pb-[10px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="text-primary text-2xl" />
              <span className="text-xl font-bold text-primary">Herbal Care Hub</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering natural wellness through traditional herbal wisdom and modern safety practices.
            </p>
            <p className="text-sm text-muted-foreground">
              Making herbal knowledge simple, safe, and accessible for everyone.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigation("/herbs")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-left w-full"
                  data-testid="footer-link-herbs"
                >
                  Herbs Library
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/wellbeing")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-left w-full"
                  data-testid="footer-link-wellbeing"
                >
                  Wellbeing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/ailments")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-left w-full"
                  data-testid="footer-link-ailments"
                >
                  Ailments
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/videos")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-left w-full"
                  data-testid="footer-link-videos"
                >
                  Videos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/community")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-left w-full"
                  data-testid="footer-link-community"
                >
                  Community
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/ai-wellness")}
                  className="text-muted-foreground hover:text-primary transition-colors text-left w-full"
                  data-testid="footer-link-ai-wellness"
                >
                  AI Wellness
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigation("/about")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-left w-full"
                  data-testid="footer-link-about"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/contact")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-left w-full"
                  data-testid="footer-link-contact"
                >
                  Contact
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/safety-guidelines")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-left w-full"
                  data-testid="footer-link-safety-guidelines"
                >
                  Safety Guidelines
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/privacy-policy")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-left w-full"
                  data-testid="footer-link-privacy-policy"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2024 Herbal Care Hub. All rights reserved.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-lg">
              <p className="text-xs text-yellow-800 font-medium">
                Educational content only - Not medical advice. Consult healthcare providers for medical concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
