
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle, UploadCloud } from 'lucide-react';
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
      </DialogContent>
    </Dialog>
  );
}
