/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { SVGProps } from "react";
import Image from 'next/image';

// TODO: Replace this SVG with your own logo
// You can create and edit SVGs at https://www.svgviewer.dev/
// To use an image instead, replace this component with an <img> tag
export const LogoIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 496 496"
    className="w-6 h-6 mr-2"
    {...props}
  >
    <polygon
      fill="#FFC114"
      points="35.2,283.2 235.2,360 248,496 112,483.2"
    />
    <polyline
      fill="#E26215"
      points="248,496 112,483.2 35.2,283.2"
    />
    <polygon
      fill="#F9A035"
      points="120,368 166.4,488 248,496 240,414.4"
    />
    <polyline
      fill="#FF9A15"
      points="248,496 240,414.4 120,368"
    />
    <polygon
      fill="#FFC114"
      points="460.8,283.2 384,483.2 248,496 260.8,360"
    />
    <polyline
      fill="#E26215"
      points="248,496 260.8,360 460.8,283.2"
    />
    <polygon
      fill="#F9A035"
      points="376,368 256,414.4 248,496 329.6,488"
    />
    <polyline
      fill="#FF9A15"
      points="248,496 329.6,488 376,368"
    />
    <polygon
      fill="#EAAD13"
      points="248,0 391.2,322.4 248,496 104.8,322.4"
    />
    <polyline
      fill="#E26215"
      points="248,496 104.8,322.4 248,0"
    />
    <polygon
      fill="#F9A035"
      points="248,197.6 162.4,392 248,496 333.6,392"
    />
    <polyline
      fill="#EF8A11"
      points="248,496 333.6,392 248,197.6"
    />
    <polygon
      fill="#FFC114"
      points="48,75.2 128,176.8 92.8,250.4 26.4,202.4"
    />
    <polyline
      fill="#E26215"
      points="92.8,250.4 26.4,202.4 48,75.2"
    />
    <polygon
      fill="#F9A035"
      points="65.6,145.6 52.8,221.6 92.8,250.4 113.6,206.4"
    />
    <polyline
      fill="#FF9A15"
      points="92.8,250.4 113.6,206.4 65.6,145.6"
    />
    <polygon
      fill="#FFC114"
      points="448,75.2 368,176.8 403.2,250.4 469.6,202.4"
    />
    <polyline
      fill="#E26215"
      points="403.2,250.4 469.6,202.4 448,75.2"
    />
    <polygon
      fill="#F9A035"
      points="430.4,145.6 443.2,221.6 403.2,250.4 382.4,206.4"
    />
    <polyline
      fill="#FF9A15"
      points="403.2,250.4 382.4,206.4 430.4,145.6"
    />
  </svg>
);

// If you prefer to use an image logo, uncomment the following and comment out the SVG version above
// export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
//   <div className={`relative w-8 h-8 mr-2 ${className || ''}`}>
//     <Image
//       src="/path-to-your-logo.png"
//       alt="Logo"
//       layout="fill"
//       objectFit="contain"
//       priority
//     />
//   </div>
// );
