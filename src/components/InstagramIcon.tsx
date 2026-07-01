import type { CSSProperties } from "react";

type InstagramIconProps = {
  size?: number;
  style?: CSSProperties;
};

export function InstagramIcon({ size = 16, style }: InstagramIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ flex: "0 0 auto", ...style }}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

type InstagramHandleProps = {
  handle: string;
};

export function InstagramHandle({ handle }: InstagramHandleProps) {
  return (
    <span className="instagram-handle">
      <InstagramIcon size={14} />
      <span>{handle}</span>
    </span>
  );
}
