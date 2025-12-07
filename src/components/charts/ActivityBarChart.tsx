import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, getCategoryColor } from "@/types/activity";

interface ActivityBarChartProps {
  activities: Activity[];
}

export function ActivityBarChart({ activities }: ActivityBarChartProps) {
  const chartData = activities.map((activity) => ({
    name: activity.title.length > 15 ? activity.title.substring(0, 15) + "..." : activity.title,
    fullName: activity.title,
    minutes: activity.minutes,
    color: getCategoryColor(activity.category),
  }));

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
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
            stroke="hsl(222 47% 18%)"
          />
          <XAxis
            type="number"
            tickFormatter={(value) => `${Math.floor(value / 60)}h`}
            stroke="hsl(215 20% 55%)"
            fontSize={12}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={100}
            stroke="hsl(215 20% 55%)"
            fontSize={12}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="glass rounded-lg px-3 py-2 shadow-xl">
                    <p className="font-medium text-foreground">{data.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTooltip(data.minutes)}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="minutes"
            radius={[0, 6, 6, 0]}
            fill="hsl(174 72% 56%)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
