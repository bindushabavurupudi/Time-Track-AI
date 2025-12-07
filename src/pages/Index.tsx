import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Timer, BarChart3, Clock, Sparkles, ArrowRight } from "lucide-react";

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const features = [
    {
      icon: Clock,
      title: "Track Every Minute",
      description: "Log activities with categories and duration. Never lose track of where your time goes.",
    },
    {
      icon: BarChart3,
      title: "Visual Analytics",
      description: "Beautiful charts and graphs to understand your time distribution patterns.",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations to optimize your daily routine.",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-chart-5/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-chart-5 flex items-center justify-center shadow-lg shadow-primary/20">
              <Timer className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">TimeTrack AI</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/auth")}>
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="container mx-auto px-4 pt-20 pb-32 text-center">
          <div className="max-w-3xl mx-auto animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              AI-Powered Time Tracking
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Master Your Time,{" "}
              <span className="gradient-text">Boost Your Life</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Track your daily activities, visualize your time patterns, and get AI-powered insights to optimize your productivity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="gradient"
                size="lg"
                onClick={() => navigate("/auth")}
                className="gap-2 text-base"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/auth")}
                className="text-base"
              >
                View Demo
              </Button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="glass rounded-2xl p-2 shadow-2xl">
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Time Tracked", value: "6h 45m", color: "text-primary" },
                    { label: "Remaining", value: "17h 15m", color: "text-success" },
                    { label: "Activities", value: "8", color: "text-accent" },
                  ].map((stat) => (
                    <div key={stat.label} className="glass rounded-xl p-4 text-center">
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "28%",
                      background: "linear-gradient(90deg, hsl(174 72% 56%) 0%, hsl(200 95% 55%) 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass rounded-2xl p-6 text-center animate-slide-up hover:bg-card/90 transition-colors"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-chart-5/20 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="glass rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Start Tracking Your Time Today
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of users who have transformed their productivity with TimeTrack AI.
            </p>
            <Button
              variant="gradient"
              size="lg"
              onClick={() => navigate("/auth")}
              className="gap-2"
            >
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2024 TimeTrack AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
