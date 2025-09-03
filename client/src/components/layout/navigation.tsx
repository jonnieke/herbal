import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Leaf, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Herb } from "@/shared/schema";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [location] = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { data: herbs } = useQuery<Herb[]>({
    queryKey: ["/api/herbs"],
  });

  // Search functionality
  const filteredHerbs = herbs?.filter(herb =>
    herb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    herb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    herb.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/herbs", label: "Herbs Library" },
    { path: "/wellbeing", label: "Wellbeing", hasDropdown: true },
    { path: "/ailments", label: "Ailments" },
    { path: "/videos", label: "Videos" },
    { path: "/community", label: "Community" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const wellbeingCategories = [
    { path: "/mental-health", label: "Mental Health" },
    { path: "/energy", label: "Energy" },
    { path: "/sleep", label: "Sleep" },
    { path: "/weight-balance", label: "Weight Balance" },
    { path: "/general-wellness", label: "General Wellness" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location === "/";
    }
    return location.startsWith(path);
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
            <Leaf className="text-primary text-2xl" />
            <span className="text-xl font-bold text-primary">Herbal Care Hub</span>
          </Link>
          
          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search herbs, benefits, health concerns..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(e.target.value.length > 0);
                }}
                onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                className="pl-10 pr-4"
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card rounded-lg shadow-lg border border-border max-h-64 overflow-y-auto z-50">
                  {filteredHerbs.slice(0, 5).map((herb) => (
                    <Link key={herb.id} href={`/herbs#${herb.id}`}>
                      <div 
                        className="p-3 hover:bg-accent/10 cursor-pointer border-b border-border last:border-b-0"
                        onClick={() => {
                          setSearchQuery("");
                          setShowSearchResults(false);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{herb.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">{herb.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{herb.description}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {herb.benefits.slice(0, 2).map((benefit, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {filteredHerbs.length > 5 && (
                    <div className="p-3 text-center text-sm text-muted-foreground border-t border-border">
                      And {filteredHerbs.length - 5} more herbs...
                    </div>
                  )}
                  {filteredHerbs.length === 0 && (
                    <div className="p-3 text-center text-sm text-muted-foreground">
                      No herbs found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <DropdownMenu key={item.path}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`nav-link font-medium ${isActive(item.path) ? "active" : ""}`}
                      data-testid={`link-${item.label.toLowerCase().replace(" ", "-")}`}
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem asChild>
                      <Link href={item.path}>Overview</Link>
                    </DropdownMenuItem>
                    {wellbeingCategories.map((category) => (
                      <DropdownMenuItem key={category.path} asChild>
                        <Link href={category.path}>{category.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`nav-link font-medium ${isActive(item.path) ? "active" : ""}`}
                  data-testid={`link-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              {/* Mobile Search Bar */}
              <div className="relative mb-4" ref={searchRef}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search herbs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                  className="pl-10 pr-4"
                />
                
                {/* Mobile Search Results */}
                {showSearchResults && searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card rounded-lg shadow-lg border border-border max-h-48 overflow-y-auto z-50">
                    {filteredHerbs.slice(0, 3).map((herb) => (
                      <Link key={herb.id} href={`/herbs#${herb.id}`}>
                        <div 
                          className="p-3 hover:bg-accent/10 cursor-pointer border-b border-border last:border-b-0"
                          onClick={() => {
                            setSearchQuery("");
                            setShowSearchResults(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{herb.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground text-sm">{herb.name}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-1">{herb.description}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                    {filteredHerbs.length === 0 && (
                      <div className="p-3 text-center text-sm text-muted-foreground">
                        No herbs found
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`nav-link block px-3 py-2 ${isActive(item.path) ? "active" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`mobile-link-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
