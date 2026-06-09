export type GoalStatus = "Not started" | "In progress" | "Done";

export type Goal = {
  id: string;
  goal: string;
  type: string;
  success_metric: string;
  status: GoalStatus;
  created_at: string;
  updated_at: string;
};

export type WeeklyLogEntry = {
  id: string;
  week_number: number;
  week_label: string;
  week_dates: string;
  worked_on: string;
  business_impact: string;
  learned: string;
  hard: string;
  focus_next_week: string;
  goal_progress: string;
  created_at: string;
  updated_at: string;
};

export type ManagerFeedback = {
  id: string;
  week_number: number;
  clarity_rating: number | null;
  clarity_note: string;
  support_rating: number | null;
  support_note: string;
  feedback_quality_rating: number | null;
  feedback_quality_note: string;
  growth_rating: number | null;
  growth_note: string;
  open_reflection_good: string;
  open_reflection_different: string;
  open_reflection_needs: string;
  one_word: string;
  created_at: string;
  updated_at: string;
};

export type DailyEntry = {
  id: string;
  date: string;
  created_at: string;
  updated_at: string;
};

export type MeetingCardData = {
  id: string;
  daily_entry_id: string;
  title: string;
  time: string;
  attendees: string;
  notes: string;
  takeaways: string;
  follow_ups: string;
  created_at: string;
  updated_at: string;
};
