import { BaselineJourney, InterviewJourney, OverallAction, JourneyStep, Emotion } from "../types/journey";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";

interface PhaseBasedJourneyMapProps {
  journey: BaselineJourney | InterviewJourney;
  onEditStep?: (step: JourneyStep) => void;
  onDeleteStep?: (step: JourneyStep) => void;
  showActions?: boolean;
}

const emotionEmojis: Record<Emotion, string> = {
  Confident: "😎",
  Frustrated: "😤",
  Anxious: "😰",
  Satisfied: "😊",
  Efficient: "⚡",
  Neutral: "😐"
};

const phaseColors: Record<OverallAction, { bg: string; border: string; text: string; accent: string }> = {
  "Song Intake": { 
    bg: "bg-blue-50", 
    border: "border-blue-300", 
    text: "text-blue-900",
    accent: "bg-blue-600"
  },
  "Metadata Entry": { 
    bg: "bg-green-50", 
    border: "border-green-300", 
    text: "text-green-900",
    accent: "bg-green-600"
  },
  "Search & Discovery": { 
    bg: "bg-purple-50", 
    border: "border-purple-300", 
    text: "text-purple-900",
    accent: "bg-purple-600"
  },
  "Demo Pitching": { 
    bg: "bg-orange-50", 
    border: "border-orange-300", 
    text: "text-orange-900",
    accent: "bg-orange-600"
  },
  "Pitching": { 
    bg: "bg-pink-50", 
    border: "border-pink-300", 
    text: "text-pink-900",
    accent: "bg-pink-600"
  },
  "Tracking & Other": { 
    bg: "bg-gray-50", 
    border: "border-gray-300", 
    text: "text-gray-900",
    accent: "bg-gray-600"
  },
  "Playlist Creation": {
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    text: "text-yellow-900",
    accent: "bg-yellow-600"
  },
  "Pitch Tracking": {
    bg: "bg-indigo-50",
    border: "border-indigo-300",
    text: "text-indigo-900",
    accent: "bg-indigo-600"
  },
  "Contact Management": {
    bg: "bg-teal-50",
    border: "border-teal-300",
    text: "text-teal-900",
    accent: "bg-teal-600"
  },
  "Team Functionality": {
    bg: "bg-cyan-50",
    border: "border-cyan-300",
    text: "text-cyan-900",
    accent: "bg-cyan-600"
  },
  "Label User Journey": {
    bg: "bg-rose-50",
    border: "border-rose-300",
    text: "text-rose-900",
    accent: "bg-rose-600"
  },
  "Global Adoption Challenges": {
    bg: "bg-amber-50",
    border: "border-amber-300",
    text: "text-amber-900",
    accent: "bg-amber-600"
  },
  "Manual Upload Process": {
    bg: "bg-lime-50",
    border: "border-lime-300",
    text: "text-lime-900",
    accent: "bg-lime-600"
  },
  "Proposed Solutions": {
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    text: "text-emerald-900",
    accent: "bg-emerald-600"
  }
};

export function PhaseBasedJourneyMap({ 
  journey, 
  onEditStep, 
  onDeleteStep,
  showActions = true 
}: PhaseBasedJourneyMapProps) {
  // Group steps by overall action
  const groupedSteps = journey.steps.reduce((acc, step) => {
    if (!acc[step.overallAction]) {
      acc[step.overallAction] = [];
    }
    acc[step.overallAction].push(step);
    return acc;
  }, {} as Record<OverallAction, JourneyStep[]>);

  const phases = Object.keys(groupedSteps) as OverallAction[];

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-x-auto">
      <div className="p-8 min-w-max">
        {/* Horizontal Phase Flow */}
        <div className="flex items-start gap-6">
          {phases.map((phase, phaseIndex) => {
            const colors = phaseColors[phase];
            const phaseTasks = groupedSteps[phase];
            
            return (
              <div key={phase}>
                {/* Phase Container */}
                <div 
                  className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-6 w-[380px] flex-shrink-0`}
                >
                  {/* Phase Header */}
                  <div className="mb-4 pb-3 border-b-2 border-current border-opacity-20">
                    <div className={`inline-block px-3 py-1 rounded-lg ${colors.accent} text-white mb-2`}>
                      <h3 className="text-white">{phase}</h3>
                    </div>
                    <p className="text-xs text-gray-600">
                      {phaseTasks.length} task{phaseTasks.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Tasks within Phase */}
                  <div className="space-y-3">
                    {phaseTasks.map((step, taskIndex) => (
                      <div 
                        key={taskIndex}
                        className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow w-full"
                      >
                        {/* Task Title */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="text-sm flex-1 break-words">
                            {step.task}
                          </h4>
                          {step.painPoint && (
                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          )}
                        </div>

                        {/* Tool Used */}
                        <div className="mb-2">
                          <Badge variant="outline" className="text-xs">
                            {step.toolUsed}
                          </Badge>
                        </div>

                        {/* Emotion */}
                        {step.emotion && (
                          <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                            <span>{emotionEmojis[step.emotion]}</span>
                            <span>{step.emotion}</span>
                          </div>
                        )}

                        {/* Pain Point */}
                        {step.painPoint && (
                          <div className="bg-red-50 border border-red-200 rounded p-2 mb-2">
                            <div className="flex items-start gap-1">
                              <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-red-900 break-words">{step.painPoint}</p>
                            </div>
                          </div>
                        )}

                        {/* Opportunity */}
                        {step.opportunity && (
                          <div className="bg-green-50 border border-green-200 rounded p-2 mb-2">
                            <p className="text-xs text-green-900 break-words">
                              <span className="text-green-600">💡 </span>
                              {step.opportunity}
                            </p>
                          </div>
                        )}

                        {/* Key Quote */}
                        {step.keyQuote && (
                          <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-2">
                            <p className="text-xs text-blue-900 italic break-words">
                              "{step.keyQuote}"
                            </p>
                          </div>
                        )}

                        {/* Footer Info */}
                        <div className="flex items-center justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100 gap-2">
                          {step.frequency && (
                            <span className="flex-shrink-0">{step.frequency}</span>
                          )}
                          {step.collaborators && (
                            <span className="truncate flex-1 text-right">{step.collaborators}</span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        {showActions && (onEditStep || onDeleteStep) && (
                          <div className="flex gap-2 mt-3 pt-2 border-t border-gray-100">
                            {onEditStep && (
                              <button
                                onClick={() => onEditStep(step)}
                                className="text-xs text-blue-600 hover:text-blue-800"
                              >
                                Edit
                              </button>
                            )}
                            {onDeleteStep && (
                              <button
                                onClick={() => onDeleteStep(step)}
                                className="text-xs text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}