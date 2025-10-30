import { InterviewJourney } from "../types/journey";

/**
 * PRE-PARSED CHAPEL A&R INTERVIEW DATA
 * 
 * This data has been carefully extracted from the A&R interview notes
 * following the 4-pass parsing framework. Each phase contains UNIQUE
 * content specific to that workflow step - NO DUPLICATION.
 */

export const chapelInterviewJourney: InterviewJourney = {
  id: "chapel-ar-interview",
  name: "Chapel A&R User Interview",
  userName: "Chapel A&R User",
  region: "Nashville",
  genreFocus: "Country",
  uploadDate: new Date().toISOString(),
  steps: [
    // ========================================================================
    // PHASE 1: SONG INTAKE (AUDIO UPLOAD)
    // ========================================================================
    {
      overallAction: "Song Intake",
      task: "Upload single audio file to Arrow",
      toolUsed: "Arrow",
      emotion: "Frustrated",
      painPoint: "'My uploads' location is too hidden - hard to find where uploaded songs go",
      opportunity: "Make the upload destination more prominent and easier to navigate to",
      frequency: "Daily",
      collaborators: "Writers, Publishers"
    },
    {
      overallAction: "Song Intake",
      task: "Upload multiple audio files at once",
      toolUsed: "Arrow",
      painPoint: "Need to support many uploads per week per user - current system is slow for bulk uploads",
      opportunity: "Batch upload functionality that allows dragging multiple files simultaneously",
      frequency: "Weekly"
    },
    {
      overallAction: "Song Intake",
      task: "Handle songs from Tango without audio",
      toolUsed: "Tango + Arrow",
      emotion: "Anxious",
      painPoint: "Songs without audio from Tango must have audio dragged in manually - very time consuming",
      keyQuote: "When songs come from Tango without audio files, I have to manually drag them in one by one",
      frequency: "Daily"
    },

    // ========================================================================
    // PHASE 2: METADATA ENTRY & LINKING
    // ========================================================================
    {
      overallAction: "Metadata Entry",
      task: "Complete metadata for a 'draft' upload",
      toolUsed: "Arrow",
      emotion: "Frustrated",
      painPoint: "Multiple results for the same writer name appear, which can be confusing",
      opportunity: "Implement writer deduplication and verification system",
      frequency: "Daily",
      collaborators: "Writers, Publishers"
    },
    {
      overallAction: "Metadata Entry",
      task: "Add song title, version, and writers",
      toolUsed: "Arrow",
      painPoint: "No check in the system for new writers - risk of creating duplicate entries",
      keyQuote: "I wish there was a way to verify if a writer already exists before I create a new entry",
      frequency: "Daily"
    },
    {
      overallAction: "Metadata Entry",
      task: "Set label view permissions and WCM percentage",
      toolUsed: "Arrow",
      emotion: "Neutral",
      frequency: "Per-pitch",
      collaborators: "Label executives"
    },
    {
      overallAction: "Metadata Entry",
      task: "Add tags for genre, language, artist, BPM, mood",
      toolUsed: "Arrow",
      opportunity: "Auto-tagging from audio analysis would save significant time",
      frequency: "Daily"
    },

    // ========================================================================
    // PHASE 3: DISCOVERY & CURATION
    // ========================================================================
    {
      overallAction: "Search & Discovery",
      task: "Search for a specific, known song in catalog",
      toolUsed: "Arrow",
      emotion: "Frustrated",
      painPoint: "Multiple versions of the same song pop up in search results - overwhelming and confusing",
      opportunity: "Group song versions together with expandable view",
      keyQuote: "When I search for a song, I get 10+ versions and have to click through each one",
      frequency: "Daily"
    },
    {
      overallAction: "Search & Discovery",
      task: "Filter by demo status (On hold, Off hold, Cut, Unreleased cut)",
      toolUsed: "Arrow",
      emotion: "Efficient",
      frequency: "Daily"
    },
    {
      overallAction: "Search & Discovery",
      task: "Browse catalog to discover songs for artist needs",
      toolUsed: "Arrow",
      painPoint: "Search and filter options are extensive but lack AI-powered recommendations",
      opportunity: "Smart recommendations based on artist preferences and past pitch success",
      frequency: "Weekly",
      collaborators: "Artists, Managers"
    },

    // ========================================================================
    // PHASE 4: PITCHING (FORMAL & INFORMAL)
    // ========================================================================
    {
      overallAction: "Pitching",
      task: "Send a formal email pitch with tracking",
      toolUsed: "Arrow",
      emotion: "Confident",
      keyQuote: "The formal pitch feature works well when I need to track who opened what",
      frequency: "Weekly",
      collaborators: "Artists, Managers"
    },
    {
      overallAction: "Demo Pitching",
      task: "Send informal link via text message",
      toolUsed: "Arrow + Text Message",
      emotion: "Efficient",
      keyQuote: "Most of my artists prefer quick texts with links - it's faster than email",
      frequency: "Daily",
      collaborators: "Artists"
    },
    {
      overallAction: "Pitching",
      task: "Generate shareable link from Arrow",
      toolUsed: "Arrow",
      opportunity: "Add expiration dates and view tracking to shared links",
      frequency: "Weekly"
    },

    // ========================================================================
    // PHASE 5: PITCH TRACKING & STATUS MANAGEMENT
    // ========================================================================
    {
      overallAction: "Pitch Tracking",
      task: "Track pitch status on Pitches Page",
      toolUsed: "Arrow",
      emotion: "Satisfied",
      frequency: "Weekly"
    },
    {
      overallAction: "Tracking & Other",
      task: "Update pitch status manually",
      toolUsed: "Arrow",
      emotion: "Frustrated",
      painPoint: "Have to manually update status for each pitch - no automatic updates from artist responses",
      opportunity: "Auto-status updates based on artist email replies or link clicks",
      keyQuote: "It would save me hours if the system could detect when an artist passes or shows interest",
      frequency: "Weekly",
      collaborators: "Artists"
    },
    {
      overallAction: "Tracking & Other",
      task: "Add markers and notes to songs",
      toolUsed: "Arrow",
      frequency: "Occasional"
    },

    // ========================================================================
    // PHASE 6: CONTACT MANAGEMENT
    // ========================================================================
    {
      overallAction: "Contact Management",
      task: "Manage artist and writer contact information",
      toolUsed: "Arrow",
      painPoint: "Contact info is scattered - sometimes in Arrow, sometimes in my phone or email",
      opportunity: "Centralized contact management with sync to phone contacts",
      frequency: "Monthly",
      collaborators: "Artists, Writers, Managers"
    },

    // ========================================================================
    // PHASE 7: TEAM FUNCTIONALITY
    // ========================================================================
    {
      overallAction: "Team Functionality",
      task: "Share access to songs with team members",
      toolUsed: "Arrow",
      emotion: "Neutral",
      opportunity: "Real-time collaboration features - see what team members are pitching",
      frequency: "Weekly",
      collaborators: "Team members, Other A&Rs"
    },

    // ========================================================================
    // PHASE 8: PROPOSED SOLUTIONS
    // ========================================================================
    {
      overallAction: "Proposed Solutions",
      task: "Proposed: Batch upload with drag-and-drop",
      toolUsed: "Arrow (Future)",
      opportunity: "Allow users to drag 10+ files at once and auto-populate basic metadata",
      keyQuote: "If I could just drag a folder of demos, that would be a game-changer"
    },
    {
      overallAction: "Proposed Solutions",
      task: "Proposed: Smart writer matching system",
      toolUsed: "Arrow (Future)",
      opportunity: "AI-powered writer deduplication that suggests existing writers when entering names",
      keyQuote: "The system should warn me if a similar writer name already exists"
    },
    {
      overallAction: "Proposed Solutions",
      task: "Proposed: Song version grouping",
      toolUsed: "Arrow (Future)",
      opportunity: "Group all versions of a song under one parent entry with expandable view",
      emotion: "Confident"
    }
  ]
};
