"use client";

import { useMemo, useState } from "react";

type ServiceGalleryProps = {
  images: string[];
  title: string;
};

export default function ServiceGallery({ images, title }: ServiceGalleryProps) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [active, setActive] = useState(0);

  if (safeImages.length === 0) {
    return (
      <div className="grid gap-3">
        <div className="h-72 rounded-xl border bg-gradient-to-br from-orange-200/60 via-amber-100 to-emerald-200/60" />
      </div>
    );
  }

  const activeImage = safeImages[Math.min(active, safeImages.length - 1)];

  return (
    <div className="grid gap-3">
      <div className="overflow-hidden rounded-xl border bg-white">
        <img src={activeImage} alt={title} className="h-72 w-full object-cover" loading="eager" />
      </div>

      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {safeImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={`overflow-hidden rounded-lg border transition ${
                index === active ? "border-green-600 ring-1 ring-green-600" : "border-gray-200"
              }`}
              aria-label={`Image ${index + 1}`}
            >
              <img src={image} alt={`${title} ${index + 1}`} className="h-16 w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
