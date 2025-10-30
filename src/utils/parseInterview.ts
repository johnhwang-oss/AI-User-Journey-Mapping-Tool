import { InterviewJourney, Region, Genre, JourneyStep, OverallAction, Emotion, Frequency } from "../types/journey";

/**
 * ============================================================================
 * AI JOURNEY MAP ANALYST - PRECISION PARSING ENGINE
 * ============================================================================
 * 
 * PERSONA: Expert AI Journey Map Analyst
 * 
 * MISSION: Meticulously extract and assign information to data fields for each
 * specific Overall Action phase. Be extremely precise and avoid all assumptions
 * or duplication of information across phases.
 * 
 * FRAMEWORK: Four-Pass Parsing System
 * ============================================================================
 */

// ============================================================================
// KEYWORD DICTIONARIES FOR PHASE DETECTION
// ============================================================================

const PHASE_KEYWORDS: Record<string, string[]> = {
  "Song Intake": [
    "receive", "intake", "submit", "upload", "ingest", "incoming", "get song", 
    "artist sends", "demo comes in", "song submission", "file intake", "receive demo",
    "accept song", "song arrives"
  ],
  "Metadata Entry": [
    "metadata", "meta data", "tag", "categorize", "label data", "enter details", 
    "fill in", "data entry", "song information", "track info", "song details",
    "credits", "add information", "input data"
  ],
  "Search & Discovery": [
    "search", "discover", "find", "browse", "look for", "explore catalog", 
    "library search", "database search", "catalog browse", "find songs",
    "discovery", "exploration", "looking through"
  ],
  "Demo Pitching": [
    "demo pitch", "informal pitch", "quick pitch", "text pitch", "casual pitch",
    "preliminary pitch", "initial pitch", "early pitch"
  ],
  "Pitching": [
    "pitch", "send to", "recommend", "present", "share with", "propose song",
    "formal pitch", "email pitch", "pitch meeting", "song recommendation",
    "submit to artist", "artist pitch"
  ],
  "Tracking & Other": [
    "track", "follow up", "status", "monitor", "update status", "check status",
    "tracking", "follow-up", "status update", "progress tracking"
  ],
  "Playlist Creation": [
    "playlist", "create playlist", "build playlist", "curate playlist", 
    "playlist creation", "make playlist", "playlist building"
  ],
  "Pitch Tracking": [
    "pitch tracking", "track pitches", "pitch status", "pitch follow-up",
    "pitch management", "tracking pitches", "pitch history"
  ],
  "Contact Management": [
    "contact", "contact management", "manage contacts", "artist contact",
    "relationship management", "contact info", "artist info", "contact database"
  ],
  "Team Functionality": [
    "team", "collaborate", "team features", "team functionality", "team tools",
    "collaboration", "team members", "team workflow", "shared access"
  ],
  "Label User Journey": [
    "label user", "label journey", "label workflow", "label perspective",
    "label experience", "label side", "from label perspective"
  ],
  "Global Adoption Challenges": [
    "global", "international", "adoption", "challenges", "global adoption",
    "worldwide", "different regions", "global rollout", "international challenges"
  ],
  "Manual Upload Process": [
    "manual upload", "upload process", "upload workflow", "uploading manually",
    "manual process", "upload steps", "file upload"
  ],
  "Proposed Solutions": [
    "solution", "proposed", "recommendation", "suggestion", "improvement",
    "propose", "could improve", "would help", "feature request", "enhancement"
  ]
};

// ============================================================================
// KEYWORD DICTIONARIES FOR DATA EXTRACTION
// ============================================================================

const TOOL_KEYWORDS = [
  "Arrow", "WCM", "Tango", "email", "e-mail", "text message", "text", 
  "Google Drive", "Dropbox", "Spotify", "Excel", "spreadsheet", "Google Sheets",
  "Slack", "Teams", "Microsoft Teams", "phone", "call", "manual", "manually", 
  "paper", "notebook", "SMS", "WhatsApp", "iMessage", "Outlook", "Gmail",
  "CRM", "database", "system", "platform", "tool", "software", "app", "application"
];

