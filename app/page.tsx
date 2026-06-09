"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Section from "@/components/Section";
import GoalTable from "@/components/GoalTable";
import WeeklyLog from "@/components/WeeklyLog";
import DailyTracker from "@/components/DailyTracker";
import { TrackerData, loadTrackerData, saveTrackerData } from "@/lib/storage";
import { defaultTrackerData } from "@/lib/defaultData";

type Tab = "weekly" | "daily";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("weekly");
  const [data, setData] = useState<TrackerData>(defaultTrackerData);
  const [saveState, setSaveState] = useState("Loading");
  const [saveProgress, setSaveProgress] = useState(20);
  const [readyToSave, setReadyToSave] = useState(false);

  useEffect(() => {
    loadTrackerData()
      .then((loaded) => setData(loaded))
      .finally(() => {
        setSaveState("Saved");
        setSaveProgress(100);
        setReadyToSave(true);
      });
  }, []);

  useEffect(() => {
    if (!readyToSave) return;

    setSaveState("Saving");
    setSaveProgress(35);
    const timeout = window.setTimeout(() => {
      setSaveProgress(72);
      saveTrackerData(data)
        .then(() => {
          setSaveState("Saved");
          setSaveProgress(100);
        })
        .catch(() => {
          setSaveState("Saved locally");
          setSaveProgress(100);
        });
    }, 400);

    return () => window.clearTimeout(timeout);
  }, [data, readyToSave]);

  return (
    <main className="wrap">
      <Header />

      <nav className="tracker-nav" aria-label="Tracker pages">
        <button
          className={activeTab === "weekly" ? "active" : ""}
          onClick={() => setActiveTab("weekly")}
          type="button"
        >
          Weekly Tracker
        </button>
        <button
          className={activeTab === "daily" ? "active" : ""}
          onClick={() => setActiveTab("daily")}
          type="button"
        >
          Daily Tracker
        </button>
        <span className="save-state">{saveState}</span>
        <span className="save-progress" aria-hidden="true">
          <span style={{ width: `${saveProgress}%` }}></span>
        </span>
      </nav>

      {activeTab === "weekly" ? (
        <>
          <Section number="01" title="About this document">
            <p className="prose">
              This is your personal summer tracker. Use it to capture what you worked on, what you learned, where
              you got stuck, and what kind of support would help you keep growing. It is meant to be practical,
              honest, and useful for both weekly reflection and end-of-summer storytelling.
            </p>
          </Section>

          <Section number="02" title="Summer goals">
            <GoalTable goals={data.goals} onChange={(goals) => setData((current) => ({ ...current, goals }))} />
          </Section>

          <Section number="03" title="Weekly log">
            <WeeklyLog
              weeklyLogs={data.weekly_logs}
              managerFeedback={data.manager_feedback}
              onWeeklyChange={(weekly_logs) => setData((current) => ({ ...current, weekly_logs }))}
              onFeedbackChange={(manager_feedback) => setData((current) => ({ ...current, manager_feedback }))}
            />
          </Section>

          <footer className="footer">Built for Jade&apos;s SageSure summer internship tracker.</footer>
        </>
      ) : (
        <DailyTracker
          dailyEntries={data.daily_entries}
          meetingCards={data.meeting_cards}
          onChange={(daily_entries, meeting_cards) =>
            setData((current) => ({ ...current, daily_entries, meeting_cards }))
          }
        />
      )}
    </main>
  );
}
