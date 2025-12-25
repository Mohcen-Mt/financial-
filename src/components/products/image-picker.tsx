
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle, Upload, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '../ui/input';

interface ImagePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ImagePicker({ value, onChange }: ImagePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (imageId: string) => {
    onChange(imageId);
    setIsOpen(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange(base64String);
        setIsOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full" type="button">
          <UploadCloud className="mr-2 h-4 w-4" />
          {'Change Image'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{'Select a Product Image'}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="gallery">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="gallery">Image Gallery</TabsTrigger>
                <TabsTrigger value="upload">Upload an Image</TabsTrigger>
            </TabsList>
            <TabsContent value="gallery">
                <ScrollArea className="h-[60vh]">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 p-4">
                    {PlaceHolderImages.map((image) => (
                        <div
                        key={image.id}
                        className={cn(
                            'relative aspect-square cursor-pointer overflow-hidden rounded-md group',
                            'ring-2 ring-transparent transition-all',
                            value === image.id && 'ring-primary'
                        )}
                        onClick={() => handleSelect(image.id)}
                        >
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                        {value === image.id && (
                            <div className="absolute inset-0 flex items-center justify-center bg-primary/60">
                                <CheckCircle className="h-8 w-8 text-primary-foreground" />
                            </div>
                        )}
                        <div className="absolute bottom-0 left-0 w-full bg-black/50 p-1">
                            <p className="truncate text-xs text-white" data-ai-hint={image.imageHint}>{image.description}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                </ScrollArea>
            </TabsContent>
            <TabsContent value="upload">
                <div className="flex h-[60vh] flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-muted">
                    <Upload className="h-16 w-16 text-muted-foreground" />
                    <h3 className="font-bold text-lg">Upload an image</h3>
                    <p className="text-sm text-muted-foreground">Select a file from your device.</p>
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <div className={cn(
                            'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                            'bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
                        )}>
                            Browse Files
                        </div>
                        <Input id="file-upload" type="file" className="sr-only" onChange={handleFileUpload} accept="image/*" />
                    </label>
                </div>
            </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
