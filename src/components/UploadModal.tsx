import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Region, Genre, InterviewJourney } from "../types/journey";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProcess: (notes: string, arName: string, region: Region, genre: Genre, journeyId?: string) => void;
  editingJourney?: InterviewJourney | null;
}

export function UploadModal({ open, onOpenChange, onProcess, editingJourney }: UploadModalProps) {
  const [notes, setNotes] = useState("");
  const [arName, setArName] = useState("");
  const [region, setRegion] = useState<Region>("Nashville");
  const [customRegion, setCustomRegion] = useState("");
  const [genre, setGenre] = useState<Genre>("Country");
  const [customGenre, setCustomGenre] = useState("");

  // Pre-fill form when editing
  useEffect(() => {
    if (editingJourney && open) {
      setArName(editingJourney.userName);
      
      // Check if region is a custom value
      const standardRegions = ["Nashville", "LA", "NY"];
      if (standardRegions.includes(editingJourney.region)) {
        setRegion(editingJourney.region);
        setCustomRegion("");
      } else {
        setRegion("Other");
        setCustomRegion(editingJourney.region);
      }
      
      // Check if genre is a custom value
      const standardGenres = ["Country", "Pop", "Hip-Hop", "R&B", "Rock", "Electronic"];
      if (standardGenres.includes(editingJourney.genreFocus)) {
        setGenre(editingJourney.genreFocus);
        setCustomGenre("");
      } else {
        setGenre("Other");
        setCustomGenre(editingJourney.genreFocus);
      }
      
      // For editing, we'll use a placeholder text since we don't store original notes
      setNotes(`[Editing existing journey map for ${editingJourney.userName}]\n\nModify the notes below to update the journey map...`);
    } else if (!open) {
      // Reset form when modal closes
      setNotes("");
      setArName("");
      setRegion("Nashville");
      setCustomRegion("");
      setGenre("Country");
      setCustomGenre("");
    }
  }, [editingJourney, open]);

  const handleProcess = () => {
    if (notes.trim() && arName) {
      // Use custom region if "Other" is selected, otherwise use the selected region
      const finalRegion = region === "Other" ? customRegion : region;
      // Use custom genre if "Other" is selected, otherwise use the selected genre
      const finalGenre = genre === "Other" ? customGenre : genre;
      onProcess(notes, arName, finalRegion, finalGenre, editingJourney?.id);
      onOpenChange(false);
    }
  };

  const isEditMode = !!editingJourney;
  
  // Disable submit if required fields are missing
  const isFormValid = notes.trim() && arName && (region !== "Other" || customRegion.trim()) && (genre !== "Other" || customGenre.trim());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Interview Session" : "New Interview Session"}</DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? "Update A&R information and interview notes below"
              : "Enter A&R information and type interview notes directly below"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 flex-1 overflow-y-auto">
          {/* Top Fields - A&R Info */}
          <div className="grid grid-cols-3 gap-4">
            {/* A&R Name */}
            <div className="space-y-2">
              <Label htmlFor="ar-name">A&R Name</Label>
              <Input
                id="ar-name"
                placeholder="Enter A&R name"
                value={arName}
                onChange={(e) => setArName(e.target.value)}
              />
            </div>

            {/* Region */}
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select value={region} onValueChange={(value) => setRegion(value as Region)}>
                <SelectTrigger id="region">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nashville">Nashville</SelectItem>
                  <SelectItem value="LA">LA</SelectItem>
                  <SelectItem value="NY">NY</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {region === "Other" && (
                <Input
                  id="custom-region"
                  placeholder="Enter custom region"
                  value={customRegion}
                  onChange={(e) => setCustomRegion(e.target.value)}
                />
              )}
            </div>

            {/* Genre Focus */}
            <div className="space-y-2">
              <Label htmlFor="genre">Genre Focus</Label>
              <Select value={genre} onValueChange={(value) => setGenre(value as Genre)}>
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Country">Country</SelectItem>
                  <SelectItem value="Pop">Pop</SelectItem>
                  <SelectItem value="Hip-Hop">Hip-Hop</SelectItem>
                  <SelectItem value="R&B">R&B</SelectItem>
                  <SelectItem value="Rock">Rock</SelectItem>
                  <SelectItem value="Electronic">Electronic</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {genre === "Other" && (
                <Input
                  id="custom-genre"
                  placeholder="Enter custom genre"
                  value={customGenre}
                  onChange={(e) => setCustomGenre(e.target.value)}
                />
              )}
            </div>
          </div>

          {/* Live Interview Notes - Main Focus */}
          <div className="space-y-2 flex-1 flex flex-col">
            <Label htmlFor="interview-notes">Live Interview Notes</Label>
            <Textarea
              id="interview-notes"
              placeholder="Type your interview notes here during the session...&#10;&#10;Example:&#10;- A&R receives demos via email from artists&#10;- Uploads files to Arrow system&#10;- Frustrated with manual metadata entry&#10;- Searches for similar songs in catalog&#10;- Sends informal pitches via text message..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[400px] resize-none"
            />
            <p className="text-sm text-gray-500">
              {notes.length} characters • {isEditMode ? "Update notes to regenerate the journey map" : "Type notes as you conduct the interview"}
            </p>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="pt-4 border-t">
          <Button 
            onClick={handleProcess} 
            disabled={!isFormValid}
            className="w-full"
            size="lg"
          >
            {isEditMode ? "Update Journey Map" : "Finish & Generate Map"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}