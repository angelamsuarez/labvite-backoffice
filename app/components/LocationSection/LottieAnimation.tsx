'use client';

import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { hexToRgb, recolorLottie } from '../../utils/color';

export default function LottieAnimation({
  src,
  className,
  color,
}: {
  src: string;
  className?: string;
  color?: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    const encodedSrc = src
      .split('/')
      .map((part, i) => (i === 0 ? part : encodeURIComponent(part)))
      .join('/');

    fetch(encodedSrc)
      .then((response) => response.json())
      .then((data) => {
        if (color) {
          const rgbColor = hexToRgb(color);
          const coloredData = recolorLottie(JSON.parse(JSON.stringify(data)), rgbColor);
          setAnimationData(coloredData);
        } else {
          setAnimationData(data);
        }
      })
      .catch((error) => console.error('Error loading Lottie animation:', error));
  }, [src, color]);

  if (!animationData) return null;

  return (
    <div className={className} style={{ opacity: 0.75, display: 'inline-block' }}>
      <Lottie animationData={animationData} loop={true} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
