import { useState } from "react";
import { Header } from "@/components/Header";
import { DatePicker } from "@/components/DatePicker";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { ActivityBarChart } from "@/components/charts/ActivityBarChart";
import { EmptyState } from "@/components/EmptyState";
import { useActivities } from "@/hooks/useActivities";
import { Loader2, PieChart, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Analytics() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { activities, loading, totalMinutes } = useActivities(selectedDate);
  const navigate = useNavigate();

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Visualize how you spend your time
            </p>
          </div>
          <DatePicker date={selectedDate} onDateChange={setSelectedDate} />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : activities.length === 0 ? (
          <div className="glass rounded-2xl p-8">
            <EmptyState onAddClick={() => navigate("/dashboard")} />
          </div>
        ) : (
          <>
            {/* Summary Card */}
            <div className="glass rounded-2xl p-6 mb-8 animate-slide-up">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold gradient-text">{activities.length}</p>
                  <p className="text-sm text-muted-foreground">Activities</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{formatTime(totalMinutes)}</p>
                  <p className="text-sm text-muted-foreground">Total Time</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {new Set(activities.map(a => a.category)).size}
                  </p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {formatTime(Math.round(totalMinutes / activities.length))}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <PieChart className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Time by Category</h3>
                </div>
                <CategoryPieChart activities={activities} />
              </div>

              {/* Bar Chart */}
              <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Activity Duration</h3>
                </div>
                <ActivityBarChart activities={activities} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
