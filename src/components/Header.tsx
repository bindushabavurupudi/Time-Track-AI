import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Timer, BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";

export function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-chart-5 flex items-center justify-center">
              <Timer className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold gradient-text hidden sm:block">
              TimeTrack AI
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button
                variant={location.pathname === "/dashboard" ? "secondary" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Timer className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>
            <Link to="/analytics">
              <Button
                variant={location.pathname === "/analytics" ? "secondary" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden md:block">
              {user?.email}
            </span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
