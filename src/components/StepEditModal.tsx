import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { JourneyStep, OverallAction, Emotion, Frequency } from "../types/journey";

interface StepEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingStep: { step: JourneyStep; journeyId: string | null } | null;
  onSave: (step: JourneyStep) => void;
}

export function StepEditModal({ open, onOpenChange, editingStep, onSave }: StepEditModalProps) {
  const [formData, setFormData] = useState<JourneyStep>({
    overallAction: "Song Intake",
    task: "",
    toolUsed: "",
    steps: "",
    emotion: "Neutral",
    painPoint: "",
    opportunity: "",
    keyQuote: "",
    collaborators: "",
    frequency: "Daily"
  });

  useEffect(() => {
    if (editingStep?.step && open) {
      setFormData(editingStep.step);
    }
  }, [editingStep, open]);

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Journey Step</DialogTitle>
          <DialogDescription>
            Update the details for this journey step
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Overall Action */}
          <div className="space-y-2">
            <Label htmlFor="overallAction">Overall Action</Label>
            <Select 
              value={formData.overallAction} 
              onValueChange={(value) => setFormData({ ...formData, overallAction: value as OverallAction })}
            >
              <SelectTrigger id="overallAction">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Song Intake">Song Intake</SelectItem>
                <SelectItem value="Metadata Entry">Metadata Entry</SelectItem>
                <SelectItem value="Search & Discovery">Search & Discovery</SelectItem>
                <SelectItem value="Demo Pitching">Demo Pitching</SelectItem>
                <SelectItem value="Pitching">Pitching</SelectItem>
                <SelectItem value="Tracking & Other">Tracking & Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Task */}
          <div className="space-y-2">
            <Label htmlFor="task">Task</Label>
            <Input
              id="task"
              value={formData.task}
              onChange={(e) => setFormData({ ...formData, task: e.target.value })}
              placeholder="e.g., Upload demo files"
            />
          </div>

          {/* Tool Used */}
          <div className="space-y-2">
            <Label htmlFor="toolUsed">Tool Used</Label>
            <Input
              id="toolUsed"
              value={formData.toolUsed}
              onChange={(e) => setFormData({ ...formData, toolUsed: e.target.value })}
              placeholder="e.g., Arrow System"
            />
          </div>

          {/* Steps */}
          <div className="space-y-2">
            <Label htmlFor="steps">Steps</Label>
            <Textarea
              id="steps"
              value={formData.steps || ""}
              onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
              placeholder="Detailed steps..."
              className="min-h-[80px]"
            />
          </div>

          {/* Emotion */}
          <div className="space-y-2">
            <Label htmlFor="emotion">Emotion</Label>
            <Select 
              value={formData.emotion} 
              onValueChange={(value) => setFormData({ ...formData, emotion: value as Emotion })}
            >
              <SelectTrigger id="emotion">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Confident">Confident</SelectItem>
                <SelectItem value="Frustrated">Frustrated</SelectItem>
                <SelectItem value="Anxious">Anxious</SelectItem>
                <SelectItem value="Satisfied">Satisfied</SelectItem>
                <SelectItem value="Efficient">Efficient</SelectItem>
                <SelectItem value="Neutral">Neutral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Frequency */}
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select 
              value={formData.frequency} 
              onValueChange={(value) => setFormData({ ...formData, frequency: value as Frequency })}
            >
              <SelectTrigger id="frequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Per-pitch">Per-pitch</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Occasional">Occasional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pain Point */}
          <div className="space-y-2">
            <Label htmlFor="painPoint">Pain Point</Label>
            <Textarea
              id="painPoint"
              value={formData.painPoint || ""}
              onChange={(e) => setFormData({ ...formData, painPoint: e.target.value })}
              placeholder="What challenges exist in this step?"
              className="min-h-[60px]"
            />
          </div>

          {/* Opportunity */}
          <div className="space-y-2">
            <Label htmlFor="opportunity">Opportunity</Label>
            <Textarea
              id="opportunity"
              value={formData.opportunity || ""}
              onChange={(e) => setFormData({ ...formData, opportunity: e.target.value })}
              placeholder="What improvements could be made?"
              className="min-h-[60px]"
            />
          </div>

          {/* Key Quote */}
          <div className="space-y-2">
            <Label htmlFor="keyQuote">Key Quote</Label>
            <Textarea
              id="keyQuote"
              value={formData.keyQuote || ""}
              onChange={(e) => setFormData({ ...formData, keyQuote: e.target.value })}
              placeholder="Notable quote from interview..."
              className="min-h-[60px]"
            />
          </div>

          {/* Collaborators */}
          <div className="space-y-2">
            <Label htmlFor="collaborators">Collaborators</Label>
            <Input
              id="collaborators"
              value={formData.collaborators || ""}
              onChange={(e) => setFormData({ ...formData, collaborators: e.target.value })}
              placeholder="e.g., Publishing Team, Producers"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}