import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HerbCard from "@/components/herbs/herb-card";
import HerbSearch from "@/components/herbs/herb-search";
import HerbDetailModal from "@/components/herbs/herb-detail-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export default function Herbs() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedHerb, setSelectedHerb] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: allHerbs = [], isLoading } = useQuery({
        queryKey: ["/api/herbs"],
    });
    const { data: searchResults = [], isLoading: isSearching } = useQuery({
        queryKey: ["/api/herbs/search", searchQuery],
        queryFn: async () => {
            const response = await fetch(`/api/herbs/search?q=${encodeURIComponent(searchQuery)}`);
            if (!response.ok) {
                throw new Error('Failed to search herbs');
            }
            return response.json();
        },
        enabled: searchQuery.length >= 2,
    });
    const displayedHerbs = searchQuery.length >= 2 ? searchResults : allHerbs;
    const globalHerbs = displayedHerbs.filter(herb => herb.isIndigenous === "false");
    const indigenousHerbs = displayedHerbs.filter(herb => herb.isIndigenous === "true");
    const allCategories = Array.from(new Set(allHerbs.flatMap(herb => herb.categories))).sort();
    const handleHerbClick = (herb) => {
        setSelectedHerb(herb);
        setIsModalOpen(true);
    };
    if (isLoading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" }), _jsx("p", { className: "text-muted-foreground", children: "Loading herbs library..." })] }) }));
    }
    return (_jsxs("div", { className: "py-16 px-4", children: [_jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("h1", { className: "text-4xl font-bold text-center mb-8", "data-testid": "text-page-title", children: "Herbs Library" }), _jsx("p", { className: "text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto", children: "Discover nature's pharmacy with our comprehensive collection of healing herbs from around the world." }), _jsx("div", { className: "mb-12", children: _jsx(HerbSearch, { onSearch: setSearchQuery }) }), !searchQuery && (_jsx("div", { className: "mb-8", children: _jsxs("div", { className: "flex flex-wrap gap-2 justify-center", children: [_jsx(Button, { variant: selectedCategory === "" ? "default" : "outline", size: "sm", onClick: () => setSelectedCategory(""), "data-testid": "button-category-all", children: "All Categories" }), allCategories.map((category) => (_jsx(Button, { variant: selectedCategory === category ? "default" : "outline", size: "sm", onClick: () => setSelectedCategory(category), "data-testid": `button-category-${category.toLowerCase().replace(' ', '-')}`, children: category }, category)))] }) })), searchQuery && (_jsxs("div", { className: "mb-8", children: [_jsxs("h2", { className: "text-2xl font-bold mb-6", children: ["Search Results for \"", searchQuery, "\"", !isSearching && (_jsxs(Badge, { variant: "secondary", className: "ml-2", children: [searchResults.length, " found"] }))] }), isSearching ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3].map((i) => (_jsxs("div", { className: "bg-card rounded-lg p-6 animate-pulse", children: [_jsx("div", { className: "bg-muted h-48 rounded mb-4" }), _jsx("div", { className: "bg-muted h-6 rounded mb-2" }), _jsx("div", { className: "bg-muted h-4 rounded" })] }, i))) })) : searchResults.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: searchResults.map((herb) => (_jsx(HerbCard, { herb: herb, onClick: () => handleHerbClick(herb) }, herb.id))) })) : (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-muted-foreground", children: "No herbs found matching your search." }) }))] })), !searchQuery && (_jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", "data-testid": "text-global-herbs-title", children: "Global Herbs" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: globalHerbs
                                    .filter(herb => !selectedCategory || herb.categories.includes(selectedCategory))
                                    .map((herb) => (_jsx(HerbCard, { herb: herb, onClick: () => handleHerbClick(herb) }, herb.id))) })] })), !searchQuery && (_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold mb-6", "data-testid": "text-indigenous-herbs-title", children: "Indigenous African Herbs" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: indigenousHerbs
                                    .filter(herb => !selectedCategory || herb.categories.includes(selectedCategory))
                                    .map((herb) => (_jsx(HerbCard, { herb: herb, onClick: () => handleHerbClick(herb) }, herb.id))) })] })), !searchQuery && selectedCategory && (displayedHerbs.filter(herb => herb.categories.includes(selectedCategory)).length === 0 && (_jsx("div", { className: "text-center py-12", children: _jsxs("p", { className: "text-muted-foreground", children: ["No herbs found in the \"", selectedCategory, "\" category."] }) })))] }), _jsx(HerbDetailModal, { herb: selectedHerb, isOpen: isModalOpen, onClose: () => {
                    setIsModalOpen(false);
                    setSelectedHerb(null);
                } })] }));
}
