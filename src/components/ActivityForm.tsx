import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CATEGORIES, Activity } from "@/types/activity";
import { Plus, Edit2 } from "lucide-react";
import { toast } from "sonner";

interface ActivityFormProps {
  onSubmit: (activity: Omit<Activity, "id" | "createdAt">) => Promise<void>;
  remainingMinutes: number;
  editActivity?: Activity;
  trigger?: React.ReactNode;
}

export function ActivityForm({
  onSubmit,
  remainingMinutes,
  editActivity,
  trigger,
}: ActivityFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(editActivity?.title || "");
  const [category, setCategory] = useState(editActivity?.category || "work");
  const [minutes, setMinutes] = useState(editActivity?.minutes?.toString() || "");
  const [loading, setLoading] = useState(false);

  const maxMinutes = editActivity
    ? remainingMinutes + editActivity.minutes
    : remainingMinutes;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const mins = parseInt(minutes);
    if (!title.trim()) {
      toast.error("Please enter an activity title");
      return;
    }
    if (isNaN(mins) || mins <= 0) {
      toast.error("Please enter valid minutes");
      return;
    }
    if (mins > maxMinutes) {
      toast.error(`Maximum ${maxMinutes} minutes available`);
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ title: title.trim(), category, minutes: mins });
      toast.success(editActivity ? "Activity updated!" : "Activity added!");
      setOpen(false);
      if (!editActivity) {
        setTitle("");
        setMinutes("");
        setCategory("work");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="gradient" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Activity
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="glass border-border/50 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {editActivity ? "Edit Activity" : "Add New Activity"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-foreground">
              Activity Title
            </Label>
            <Input
              id="title"
              placeholder="What did you do?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-foreground">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-11 border-border bg-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass border-border/50">
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      {cat.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="minutes" className="text-sm font-medium text-foreground">
              Duration (minutes)
            </Label>
            <div className="relative">
              <Input
                id="minutes"
                type="number"
                placeholder="30"
                min="1"
                max={maxMinutes}
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                max {maxMinutes}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            variant="gradient"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Saving..." : editActivity ? "Update Activity" : "Add Activity"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
