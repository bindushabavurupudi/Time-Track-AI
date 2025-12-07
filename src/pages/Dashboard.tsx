import { useState } from "react";
import { Header } from "@/components/Header";
import { DatePicker } from "@/components/DatePicker";
import { TimeStats } from "@/components/TimeStats";
import { ActivityForm } from "@/components/ActivityForm";
import { ActivityList } from "@/components/ActivityList";
import { EmptyState } from "@/components/EmptyState";
import { useActivities } from "@/hooks/useActivities";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    activities,
    loading,
    addActivity,
    updateActivity,
    deleteActivity,
    totalMinutes,
    remainingMinutes,
  } = useActivities(selectedDate);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Time Tracker
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your daily activities
            </p>
          </div>
          <DatePicker date={selectedDate} onDateChange={setSelectedDate} />
        </div>

        {/* Stats */}
        <div className="mb-8">
          <TimeStats
            totalMinutes={totalMinutes}
            remainingMinutes={remainingMinutes}
            activitiesCount={activities.length}
          />
        </div>

        {/* Activities Section */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Activities</h2>
            <ActivityForm
              onSubmit={addActivity}
              remainingMinutes={remainingMinutes}
            />

          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : activities.length === 0 ? (
            <EmptyState />
          ) : (
            <ActivityList
              activities={activities}
              onUpdate={updateActivity}
              onDelete={deleteActivity}
              remainingMinutes={remainingMinutes}
            />
          )}
        </div>
      </main>
    </div>
  );
}
