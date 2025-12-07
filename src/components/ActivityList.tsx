import { Activity, getCategoryColor, getCategoryLabel } from "@/types/activity";
import { Button } from "@/components/ui/button";
import { ActivityForm } from "./ActivityForm";
import { Trash2, Edit2, Clock } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ActivityListProps {
  activities: Activity[];
  onUpdate: (id: string, activity: Omit<Activity, "id" | "createdAt">) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  remainingMinutes: number;
}

export function ActivityList({
  activities,
  onUpdate,
  onDelete,
  remainingMinutes,
}: ActivityListProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  if (activities.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {activities.map((activity, index) => (
        <div
          key={activity.id}
          className="glass group flex items-center gap-4 rounded-xl p-4 transition-all duration-200 hover:bg-card/90 animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div
            className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: getCategoryColor(activity.category) + "20" }}
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: getCategoryColor(activity.category) }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{activity.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: getCategoryColor(activity.category) + "20",
                  color: getCategoryColor(activity.category),
                }}
              >
                {getCategoryLabel(activity.category)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{formatDuration(activity.minutes)}</span>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <ActivityForm
              onSubmit={(data) => onUpdate(activity.id, data)}
              remainingMinutes={remainingMinutes}
              editActivity={activity}
              trigger={
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit2 className="h-4 w-4" />
                </Button>
              }
            />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glass border-border/50">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Activity</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{activity.title}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-border">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(activity.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
}
