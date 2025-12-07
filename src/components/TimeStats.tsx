import { Clock, Activity, TrendingUp } from "lucide-react";

interface TimeStatsProps {
  totalMinutes: number;
  remainingMinutes: number;
  activitiesCount: number;
}

export function TimeStats({ totalMinutes, remainingMinutes, activitiesCount }: TimeStatsProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const usagePercent = Math.min((totalMinutes / 1440) * 100, 100);

  const stats = [
    {
      label: "Time Tracked",
      value: formatTime(totalMinutes),
      icon: Clock,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Remaining",
      value: formatTime(Math.max(0, remainingMinutes)),
      icon: TrendingUp,
      color: remainingMinutes > 0 ? "text-success" : "text-destructive",
      bgColor: remainingMinutes > 0 ? "bg-success/10" : "bg-destructive/10",
    },
    {
      label: "Activities",
      value: activitiesCount.toString(),
      icon: Activity,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="glass rounded-xl p-4 text-center animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`mx-auto mb-3 w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">Daily Progress</span>
          <span className="text-sm text-muted-foreground">{usagePercent.toFixed(1)}%</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${usagePercent}%`,
              background: "linear-gradient(90deg, hsl(174 72% 56%) 0%, hsl(200 95% 55%) 100%)",
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>0h</span>
          <span>6h</span>
          <span>12h</span>
          <span>18h</span>
          <span>24h</span>
        </div>
      </div>
    </div>
  );
}
