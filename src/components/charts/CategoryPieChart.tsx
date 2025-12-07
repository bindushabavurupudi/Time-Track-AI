import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Activity, getCategoryColor, getCategoryLabel } from "@/types/activity";

interface CategoryPieChartProps {
  activities: Activity[];
}

export function CategoryPieChart({ activities }: CategoryPieChartProps) {
  const categoryData = activities.reduce((acc, activity) => {
    const existing = acc.find((item) => item.category === activity.category);
    if (existing) {
      existing.minutes += activity.minutes;
    } else {
      acc.push({
        category: activity.category,
        name: getCategoryLabel(activity.category),
        minutes: activity.minutes,
        color: getCategoryColor(activity.category),
      });
    }
    return acc;
  }, [] as { category: string; name: string; minutes: number; color: string }[]);

  const formatTooltip = (value: number) => {
    const hours = Math.floor(value / 60);
    const mins = value % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="minutes"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            strokeWidth={0}
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="glass rounded-lg px-3 py-2 shadow-xl">
                    <p className="font-medium text-foreground">{data.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTooltip(data.minutes)}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span className="text-sm text-foreground">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
