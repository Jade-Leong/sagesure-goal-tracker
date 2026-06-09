import { DailyEntry, Goal, ManagerFeedback, MeetingCardData, WeeklyLogEntry } from "./types";

const now = () => new Date().toISOString();
const id = (prefix: string, value: string | number) => `${prefix}-${value}`;

export const weekSeeds = [
  ["Week 1", "June 2 - June 6"],
  ["Week 2", "June 9 - June 13"],
  ["Week 3", "June 16 - June 20"],
  ["Week 4", "June 23 - June 27"],
  ["Week 5", "June 30 - July 4"],
  ["Week 6", "July 7 - July 11"],
  ["Week 7", "July 14 - July 18"],
  ["Week 8", "July 21 - July 25"],
  ["Week 9", "July 28 - Aug 1"],
  ["Week 10", "Aug 4 - Aug 8"]
];

export const defaultGoals: Goal[] = [
  {
    id: id("goal", 1),
    goal: "Build business context around SageSure, insurance, and the projects I support.",
    type: "Learning",
    success_metric: "Can explain what I worked on, why it mattered, and who it helped.",
    status: "In progress",
    created_at: now(),
    updated_at: now()
  },
  {
    id: id("goal", 2),
    goal: "Create useful work products that help the team move faster or make clearer decisions.",
    type: "Impact",
    success_metric: "At least one deliverable is reused, referenced, or improved based on team feedback.",
    status: "Not started",
    created_at: now(),
    updated_at: now()
  },
  {
    id: id("goal", 3),
    goal: "Practice asking stronger questions and turning feedback into visible progress.",
    type: "Growth",
    success_metric: "Weekly notes show questions asked, feedback received, and changes made.",
    status: "Not started",
    created_at: now(),
    updated_at: now()
  }
];

export const defaultWeeklyLogs: WeeklyLogEntry[] = weekSeeds.map(([label, dates], index) => ({
  id: id("week", index + 1),
  week_number: index + 1,
  week_label: label,
  week_dates: dates,
  worked_on: "",
  business_impact: "",
  learned: "",
  hard: "",
  focus_next_week: "",
  goal_progress: "",
  created_at: now(),
  updated_at: now()
}));

export const defaultManagerFeedback: ManagerFeedback[] = weekSeeds.map((_, index) => ({
  id: id("feedback", index + 1),
  week_number: index + 1,
  clarity_rating: null,
  clarity_note: "",
  support_rating: null,
  support_note: "",
  feedback_quality_rating: null,
  feedback_quality_note: "",
  growth_rating: null,
  growth_note: "",
  open_reflection_good: "",
  open_reflection_different: "",
  open_reflection_needs: "",
  one_word: "",
  created_at: now(),
  updated_at: now()
}));

export const defaultDailyEntries: DailyEntry[] = [];
export const defaultMeetingCards: MeetingCardData[] = [];

export const defaultTrackerData = {
  goals: defaultGoals,
  weekly_logs: defaultWeeklyLogs,
  manager_feedback: defaultManagerFeedback,
  daily_entries: defaultDailyEntries,
  meeting_cards: defaultMeetingCards
};
