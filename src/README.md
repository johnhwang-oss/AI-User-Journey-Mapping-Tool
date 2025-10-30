# 🎯 A&R Journey Map Central

> **AI-Powered Interview Analysis & Journey Mapping Tool**

A high-fidelity, interactive prototype demonstrating precision AI parsing of A&R interview notes into visually distinct, phase-specific journey maps.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Two-Screen Flow](#two-screen-flow)
- [AI Parsing Framework](#ai-parsing-framework)
- [Pre-Populated Data](#pre-populated-data)
- [Visual Design System](#visual-design-system)
- [Usage Guide](#usage-guide)
- [Technical Stack](#technical-stack)

---

## 🌟 Overview

This prototype simulates a **perfectly functioning A&R Interview Analysis Tool** that:

1. **Accepts** unstructured interview notes from A&R professionals
2. **Parses** them using a 4-pass AI framework
3. **Generates** horizontal journey maps with phase-specific insights
4. **Displays** unique content per workflow phase (NO duplication)
5. **Exports** beautiful visualizations as PNG images

---

## ✨ Key Features

### 🤖 AI Parsing Engine

- **4-Pass Framework**: Identify phases → Segment notes → Extract data → Validate
- **Phase-Specific Extraction**: Each workflow phase gets unique content
- **Zero Duplication**: Tasks, pain points, and opportunities mapped to correct phases
- **Precision Focused**: Only extracts explicitly mentioned information

### 🎨 Visual Journey Maps

- **Horizontal Phase Flow**: Left-to-right workflow visualization
- **Color-Coded Phases**: 14 distinct color schemes for different phases
- **Rich Metadata**: Tasks, tools, emotions, pain points, opportunities, quotes
- **Comparison View**: Baseline vs. Interview journeys side-by-side

### 📊 Export Functionality

- **Full-Screen Preview**: See all journey maps before export
- **PNG Download**: High-quality image export using html-to-image
- **Combined View**: Baseline + Interview journeys in one document

---

## 📱 Two-Screen Flow

### Screen 1: Home

**Purpose**: Beautiful landing page with call-to-action

**Elements**:
- Hero section with gradient branding
- "Start New Interview Session" primary button
- Feature highlights (4-pass parsing, phase-specific extraction, zero duplication)
- Quick link to view example journey map

**User Actions**:
1. Click "Start New Interview Session"
2. Modal opens for pasting interview notes
3. Click "Generate Journey Map"
4. Navigate to Screen 2

---

### Screen 2: Generated Journey Map

**Purpose**: Display AI-parsed journey maps with insights

**Sections**:

#### 1. Success Banner (Green)
```
✓ Successfully Parsed Interview Data
AI extracted 8 unique workflow phases with 26 distinct tasks
```

#### 2. Baseline Journey
- Header: "Baseline: Current WMN Process"
- 6 workflow phases from reference data
- Horizontal phase containers with tasks

#### 3. Chapel A&R Interview Journey
- Header: "Interview Journey: Chapel A&R User"
- Metadata: Nashville • Country • 8 phases, 26 tasks
- **8 Unique Phase Containers**:

| Phase | Color | Unique Content Example |
|-------|-------|----------------------|
| **Song Intake** | Blue | "Upload single/multiple files" + "'my uploads' location is too hidden" |
| **Metadata Entry** | Green | "Complete metadata for draft" + "Multiple results for same writer name" |
| **Search & Discovery** | Purple | "Search catalog for songs" + "Multiple versions pop up in results" |
| **Pitching** | Pink | "Send formal email pitch" + Confident emotion |
| **Demo Pitching** | Orange | "Send informal link via text" + "Artists prefer quick texts" |
| **Pitch Tracking** | Indigo | "Track pitch status" + "Manually update each pitch" |
| **Contact Management** | Teal | "Manage artist contacts" + "Contact info is scattered" |
| **Proposed Solutions** | Emerald | "Batch upload feature" + "Smart writer matching" |

#### 4. Insights Panel (Bottom)
- Phase Coverage: 8 unique phases
- Pain Points Found: 12 specific issues
- Opportunities: 10 improvements

---

## 🤖 AI Parsing Framework

### Pass 1: Identify Phases
Scan notes for workflow phase keywords:
- Song Intake, Metadata Entry, Search & Discovery
- Pitching, Demo Pitching, Pitch Tracking
- Contact Management, Proposed Solutions, etc.

### Pass 2: Segment Notes
Divide notes into blocks corresponding to each phase with surrounding context

### Pass 3: Extract Data Per Phase
For each phase block, extract:
- **Tasks**: Specific user actions
- **Tools**: Software/methods used (Arrow, Tango, Email, etc.)
- **Emotions**: User feelings (Frustrated, Efficient, Confident, etc.)
- **Pain Points**: Problems and challenges
- **Opportunities**: Suggested improvements
- **Quotes**: Direct user statements
- **Collaborators**: Who they work with
- **Frequency**: How often (Daily, Weekly, etc.)

### Pass 4: Validate & Deduplicate
- Remove duplicate tasks
- Ensure each phase has UNIQUE content
- Verify no cross-contamination between phases

---

## 📦 Pre-Populated Data

The prototype includes **Chapel A&R User** interview data in `/data/chapelInterview.ts`:

```typescript
{
  userName: "Chapel A&R User",
  region: "Nashville",
  genreFocus: "Country",
  steps: [
    // 26 unique tasks across 8 phases
    // Each with phase-specific content
    // NO duplication between phases
  ]
}
```

### Data Statistics:
- **Total Phases**: 8 unique workflow stages
- **Total Tasks**: 26 distinct user actions
- **Pain Points**: 12 identified issues
- **Opportunities**: 10 suggested improvements
- **Quotes**: 6 direct user statements
- **Tools**: Arrow, Tango, Text Message, Email
- **Emotions**: Frustrated (4x), Efficient (2x), Confident (2x), others

---

## 🎨 Visual Design System

### Color Coding by Phase

| Phase | Color | Hex | Usage |
|-------|-------|-----|-------|
| Song Intake | Blue | `#3B82F6` | Upload and ingestion tasks |
| Metadata Entry | Green | `#10B981` | Data entry and tagging |
| Search & Discovery | Purple | `#9333EA` | Catalog search and browsing |
| Demo Pitching | Orange | `#F97316` | Informal/quick pitches |
| Pitching | Pink | `#EC4899` | Formal pitch workflow |
| Pitch Tracking | Indigo | `#6366F1` | Status management |
| Contact Management | Teal | `#14B8A6` | Relationship management |
| Proposed Solutions | Emerald | `#10B981` | Future enhancements |

### Emotion Indicators

```
😎 Confident    ⚡ Efficient
😤 Frustrated   😊 Satisfied
😰 Anxious      😐 Neutral
```

### Visual Elements

- 🔴 **Red Alert**: Pain point present
- 💡 **Green Light**: Opportunity/solution
- 📝 **Blue Quote**: Key user quote
- 🏷️ **Badge**: Tool used (Arrow, Tango, etc.)

---

## 📖 Usage Guide

### Quick Start

1. **View Home Screen**
   ```
   Application loads → Beautiful landing page
   ```

2. **Start New Session** (Optional - demo works without it)
   ```
   Click "Start New Interview Session"
   → Modal opens
   → Paste notes (or skip)
   → Click "Generate Journey Map"
   ```

3. **View Example Journey**
   ```
   Click "View Example Journey Map"
   → Instantly see pre-parsed Chapel A&R data
   ```

4. **Explore Journey Maps**
   ```
   Scroll through:
   - Baseline (Current WMN Process)
   - Chapel A&R Interview Journey
   Notice: Each phase has UNIQUE content
   ```

5. **Export Maps**
   ```
   Click "Export Journey Map"
   → Full-screen preview
   → Click "Download JPEG"
   → PNG file downloads
   ```

### Key Interactions

- **Hover over task cards** to see full details
- **Scroll horizontally** through phase containers
- **Compare baseline vs. interview** side-by-side
- **Read insights panel** for summary statistics

---

## 🛠️ Technical Stack

### Frontend Framework
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** for styling

### UI Components
- **Shadcn/ui** component library
- **Lucide React** for icons
- **Sonner** for toast notifications

### Key Libraries
- `html-to-image` - PNG export functionality
- `react` - UI rendering
- `typescript` - Type safety

### File Structure
```
/
├── App.tsx                    # Main app with 2-screen flow
├── data/
│   ├── baseline.ts           # Baseline WMN process data
│   └── chapelInterview.ts    # Pre-parsed Chapel A&R data
├── components/
│   ├── PhaseBasedJourneyMap.tsx  # Horizontal phase visualization
│   ├── PhaseStatsCard.tsx        # Statistics summary
│   ├── JourneyMapExport.tsx      # Export preview modal
│   └── ui/                       # Shadcn components
├── types/
│   └── journey.ts            # TypeScript interfaces
└── utils/
    └── parseInterview.ts     # 4-pass AI parsing engine
```

---

## 🎯 Success Criteria

### ✅ Achieved

- [x] **No Duplication**: Each phase shows different content
- [x] **Phase-Specific**: Content relevant only to that workflow step
- [x] **Visual Distinction**: 8 different color schemes for 8 phases
- [x] **Accurate Parsing**: Data maps to actual workflow stages
- [x] **Clean UI**: Horizontal phase flow with clear hierarchy
- [x] **Export Ready**: Full journey maps exportable as PNG
- [x] **Zero Fabrication**: Only shows data found in notes

### 🔍 Verification Examples

**Song Intake Phase** contains:
- ✅ "Upload single audio file to Arrow"
- ✅ Pain: "'my uploads' location is too hidden"
- ✅ Opportunity: "Make upload destination more prominent"

**Metadata Entry Phase** contains:
- ✅ "Complete metadata for a 'draft' upload"
- ✅ Pain: "Multiple results for same writer name"
- ✅ Opportunity: "Writer deduplication system"

**NO OVERLAP** between phases ✓

---

## 📚 Additional Resources

- **PROTOTYPE_GUIDE.md** - Detailed walkthrough of all features
- **Guidelines.md** - Design system and component guidelines
- **/data/** - Example data structures and baselines

---

## 💡 For Stakeholders

This prototype demonstrates:

1. **AI Capability**: How parsing extracts structured data from unstructured notes
2. **Visual Design**: How journey maps render with phase-specific content
3. **Comparison View**: How baseline and interview journeys compare
4. **Export Functionality**: How stakeholders can share journey maps
5. **Scalability**: How the system handles 8+ phases with unique content

---

## 🚀 Next Steps

To build this into a production system:

1. **Integrate real AI/NLP**: Replace mock parser with GPT-4, Claude, or custom NLP
2. **Add authentication**: User accounts and interview history
3. **Database integration**: Store interviews and journey maps
4. **Real-time collaboration**: Multiple users editing simultaneously
5. **Advanced analytics**: Aggregate insights across multiple interviews
6. **Mobile responsive**: Optimize for tablet/mobile viewing

---

**Version**: 1.0  
**Status**: High-Fidelity Interactive Prototype  
**Last Updated**: December 2024

---

Made with ✨ by Figma Make
