# A&R Journey Map Central - Prototype Guide

## 🎯 Overview

This is a **high-fidelity, interactive prototype** that demonstrates a perfectly functioning A&R Interview Analysis Tool. The prototype consists of two main screens that simulate AI-powered journey map generation.

---

## 📱 Screen Flow

### **Screen 1: Home Screen**

**Purpose**: Entry point for starting a new interview analysis session

**Key Elements**:
- **Hero Section** with app branding and value proposition
- **Primary CTA**: "Start New Interview Session" button
- **Feature highlights**: 4-pass AI parsing, phase-specific extraction, zero duplication
- **Quick preview link**: "View Example Journey Map"

**User Journey**:
1. User clicks "Start New Interview Session"
2. Modal opens with textarea for pasting interview notes
3. User clicks "Generate Journey Map"
4. System navigates to Screen 2 (pre-populated with Chapel A&R data)

---

### **Screen 2: Generated Journey Map**

**Purpose**: Display AI-parsed journey maps with phase-specific insights

**Key Elements**:

1. **Success Banner**
   - Shows parsing results: 8 phases, 26 tasks
   - Lists all identified phases as badges
   - Confirms zero duplication

2. **Baseline Journey Section**
   - Header: "Baseline: Current WMN Process"
   - Horizontal phase containers showing reference workflow
   - 6 phases from the baseline data

3. **Interview Journey Section**
   - Header: "Interview Journey: Chapel A&R User"
   - Metadata: Nashville • Country • AI-parsed
   - **8 unique phase containers** with distinct content:

#### Phase 1: Song Intake (Blue)
- Task: Upload single/multiple audio files
- Pain Point: "'my uploads' location is too hidden"
- Opportunity: Make upload destination more prominent
- **UNIQUE TO THIS PHASE**: Bulk upload challenges, Tango integration issues

#### Phase 2: Metadata Entry (Green)
- Task: Complete metadata for draft upload
- Pain Point: "Multiple results for same writer name"
- Opportunity: Writer deduplication system
- **UNIQUE TO THIS PHASE**: Writer verification, tag management

#### Phase 3: Search & Discovery (Purple)
- Task: Search for specific songs in catalog
- Pain Point: "Multiple versions pop up in search results"
- Opportunity: Group song versions together
- **UNIQUE TO THIS PHASE**: Filter by demo status, catalog browsing

#### Phase 4: Pitching (Pink)
- Task: Send formal email pitch with tracking
- Emotion: Confident
- **UNIQUE TO THIS PHASE**: Formal pitch workflow, shareable links

#### Phase 5: Demo Pitching (Orange)
- Task: Send informal link via text message
- Emotion: Efficient
- Quote: "Most artists prefer quick texts with links"
- **UNIQUE TO THIS PHASE**: Informal/quick pitching workflow

#### Phase 6: Pitch Tracking (Indigo)
- Task: Track pitch status on Pitches Page
- Pain Point: "Manually update status for each pitch"
- Opportunity: Auto-status updates from artist responses
- **UNIQUE TO THIS PHASE**: Status management, markers and notes

#### Phase 7: Contact Management (Teal)
- Task: Manage artist and writer contact info
- Pain Point: "Contact info is scattered"
- Opportunity: Centralized contact management
- **UNIQUE TO THIS PHASE**: Contact database, relationship management

#### Phase 8: Proposed Solutions (Emerald)
- Task: Batch upload with drag-and-drop
- Task: Smart writer matching system
- Task: Song version grouping
- **UNIQUE TO THIS PHASE**: Future enhancements and proposed features

4. **Insights Panel** (bottom)
   - Phase Coverage: 8 unique phases
   - Pain Points Found: 12 specific issues
   - Opportunities: 10 improvements identified

5. **Export Functionality**
   - "Export Journey Map" button
   - Full-screen preview modal
   - Download as PNG using html-to-image

---

## 🤖 AI Parsing Framework (Behind the Scenes)

The Chapel A&R data shown on Screen 2 was generated using this 4-pass framework:

### **Pass 1: Identify Phases**
Scanned interview notes for workflow phase keywords and identified:
- Song Intake (Audio Upload)
- Metadata Entry & Linking
- Discovery & Curation
- Pitching (Formal)
- Demo Pitching (Informal)
- Pitch Tracking
- Contact Management
- Proposed Solutions

### **Pass 2: Segment Notes**
Divided the notes into blocks corresponding to each phase, with surrounding context

### **Pass 3: Extract Data Per Phase**
For each phase block, extracted:
- **Tasks**: Specific actions (e.g., "Upload single audio file")
- **Tools**: Software used (e.g., "Arrow", "Tango", "Text Message")
- **Emotions**: User feelings (e.g., "Frustrated", "Efficient", "Confident")
- **Pain Points**: Problems and challenges
- **Opportunities**: Suggested improvements
- **Quotes**: Direct user statements
- **Collaborators**: Who they work with
- **Frequency**: How often (Daily, Weekly, Monthly, etc.)

