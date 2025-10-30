import { useState } from "react";
import { Button } from "./components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./components/ui/dialog";
import { Textarea } from "./components/ui/textarea";
import { PhaseBasedJourneyMap } from "./components/PhaseBasedJourneyMap";
import { PhaseStatsCard } from "./components/PhaseStatsCard";
import { baselineJourney } from "./data/baseline";
import { chapelInterviewJourney } from "./data/chapelInterview";
import { FileText, Sparkles, ArrowRight, Image as ImageIcon } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { JourneyMapExport } from "./components/JourneyMapExport";

/**
 * ============================================================================
 * A&R JOURNEY MAP CENTRAL - PROTOTYPE SIMULATION
 * ============================================================================
 * 
 * This is a high-fidelity prototype demonstrating:
 * 
 * SCREEN 1: Home screen with "Start New Interview Session" button
 * SCREEN 2: Pre-populated journey map with perfectly parsed Chapel A&R data
 * 
 * The data shown on Screen 2 has been pre-parsed from interview notes using
 * the 4-pass AI parsing framework. Each phase contains UNIQUE content with
 * NO DUPLICATION across phases.
 * ============================================================================
 */

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "journey">("home");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [showExportPreview, setShowExportPreview] = useState(false);
  const [notes, setNotes] = useState("");

  const handleStartInterview = () => {
    setUploadModalOpen(true);
  };

  const handleGenerateMap = () => {
    // Simulate navigation to the pre-generated journey map screen
    setUploadModalOpen(false);
    setCurrentScreen("journey");
  };

  const handleBackToHome = () => {
    setCurrentScreen("home");
  };

  // ========================================================================
  // SCREEN 1: HOME SCREEN
  // ========================================================================
  if (currentScreen === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-8">
        <Toaster />
        
        <div className="max-w-3xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              A&R Journey Map Central
            </h1>
            
            <p className="text-xl text-gray-600 mb-2">
              AI-Powered Interview Analysis & Journey Mapping
            </p>
            
            <p className="text-gray-500 max-w-2xl mx-auto">
              Transform A&R interview notes into beautifully visualized workflow journey maps.
              Our AI parsing engine extracts unique insights for each workflow phase with precision and accuracy.
            </p>
          </div>

          {/* Main CTA Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-12 border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="mb-1">Ready to analyze your interview?</h2>
                <p className="text-gray-600">
                  Upload your notes and let AI generate precise journey maps
                </p>
              </div>
            </div>

            <Button 
              onClick={handleStartInterview}
              size="lg"
              className="w-full h-14 text-lg gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Sparkles className="w-5 h-5" />
              Start New Interview Session
              <ArrowRight className="w-5 h-5" />
            </Button>

            {/* Features List */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5"></div>
                  <span className="text-gray-600">4-pass AI parsing framework</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5"></div>
                  <span className="text-gray-600">Phase-specific data extraction</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-pink-600 rounded-full mt-1.5"></div>
                  <span className="text-gray-600">Zero duplication guarantee</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5"></div>
                  <span className="text-gray-600">Visual journey comparison</span>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Preview Button */}
          <div className="text-center mt-8">
            <button 
              onClick={() => setCurrentScreen("journey")}
              className="text-blue-600 hover:text-blue-700 underline inline-flex items-center gap-2"
            >
              View Example Journey Map
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Upload Modal */}
        <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>New Interview Session</DialogTitle>
              <DialogDescription>
                Paste your A&R interview notes below and let our AI parse them into a structured journey map
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4 flex-1 overflow-y-auto">
              <div className="space-y-2 flex-1 flex flex-col">
                <label className="text-sm">Paste your interview notes here...</label>
                <Textarea
                  placeholder="Example:&#10;&#10;Meeting Commencement and Arrow Overview&#10;Mark Lin inquired about waiting for Patrick Cosmo...&#10;&#10;Song Intake (Audio Upload)&#10;- Users upload single/multiple audio files&#10;- Pain Point: 'my uploads' location is too hidden&#10;&#10;Metadata Entry & Linking&#10;- Complete metadata for draft upload&#10;- Pain Point: multiple results for same writer name..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[400px] resize-none"
                />
                <p className="text-sm text-gray-500">
                  {notes.length} characters • AI will extract phase-specific tasks, pain points, and opportunities
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button 
                onClick={handleGenerateMap}
                className="w-full gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                <Sparkles className="w-5 h-5" />
                Generate Journey Map
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // ========================================================================
  // SCREEN 2: GENERATED JOURNEY MAP
  // ========================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster />
      
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1>A&R Journey Map Central</h1>
              </div>
              <p className="text-gray-600">
                AI-parsed journey maps with phase-specific insights
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={handleBackToHome} 
                variant="outline"
                size="lg"
              >
                ← Back to Home
              </Button>
              <Button 
                onClick={() => setShowExportPreview(true)} 
                size="lg"
                variant="default"
                className="gap-2"
              >
                <ImageIcon className="w-5 h-5" />
                Export Journey Map
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-8 py-8">
        {/* AI Parse Success Banner */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-green-900">✓ Successfully Parsed Interview Data</h3>
              <p className="text-sm text-green-800 mb-3">
                AI extracted <span className="font-semibold">8 unique workflow phases</span> with{" "}
                <span className="font-semibold">26 distinct tasks</span>, identifying phase-specific pain points,
                opportunities, and user emotions. Zero duplication detected.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white rounded-full text-xs text-green-900 border border-green-200">
                  Song Intake
                </span>
                <span className="px-3 py-1 bg-white rounded-full text-xs text-green-900 border border-green-200">
                  Metadata Entry
                </span>
                <span className="px-3 py-1 bg-white rounded-full text-xs text-green-900 border border-green-200">
                  Discovery & Curation
                </span>
                <span className="px-3 py-1 bg-white rounded-full text-xs text-green-900 border border-green-200">
                  Pitching
                </span>
                <span className="px-3 py-1 bg-white rounded-full text-xs text-green-900 border border-green-200">
                  Demo Pitching
                </span>
                <span className="px-3 py-1 bg-white rounded-full text-xs text-green-900 border border-green-200">
                  Pitch Tracking
                </span>
                <span className="px-3 py-1 bg-white rounded-full text-xs text-green-900 border border-green-200">
                  Contact Management
                </span>
                <span className="px-3 py-1 bg-white rounded-full text-xs text-green-900 border border-green-200">
                  Proposed Solutions
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Baseline Journey Section */}
        <section className="mb-12">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-t-lg">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <h2 className="text-white">Baseline: Current WMN Process</h2>
            </div>
            <p className="text-gray-600 mt-2">
              Reference workflow based on current Arrow system
            </p>
          </div>
          
          <PhaseBasedJourneyMap 
            journey={baselineJourney} 
            showActions={false}
          />
        </section>

        {/* Interview Journey Section */}
        <section>
          {/* Separator */}
          <div className="border-t-4 border-dashed border-gray-300 my-12 relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 px-4 py-2 rounded-full">
              <span className="text-sm text-gray-600">Comparison Below</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-t-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <h2 className="text-white">Interview Journey: Chapel A&R User</h2>
            </div>
            <p className="text-gray-600 mt-2">
              Nashville • Country • Parsed with AI precision (8 unique phases, 26 tasks)
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
            <PhaseBasedJourneyMap 
              journey={chapelInterviewJourney} 
              showActions={false}
            />
          </div>

          {/* Insights Panel */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-6 border shadow-sm">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="mb-1">Phase Coverage</h3>
              <p className="text-sm text-gray-600">
                8 unique workflow phases identified with distinct tasks and pain points per phase
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border shadow-sm">
              <div className="text-3xl mb-2">⚠️</div>
              <h3 className="mb-1">Pain Points Found</h3>
              <p className="text-sm text-gray-600">
                12 specific pain points extracted, each mapped to its relevant workflow phase
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border shadow-sm">
              <div className="text-3xl mb-2">💡</div>
              <h3 className="mb-1">Opportunities</h3>
              <p className="text-sm text-gray-600">
                10 improvement opportunities identified across song intake, metadata, and tracking
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Export Preview Modal */}
      {showExportPreview && (
        <JourneyMapExport 
          baselineJourney={baselineJourney}
          interviewJourneys={[chapelInterviewJourney]}
          onClose={() => setShowExportPreview(false)}
        />
      )}
    </div>
  );
}