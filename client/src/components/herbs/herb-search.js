import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
export default function HerbSearch({ onSearch, placeholder = "Search herbs by name or condition..." }) {
    const [query, setQuery] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };
    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        // Debounce search for better UX
        if (newQuery.length === 0 || newQuery.length >= 2) {
            onSearch(newQuery);
        }
    };
    return (_jsx("form", { onSubmit: handleSubmit, className: "max-w-md mx-auto", children: _jsxs("div", { className: "relative", children: [_jsx(Input, { type: "text", placeholder: placeholder, value: query, onChange: handleChange, className: "pl-12", "data-testid": "input-herb-search" }), _jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" })] }) }));
}
