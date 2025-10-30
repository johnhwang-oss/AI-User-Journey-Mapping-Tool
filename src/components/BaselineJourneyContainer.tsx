import { useState } from "react";
import { BaselineJourney, JourneyStep } from "../types/journey";
import { PhaseBasedJourneyMap } from "./PhaseBasedJourneyMap";
import { ChevronDown, ChevronRight } from "lucide-react";

interface BaselineJourneyContainerProps {
  journey: BaselineJourney;
  onEditStep: (step: JourneyStep) => void;
  onDeleteStep: (step: JourneyStep) => void;
}

export function BaselineJourneyContainer({ journey, onEditStep, onDeleteStep }: BaselineJourneyContainerProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center gap-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        {isExpanded ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <h2 className="text-white">Baseline: Current WMN Process</h2>
        </div>
      </button>

      {/* Description */}
      {isExpanded && (
        <>
          <div className="px-6 py-3 bg-blue-50 border-b">
            <p className="text-gray-700 text-sm">
              Reference workflow based on current system
            </p>
          </div>

          {/* Content */}
          <div className="bg-gray-50">
            <PhaseBasedJourneyMap 
              journey={journey} 
              onEditStep={onEditStep}
              onDeleteStep={onDeleteStep}
            />
          </div>
        </>
      )}
    </div>
  );
}