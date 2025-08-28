import { Link } from "wouter";
import { Leaf } from "lucide-react";

export default function Footer() {
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
              <li><Link href="/herbs" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-herbs">Herbs Library</Link></li>
              <li><Link href="/wellbeing" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-wellbeing">Wellbeing</Link></li>
              <li><Link href="/ailments" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-ailments">Ailments</Link></li>
              <li><Link href="/videos" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-videos">Videos</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-about">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-contact">Contact</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
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
