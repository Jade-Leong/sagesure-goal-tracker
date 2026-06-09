import { defaultTrackerData } from "./defaultData";
import { hasSupabaseConfig, supabase } from "./supabaseClient";
import { DailyEntry, Goal, ManagerFeedback, MeetingCardData, WeeklyLogEntry } from "./types";

const STORAGE_KEY = "jade-sagesure-summer-tracker";

export type TrackerData = {
  goals: Goal[];
  weekly_logs: WeeklyLogEntry[];
  manager_feedback: ManagerFeedback[];
  daily_entries: DailyEntry[];
  meeting_cards: MeetingCardData[];
};

const tableNames: (keyof TrackerData)[] = [
  "goals",
  "weekly_logs",
  "manager_feedback",
  "daily_entries",
  "meeting_cards"
];

const sortColumns: Record<keyof TrackerData, string> = {
  goals: "created_at",
  weekly_logs: "week_number",
  manager_feedback: "week_number",
  daily_entries: "date",
  meeting_cards: "created_at"
};

function mergeWithDefaults(data: Partial<TrackerData>): TrackerData {
  return {
    goals: data.goals?.length ? data.goals : defaultTrackerData.goals,
    weekly_logs: data.weekly_logs?.length ? data.weekly_logs : defaultTrackerData.weekly_logs,
    manager_feedback: data.manager_feedback?.length ? data.manager_feedback : defaultTrackerData.manager_feedback,
    daily_entries: data.daily_entries ?? defaultTrackerData.daily_entries,
    meeting_cards: data.meeting_cards ?? defaultTrackerData.meeting_cards
  };
}

export async function loadTrackerData(): Promise<TrackerData> {
  if (hasSupabaseConfig && supabase) {
    const result: Partial<TrackerData> = {};

    for (const table of tableNames) {
      const { data, error } = await supabase.from(table).select("*").order(sortColumns[table], { ascending: true });
      if (error) throw error;
      assignTable(result, table, data ?? []);
    }

    const merged = mergeWithDefaults(result);
    await seedMissingSupabaseRows(merged, result);
    return merged;
  }

  if (typeof window === "undefined") return defaultTrackerData;
  const local = window.localStorage.getItem(STORAGE_KEY);
  if (!local) return defaultTrackerData;
  return mergeWithDefaults(JSON.parse(local) as Partial<TrackerData>);
}

function assignTable(result: Partial<TrackerData>, table: keyof TrackerData, rows: unknown[]) {
  if (table === "goals") result.goals = rows as Goal[];
  if (table === "weekly_logs") result.weekly_logs = rows as WeeklyLogEntry[];
  if (table === "manager_feedback") result.manager_feedback = rows as ManagerFeedback[];
  if (table === "daily_entries") result.daily_entries = rows as DailyEntry[];
  if (table === "meeting_cards") result.meeting_cards = rows as MeetingCardData[];
}

export async function saveTrackerData(data: TrackerData): Promise<void> {
  const stamped = stampData(data);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stamped));
  }

  if (hasSupabaseConfig && supabase) {
    const client = supabase;
    const results = await Promise.all([
      client.from("goals").upsert(stamped.goals),
      client.from("weekly_logs").upsert(stamped.weekly_logs),
      client.from("manager_feedback").upsert(stamped.manager_feedback),
      client.from("daily_entries").upsert(stamped.daily_entries),
      client.from("meeting_cards").upsert(stamped.meeting_cards)
    ]);

    const failed = results.find((result) => result.error);
    if (failed?.error) throw failed.error;
  }
}

function stampData(data: TrackerData): TrackerData {
  const updated = new Date().toISOString();
  return {
    goals: data.goals.map((item) => ({ ...item, updated_at: updated })),
    weekly_logs: data.weekly_logs.map((item) => ({ ...item, updated_at: updated })),
    manager_feedback: data.manager_feedback.map((item) => ({ ...item, updated_at: updated })),
    daily_entries: data.daily_entries.map((item) => ({ ...item, updated_at: updated })),
    meeting_cards: data.meeting_cards.map((item) => ({ ...item, updated_at: updated }))
  };
}

async function seedMissingSupabaseRows(merged: TrackerData, loaded: Partial<TrackerData>) {
  if (!supabase) return;
  const client = supabase;

  if (!loaded.goals?.length && merged.goals.length) await client.from("goals").upsert(merged.goals);
  if (!loaded.weekly_logs?.length && merged.weekly_logs.length) await client.from("weekly_logs").upsert(merged.weekly_logs);
  if (!loaded.manager_feedback?.length && merged.manager_feedback.length) {
    await client.from("manager_feedback").upsert(merged.manager_feedback);
  }
  if (!loaded.daily_entries?.length && merged.daily_entries.length) await client.from("daily_entries").upsert(merged.daily_entries);
  if (!loaded.meeting_cards?.length && merged.meeting_cards.length) await client.from("meeting_cards").upsert(merged.meeting_cards);
}

export function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
