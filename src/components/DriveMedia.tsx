import React, { useState } from "react";

interface DriveMediaProps {
  id?: string;
  localSrc?: string;
  title: string;
  aspectRatioClass?: string;
  className?: string;
  isVideo?: boolean;
  maxWidth?: number; // Optional prop to specify maximum width for image optimization
}

export default function DriveMedia({
  id,
  localSrc,
  title,
  aspectRatioClass = "aspect-square",
  className = "",
  isVideo = false,
  maxWidth = 800 // Default optimized width
}: DriveMediaProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fallback chain for Google Drive images:
  // Primary: lh3.googleusercontent.com/d/ID=wMAX_WIDTH (Optimized & compressed)
  // Secondary (on error): docs.google.com/uc?export=view&id=ID
  const getGoogleDriveUrl = (fileId: string, fallback = false) => {
    return fallback 
      ? `https://docs.google.com/uc?export=view&id=${fileId}`
      : `https://lh3.googleusercontent.com/d/${fileId}${maxWidth ? `=w${maxWidth}` : ""}`;
  };

  const imageSrc = localSrc 
    ? localSrc 
    : id 
      ? getGoogleDriveUrl(id, hasError)
      : "";

  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-200/60 shadow-inner group ${aspectRatioClass} ${className}`}>
      {/* Loading overlay with subtle animated pulse spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-20 transition-opacity duration-300">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-1.5"></div>
          <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase animate-pulse">Cargando...</span>
        </div>
      )}

      {isVideo && id ? (
        <iframe
          src={`https://drive.google.com/file/d/${id}/preview`}
          className="w-full h-full border-0 absolute inset-0 z-10"
          title={title}
          allow="autoplay; encrypted-media"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      ) : imageSrc ? (
        <img
          src={imageSrc}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] z-10 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            if (!hasError && id) {
              setHasError(true); // Attempt fallback to docs.google.com direct link
            } else {
              setIsLoading(false); // Done loading even if error
            }
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400 text-xs">
          Sin imagen
        </div>
      )}
    </div>
  );
}
