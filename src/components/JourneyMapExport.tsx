import { useRef } from "react";
import { BaselineJourney, InterviewJourney } from "../types/journey";
import { PhaseBasedJourneyMap } from "./PhaseBasedJourneyMap";
import { Button } from "./ui/button";
import { Download, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { toPng } from "html-to-image";

interface JourneyMapExportProps {
  baselineJourney: BaselineJourney;
  interviewJourneys: InterviewJourney[];
  onClose: () => void;
}

export function JourneyMapExport({ baselineJourney, interviewJourneys, onClose }: JourneyMapExportProps) {
  const exportRef = useRef<HTMLDivElement>(null);

  const handleDownloadJPEG = async () => {
    if (!exportRef.current) return;
    
    toast.loading("Generating JPEG image...", { id: "jpeg-export" });
    
    try {
      // Wait a bit for fonts and styles to load
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Generate PNG using html-to-image
      const dataUrl = await toPng(exportRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
        style: {
          // Override oklch colors with standard colors
          color: '#000000',
        },
        filter: (node) => {
          // Filter out any nodes that might cause issues
          return true;
        }
      });
      
      // Convert to blob and download
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `AR_Journey_Maps_${new Date().toISOString().split('T')[0]}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Your journey map image is downloading!", { id: "jpeg-export" });
      
      // Close the preview after download
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to generate image. Please try again.", { id: "jpeg-export" });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-200 z-50 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-300 px-6 py-4 flex items-center justify-between shadow-sm flex-shrink-0">
        <div>
          <h2>Journey Map Export Preview</h2>
          <p className="text-sm text-gray-600">
            Preview all journey maps before exporting
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button onClick={handleDownloadJPEG} size="lg" className="gap-2">
            <Download className="w-5 h-5" />
            Download JPEG
          </Button>
          <Button variant="outline" size="lg" onClick={onClose}>
            <X className="w-5 h-5" />
            Close
          </Button>
        </div>
      </div>

      {/* Scrollable Canvas Area */}
      <div className="flex-1 overflow-auto bg-gray-200 p-8">
        <div 
          ref={exportRef} 
          className="mx-auto bg-white shadow-2xl p-12 space-y-12"
          style={{ width: "fit-content", minWidth: "1400px" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="mb-2">A&R Journey Map Analysis</h1>
            <p className="text-gray-600">
              Comprehensive workflow comparison across {interviewJourneys.length + 1} journey map{interviewJourneys.length > 0 ? 's' : ''}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Generated on {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Baseline Journey */}
          <div className="space-y-4">
            <div>
              <h2 className="mb-1">Baseline: Current WMN Process</h2>
              <div className="h-1 w-32 bg-blue-600 rounded mb-4"></div>
              <p className="text-sm text-gray-600">Reference workflow based on current system</p>
            </div>
            
            <PhaseBasedJourneyMap 
              journey={baselineJourney} 
              showActions={false}
            />
          </div>

          {/* Interview Journeys */}
          {interviewJourneys.map((journey, index) => (
            <div key={journey.id} className="space-y-4">
              {/* Separator */}
              <div className="border-t-2 border-dashed border-gray-300 pt-8 mt-8"></div>
              
              <div>
                <h2 className="mb-1">
                  Interview Journey: {journey.userName}
                </h2>
                <div className="h-1 w-32 bg-purple-600 rounded mb-2"></div>
                <p className="text-sm text-gray-600">
                  {journey.region} • {journey.genreFocus} • Interviewed on {new Date(journey.uploadDate).toLocaleDateString()}
                </p>
              </div>
              
              <PhaseBasedJourneyMap 
                journey={journey}
                showActions={false}
              />
            </div>
          ))}

          {/* Footer */}
          <div className="mt-16 pt-8 border-t-2 border-gray-200 text-center text-sm text-gray-500">
            <p>A&R Journey Map Central</p>
            <p className="text-xs mt-1">© {new Date().getFullYear()} Warner Music Nashville</p>
          </div>
        </div>
      </div>
    </div>
  );
}