import { JourneyStep } from "../types/journey";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertCircle, Lightbulb, Quote, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface JourneyStepCardProps {
  step: JourneyStep;
  isBaseline?: boolean;
  onEdit?: (step: JourneyStep) => void;
  onDelete?: (step: JourneyStep) => void;
}

export function JourneyStepCard({ step, isBaseline = false, onEdit, onDelete }: JourneyStepCardProps) {
  const emotionColors = {
    Confident: "bg-green-100 text-green-800 border-green-300",
    Frustrated: "bg-red-100 text-red-800 border-red-300",
    Anxious: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Satisfied: "bg-blue-100 text-blue-800 border-blue-300",
    Efficient: "bg-purple-100 text-purple-800 border-purple-300",
    Neutral: "bg-gray-100 text-gray-800 border-gray-300"
  };

  const emotionColor = step.emotion ? emotionColors[step.emotion] : emotionColors.Neutral;

  return (
    <Card className={`relative border-2 rounded-lg p-4 min-w-[280px] max-w-[320px] bg-white shadow-sm ${
      step.emotion ? emotionColor : "border-gray-200"
    }`}>
      {/* Task Title */}
      <div className="mb-3">
        <h4 className="mb-1">{step.task}</h4>
        <Badge variant="outline" className="text-xs">
          {step.toolUsed}
        </Badge>
      </div>

      {/* Steps */}
      {step.steps && (
        <div className="mb-3 text-sm text-gray-600">
          <p className="text-xs text-gray-500 mb-1">Steps:</p>
          <p className="text-xs">{step.steps}</p>
        </div>
      )}

      {/* Emotion */}
      {step.emotion && (
        <div className="mb-2">
          <Badge className={`text-xs ${emotionColor}`}>
            {step.emotion}
          </Badge>
        </div>
      )}

      {/* Icons Row */}
      <div className="flex gap-2 items-center">
        {/* Pain Point */}
        {step.painPoint && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-red-100">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">{step.painPoint}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Opportunity */}
        {step.opportunity && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">{step.opportunity}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Key Quote */}
        {step.keyQuote && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100">
                  <Quote className="w-4 h-4 text-purple-600" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs italic">"{step.keyQuote}"</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500 space-y-1">
        {step.collaborators && (
          <p><span className="font-medium">With:</span> {step.collaborators}</p>
        )}
        {step.frequency && (
          <p><span className="font-medium">Frequency:</span> {step.frequency}</p>
        )}
      </div>

      {/* Edit and Delete Buttons */}
      <div className="absolute top-2 right-2 flex gap-2">
        {onEdit && (
          <Button
            size="icon"
            variant="outline"
            onClick={() => onEdit(step)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        )}
        {onDelete && (
          <Button
            size="icon"
            variant="outline"
            onClick={() => onDelete(step)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}