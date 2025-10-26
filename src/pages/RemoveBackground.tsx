import { useEffect, useState } from 'react';
import { removeBackground, loadImage } from '@/utils/removeBackground';
import racketImage from '@/assets/PR_racket_black_1.png';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const RemoveBackground = () => {
  const [processing, setProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleRemoveBackground = async () => {
    setProcessing(true);
    try {
      toast.info('Loading AI model... This may take a moment.');
      
      // Fetch the image
      const response = await fetch(racketImage);
      const blob = await response.blob();
      
      // Load image
      const img = await loadImage(blob);
      
      toast.info('Processing image...');
      
      // Remove background
      const resultBlob = await removeBackground(img);
      
      // Create URL for preview
      const url = URL.createObjectURL(resultBlob);
      setProcessedImage(url);
      
      // Download the image
      const link = document.createElement('a');
      link.href = url;
      link.download = 'PR_racket_black_1_no_bg.png';
      link.click();
      
      toast.success('Background removed! Image downloaded.');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to remove background. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-display mb-8">Background Removal Tool</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Original Image</h2>
            <img src={racketImage} alt="Original racket" className="max-w-md border rounded-lg" />
          </div>
          
          <Button 
            onClick={handleRemoveBackground} 
            disabled={processing}
            size="lg"
          >
            {processing ? 'Processing...' : 'Remove Background'}
          </Button>
          
          {processedImage && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Processed Image (Transparent Background)</h2>
              <div className="bg-gray-200 dark:bg-gray-800 p-8 rounded-lg inline-block">
                <img src={processedImage} alt="Processed racket" className="max-w-md" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;
