import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, fallbackSrc, alt, ...props }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  if (error && fallbackSrc) {
    return <img src={fallbackSrc} alt={alt || 'Fallback Image'} {...props} />;
  }

  if (error && !fallbackSrc) {
    return <div className="w-full h-full bg-muted" />;
  }

  return <img src={src} alt={alt} onError={handleError} {...props} />;
};