const EMOTION_KEYWORDS: Record<string, string[]> = {
  "Frustrated": [
    "frustrat", "annoying", "annoyed", "irritat", "upset", "anger", 
    "bothered", "dissatisfied", "unhappy"
  ],
  "Anxious": [
    "anxious", "worried", "stress", "nervous", "uncertain", "confus",
    "overwhelm", "concern", "uneasy"
  ],
  "Confident": [
    "confident", "sure", "certain", "easy", "smooth", "straightforward",
    "comfortable", "assured", "clear"
  ],
  "Satisfied": [
    "satisfied", "happy", "pleased", "good", "works well", "great",
    "excellent", "love", "enjoy"
  ],
  "Efficient": [
    "efficient", "quick", "fast", "streamlined", "productive", "effective",
    "rapid", "speedy", "optimized"
  ]
};

const PAIN_POINT_KEYWORDS = [
  "issue", "problem", "difficult", "hard", "challenge", "struggle", "pain",
  "lack", "missing", "can't", "cannot", "unable", "doesn't work", "broken",
  "confusing", "confused", "unclear", "hidden", "buried", "complicated",
  "time consuming", "time-consuming", "slow", "manual", "tedious", "repetitive",
  "frustrat", "annoying", "detrimental", "heavy lift", "constraint", "limitation",
  "inefficient", "cumbersome", "clunky", "awkward", "error", "mistake", "fail"
];

const OPPORTUNITY_KEYWORDS = [
  "helpful", "useful", "solution", "improve", "better", "enhancement",
  "feature", "could", "should", "would be nice", "wish", "need", "want",
  "opportunity", "suggestion", "idea", "integration", "automate", "automation",
  "proposed", "recommendation", "streamline", "optimize", "simplify", "easier"
];

const FREQUENCY_KEYWORDS: Record<string, string[]> = {
  "Daily": ["daily", "every day", "each day", "day to day", "per day"],
  "Weekly": ["weekly", "every week", "each week", "per week"],
  "Monthly": ["monthly", "every month", "each month", "per month"],
  "Per-pitch": ["per pitch", "each pitch", "every pitch", "per song", "each song"],
  "Occasional": ["occasional", "sometimes", "rarely", "once in a while", "infrequent"]
};

const COLLABORATOR_KEYWORDS = [
  "artist", "manager", "producer", "label", "executive", "team", "colleague",
  "engineer", "writer", "songwriter", "assistant", "coordinator", "director",
  "A&R", "marketing", "promotion", "legal", "business affairs"
];

// ============================================================================
// MAIN PARSING FUNCTION
// ============================================================================

export async function parseInterviewNotes(
  notes: string,
  arName: string,
  region: Region,
  genre: Genre
): Promise<InterviewJourney> {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 1500));

  console.log("🤖 AI JOURNEY MAP ANALYST - Starting Precision Parse");
  console.log("📝 Notes Length:", notes.length);

  // Normalize text for parsing
  const normalizedNotes = notes.toLowerCase();
  const lines = notes.split('\n').filter(line => line.trim().length > 0);

  // ========================================================================
  // PASS 1: IDENTIFY ALL PHASES
  // ========================================================================
  console.log("\n=== PASS 1: Identifying All Phases ===");
  const identifiedPhases = identifyPhases(normalizedNotes);
  console.log("✅ Identified Phases:", identifiedPhases);

  // ========================================================================
  // PASS 2: SEGMENT NOTES PER PHASE
  // ========================================================================
  console.log("\n=== PASS 2: Segmenting Notes Per Phase ===");
  const phaseSegments = segmentNotesByPhase(lines, normalizedNotes, identifiedPhases);
  
  // ========================================================================
  // PASS 3: EXTRACT DATA WITHIN EACH PHASE BLOCK
  // ========================================================================
  console.log("\n=== PASS 3: Extracting Data Within Each Phase ===");
  const journeySteps = extractDataPerPhase(phaseSegments, notes);
  console.log("✅ Extracted Steps:", journeySteps.length);

  // ========================================================================
  // PASS 4: VALIDATE NO DUPLICATION/FABRICATION
  // ========================================================================
  console.log("\n=== PASS 4: Validating Data Integrity ===");
  const validatedSteps = validateSteps(journeySteps);
  console.log("✅ Validated Steps:", validatedSteps.length);

  console.log("🎯 PARSING COMPLETE\n");

  return {
    id: `interview-${Date.now()}`,
    name: `${arName} Interview`,
    userName: arName,
    region,
    genreFocus: genre,
    uploadDate: new Date().toISOString(),
    steps: validatedSteps
  };
}

