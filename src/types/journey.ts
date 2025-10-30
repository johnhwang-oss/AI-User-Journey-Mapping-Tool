// Data models for journey mapping

export type Emotion = "Confident" | "Frustrated" | "Anxious" | "Satisfied" | "Efficient" | "Neutral";
export type Region = string; // Allow custom regions
export type Genre = string; // Allow custom genres
export type Frequency = "Daily" | "Weekly" | "Per-pitch" | "Monthly" | "Occasional";
export type OverallAction = 
  | "Song Intake" 
  | "Metadata Entry" 
  | "Search & Discovery" 
  | "Demo Pitching" 
  | "Pitching" 
  | "Tracking & Other"
  | "Playlist Creation"
  | "Pitch Tracking"
  | "Contact Management"
  | "Team Functionality"
  | "Label User Journey"
  | "Global Adoption Challenges"
  | "Manual Upload Process"
  | "Proposed Solutions";

export interface JourneyStep {
  overallAction: OverallAction;
  task: string;
  toolUsed: string;
  steps?: string;
  emotion?: Emotion;
  painPoint?: string;
  opportunity?: string;
  keyQuote?: string;
  collaborators?: string;
  frequency?: Frequency;
}

export interface BaselineJourney {
  id: string;
  name: string;
  steps: JourneyStep[];
}

export interface InterviewJourney extends BaselineJourney {
  userName: string;
  region: Region;
  genreFocus: Genre;
  uploadDate: string;
}