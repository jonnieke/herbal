import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Plus, CheckCircle, Clock, TrendingUp, Trash2 } from "lucide-react";
import type { Herb } from "@shared/schema";

interface WellnessTrackerProps {
  herb: Herb;
}

interface WellnessEntry {
  id: string;
  date: string;
  dosage: string;
  method: string;
  effects: string;
  notes: string;
}

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

export default function WellnessTracker({ herb }: WellnessTrackerProps) {
  const [entries, setEntries] = useState<WellnessEntry[]>(() => {
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
    const entry: WellnessEntry = {
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

  const updateQuickAssessment = (metric: string, value: string) => {
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
    
    const entry: WellnessEntry = {
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

  const deleteEntry = (entryId: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== entryId);
    setEntries(updatedEntries);
    localStorage.setItem(`wellness-tracker-${herb.id}`, JSON.stringify(updatedEntries));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Wellness Tracker</h3>
        <p className="text-muted-foreground mb-6">
          Track your {herb.name} usage and monitor how it affects your wellbeing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showForm ? (
              <Button 
                onClick={() => setShowForm(true)}
                className="w-full"
              >
                Track Today's Usage
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Dosage</label>
                  <input
                    type="text"
                    placeholder="e.g., 1 tsp powder, 1 cup tea"
                    className="w-full p-2 border rounded-md"
                    value={newEntry.dosage}
                    onChange={(e) => setNewEntry({...newEntry, dosage: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Method</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newEntry.method}
                    onChange={(e) => setNewEntry({...newEntry, method: e.target.value})}
                  >
                    <option value="">Select method</option>
                    {herb.preparationMethods.map((method) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Effects</label>
                  <Textarea
                    placeholder="How did you feel after using this herb?"
                    value={newEntry.effects}
                    onChange={(e) => setNewEntry({...newEntry, effects: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Notes</label>
                  <Textarea
                    placeholder="Any additional observations or notes"
                    value={newEntry.notes}
                    onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={addEntry} className="flex-1">
                    Save Entry
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wellnessMetrics.map((metric) => (
                <div key={metric.id}>
                  <label className="text-sm font-medium mb-2 block">{metric.label}</label>
                  <div className="flex gap-2">
                    {metric.options.map((option) => (
                      <Button
                        key={option}
                        variant={quickAssessment[metric.id as keyof typeof quickAssessment] === option ? "default" : "outline"}
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => updateQuickAssessment(metric.id, option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
              <Button 
                onClick={saveQuickAssessment}
                className="w-full mt-4"
                disabled={!Object.values(quickAssessment).some(value => value)}
              >
                Save Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          {getRecentEntries().length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No entries yet. Start tracking your {herb.name} usage!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {getRecentEntries().map((entry) => (
                <div key={entry.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{entry.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{entry.method}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteEntry(entry.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Dosage:</span> {entry.dosage}
                    </div>
                    {entry.effects && (
                      <div>
                        <span className="font-medium">Effects:</span> {entry.effects}
                      </div>
                    )}
                  </div>
                  {entry.notes && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <span className="font-medium">Notes:</span> {entry.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Tracking Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">What to Track</h4>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>Dosage and frequency</li>
                <li>Preparation method</li>
                <li>How you feel before and after</li>
                <li>Any side effects or reactions</li>
                <li>Changes in sleep, energy, or mood</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Best Practices</h4>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>Track consistently for at least 2 weeks</li>
                <li>Note the time of day you take herbs</li>
                <li>Record any other supplements or medications</li>
                <li>Share your findings with healthcare providers</li>
                <li>Listen to your body's signals</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
