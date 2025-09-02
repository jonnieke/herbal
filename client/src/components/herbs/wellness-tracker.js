import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Plus, CheckCircle, Clock, TrendingUp, Trash2 } from "lucide-react";
const wellnessMetrics = [
    {
        id: "energy",
        label: "Energy Level",
        options: ["Very Low", "Low", "Normal", "High", "Very High"]
    },
    {
        id: "sleep",
        label: "Sleep Quality",
        options: ["Poor", "Fair", "Good", "Very Good", "Excellent"]
    },
    {
        id: "mood",
        label: "Mood",
        options: ["Very Low", "Low", "Normal", "Good", "Excellent"]
    },
    {
        id: "digestion",
        label: "Digestion",
        options: ["Poor", "Fair", "Good", "Very Good", "Excellent"]
    }
];
export default function WellnessTracker({ herb }) {
    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem(`wellness-tracker-${herb.id}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [showForm, setShowForm] = useState(false);
    const [newEntry, setNewEntry] = useState({
        dosage: "",
        method: "",
        effects: "",
        notes: ""
    });
    const [quickAssessment, setQuickAssessment] = useState({
        energy: "",
        sleep: "",
        mood: "",
        digestion: ""
    });
    const addEntry = () => {
        const entry = {
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            ...newEntry
        };
        const updatedEntries = [entry, ...entries];
        setEntries(updatedEntries);
        localStorage.setItem(`wellness-tracker-${herb.id}`, JSON.stringify(updatedEntries));
        setNewEntry({ dosage: "", method: "", effects: "", notes: "" });
        setShowForm(false);
    };
    const updateQuickAssessment = (metric, value) => {
        setQuickAssessment(prev => ({
            ...prev,
            [metric]: value
        }));
    };
    const saveQuickAssessment = () => {
        const effects = Object.entries(quickAssessment)
            .filter(([_, value]) => value)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
        const entry = {
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            dosage: "Quick Assessment",
            method: "Daily Check-in",
            effects: effects || "No specific effects noted",
            notes: "Quick wellness assessment completed"
        };
        const updatedEntries = [entry, ...entries];
        setEntries(updatedEntries);
        localStorage.setItem(`wellness-tracker-${herb.id}`, JSON.stringify(updatedEntries));
        setQuickAssessment({ energy: "", sleep: "", mood: "", digestion: "" });
    };
    const getRecentEntries = () => entries.slice(0, 5);
    const deleteEntry = (entryId) => {
        const updatedEntries = entries.filter(entry => entry.id !== entryId);
        setEntries(updatedEntries);
        localStorage.setItem(`wellness-tracker-${herb.id}`, JSON.stringify(updatedEntries));
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-4", children: "Wellness Tracker" }), _jsxs("p", { className: "text-muted-foreground mb-6", children: ["Track your ", herb.name, " usage and monitor how it affects your wellbeing"] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Plus, { className: "h-5 w-5" }), "Add New Entry"] }) }), _jsx(CardContent, { children: !showForm ? (_jsx(Button, { onClick: () => setShowForm(true), className: "w-full", children: "Track Today's Usage" })) : (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Dosage" }), _jsx("input", { type: "text", placeholder: "e.g., 1 tsp powder, 1 cup tea", className: "w-full p-2 border rounded-md", value: newEntry.dosage, onChange: (e) => setNewEntry({ ...newEntry, dosage: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Method" }), _jsxs("select", { className: "w-full p-2 border rounded-md", value: newEntry.method, onChange: (e) => setNewEntry({ ...newEntry, method: e.target.value }), children: [_jsx("option", { value: "", children: "Select method" }), herb.preparationMethods.map((method) => (_jsx("option", { value: method, children: method }, method)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Effects" }), _jsx(Textarea, { placeholder: "How did you feel after using this herb?", value: newEntry.effects, onChange: (e) => setNewEntry({ ...newEntry, effects: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Notes" }), _jsx(Textarea, { placeholder: "Any additional observations or notes", value: newEntry.notes, onChange: (e) => setNewEntry({ ...newEntry, notes: e.target.value }) })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { onClick: addEntry, className: "flex-1", children: "Save Entry" }), _jsx(Button, { variant: "outline", onClick: () => setShowForm(false), className: "flex-1", children: "Cancel" })] })] })) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(TrendingUp, { className: "h-5 w-5" }), "Quick Assessment"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [wellnessMetrics.map((metric) => (_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: metric.label }), _jsx("div", { className: "flex gap-2", children: metric.options.map((option) => (_jsx(Button, { variant: quickAssessment[metric.id] === option ? "default" : "outline", size: "sm", className: "flex-1 text-xs", onClick: () => updateQuickAssessment(metric.id, option), children: option }, option))) })] }, metric.id))), _jsx(Button, { onClick: saveQuickAssessment, className: "w-full mt-4", disabled: !Object.values(quickAssessment).some(value => value), children: "Save Assessment" })] }) })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-5 w-5" }), "Recent Entries"] }) }), _jsx(CardContent, { children: getRecentEntries().length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Clock, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }), _jsxs("p", { className: "text-muted-foreground", children: ["No entries yet. Start tracking your ", herb.name, " usage!"] })] })) : (_jsx("div", { className: "space-y-4", children: getRecentEntries().map((entry) => (_jsxs("div", { className: "border rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-600" }), _jsx("span", { className: "font-medium", children: entry.date })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: "outline", children: entry.method }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => deleteEntry(entry.id), className: "h-6 w-6 p-0 text-red-500 hover:text-red-700", children: _jsx(Trash2, { className: "h-3 w-3" }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Dosage:" }), " ", entry.dosage] }), entry.effects && (_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Effects:" }), " ", entry.effects] }))] }), entry.notes && (_jsxs("div", { className: "mt-2 text-sm text-muted-foreground", children: [_jsx("span", { className: "font-medium", children: "Notes:" }), " ", entry.notes] }))] }, entry.id))) })) })] }), _jsxs(Card, { className: "bg-blue-50 border-blue-200", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-blue-800", children: "Tracking Tips" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-blue-800 mb-2", children: "What to Track" }), _jsxs("ul", { className: "list-disc list-inside text-sm text-blue-700 space-y-1", children: [_jsx("li", { children: "Dosage and frequency" }), _jsx("li", { children: "Preparation method" }), _jsx("li", { children: "How you feel before and after" }), _jsx("li", { children: "Any side effects or reactions" }), _jsx("li", { children: "Changes in sleep, energy, or mood" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-blue-800 mb-2", children: "Best Practices" }), _jsxs("ul", { className: "list-disc list-inside text-sm text-blue-700 space-y-1", children: [_jsx("li", { children: "Track consistently for at least 2 weeks" }), _jsx("li", { children: "Note the time of day you take herbs" }), _jsx("li", { children: "Record any other supplements or medications" }), _jsx("li", { children: "Share your findings with healthcare providers" }), _jsx("li", { children: "Listen to your body's signals" })] })] })] }) })] })] }));
}
