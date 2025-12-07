import { Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddClick?: () => void;
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-pulse-glow rounded-full" />
        <div className="relative bg-gradient-to-br from-primary/20 to-chart-5/20 rounded-full p-6">
          <Clock className="h-12 w-12 text-primary" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No Activities Yet
      </h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        Start tracking your time by adding your first activity. Every minute counts!
      </p>
      
      {onAddClick && (
        <Button variant="gradient" onClick={onAddClick} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Your First Activity
        </Button>
      )}
    </div>
  );
}
