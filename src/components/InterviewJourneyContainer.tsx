import { useState } from "react";
import { InterviewJourney, JourneyStep } from "../types/journey";
import { PhaseBasedJourneyMap } from "./PhaseBasedJourneyMap";
import { ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface InterviewJourneyContainerProps {
  journey: InterviewJourney;
  onEdit: (journey: InterviewJourney) => void;
  onDelete: (journeyId: string) => void;
  onEditStep: (journeyId: string, step: JourneyStep) => void;
  onDeleteStep: (journeyId: string, step: JourneyStep) => void;
}

export function InterviewJourneyContainer({ journey, onEdit, onDelete, onEditStep, onDeleteStep }: InterviewJourneyContainerProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete(journey.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="border rounded-lg bg-gray-50 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="w-full px-6 py-4 flex items-center justify-between bg-white border-b">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-4 hover:opacity-70 transition-opacity"
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            )}
            <div className="flex items-center gap-3">
              <h3>Journey Map: {journey.userName}</h3>
              <Badge variant="outline">{journey.region}</Badge>
              <Badge variant="secondary">{journey.genreFocus}</Badge>
            </div>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              {new Date(journey.uploadDate).toLocaleDateString()}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(journey)}
                className="gap-2"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {isExpanded && (
          <div className="p-6">
            <PhaseBasedJourneyMap 
              journey={journey} 
              isBaseline={false} 
              onEditStep={(step) => onEditStep(journey.id, step)}
              onDeleteStep={(step) => onDeleteStep(journey.id, step)}
            />
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Journey Map?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the journey map for <strong>{journey.userName}</strong>? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}