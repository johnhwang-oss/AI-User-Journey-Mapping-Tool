import { BaselineJourney } from "../types/journey";

export const baselineJourney: BaselineJourney = {
  id: "baseline-wmn",
  name: "Current WMN Process",
  steps: [
    {
      overallAction: "Song Intake",
      task: "Upload single audio file",
      toolUsed: "ARROW",
      steps: "Upload file > Add music file > Draft upload",
      painPoint: "Songs without audio from Tango must have audio dragged in manually.",
      opportunity: "How do we support many uploads per week per user?"
    },
    {
      overallAction: "Metadata Entry",
      task: "Add song metadata",
      toolUsed: "ARROW",
      steps: "Adjust info: Song title > Version (default demo) > Writers > Label view (external access) > WCM% > Tags (Genre, Language, Artist, BPM, Mood)",
      painPoint: "No check on the system for new writers.",
      emotion: "Anxious"
    },
    {
      overallAction: "Search & Discovery",
      task: "A&R searches for a specific, known song",
      toolUsed: "Arrow",
      steps: "Search (many options) > Filter by Demo Status (On hold, Off hold, Cut, Unreleased cut) > Find song",
      painPoint: "Multiple versions pop up in search results."
    },
    {
      overallAction: "Pitching",
      task: "A&R sends a formal pitch via email",
      toolUsed: "Arrow",
      steps: "Find song > Select 'Pitch' > Email modal opens > Send formal email (with tracking)"
    },
    {
      overallAction: "Pitching",
      task: "A&R sends an informal link (e.g., via text)",
      toolUsed: "Arrow",
      steps: "Find song > Select 'Share' > Generate link > Paste link in text/other app",
      emotion: "Efficient"
    },
    {
      overallAction: "Tracking & Other",
      task: "Track pitch status",
      toolUsed: "Arrow",
      steps: "Go to Pitches Page > View tracking. Other Features: Add markers to songs > Update status > Manual pitch logging"
    }
  ]
};