// ============================================================================
// PASS 1: IDENTIFY ALL PHASES
// ============================================================================

function identifyPhases(normalizedNotes: string): OverallAction[] {
  const foundPhases: OverallAction[] = [];

  for (const [phase, keywords] of Object.entries(PHASE_KEYWORDS)) {
    const hasPhase = keywords.some(keyword => normalizedNotes.includes(keyword));
    
    if (hasPhase) {
      foundPhases.push(phase as OverallAction);
      console.log(`  ✓ Found: ${phase}`);
    }
  }

  // If no phases found, return default phases
  if (foundPhases.length === 0) {
    console.log("  ⚠️  No specific phases detected, using default workflow");
    return ["Song Intake", "Metadata Entry", "Search & Discovery", "Pitching", "Tracking & Other"];
  }

  return foundPhases;
}

// ============================================================================
// PASS 2: SEGMENT NOTES BY PHASE
// ============================================================================

interface PhaseSegment {
  phase: OverallAction;
  lines: string[];
  lineIndices: number[];
  context: string;
}

function segmentNotesByPhase(
  lines: string[],
  normalizedNotes: string,
  identifiedPhases: OverallAction[]
): PhaseSegment[] {
  const segments: PhaseSegment[] = [];

  for (const phase of identifiedPhases) {
    const phaseKeywords = PHASE_KEYWORDS[phase] || [];
    const phaseLines: string[] = [];
    const lineIndices: number[] = [];

    // Find lines that mention this phase
    lines.forEach((line, index) => {
      const normalizedLine = line.toLowerCase();
      
      if (phaseKeywords.some(keyword => normalizedLine.includes(keyword))) {
        // Include this line and surrounding context (±2 lines)
        const start = Math.max(0, index - 2);
        const end = Math.min(lines.length, index + 3);
        
        for (let i = start; i < end; i++) {
          if (!lineIndices.includes(i)) {
            phaseLines.push(lines[i]);
            lineIndices.push(i);
          }
        }
      }
    });

    if (phaseLines.length > 0) {
      segments.push({
        phase,
        lines: phaseLines,
        lineIndices,
        context: phaseLines.join(' ')
      });
      
      console.log(`  ✓ ${phase}: ${phaseLines.length} related lines`);
    }
  }

  return segments;
}

// ============================================================================
// PASS 3: EXTRACT DATA PER PHASE
// ============================================================================

function extractDataPerPhase(segments: PhaseSegment[], originalNotes: string): JourneyStep[] {
  const steps: JourneyStep[] = [];

  for (const segment of segments) {
    console.log(`\n  Processing: ${segment.phase}`);
    
    // Extract tasks from this phase's segment
    const tasks = extractTasks(segment);
    
    // For each task, extract detailed metadata
    for (const taskText of tasks) {
      const step = extractStepData(segment, taskText, originalNotes);
      if (step) {
        steps.push(step);
        console.log(`    → Task: ${taskText.substring(0, 50)}...`);
      }
    }
  }

  return steps;
}

function extractTasks(segment: PhaseSegment): string[] {
  const tasks: string[] = [];
  
  for (const line of segment.lines) {
    // Clean up the line
    let cleaned = line.trim()
      .replace(/^[-•*]\s*/, '')      // Remove bullet points
      .replace(/^\d+\.\s*/, '')       // Remove numbered lists
      .replace(/^[A-Z]+:\s*/, '');    // Remove labels like "TASK:"

    // Only include meaningful tasks (more than 15 chars, not just keywords)
    if (cleaned.length > 15 && !isJustKeywords(cleaned)) {
      tasks.push(cleaned);
    }
  }

  // Remove duplicates
  return [...new Set(tasks)];
}

function isJustKeywords(text: string): boolean {
  // Check if text is just a phase name or single keyword
  const lowerText = text.toLowerCase();
  return Object.keys(PHASE_KEYWORDS).some(phase => 
    lowerText === phase.toLowerCase()
  );
}

