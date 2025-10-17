import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { JournalEntry } from "@/components/JournalEntry";
import { Search } from "lucide-react";

interface Entry {
  id: number;
  title: string;
  date: string;
  body: string;
  mood: string;
  archived: boolean;
}

const Index = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/entries.json")
      .then((response) => response.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading entries:", error);
        setLoading(false);
      });
  }, []);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      // Filter by archived status
      if (!showArchived && entry.archived) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          entry.title.toLowerCase().includes(query) ||
          entry.body.toLowerCase().includes(query) ||
          entry.mood.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [entries, searchQuery, showArchived]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">Journal Archive</h1>
          <p className="text-muted-foreground text-lg">
            A collection of thoughts, moments, and reflections
          </p>
        </header>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search entries by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border/50"
            />
          </div>

          <div className="flex items-center space-x-2 bg-card border border-border/50 rounded-lg px-4 py-3">
            <Switch
              id="show-archived"
              checked={showArchived}
              onCheckedChange={setShowArchived}
            />
            <Label htmlFor="show-archived" className="cursor-pointer text-sm font-medium">
              Show archived entries
            </Label>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading entries...</div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p className="text-lg">No entries found</p>
            <p className="text-sm mt-2">Try adjusting your search or toggle archived entries</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <JournalEntry
                key={entry.id}
                title={entry.title}
                date={entry.date}
                body={entry.body}
                mood={entry.mood}
                archived={entry.archived}
              />
            ))}
          </div>
        )}

        <footer className="mt-16 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>{filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'} displayed</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
