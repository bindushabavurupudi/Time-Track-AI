export interface Activity {
  id: string;
  title: string;
  category: string;
  minutes: number;
  createdAt: Date;
}

export const CATEGORIES = [
  { value: "work", label: "Work", color: "hsl(174 72% 56%)" },
  { value: "exercise", label: "Exercise", color: "hsl(142 71% 45%)" },
  { value: "learning", label: "Learning", color: "hsl(262 83% 68%)" },
  { value: "leisure", label: "Leisure", color: "hsl(43 96% 56%)" },
  { value: "sleep", label: "Sleep", color: "hsl(200 95% 55%)" },
  { value: "meals", label: "Meals", color: "hsl(339 90% 65%)" },
  { value: "commute", label: "Commute", color: "hsl(25 95% 53%)" },
  { value: "other", label: "Other", color: "hsl(215 20% 55%)" },
] as const;

export type CategoryType = typeof CATEGORIES[number]["value"];

export const getCategoryColor = (category: string): string => {
  const found = CATEGORIES.find((c) => c.value === category);
  return found?.color || "hsl(215 20% 55%)";
};

export const getCategoryLabel = (category: string): string => {
  const found = CATEGORIES.find((c) => c.value === category);
  return found?.label || category;
};