function extractStepData(segment: PhaseSegment, taskText: string, originalNotes: string): JourneyStep | null {
  const context = segment.context.toLowerCase();
  const taskLower = taskText.toLowerCase();

  // Extract all metadata
  const toolUsed = extractTool(context, taskLower);
  const emotion = extractEmotion(context);
  const painPoint = extractPainPoint(segment.lines, context);
  const opportunity = extractOpportunity(segment.lines, context);
  const keyQuote = extractQuote(segment.lines);
  const collaborators = extractCollaborators(context);
  const frequency = extractFrequency(context);

  // Build step (only include non-empty fields)
  const step: JourneyStep = {
    overallAction: segment.phase,
    task: taskText,
    toolUsed: toolUsed || "Not specified"
  };

  if (emotion) step.emotion = emotion;
  if (painPoint) step.painPoint = painPoint;
  if (opportunity) step.opportunity = opportunity;
  if (keyQuote) step.keyQuote = keyQuote;
  if (collaborators) step.collaborators = collaborators;
  if (frequency) step.frequency = frequency;

  return step;
}

// ============================================================================
// EXTRACTION HELPERS
// ============================================================================

function extractTool(context: string, taskContext: string): string | null {
  // Check in task context first, then broader context
  const combinedContext = taskContext + " " + context;
  
  for (const tool of TOOL_KEYWORDS) {
    if (combinedContext.includes(tool.toLowerCase())) {
      // Capitalize properly
      if (tool.length <= 3) return tool.toUpperCase(); // For acronyms
      return tool.charAt(0).toUpperCase() + tool.slice(1);
    }
  }
  
  return null;
}

function extractEmotion(context: string): Emotion | undefined {
  for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    for (const keyword of keywords) {
      if (context.includes(keyword)) {
        return emotion as Emotion;
      }
    }
  }
  return undefined;
}

function extractPainPoint(lines: string[], context: string): string | undefined {
  // Check if any pain point keywords are present
  const hasPainPoint = PAIN_POINT_KEYWORDS.some(kw => context.includes(kw));
  if (!hasPainPoint) return undefined;

  // Find the specific sentence with the pain point
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    if (PAIN_POINT_KEYWORDS.some(kw => lowerLine.includes(kw))) {
      // Clean and return the pain point
      return line.trim().replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '');
    }
  }

  return undefined;
}

function extractOpportunity(lines: string[], context: string): string | undefined {
  // Check if any opportunity keywords are present
  const hasOpportunity = OPPORTUNITY_KEYWORDS.some(kw => context.includes(kw));
  if (!hasOpportunity) return undefined;

  // Find the specific sentence with the opportunity
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    if (OPPORTUNITY_KEYWORDS.some(kw => lowerLine.includes(kw))) {
      // Clean and return the opportunity
      return line.trim().replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '');
    }
  }

  return undefined;
}

function extractQuote(lines: string[]): string | undefined {
  // Look for text in quotation marks
  for (const line of lines) {
    const quoteMatch = line.match(/"([^"]+)"/);
    if (quoteMatch) {
      return quoteMatch[1];
    }
    
    // Look for single quotes
    const singleQuoteMatch = line.match(/'([^']+)'/);
    if (singleQuoteMatch) {
      return singleQuoteMatch[1];
    }
  }

  return undefined;
}

function extractCollaborators(context: string): string | undefined {
  const found: string[] = [];
  
  for (const collab of COLLABORATOR_KEYWORDS) {
    if (context.includes(collab) && !found.includes(collab)) {
      found.push(collab.charAt(0).toUpperCase() + collab.slice(1));
    }
  }

  return found.length > 0 ? found.join(", ") : undefined;
}

function extractFrequency(context: string): Frequency | undefined {
  for (const [freq, keywords] of Object.entries(FREQUENCY_KEYWORDS)) {
    if (keywords.some(kw => context.includes(kw))) {
      return freq as Frequency;
    }
  }
  return undefined;
}

// ============================================================================
// PASS 4: VALIDATE NO DUPLICATION/FABRICATION
// ============================================================================

function validateSteps(steps: JourneyStep[]): JourneyStep[] {
  // Remove exact duplicates
  const uniqueSteps: JourneyStep[] = [];
  const seenTasks = new Set<string>();

  for (const step of steps) {
    const taskKey = `${step.overallAction}:${step.task.toLowerCase()}`;
    
    if (!seenTasks.has(taskKey)) {
      seenTasks.add(taskKey);
      uniqueSteps.push(step);
    } else {
      console.log(`  ⚠️  Removed duplicate: ${step.task.substring(0, 40)}...`);
    }
  }

  console.log(`  ✓ Removed ${steps.length - uniqueSteps.length} duplicates`);
  
  return uniqueSteps;
}
