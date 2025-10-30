import { BaselineJourney, InterviewJourney, OverallAction, JourneyStep } from "../types/journey";
import { JourneyStepCard } from "./JourneyStepCard";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface JourneyMapProps {
  journey: BaselineJourney | InterviewJourney;
  isBaseline?: boolean;
  onEditStep?: (step: JourneyStep) => void;
  onDeleteStep?: (step: JourneyStep) => void;
}

export function JourneyMap({ journey, isBaseline = false, onEditStep, onDeleteStep }: JourneyMapProps) {
  // Group steps by overall action
  const groupedSteps = journey.steps.reduce((acc, step) => {
    if (!acc[step.overallAction]) {
      acc[step.overallAction] = [];
    }
    acc[step.overallAction].push(step);
    return acc;
  }, {} as Record<OverallAction, typeof journey.steps>);

  const phases = Object.keys(groupedSteps) as OverallAction[];

  const phaseColors: Record<OverallAction, string> = {
    "Song Intake": "bg-blue-50 border-blue-200 text-blue-800",
    "Metadata Entry": "bg-green-50 border-green-200 text-green-800",
    "Search & Discovery": "bg-purple-50 border-purple-200 text-purple-800",
    "Demo Pitching": "bg-orange-50 border-orange-200 text-orange-800",
    "Pitching": "bg-pink-50 border-pink-200 text-pink-800",
    "Tracking & Other": "bg-gray-50 border-gray-200 text-gray-800"
  };

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      <ScrollArea className="w-full">
        <div className="p-6">
          {/* Horizontal Flow */}
          <div className="space-y-6">
            {phases.map((phase) => (
              <div key={phase}>
                {/* Phase Header */}
                <div className="mb-3">
                  <h3 className={`inline-block px-4 py-2 rounded-t-lg border-2 ${phaseColors[phase]}`}>
                    {phase}
                  </h3>
                </div>

                {/* Steps in this phase */}
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {groupedSteps[phase].map((step, idx) => (
                    <div key={idx} className="flex items-center">
                      <JourneyStepCard 
                        step={step} 
                        isBaseline={isBaseline} 
                        onEdit={onEditStep} 
                        onDelete={onDeleteStep} 
                      />
                      {idx < groupedSteps[phase].length - 1 && (
                        <div className="flex items-center px-2">
                          <div className="w-8 h-0.5 bg-gray-300"></div>
                          <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-300"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}