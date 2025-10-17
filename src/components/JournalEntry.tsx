import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface JournalEntryProps {
  title: string;
  date: string;
  body: string;
  mood: string;
  archived: boolean;
}

const getMoodColor = (mood: string): string => {
  const moodLower = mood.toLowerCase();
  if (moodLower === "reflective") return "bg-mood-reflective/20 text-mood-reflective border-mood-reflective/30";
  if (moodLower === "calm") return "bg-mood-calm/20 text-mood-calm border-mood-calm/30";
  if (moodLower === "productive") return "bg-mood-productive/20 text-mood-productive border-mood-productive/30";
  if (moodLower === "melancholy") return "bg-mood-melancholy/20 text-mood-melancholy border-mood-melancholy/30";
  return "bg-muted text-muted-foreground";
};

export const JournalEntry = ({ title, date, body, mood, archived }: JournalEntryProps) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="transition-all hover:shadow-md border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Badge variant="outline" className={getMoodColor(mood)}>
              {mood}
            </Badge>
            {archived && (
              <Badge variant="secondary" className="bg-secondary/50">
                Archived
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/80 leading-relaxed">{body}</p>
      </CardContent>
    </Card>
  );
};
