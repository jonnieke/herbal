import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Leaf, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [location] = useLocation();
    const searchRef = useRef(null);
    // Close search results when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchResults(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const { data: herbs } = useQuery({
        queryKey: ["/api/herbs"],
    });
    // Search functionality
    const filteredHerbs = herbs?.filter(herb => herb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        herb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        herb.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()))) || [];
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
    const isActive = (path) => {
        if (path === "/") {
            return location === "/";
        }
        return location.startsWith(path);
    };
    return (_jsx("nav", { className: "bg-card border-b border-border sticky top-0 z-50 shadow-sm", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex justify-between items-center h-16", children: [_jsxs(Link, { href: "/", className: "flex items-center space-x-2", "data-testid": "link-home", children: [_jsx(Leaf, { className: "text-primary text-2xl" }), _jsx("span", { className: "text-xl font-bold text-primary", children: "Herbal Care Hub" })] }), _jsx("div", { className: "hidden md:flex flex-1 max-w-md mx-8 relative", ref: searchRef, children: _jsxs("div", { className: "relative w-full", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" }), _jsx(Input, { type: "text", placeholder: "Search herbs, benefits, health concerns...", value: searchQuery, onChange: (e) => {
                                            setSearchQuery(e.target.value);
                                            setShowSearchResults(e.target.value.length > 0);
                                        }, onFocus: () => setShowSearchResults(searchQuery.length > 0), className: "pl-10 pr-4" }), showSearchResults && searchQuery && (_jsxs("div", { className: "absolute top-full left-0 right-0 mt-1 bg-card rounded-lg shadow-lg border border-border max-h-64 overflow-y-auto z-50", children: [filteredHerbs.slice(0, 5).map((herb) => (_jsx(Link, { href: `/herbs#${herb.id}`, children: _jsx("div", { className: "p-3 hover:bg-accent/10 cursor-pointer border-b border-border last:border-b-0", onClick: () => {
                                                        setSearchQuery("");
                                                        setShowSearchResults(false);
                                                    }, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-xl", children: herb.emoji }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-semibold text-foreground truncate", children: herb.name }), _jsx("p", { className: "text-sm text-muted-foreground line-clamp-1", children: herb.description }), _jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: herb.benefits.slice(0, 2).map((benefit, index) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: benefit }, index))) })] })] }) }) }, herb.id))), filteredHerbs.length > 5 && (_jsxs("div", { className: "p-3 text-center text-sm text-muted-foreground border-t border-border", children: ["And ", filteredHerbs.length - 5, " more herbs..."] })), filteredHerbs.length === 0 && (_jsxs("div", { className: "p-3 text-center text-sm text-muted-foreground", children: ["No herbs found matching \"", searchQuery, "\""] }))] }))] }) }), _jsx("div", { className: "hidden md:flex space-x-8", children: navItems.map((item) => (item.hasDropdown ? (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: `nav-link font-medium ${isActive(item.path) ? "active" : ""}`, "data-testid": `link-${item.label.toLowerCase().replace(" ", "-")}`, children: [item.label, _jsx(ChevronDown, { className: "ml-1 h-4 w-4" })] }) }), _jsxs(DropdownMenuContent, { align: "start", children: [_jsx(DropdownMenuItem, { asChild: true, children: _jsx(Link, { href: item.path, children: "Overview" }) }), wellbeingCategories.map((category) => (_jsx(DropdownMenuItem, { asChild: true, children: _jsx(Link, { href: category.path, children: category.label }) }, category.path)))] })] }, item.path)) : (_jsx(Link, { href: item.path, className: `nav-link font-medium ${isActive(item.path) ? "active" : ""}`, "data-testid": `link-${item.label.toLowerCase().replace(" ", "-")}`, children: item.label }, item.path)))) }), _jsx(Button, { variant: "ghost", size: "icon", className: "md:hidden", onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), "data-testid": "button-mobile-menu", children: isMobileMenuOpen ? _jsx(X, { className: "h-6 w-6" }) : _jsx(Menu, { className: "h-6 w-6" }) })] }), isMobileMenuOpen && (_jsx("div", { className: "md:hidden", children: _jsxs("div", { className: "px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border", children: [_jsxs("div", { className: "relative mb-4", ref: searchRef, children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" }), _jsx(Input, { type: "text", placeholder: "Search herbs...", value: searchQuery, onChange: (e) => {
                                            setSearchQuery(e.target.value);
                                            setShowSearchResults(e.target.value.length > 0);
                                        }, onFocus: () => setShowSearchResults(searchQuery.length > 0), className: "pl-10 pr-4" }), showSearchResults && searchQuery && (_jsxs("div", { className: "absolute top-full left-0 right-0 mt-1 bg-card rounded-lg shadow-lg border border-border max-h-48 overflow-y-auto z-50", children: [filteredHerbs.slice(0, 3).map((herb) => (_jsx(Link, { href: `/herbs#${herb.id}`, children: _jsx("div", { className: "p-3 hover:bg-accent/10 cursor-pointer border-b border-border last:border-b-0", onClick: () => {
                                                        setSearchQuery("");
                                                        setShowSearchResults(false);
                                                        setIsMobileMenuOpen(false);
                                                    }, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-lg", children: herb.emoji }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-semibold text-foreground text-sm", children: herb.name }), _jsx("p", { className: "text-xs text-muted-foreground line-clamp-1", children: herb.description })] })] }) }) }, herb.id))), filteredHerbs.length === 0 && (_jsx("div", { className: "p-3 text-center text-sm text-muted-foreground", children: "No herbs found" }))] }))] }), navItems.map((item) => (_jsx(Link, { href: item.path, className: `nav-link block px-3 py-2 ${isActive(item.path) ? "active" : ""}`, onClick: () => setIsMobileMenuOpen(false), "data-testid": `mobile-link-${item.label.toLowerCase().replace(" ", "-")}`, children: item.label }, item.path)))] }) }))] }) }));
}