### **Pass 4: Validate & Deduplicate**
Removed duplicate tasks and ensured each phase has UNIQUE content

---

## ✅ Key Differentiators (Anti-Repetition Rules)

### ❌ What We DON'T Do:
- Copy the same generic tasks across all phases
- Show "Task 1", "Task 2" in every container
- Duplicate pain points across multiple phases
- Fabricate data not found in the notes

### ✅ What We DO:
- Extract phase-specific content only
- Show unique tasks per workflow phase
- Map pain points to their relevant phase
- Leave fields blank if data isn't found in notes

---

## 🎨 Visual Design System

### **Color Coding by Phase**:
- **Blue**: Song Intake
- **Green**: Metadata Entry
- **Purple**: Search & Discovery
- **Pink**: Pitching
- **Orange**: Demo Pitching
- **Indigo**: Pitch Tracking
- **Teal**: Contact Management
- **Emerald**: Proposed Solutions

### **Emotion Indicators**:
- 😎 Confident
- 😤 Frustrated
- 😰 Anxious
- 😊 Satisfied
- ⚡ Efficient
- 😐 Neutral

### **Visual Elements**:
- 🔴 Red Alert Circle: Pain Point present
- 💡 Green Lightbulb: Opportunity/Solution
- 📝 Blue Quote Box: Key user quote

---

## 📊 Data Structure

### Chapel A&R Interview Journey
- **Total Phases**: 8 unique workflow phases
- **Total Tasks**: 26 distinct tasks
- **Pain Points**: 12 identified issues
- **Opportunities**: 10 suggested improvements
- **Quotes**: 6 direct user statements
- **Tools Mentioned**: Arrow, Tango, Text Message, Email
- **Emotions Captured**: Frustrated (4x), Efficient (2x), Confident (2x), Anxious (1x), Neutral (1x), Satisfied (1x)

---

## 🚀 How to Use This Prototype

1. **View Home Screen**: 
   - Start at the beautiful landing page
   - Read about the AI parsing capabilities

2. **Click "Start New Interview Session"**:
   - Modal opens for note entry
   - Paste interview notes (optional - demo works without it)
   - Click "Generate Journey Map"

3. **View Generated Map**:
   - See the AI success banner
   - Scroll through Baseline vs. Chapel A&R comparison
   - Notice how each phase has UNIQUE content
   - Check the insights panel at the bottom

4. **Export Maps**:
   - Click "Export Journey Map"
   - Preview in full-screen mode
   - Download as PNG file

5. **Return to Home**:
   - Click "Back to Home" to restart

---

## 🎯 Success Criteria Met

✅ **No Duplication**: Each phase container shows different tasks and pain points  
✅ **Phase-Specific**: Content is relevant only to that workflow step  
✅ **Visual Distinction**: 8 different color schemes for 8 phases  
✅ **Accurate Parsing**: Data maps to actual workflow stages  
✅ **Clean UI**: Horizontal phase flow with clear visual hierarchy  
✅ **Export Ready**: Full journey map can be exported as image  

---

## 📝 Example: Song Intake vs. Metadata Entry

### Song Intake Phase (Blue) Contains:
- "Upload single audio file to Arrow"
- Pain: "'my uploads' location is too hidden"
- Opportunity: "Make upload destination more prominent"

### Metadata Entry Phase (Green) Contains:
- "Complete metadata for a 'draft' upload"  
- Pain: "Multiple results for same writer name"
- Opportunity: "Writer deduplication system"

**NO OVERLAP** - Each phase has its own distinct content extracted from different sections of the interview notes.

---

## 💡 Technical Implementation

- **Frontend**: React + TypeScript
- **UI Components**: Shadcn/ui
- **Styling**: Tailwind CSS v4
- **Export**: html-to-image library
- **Data**: Pre-parsed Chapel A&R interview in `/data/chapelInterview.ts`
- **Baseline**: Reference workflow in `/data/baseline.ts`
- **Parsing Logic**: `/utils/parseInterview.ts` (4-pass framework)

---

## 🎓 For Stakeholders

This prototype demonstrates:

1. **AI Capability**: How our parsing engine extracts structured data from unstructured notes
2. **Visual Design**: How journey maps are rendered with phase-specific content
3. **Comparison View**: How baseline and interview journeys can be compared side-by-side
4. **Export Functionality**: How stakeholders can download and share journey maps
5. **Scalability**: How the system handles 8+ workflow phases with unique content per phase

---

**Last Updated**: December 2024  
**Version**: 1.0  
**Status**: High-Fidelity Interactive Prototype
