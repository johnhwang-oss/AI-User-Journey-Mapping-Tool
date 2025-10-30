import { InterviewJourney } from "../types/journey";

interface PhaseStatsCardProps {
  journey: InterviewJourney;
}

export function PhaseStatsCard({ journey }: PhaseStatsCardProps) {
  // Count unique phases
  const uniquePhases = new Set(journey.steps.map(step => step.overallAction));
  
  // Count pain points
  const painPointCount = journey.steps.filter(step => step.painPoint).length;
  
  // Count opportunities
  const opportunityCount = journey.steps.filter(step => step.opportunity).length;
  
  // Count quotes
  const quoteCount = journey.steps.filter(step => step.keyQuote).length;
  
  // Extract emotions
  const emotions = journey.steps
    .filter(step => step.emotion)
    .map(step => step.emotion);
  
  // Count tools
  const tools = new Set(journey.steps.map(step => step.toolUsed));

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-xl">📊</span>
        </div>
        <div>
          <h3 className="text-purple-900">AI Parsing Summary</h3>
          <p className="text-sm text-purple-700">Phase-specific extraction with zero duplication</p>
        </div>
      </div>
      
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl mb-1">{uniquePhases.size}</div>
          <div className="text-xs text-gray-600">Unique Phases</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl mb-1">{journey.steps.length}</div>
          <div className="text-xs text-gray-600">Total Tasks</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl mb-1">{painPointCount}</div>
          <div className="text-xs text-gray-600">Pain Points</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl mb-1">{opportunityCount}</div>
          <div className="text-xs text-gray-600">Opportunities</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl mb-1">{quoteCount}</div>
          <div className="text-xs text-gray-600">Quotes</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl mb-1">{tools.size}</div>
          <div className="text-xs text-gray-600">Tools Used</div>
        </div>
      </div>
      
      {emotions.length > 0 && (
        <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
          <div className="text-xs text-gray-600 mb-2">Emotion Analysis</div>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(emotions)).map((emotion) => {
              const count = emotions.filter(e => e === emotion).length;
              const emoji = {
                Confident: "😎",
                Frustrated: "😤",
                Anxious: "😰",
                Satisfied: "😊",
                Efficient: "⚡",
                Neutral: "😐"
              }[emotion];
              
              return (
                <span 
                  key={emotion}
                  className="px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-xs"
                >
                  {emoji} {emotion} ({count}x)
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
