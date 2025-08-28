import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HerbSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function HerbSearch({ onSearch, placeholder = "Search herbs by name or condition..." }: HerbSearchProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // Debounce search for better UX
    if (newQuery.length === 0 || newQuery.length >= 2) {
      onSearch(newQuery);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          className="pl-12"
          data-testid="input-herb-search"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
      </div>
    </form>
  );
}
